import { CircuitRequest } from '../interfaces/circuit-requests';

import { ByteLengthParser, ReadlineParser, SerialPort } from 'serialport';
import { Server, Socket } from 'socket.io'
import { ClientToServerEvent, ServerToClientEvent, CircuitResponse } from '../interfaces';
import { groupPasscode } from '../config';


export class AppRequestHandler {

    private parser;
    private reamainingPerimetralAlarmAttempts = 3;
    private reamainingGarageDoorAttempts = 3;
    private isPoolEmpty = true;

    constructor(
        private readonly io: Server<ClientToServerEvent, ServerToClientEvent>,
        private readonly serialport: SerialPort<any>
    ) {

        this.parser = this.serialport.pipe(new ByteLengthParser({ length: 1 }));

        this.serialport.on('open', () => {
            console.log('Serialport open');
        })

        this.serialport.on('error', function (err) {
            console.log('Error at serialport: ', err.message)
        })



        this.io.on('connection', (socket: Socket<ClientToServerEvent, ServerToClientEvent>) => {
            console.log('User connected');

            // Recived data from serialport
            this.parser.on('data', (d: Blob) => {

                const data = d.toString() as CircuitRequest;
                console.log("Recieved data from serialport: ", d, " -> ", data);

                switch (data) {
                    case '1':
                        console.log('Alarma perimetral activada por el circuito')
                        socket.emit('perimetral-alarm-fired');
                        break;
                    case '4':
                        console.log('Alarma perimetral reestablecida por el circuito')
                        socket.emit('perimetral-alarm-reset');
                        break;
                    case '7':
                        console.log('Luz del cuarto 1 encendida/apagada por el circuito')
                        socket.emit('room-light-toggle', 1);
                        break;
                    case '8':
                        console.log('Luz del cuarto 2 encendida/apagada por el circuito')
                        socket.emit('room-light-toggle', 2);
                        break;
                    case '9':
                        console.log('Luz del cuarto 3 encendida/apagada por el circuito')
                        socket.emit('room-light-toggle', 3);
                        break;
                    case 'a':
                        console.log('Luz del cuarto 4 encendida/apagada por el circuito')
                        socket.emit('room-light-toggle', 4);
                        break;
                    case 'b':
                        this.isPoolEmpty = !this.isPoolEmpty;

                        socket.emit('pool-sensor-toggle', this.isPoolEmpty);
                        break;
                }

            })


            // Recived data from websocket client

            socket.on('drain-pool', () => {
                console.log('Solictud de vaciar piscina recibida')
                if (this.isPoolEmpty === true) {
                    console.log('La piscina ya se encuentra vacía')
                    socket.emit('warning', 'La pisicina ya se encuentra vacía');
                    return;
                }
                console.log('Drenando piscina, enviando comando al circuito')
                this.serialport.write(CircuitResponse.TogglePoolPump);
            })

            socket.on('fill-pool', () => {
                console.log('Solictud de llenar piscina recibida')
                if (this.isPoolEmpty === false) {
                    console.log('La piscina ya se encuentra llena')
                    socket.emit('warning', 'La pisicina ya se encuentra llena');
                    return;
                }
                console.log('Llenando piscina, enviando comando al circuito')
                this.serialport.write(CircuitResponse.TogglePoolPump);
            })

            socket.on('garage-door-open', (code: string) => {
                console.log('Solicitud de abrir puerta recibida')

                if (code !== groupPasscode) {
                    this.reamainingGarageDoorAttempts--;

                    socket.emit('garage-door-passcode', this.reamainingGarageDoorAttempts, false);
                    console.log('Contraseña incorrecta, intentos restantes: ', this.reamainingGarageDoorAttempts, '')

                    if (this.reamainingGarageDoorAttempts === 0) {
                        this.serialport.write(CircuitResponse.AudibleAlarmActivated);
                        socket.emit('warning', 'Se ha activado la alarma audible por intentos fallidos');
                        this.reamainingGarageDoorAttempts = 3;
                        console.log('3 Intentos fallidos, activando alarma audible')
                    }

                    return;
                }

                this.reamainingGarageDoorAttempts = 3;
                socket.emit('garage-door-passcode', this.reamainingGarageDoorAttempts, true);
                this.serialport.write(CircuitResponse.GarageDoorOpen);
                console.log('Contraseña correcta, abriendo puerta')

                setTimeout(() => {
                    this.serialport.write(CircuitResponse.GarageDoorClose);
                    console.log('Cerrando puerta')
                }, 5000);

            })

            socket.on('perimetral-alarm-deactivate', (code: string) => {
                console.log('Solicitud de desactivar alarma recibida')

                // ? check if the alarm is already deactivated

                if (code !== groupPasscode) {

                    this.reamainingPerimetralAlarmAttempts--;

                    socket.emit('perimetral-alarm-passcode', this.reamainingPerimetralAlarmAttempts, false);
                    console.log('Contraseña incorrecta, intentos restantes: ', this.reamainingPerimetralAlarmAttempts, '')

                    if (this.reamainingPerimetralAlarmAttempts === 0) {
                        this.serialport.write(CircuitResponse.AudibleAlarmActivated);
                        socket.emit('warning', 'Se ha activado la alarma audible por intentos fallidos');
                        this.reamainingPerimetralAlarmAttempts = 3;
                        console.log('3 Intentos fallidos, activando alarma audible')
                    }

                    return;
                }

                this.reamainingPerimetralAlarmAttempts = 3;
                socket.emit('perimetral-alarm-passcode', this.reamainingPerimetralAlarmAttempts, true);
                this.serialport.write(CircuitResponse.PerimetralAlarmDeactivated);
                socket.emit('perimetral-alarm-reset');
                console.log('Contraseña correcta, desactivando alarma')

            })

            socket.on('disconnect', function () {
                console.log('User disconnected');
            });
        });
    }
}
import { CircuitRequest } from '../interfaces/circuit-requests';

import { ReadlineParser, SerialPort } from 'serialport';
import { Server, Socket } from 'socket.io'
import { ClientToServerEvent, ServerToClientEvent, CircuitResponse } from '../interfaces';
import { groupPasscode } from '../config';

type poolState = 'fullfilled' | 'drained'

export class AppRequestHandler {

    private parser;
    private reamainingPerimetralAlarmAttempts = 3;
    private reamainingGarageDoorAttempts = 3;
    private poolState: poolState = 'drained';

    constructor(
        private readonly io: Server<ClientToServerEvent, ServerToClientEvent>,
        private readonly serialport: SerialPort<any>
    ) {

        this.parser = this.serialport.pipe(new ReadlineParser());

        this.serialport.on('open', () => {
            console.log('Serialport open');
        })

        this.serialport.on('error', function (err) {
            console.log('Error at serialport: ', err.message)
        })



        this.io.on('connection', (socket: Socket<ClientToServerEvent, ServerToClientEvent>) => {
            console.log('User connected');

            // Recived data from serialport
            this.parser.on('data', (data: CircuitRequest) => {
                console.log("Recieved data from serialport: ", data);

                switch (data) {
                    case '1':
                        socket.emit('perimetral-alarm-fired');
                        break;
                    case '4':
                        socket.emit('perimetral-alarm-reset');
                        break;
                    case '7':
                        socket.emit('room-1-light-toggle');
                        break;
                    case '8':
                        socket.emit('room-2-light-toggle');
                        break;
                    case '9':
                        socket.emit('room-3-light-toggle');
                        break;
                    case '10':
                        socket.emit('room-4-light-toggle');
                        break;
                    case '11':
                        socket.emit('pool-sensor-toggle');
                        break;
                }

            })


            // Recived data from websocket client

            socket.on('drain-pool', () => {
                if (this.poolState === 'drained') {
                    socket.emit('warning', 'La pisicina ya se encuentra vacía');
                    return;
                }
                this.serialport.write(CircuitResponse.TogglePoolPump);
            })

            socket.on('fill-pool', () => {
                if (this.poolState === 'fullfilled') {
                    socket.emit('warning', 'La pisicina ya se encuentra llena');
                    return;
                }
                this.serialport.write(CircuitResponse.TogglePoolPump);
            })

            socket.on('garage-door-open', (code: string) => {

                if (code !== groupPasscode) {
                    this.reamainingGarageDoorAttempts--;

                    socket.emit('garage-door-passcode', this.reamainingGarageDoorAttempts);

                    if (this.reamainingGarageDoorAttempts === 0) {
                        this.serialport.write(CircuitResponse.AudibleAlarmActivated);
                        socket.emit('warning', 'Se ha activado la alarma audible por intentos fallidos');
                        this.reamainingGarageDoorAttempts = 3;
                    }

                    return;
                }

                this.serialport.write(CircuitResponse.GarageDoorOpen);

                setTimeout(() => {
                    this.serialport.write(CircuitResponse.GarageDoorClose);
                }, 5000);

            })

            socket.on('perimetral-alarm-deactivate', (code: string) => {

                // ? check if the alarm is already deactivated

                if (code !== groupPasscode) {

                    this.reamainingPerimetralAlarmAttempts--;

                    socket.emit('garage-door-passcode', this.reamainingPerimetralAlarmAttempts);

                    if (this.reamainingPerimetralAlarmAttempts === 0) {
                        this.serialport.write(CircuitResponse.AudibleAlarmActivated);
                        socket.emit('warning', 'Se ha activado la alarma audible por intentos fallidos');
                        this.reamainingPerimetralAlarmAttempts = 3;
                    }

                    return;
                }

                this.serialport.write(CircuitResponse.PerimetralAlarmDeactivated);

            })

            socket.on('disconnect', function () {
                console.log('User disconnected');
            });
        });
    }
}
import { CircuitRequest } from '../interfaces/circuit-requests';

import { ReadlineParser, SerialPort } from 'serialport';
import { Server, Socket } from 'socket.io'
import { ClientToServerEvent, ServerToClientEvent, CircuitResponse } from '../interfaces';
import { groupPasscode } from '../config';

export class AppRequestHandler {

    private parser;

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
                // TODO: check pool actual state
                // this.serialport.write(CircuitResponse.TogglePoolPump);
            })

            socket.on('fill-pool', () => {
                // TODO: check pool actual state
                // this.serialport.write(CircuitResponse.TogglePoolPump);
            })

            socket.on('garage-door-open', (code: string) => {

                if (code !== groupPasscode) {
                    // TODO: check remaining attempts
                    const remainingAttempts = 0;
                    socket.emit('garage-door-passcode', remainingAttempts);

                    if (remainingAttempts === 0) {
                        this.serialport.write(CircuitResponse.AudibleAlarmActivated);
                    }

                    return;
                }

                this.serialport.write(CircuitResponse.GarageDoorOpen);

                setTimeout(() => {
                    this.serialport.write(CircuitResponse.GarageDoorClose);
                }, 5000);

            })

            socket.on('perimetral-alarm-deactivate', (code: string) => {
                if (code !== groupPasscode) {
                    // TODO: check remaining attempts
                    const remainingAttempts = 0;
                    socket.emit('garage-door-passcode', remainingAttempts);

                    if (remainingAttempts === 0) {
                        this.serialport.write(CircuitResponse.AudibleAlarmActivated);
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
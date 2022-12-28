


export interface ClientToServerEvent {
    'garage-door-open': (code: string) => void;
    'perimetral-alarm-deactivate': (code: string) => void;
    'fill-pool': () => void;
    'drain-pool': () => void;
}


export interface ServerToClientEvent {
    'perimetral-alarm-fired': () => void;
    'perimetral-alarm-reset': () => void;
    'room-light-toggle': (roomNumber: number) => void;
    'pool-sensor-toggle': (isEmpty: boolean) => void;
    'garage-door-passcode': (remainingAttempts: number, success: boolean) => void;
    'perimetral-alarm-passcode': (remainingAttempts: number, success: boolean) => void;
    'warning': (message: string) => void;

}

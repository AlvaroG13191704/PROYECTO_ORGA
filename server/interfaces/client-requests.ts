


export interface ClientToServerEvent {
    'garage-door-open': (code: string) => void;
    'perimetral-alarm-deactivate': (code: string) => void;
    'fill-pool': () => void;
    'drain-pool': () => void;
}


export interface ServerToClientEvent {
    'perimetral-alarm-fired': () => void;
    'perimetral-alarm-reset': () => void;
    'room-1-light-toggle': () => void;
    'room-2-light-toggle': () => void;
    'room-3-light-toggle': () => void;
    'room-4-light-toggle': () => void;
    'pool-sensor-toggle': () => void;
    'garage-door-passcode': (remainingAttempts: number) => void;
    'perimetral-alarm-passcode': (remainingAttempts: number) => void;
}

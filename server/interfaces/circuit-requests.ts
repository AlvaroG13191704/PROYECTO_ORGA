

export type CircuitRequest =
    | '1' // Perimetral alarm fired
    | '4' // Perimetral alarm reset
    | '7' // Room 1 light toggle
    | '8' // Room 2 light toggle
    | '9' // Room 3 light toggle
    | '10' // Room 4 light toggle
    | '11' // Pool sensor toggle

export enum CircuitResponse {
    PerimetralAlarmDeactivated = '2',
    AudibleAlarmActivated = '3',
    GarageDoorOpen = '5',
    GarageDoorClose = '6',
    TogglePoolPump = '12'
}




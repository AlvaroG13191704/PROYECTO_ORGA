import { SerialPortOpenOptions } from "serialport";

export const serialPortOptions: SerialPortOpenOptions<any> = {
    baudRate: 9600,
    path: "COM2",
}
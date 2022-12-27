import express, { Application } from "express";
import { SerialPort } from "serialport";
import { actionRoutes } from "../routes";

export class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    action: "/action",
  };
  private serial;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";
    this.serial = new SerialPort(
      {
        baudRate: 9600,
        path: "COM2",
      },
      (err) => {
        if (err) {
          return console.log("Error: ", err.message);
        }
      }
    );

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.serial = new SerialPort({
            baudRate: 9600,
            path: 'COM2'
        }, (e) => console.log('Error', e));
        
        this.middlewares();
        this.routes();
    }

  routes() {
    this.app.use(this.apiPaths.action, actionRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running at port  " + this.port);
    });
  }
}

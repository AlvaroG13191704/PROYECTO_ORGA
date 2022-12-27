import express, { Application } from "express";
import { SerialPort } from "serialport";
import { createServer } from 'http'
import { Server as WebSocketServer } from 'socket.io'

import { actionRoutes } from "../routes";
import { serialPortOptions } from "../config/serialport.config";
import { ClientToServerEvent, ServerToClientEvent } from "../interfaces";
import { AppRequestHandler } from "./";

export class Server {
  private app: Application;
  private server;
  private port: string;
  private serial;
  private io;
  private requestHandler: AppRequestHandler;

  private apiPaths = {
    action: "/action",
  };


  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";
    this.server = createServer(this.app);
    this.serial = new SerialPort(serialPortOptions, (e) => console.log(e))
    this.io = new WebSocketServer<ClientToServerEvent, ServerToClientEvent>(this.server)

    this.middlewares();
    this.routes();
    this.requestHandler = new AppRequestHandler(this.io, this.serial)
  }

  middlewares() {
    // public
    this.app.use(express.static("../client/dist"));
  }

  routes() {
    this.app.use(this.apiPaths.action, actionRoutes);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log("Server running at port  " + this.port);
    });
  }
}

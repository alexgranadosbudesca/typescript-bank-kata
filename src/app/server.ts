import bodyParser from "body-parser";
import errorHandler from "errorhandler";
import express, { Request, Response } from "express";
import Router from "express-promise-router";
import * as http from "http";
import httpStatus from "http-status";
import { registerRoutes } from "./routes";

export class Server {
  private express: express.Express;
  private httpServer?: http.Server;

  constructor(readonly port: string) {
    this.express = express();
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    const router = Router();
    router.use(errorHandler());
    this.express.use(router);

    registerRoutes(router);

    /* eslint-disable */
    router.use((err: Error, req: Request, res: Response, next: Function) => {
      /* eslint-enable */
      console.log(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    });
  }

  async listen(): Promise<void> {
    return new Promise((resolve) => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(
          `  App is running at http://localhost:${this.port} in ${this.express.get("env")} mode`,
        );
        console.log("  Press CTRL-C to stop\n");
        resolve();
      });
    });
  }

  getHTTPServer() {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }
}

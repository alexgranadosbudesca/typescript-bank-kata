import bodyParser from "body-parser";
import cors from "cors";
import errorHandler from "errorhandler";
import express, { Request, Response } from "express";
import Router from "express-promise-router";
import { Server } from "http";
import httpStatus from "http-status";
import Logger from "../Contexts/Bank/Shared/domain/Logger";
import container from "./dependency-injection";
import { registerRoutes } from "./routes";

export class App {
  public readonly express: express.Express;
  private readonly port: number;
  private logger: Logger;
  private server: Server | undefined;

  constructor(port: number) {
    this.port = port;
    this.logger = container.get("Shared.Logger");
    this.express = express();
    const router = Router();
    router.use(cors());
    router.use(errorHandler());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(router);
    registerRoutes(router);

    router.use((err: Error, req: Request, res: Response) => {
      this.logger.error(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    });
  }

  start(): void {
    this.express.get("/dummy", (request: Request, response: Response) => {
      response.send("something!");
    });

    this.server = this.express.listen(this.port);
  }

  stop(): void {
    this.server?.close();
  }
}

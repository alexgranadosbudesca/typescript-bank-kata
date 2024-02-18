import "dotenv/config";
import * as Process from "process";
import { App } from "./App";

const port = Number(Process.env.NODE_PORT) || 3300;
console.log(`Starting the App in port ${port}`)

const app = new App(port);
app.start();

export default app;

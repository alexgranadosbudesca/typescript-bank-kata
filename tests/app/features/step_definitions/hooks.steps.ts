import { AfterAll, BeforeAll } from "@cucumber/cucumber";
import { App } from "../../../../src/app/App";

let application: App;

BeforeAll(async () => {
  application = new App(3300);
  application.start();
});

AfterAll(async () => {
  application.stop();
});

export { application };

import { AfterAll, BeforeAll } from "@cucumber/cucumber";
import { App } from "../../../../src/app/App";
import container from "../../../../src/app/dependency-injection";
import { EnvironmentArranger } from "../../../Contexts/Bank/Shared/infrastructure/EnvironmentArranger";

let application: App;
let environmentArranger: EnvironmentArranger;

BeforeAll(async () => {
  environmentArranger = await container.get<Promise<EnvironmentArranger>>(
    "App.EnvironmentArranger",
  );

  await environmentArranger.arrange();

  application = new App();
  application.start();
});

AfterAll(async () => {
  await environmentArranger.arrange();
  await environmentArranger.close();

  application.stop();
});

export { application, environmentArranger };

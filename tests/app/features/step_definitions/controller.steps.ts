import { Given, Then } from "@cucumber/cucumber";
import assert from "assert";
import request from "supertest";
import { application } from "./hooks.steps";

let _request: request.Test;
let _response: request.Response;
Given(
  "I send a POST request to {string} with body:",
  (route: string, body: string) => {
    _request = request(application.httpServer)
      .post(route)
      .send(JSON.parse(body));
  }
);

Then("the response status code should be {int}", async (status: number) => {
  _response = await _request.expect(status);
});

Then("the response should be empty", () => {
  assert.deepStrictEqual(_response.body, {});
});

Then("the response should be:", async response => {
  assert.deepStrictEqual(_response.body, JSON.parse(response));
});

import request from "supertest";
import app from "../src/app/main";

describe('Dummy Test', () => {
    it('should be OK', () => {
        expect(true).toBe(true);
    });
    it('should respond 200', async () => {
        const response = await request(app.express).get("/dummy");
        expect(response.status).toBe(200);
    });
});

afterAll(done => {
    app.stop();
    done();
})

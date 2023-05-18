import chai, { expect } from "chai";
import { describe, it } from "mocha";
import { UserController } from "../src/controller/users";
import chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("UserController.getInstance().authenticateUser()", () => {
  it("should return an 200 response when all data is correct", (done) => {
    let loginInput = {
      emailAdress: "JohnDoe@Test.com",
      password: "Password123!",
    };
    chai
      .request("http://localhost:3000")
      .post("/user/login")
      .send(loginInput)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it("should return an 404 response when an wrong email is used", (done) => {
    let loginInput = {
      emailAdress: "JaneDoe@Test.com",
      password: "Password123!",
    };
    chai
      .request("http://localhost:3000")
      .post("/user/login")
      .send(loginInput)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it("should return an 404 response when an wrong password is used", (done) => {
    let loginInput = {
      emailAdress: "JohnDoe@Test.com",
      password: "wrongPassword123",
    };
    chai
      .request("http://localhost:3000")
      .post("/user/login")
      .send(loginInput)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

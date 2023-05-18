import chai, { expect } from "chai";
import { describe, it } from "mocha";
import { UserController } from "../src/controller/users";
import chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("UserController.getInstance().addUser()", () => {
  it("should return a 200 response when all data is correct.", (done) => {
    let registerInput = {
      username: "Testuser",
      password: "Validpassword#123",
      emailAdress: "test@mail.com",
      areaOfExpertise: "Technology",
      userType: "student",
    };
    chai
      .request("http://localhost:3000")
      .post("/user/register")
      .send(registerInput)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it("should return a 200 response when username includes a '_' or '-' character.", (done) => {
    let registerInput = {
      username: "Test_user-name",
      password: "Validpassword#123",
      emailAdress: "test@mail.com",
      areaOfExpertise: "Technology",
      userType: "student",
    };
    chai
      .request("http://localhost:3000")
      .post("/user/register")
      .send(registerInput)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it("should return a 400 response when username includes special characters.", (done) => {
    let registerInput = {
      username: "@^#*$Testuser",
      password: "Validpassword#123",
      emailAdress: "test@mail.com",
      areaOfExpertise: "Business and Economics",
      userType: "student",
    };
    chai
      .request("http://localhost:3000")
      .post("/user/register")
      .send(registerInput)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it("should return a 400 response when an input includes a whitespace. Does not apply to areaOfExpertise.", (done) => {
    let registerInput = {
      username: "Test user",
      password: "Validpassword#123",
      emailAdress: "test@mail.com",
      areaOfExpertise: "Business and Economics",
      userType: "student",
    };
    chai
      .request("http://localhost:3000")
      .post("/user/register")
      .send(registerInput)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it("should return a 400 response when an input is empty.", (done) => {
    let registerInput = {
      username: "",
      password: "Validpassword#123",
      emailAdress: "test@mail.com",
      areaOfExpertise: "Business and Economics",
      userType: "student",
    };
    chai
      .request("http://localhost:3000")
      .post("/user/register")
      .send(registerInput)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it("should return a 400 response when password has less than 8 chars.", (done) => {
    let registerInput = {
      username: "Testuser",
      password: "short#",
      emailAdress: "test@mail.com",
      areaOfExpertise: "Business and Economics",
      userType: "student",
    };
    chai
      .request("http://localhost:3000")
      .post("/user/register")
      .send(registerInput)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it("should return a 400 response when password has no special characters.", (done) => {
    let registerInput = {
      username: "Testuser",
      password: "Nospecialcharacters",
      emailAdress: "test@mail.com",
      areaOfExpertise: "Business and Economics",
      userType: "student",
    };
    chai
      .request("http://localhost:3000")
      .post("/user/register")
      .send(registerInput)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it("should return a 400 response when email does not include a '@' character.", (done) => {
    let registerInput = {
      username: "Testuser",
      password: "Validpassword#123",
      emailAdress: "testmail.com",
      areaOfExpertise: "Business and Economics",
      userType: "student",
    };
    chai
      .request("http://localhost:3000")
      .post("/user/register")
      .send(registerInput)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it("should return a 400 response when email does not include a '.' character.", (done) => {
    let registerInput = {
      username: "Testuser",
      password: "Validpassword#123",
      emailAdress: "test@mailcom",
      areaOfExpertise: "Business and Economics",
      userType: "student",
    };
    chai
      .request("http://localhost:3000")
      .post("/user/register")
      .send(registerInput)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it("should return a 400 response when area of expertise does not exist", (done) => {
    let registerInput = {
      username: "Testuser",
      password: "Validpassword#123",
      emailAdress: "test@mail.com",
      areaOfExpertise: "None",
      userType: "student",
    };
    chai
      .request("http://localhost:3000")
      .post("/user/register")
      .send(registerInput)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

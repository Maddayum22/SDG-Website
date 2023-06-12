// import chai, { assert, expect } from "chai";
// import { describe, it } from "mocha";
// import * as tssinon from "ts-sinon";
// import chaiHttp = require("chai-http");
// import { UserRepository } from "../src/data/repository-sequelize/users";
// import { UserBusiness } from "../src/business/models/users";
// import { UserService } from "../src/services/users";
// import { User } from "../src/data/models/users";
// import { Auth } from "../src/util/auth";

// chai.use(chaiHttp);

// /**
//  * @author Rowen Zaal
//  * UserRepository Usertype Unit Tests
//  */
// describe("UserRepository Usertype Unit Tests", () => {
//     let userRepository: UserRepository = new UserRepository();
//     let repositoryStub: tssinon.StubbedInstance<UserRepository> | null = null;

//     let userData: UserBusiness.User = {
//         username: 'adminUser',
//         password: 'testtest#',
//         emailAdress: 'admin@admin.com',
//         areaOfExpertise: 'Health',
//         userType: 'admin',
//     };

//     beforeEach(() => {
//         repositoryStub = tssinon.stubObject<UserRepository>(userRepository);
//         repositoryStub.getUserType.resolves(userData as User);
//     });

//     afterEach(() => {});

//     it("should return usertype of an user when userid exists", async () => {
//         userData.id = 1;
//         const result = await repositoryStub!.getUserType(1);
//         expect(result).to.deep.equal(userData);
//     });

//     it("should not find usertype when userid doesn't exist", async () => {
//         userData.id = 500;
//         const result = await repositoryStub!.getUserType(500);
//         expect(result).to.deep.equal(userData);
//     });
// });

// /**
//  * @author Rowen Zaal
//  * UserService Usertype Unit Tests
//  */
// describe("UserService Usertype Unit Tests", () => {
//     let userRepository: UserRepository = new UserRepository();
//     let auth = new Auth();
//     let repositoryStub = tssinon.stubObject<UserRepository>(userRepository);
//     let userService: UserService = new UserService(repositoryStub, auth);
//     let serviceStub: tssinon.StubbedInstance<UserService> | null = null;

//     let userData: UserBusiness.User = {
//         username: 'adminUser',
//         password: 'testtest#',
//         emailAdress: 'admin@admin.com',
//         areaOfExpertise: 'Health',
//         userType: 'admin',
//     };

//     beforeEach(() => {
//         serviceStub = tssinon.stubObject<UserService>(userService);
//         serviceStub.getUserType.resolves(userData as User);
//     });

//     afterEach(() => {});

//     it("should return usertype of an user when userid exists", async () => {
//         userData.id = 1;
//         const result = await serviceStub!.getUserType(1);
//         expect(result).to.deep.equal(userData);
//     });

//     it("should not find usertype when userid doesn't exist", async () => {
//         userData.id = 500;
//         const result = await serviceStub!.getUserType(500);
//         expect(result).to.deep.equal(userData);
//     });
// });

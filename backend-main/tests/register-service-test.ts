import * as tssinon from 'ts-sinon';
import * as Sinon from 'sinon';
import { expect } from 'chai';
import { UserService } from '../src/services/users';
import { UserTestData } from '../src/util/testdata/user-test-data';
import { UserBusiness, UserInterface } from '../src/business/models/users';
import { AreaOfExpertise } from '../src/data/models/types';

/**
 * @author Rowen Zaal
 * User service business model integration tests
 */
describe("UserService addUser integration tests", () => {
  const sandbox: Sinon.SinonSandbox = tssinon.default.createSandbox();
  const userTestData: UserTestData = new UserTestData();
  const userService: UserService = userTestData.getUserService();
  const fakeInput: UserInterface = userTestData.getFakeRegisterInput();
  const existingData: UserInterface = userTestData.getFakeExistingUser();
  let testInput: UserInterface;
  
  beforeEach(() => {
    testInput = new UserBusiness.User(fakeInput);
  })

  afterEach(() => {
    sandbox.restore();
    tssinon.default.restore();
  });

  it('should return true if the user register input is valid', async () => {
    const actual: boolean = await userService.addUser(testInput);
    const expected = true;

    expect(actual).to.deep.equal(expected);
  });

  it('should return false if the username contains invalid characters.', async () => {
    testInput.username = "Admin!#@$%";
    const actual: boolean = await userService.addUser(testInput);
    const expected = false;

    expect(actual).to.deep.equal(expected);
  });

  it('should return false if the username contains no characters.', async () => {
    testInput.username = "";
    const actual: boolean = await userService.addUser(testInput);
    const expected = false;

    expect(actual).to.deep.equal(expected);
  });

  it('should return false if the username contains a whitespace.', async () => {
    testInput.username = "white space";
    const actual: boolean = await userService.addUser(testInput);
    const expected = false;

    expect(actual).to.deep.equal(expected);
  });

  it('should return false if the password contains less than 8 characters', async () => {
    testInput.password = "short!";
    const actual: boolean = await userService.addUser(testInput);
    const expected = false;

    expect(actual).to.deep.equal(expected);
  });

  it('should return false if the password does not contain special characters', async () => {
    testInput.password = "nospecialcharacters";
    const actual: boolean = await userService.addUser(testInput);
    const expected = false;

    expect(actual).to.deep.equal(expected);
  });

  it('should return false if the password contains a whitespace', async () => {
    testInput.password = "test test#";
    const actual: boolean = await userService.addUser(testInput);
    const expected = false;

    expect(actual).to.deep.equal(expected);
  });

  it("should return false if the emailAdress contains no '@'. ", async () => {
    testInput.emailAdress = "testmail.com";
    const actual: boolean = await userService.addUser(testInput);
    const expected = false;

    expect(actual).to.deep.equal(expected);
  });

  it("should return false if the emailAdress contains no '.'. ", async () => {
    testInput.emailAdress = "test@mailcom";
    const actual: boolean = await userService.addUser(testInput);
    const expected = false;

    expect(actual).to.deep.equal(expected);
  });

  it("should return false if the area of expertise doesn't exist.", async () => {
    testInput.areaOfExpertise = "Invalid" as AreaOfExpertise;
    const actual: boolean = await userService.addUser(testInput);
    const expected = false;

    expect(actual).to.deep.equal(expected);
  });

  // WILL BE FIXED LATER:

  // it("should return false if the username or email already exists in the database.", async () => {
  //   const actual: boolean = await userService.addUser(existingData);
  //   const expected = false;

  //   expect(actual).to.deep.equal(expected);
  // });
})
/**
 * @author Sven Molenaar
 * This code executes unit tests for the authentication functionality of the UserService, 
 * verifying if it returns the expected results for correct and incorrect login details.
 */

import chai, { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { LoginTestHelper } from './login-test-helper';
import * as tssinon from 'ts-sinon';
import * as Sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';
import chaiHttp = require('chai-http');
import { UserInterface } from '../src/business/models/users';
import { UserService } from '../src/services/users';
chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('UserService unit tests (authenticate part)', () => {
    /**
     * creates and Sinon Sandbox for isolated test cases using the loginhelper 
     */
    const sandbox: Sinon.SinonSandbox = tssinon.default.createSandbox();
    const loginHelper: LoginTestHelper = new LoginTestHelper();
    const userService: UserService = loginHelper.getUserService();
    /**
     * Creates valid and Invalid userdata objects for tests
     */
    const validUserdata: UserInterface = loginHelper.fakeUserDataCorrect();
    const inValidUserdata: UserInterface = loginHelper.fakeUserDataIncorrect();

    afterEach(() => {
        sandbox.restore();
        tssinon.default.restore();
    });
    it('should send back an sessionID String when loginDetails are correct', async () => {
        const result: string | null = await userService!.authenticateUser(
            validUserdata.emailAdress,
            validUserdata.password
        );
        expect(result?.length).to.deep.equal(32);
    });
    it('should send back null when loginpassword is incorrect', async () => {
        const result: string | null = await userService!.authenticateUser(
            validUserdata.emailAdress,
            inValidUserdata.password
        );
        expect(result).to.deep.equal(null);
    });
    it('should send back null when logindata is incorrect', async () => {
        const result: string | null = await userService!.authenticateUser(
            inValidUserdata.emailAdress,
            inValidUserdata.password
        );
        expect(result).to.deep.equal(null);
    });
});

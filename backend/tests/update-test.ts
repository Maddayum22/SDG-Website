import { expect } from "chai";
import { describe, it } from "mocha";
import { UserBusiness } from "../src/business/models/users";
import { UpdateTestHelper } from "./update-test-helper";
import * as Sinon from 'sinon';
import * as tssinon from 'ts-sinon';
import { UserController } from "../src/controller/users";
import { Request, Response } from 'express';
import { UserInterface } from "../src/business/models/users";

/**
 * @author William Nguyen
 * Tests the user business, update part
 */
describe('User Business update unit tests', () => {
    const sandbox: Sinon.SinonSandbox = tssinon.default.createSandbox();
    let updateHelper = new UpdateTestHelper();
    let userBusiness: UserBusiness.User;
    let updateData: UserInterface;


    beforeEach(() => {
        updateData = updateHelper.fakeUpdateData();
        userBusiness = new UserBusiness.User(updateData);
    });

    afterEach(() => {
        sandbox.restore();
        tssinon.default.restore()
    })

    it('should return true if input values are valid', async () => {
        Object.assign(userBusiness, updateData);
        const result = await userBusiness.isValidUpdate();

        expect(result).to.be.true;
    });

    it('should return false when the username is an empty string', async () => {
        (updateData).username = '';
        Object.assign(userBusiness, updateData)
        const result = await userBusiness.isValidUpdate();

        expect(result).to.be.false;
    });

    it('should return false when the username has white space', async () => {
        (updateData).username = 'Invalid Username';
        Object.assign(userBusiness, updateData);
        const result = await userBusiness.isValidUpdate();

        expect(result).to.be.false;
    });

    it('should return false when the email is invalid', async () => {
        (updateData).emailAdress = 'invalidMail.com';
        Object.assign(userBusiness, updateData);
        const result = await userBusiness.isValidUpdate();

        expect(result).to.be.false;
    });

    it('should return false when the email is an empty string', async () => {
        (updateData).emailAdress = '';
        Object.assign(userBusiness, updateData);
        const result = await userBusiness.isValidUpdate();

        expect(result).to.be.false
    })

    it('should return false when firstName has special characters', async () => {
        (updateData).firstName = 'John@#';
        Object.assign(userBusiness, updateData);
        const result = await userBusiness.isValidUpdate();

        expect(result).to.be.false;
    });

    it('should return false when the first name is an empty string', async () => {
        (updateData).firstName = '';
        Object.assign(userBusiness, updateData);
        const result = await userBusiness.isValidUpdate();

        expect(result).to.be.false;
    });

    it('should return false when the first name has white space', async () => {
        (updateData).firstName = 'Jo hn';
        Object.assign(userBusiness, updateData);
        const result = await userBusiness.isValidUpdate();

        expect(result).to.be.false;
    });

    it('should return false when the last name has a special character', async () => {
        (updateData).lastName = 'Doe@#';
        Object.assign(userBusiness, updateData);
        const result = await userBusiness.isValidUpdate();

        expect(result).to.be.false;
    });

    it('should return false when the last name is an empty string', async () => {
        (updateData).lastName = '';
        Object.assign(userBusiness, updateData);
        const result = await userBusiness.isValidUpdate();

        expect(result).to.be.false;
    });

    it('should return false when the last name has white space', async () => {
        (updateData).lastName = 'Do e';
        Object.assign(userBusiness, updateData);
        const result = await userBusiness.isValidUpdate();

        expect(result).to.be.false;
    });

    it('should return false when the education has a special character', async () => {
        (updateData).education = 'Hva#';
        Object.assign(userBusiness, updateData);
        const result = await userBusiness.isValidUpdate();

        expect(result).to.be.false;
    });

    it('should return false when the education is an empty string', async () => {
        (updateData).education = '';
        Object.assign(userBusiness, updateData);
        const result = await userBusiness.isValidUpdate();

        expect(result).to.be.false;
    });
});

/**
 * @author William Nguyen
 * Tests the user controller, update function
 */
describe('User Controller update test', () => {
    const updateHelper: UpdateTestHelper = new UpdateTestHelper();
    const userController: UserController = updateHelper.getUserController();
    const userId: number = 1;

    it('should return HTTP 200 if user is updated successfully', async () => {
        const updateData = updateHelper.fakeUpdateData();
        const request = {
            params: { id: userId },
            body: updateData,
        } as unknown as Request;

        const response = {
            status: (statusCode: number) => ({
                json: (message: any) => {
                    expect(statusCode).to.equal(200);
                    expect(message).to.equal('Successfully updated');
                },
            }),
        } as Response;
        await userController!.updateUser(request, response)
    });

    it('should return HTTP 400 when service returns null', async () => {
        const invalidUpdate = updateHelper.invalidUpdateData();
        const request = {
            params: { id: userId },
            body: invalidUpdate,
        } as unknown as Request;

        const response = {
            status: (statusCode: number) => ({
                json: (message: any) => {
                    expect(statusCode).to.equal(400);
                    expect(message).to.equal('Bad request');
                },
            }),
        } as Response
        await userController!.updateUser(request, response)
    })
})
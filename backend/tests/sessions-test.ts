import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import { SessionBusiness } from '../src/business/models/sessions';
import { SessionHelper } from './sessions-test-helper';
import { Request, Response } from 'express';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

/** @author Madelief van Slooten */
describe('Session Business unit tests', async () => {
    let sessionHelper = new SessionHelper();
    let sessionBusiness: SessionBusiness.Sessions;

    it('creates a Session containing a sessionID with a length of 32', () => {
        sessionBusiness = new SessionBusiness.Sessions(sessionHelper.getUserData().id!);
        sessionBusiness.setSessionInfo();
        const expectedValue = 32;

        expect(sessionBusiness.sessionID.length).to.deep.equal(expectedValue);
    });
});

/** @author Madelief van Slooten */
describe('Session Service integration tests', () => {
    const sessionHelper = new SessionHelper();
    const sessionService = sessionHelper.getSessionService();
    const sessionData = sessionHelper.getSessionData();

    it('should check and start a Session using repository and return true if succeeded', async () => {
        const result: {
            succesStatus: boolean;
            sessionID: string;
        } = await sessionService!.startSession(sessionHelper.getUserData());

        expect(result.sessionID.length).to.deep.equal(32);
        expect(result.succesStatus).to.be.true;
    });

    it('should check an excisting Session using repository and return the userId of the session', async () => {
        const result: number = await sessionService!.checkSession(sessionData.sessionID);
        expect(result).to.deep.equal(1);
    });

    it('should delete a Session using repository and return true if succeeded', async () => {
        const result: boolean = await sessionService!.deleteSession(sessionHelper.getSessionData().sessionID);

        expect(result).to.be.true;
    });
});

/**
 * @author Madelief van Slooten
 * Session Controller unit tests.
 */
describe('Session Controller integration tests', () => {
    const sessionHelper = new SessionHelper();
    const sessionController = sessionHelper.getSessionController();

    it('should call service to check a session and return HTTP 200 if succeeded', async () => {
        const request = { cookies: { SessionID: '680f1f759444b61a16884de8280c9ccH' } } as Request;
        const response = {
            status: (statusCode: number) => ({
                json: (message: any) => {
                    expect(statusCode).to.equal(200);
                },
            }),
        } as Response;
        await sessionController!.checkSession(request, response);
    });
});

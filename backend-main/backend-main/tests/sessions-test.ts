import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import { SessionBusiness } from '../src/business/models/sessions';
import { SessionHelper } from './sessions-test-helper';
import * as tssinon from 'ts-sinon';
import * as Sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

/** @author Madelief van Slooten */
describe('Session Business unit tests', () => {
    let sessionHelper = new SessionHelper();
    let sessionBusiness: SessionBusiness.Sessions;

    it('creates a Session containing a sessionID with a length of 32', () => {
        sessionBusiness = new SessionBusiness.Sessions(sessionHelper.getUserData().id!);
        const expectedValue = 32;

        expect(sessionBusiness.sessionID.length).to.deep.equal(expectedValue);
    });
});

/** @author Madelief van Slooten */
describe('Session Service integration tests', () => {
    const sandbox: Sinon.SinonSandbox = tssinon.default.createSandbox();
    const sessionHelper = new SessionHelper();
    const sessionService = sessionHelper.getSessionService();
    const sessionData = sessionHelper.getSessionData();

    afterEach(() => {
        sandbox.restore();
        tssinon.default.restore();
    });

    it('should check and start a Session and return true if succeeded', async () => {
        const result = await sessionService!.startSession(sessionHelper.getUserData());

        expect(result.sessionID.length).to.deep.equal(32);
        expect(result.succesStatus).to.be.true;
    });

    it('should check an excisting Session and return the userId of the session', async () => {
        const result = await sessionService!.checkSession(sessionData.sessionID);
        expect(result).to.deep.equal(1);
    });
});

import { SessionInterface } from '../src/business/models/sessions';
import { SessionRepositoryInterface } from '../src/data/models/session-interface';
import { SessionService } from '../src/services/sessions';

import { UserInterface } from '../src/business/models/users';
import { AreaOfExpertise, UserType } from '../src/data/models/types';

export class SessionHelper {
    private now = new Date();
    private WEEK_IN_SECONDS: Date = new Date(this.now.getTime() + 7 * 24 * 60 * 60 * 1000);

    public getSessionData(): SessionInterface {
        return {
            sessionID: '680f1f759444b61a16884de8280c9ccH',
            userID: 1,
            expiry: this.WEEK_IN_SECONDS,
        };
    }

    public getUserData(): UserInterface {
        return {
            id: 1,
            username: 'JohnDoe',
            password: 'Test123!',
            emailAdress: 'JohnDoe@test.com',
            areaOfExpertise: AreaOfExpertise.Technology,
            userType: UserType.Student,
        };
    }

    public getSessionService(): SessionService {
        const sessionRepositoryStub: SessionRepositoryInterface = new SessionRepositoryStub();
        const sessionService: SessionService = new SessionService(sessionRepositoryStub);
        return sessionService;
    }
}

export class SessionRepositoryStub implements SessionRepositoryInterface {
    private now = new Date();
    private WEEK_IN_SECONDS: Date = new Date(this.now.getTime() + 7 * 24 * 60 * 60 * 1000);

    public constructor() {}
    findSession(): Promise<SessionInterface | null> {
        return new Promise<SessionInterface | null>(res => {
            res({
                sessionID: '680f1f759444b61a16884de8280c9ccH',
                userID: 1,
                expiry: this.WEEK_IN_SECONDS,
            });
        });
    }
    deleteSession(): Promise<boolean> {
        return new Promise<boolean>(res => {
            res(true);
        });
    }

    public startSession(): Promise<boolean> {
        return new Promise<boolean>(res => {
            res(true);
        });
    }
}

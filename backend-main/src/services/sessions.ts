/** @author Madelief van Slooten */

import { SessionRepositoryInterface } from '../data/models/session-interface';
import { SessionBusiness, SessionInterface } from '../business/models/sessions';
import { UserInterface } from '../business/models/users';

export class SessionService {
    /**
     * @author Madelief van Slooten
     * Session service that takes a repository (depending on which database is needed).
     * @param sessionRepository repository layer
     */
    public constructor(private sessionRepository: SessionRepositoryInterface) {}

    /**
     * @author Madelief van Slooten
     * Checks if session is found in repository layer and returns userid or 0.
     * @param sessionID Sessionid that gets taken out of cookie from user.
     * @returns Promise<number> Returns the userID number of a 0 if no user is found.
     */
    public async checkSession(sessionID: string): Promise<number> {
        let session: SessionInterface | null = await this.sessionRepository.findSession(sessionID);
        let now: Date = new Date();

        try {
            if (session !== null && session?.expiry > now) {
                return session.userID;
            } else {
                await this.sessionRepository.deleteSession(sessionID);
                return 0;
            }
        } catch (err) {
            throw new Error('Session was not checked');
        }
    }

    /**
     * @author Madelief van Slooten
     * Starts and saves a session.
     * @param User User object to start session with.
     * @param sessionID SessionID that is randomly generated with login.
     * @returns Promise<boolean> if session is started or not.
     */
    public async startSession(User: UserInterface): Promise<{
        succesStatus: boolean;
        sessionID: string;
    }> {
        let session: SessionInterface = new SessionBusiness.Sessions(User.id!);
        let sessionInfo: {
            succesStatus: boolean;
            sessionID: string;
        } = {
            succesStatus: false,
            sessionID: session.sessionID!,
        };

        try {
            sessionInfo.succesStatus = await this.sessionRepository.startSession(session);
            return sessionInfo;
        } catch (error) {
            throw new Error('Session start went wrong.');
        }
    }
    /**
     * @author Sven Molenaar
     * Deltes the session
     * @param sessionID SessionID that is randomly generated with login.
     * @returns
     */
    public async deleteSession(sessionID: string): Promise<boolean> {
        return await this.sessionRepository.deleteSession(sessionID);
    }
}

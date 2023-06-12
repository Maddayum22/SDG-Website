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
     * Checks if a session exists in the repository layer and returns the user ID or 0.
     * @param sessionID The session ID extracted from the user's cookie.
     * @returns A Promise with the user ID number or 0 if no user is found.
     * @throws Error if the session check fails.
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
     * Starts and saves a new session.
     * @param user The user object to start the session with.
     * @param sessionID The session ID randomly generated during login.
     * @returns A Promise with an object indicating if the session was successfully started and the session ID.
     * @throws Error if the session start fails.
     */
    public async startSession(User: UserInterface): Promise<{
        succesStatus: boolean;
        sessionID: string;
    }> {
        let session: SessionBusiness.Sessions = new SessionBusiness.Sessions(User.id!);
        session.setSessionInfo();
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

import { SessionInterface } from '../../business/models/sessions';
import { SessionRepositoryInterface } from '../models/session-interface';
import { Sessions } from '../models/sessions';

export class SessionRepository implements SessionRepositoryInterface {
    public constructor() {}

    /**
     *  @author Madelief van Slooten
     * Checks if a session already exists in the database.
     * @param sessionID - The sessionID retrieved from the user's cookie.
     * @returns Promise<SessionInterface | null> - The session if it exists, otherwise null.
     */
    public async findSession(sessionID: string): Promise<SessionInterface | null> {
        try {
            return await Sessions.findOne({ where: { sessionID: sessionID } });
        } catch (error: unknown) {
            throw new Error('Session was not found.');
        }
    }

    /**
     * @author Madelief van Slooten
     * Starts and stores a session in the database.
     * @param session - The SessionInterface object representing the session to be started.
     * @returns Promise<boolean> - Indicates whether the session was successfully created.
     */
    public async startSession(session: SessionInterface): Promise<boolean> {
        try {
            await Sessions.create({
                sessionID: session.sessionID,
                userID: session.userID,
                expiry: session.expiry,
            });
            return true;
        } catch (error: unknown) {
            throw new Error('Session start failed.');
        }
    }

    /**
     * @author Sven Molenaar
     * Deletes the expired session from database.
     * @param sessionID SessionID taken from cookie
     * @returns an boolean value if the deletion was confirmed
     */
    public async deleteSession(sessionID: string): Promise<boolean> {
        let deleteConfirm: boolean = false;
        try {
            await Sessions.destroy({ where: { sessionID: sessionID } });
            deleteConfirm = true;
        } catch (error: unknown) {}
        return deleteConfirm;
    }
}

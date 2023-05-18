/** @author Madelief van Slooten & Sven Molenaar*/

import { SessionInterface } from '../../business/models/sessions';
import { SessionRepositoryInterface } from '../models/session-interface';
import { Sessions } from '../models/sessions';

export class SessionRepository implements SessionRepositoryInterface {
    public constructor() {}

    /**
     * Checks if session is already in database.
     * @param sessionID sessionID pulled out of cookie of user.
     * @returns Promise<Sessions | null> If session exsists it gets sent back, if not, null is returned.
     */
    public async findSession(sessionID: string): Promise<SessionInterface | null> {
        try {
            return await Sessions.findOne({ where: { sessionID: sessionID } });
        } catch (error: unknown) {
            throw new Error('Session was not found.');
        }
    }

    /**
     * Starts and stores a session in the database
     * @param User User object that logged in.
     * @param sessionID string of sessionID created when user logged in.
     * @returns boolean if session is created or not.
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
            throw new Error('Session start went wrong.');
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

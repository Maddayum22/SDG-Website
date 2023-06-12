import { SessionRepositoryInterface } from '../models/session-interface';
import { Database } from '../../util/database';
import { SessionInterface } from '../../business/models/sessions';

export class SQLSessionRepository implements SessionRepositoryInterface {
    /**
     * @author Madelief van Slooten
     * Session repository class that uses a database connection chosen in the server configuration.
     * @param database - Chosen database connection
     */
    public constructor(private database: Database) {}

    /**
     * @author Madelief van Slooten
     * Finds a session in the database and returns it when found.
     * @param sessionID - Session ID to search for
     * @returns Promise<SessionInterface | null> - The session if found, otherwise null
     */
    public async findSession(sessionID: string): Promise<SessionInterface | null> {
        try {
            let foundSession = await this.database
                .pool!.promise()
                .query('SELECT * FROM sql_sdg_databasedetectives.session WHERE sessionId=?', [sessionID]);
            if (foundSession.length > 0) {
                const session: SessionInterface = foundSession[0][0];
                return session;
            } else {
                return null;
            }
        } catch (err) {
            throw new Error('Session was not found.');
        }
    }

    /**
     * @author Madelief van Slooten
     * Starts a session and stores it in the database.
     * @param session - Session object to be started and stored
     * @returns Promise<boolean> - Indicates whether the session was started successfully or not
     */
    public async startSession(session: SessionInterface): Promise<boolean> {
        try {
            this.database.pool?.query(
                'INSERT INTO sql_sdg_databasedetectives.session (sessionId, userId, expiry) VALUES (?,?,?)',
                [session.sessionID, session.userID, session.expiry],
                function (err) {
                    if (err) {
                        console.log(err);
                    }
                }
            );
            return true;
        } catch (err) {
            throw new Error('Session was not started.');
        }
    }

    /**
     * @author Madelief van Slooten
     * Deletes a session from the database.
     * @param sessionID - Session ID to be deleted
     * @returns Promise<boolean> - Indicates whether the session was deleted successfully or not
     */
    public async deleteSession(sessionID: string): Promise<boolean> {
        try {
            this.database.pool?.query('DELETE FROM sql_sdg_databasedetectives.session WHERE sessionId=?', [sessionID]);
            return true;
        } catch (error: unknown) {
            throw new Error('Session was not deleted.');
        }
    }
}

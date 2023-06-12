import { SessionRepositoryInterface } from '../models/session-interface';
import { Database } from '../../util/database';
import { SessionInterface } from '../../business/models/sessions';

export class SQLSessionRepository implements SessionRepositoryInterface {
    /**
     * @author Madelief van Slooten
     * Session repository class that uses a database connection that is choses in de configuration of the server.
     * @param database chosen database connection
     */
    public constructor(private database: Database) {}

    /**
     * @author Madelief van Slooten
     * finds a session and returns the session when found.
     * @param sessionID
     * @returns Promise of a session | null
     */
    public async findSession(sessionID: string): Promise<SessionInterface | null> {
        try {
            this.database.pool?.query(
                'SELECT * FROM sql_sdg_databasedetectives.session WHERE sessionId=?',
                [sessionID],
                function (err, result) {
                    if (err) {
                        throw new Error('Session was not found.');
                    } else {
                        return result;
                    }
                }
            );
        } catch (err) {
            throw new Error('Session was not found.');
        }
        return null;
    }

    /**
     * @author Madelief van Slooten
     * Starts a session in the database.
     * @param session Session object
     * @returns Promise<boolean> if session is started or not
     */
    public async startSession(session: SessionInterface): Promise<boolean> {
        let sessionStarted: boolean = false;

        try {
            this.database.pool?.query(
                'INSERT INTO sql_sdg_databasedetectives.session (sessionId, userId, expiry) VALUES (?,?,?)',
                [session.sessionID, session.userID, session.expiry],
                function (err, _result) {
                    err ? console.log(err) : (sessionStarted = true);
                }
            );
        } catch (err) {
            throw new Error('Session was not started.');
        }
        return sessionStarted;
    }

    /**
     * @author Madelief van Slooten
     * Deletes a session.
     * @param sessionID
     * @returns Promise<boolean> if session is deleted or not
     */
    public async deleteSession(sessionID: string): Promise<boolean> {
        let sessionDeleted: boolean = false;
        try {
            this.database.pool?.query(
                'DELETE FROM sql_sdg_databasedetectives.session WHERE sessionId=?',
                [sessionID],
                function (err, _result) {
                    err ? console.log(err) : (sessionDeleted = true);
                }
            );
        } catch (error: unknown) {
            throw new Error('Session was not deleted.');
        }
        return sessionDeleted;
    }
}

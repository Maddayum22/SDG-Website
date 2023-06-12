/**
 * @author Sven Molenaar
 */
import { SessionInterface } from '../../business/models/sessions';
export interface SessionRepositoryInterface {
    findSession(sessionID: string): Promise<SessionInterface | null>;
    startSession(session: SessionInterface): Promise<boolean>;
    deleteSession(sessionID: string): Promise<boolean>;
}

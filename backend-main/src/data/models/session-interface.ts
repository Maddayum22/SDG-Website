/**
 * @author Sven Molenaar
 */
import { Sessions } from "./sessions";
import { User } from "./users";
export interface SessionRepositoryInterface {
  findSession(sessionID: string): Promise<Sessions | null>;
  startSession(user: User, sessionID: string): Promise<boolean>;
  deleteSession(sessionID: string): Promise<boolean>;
}

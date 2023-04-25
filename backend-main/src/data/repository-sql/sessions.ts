import { SessionRepositoryInterface } from "../models/session-interface";
import { User } from "../models/users";
import { Sessions } from "../models/sessions";

export class SQLSessionRepository implements SessionRepositoryInterface {
  public constructor() {}
  public async findSession(sessionID: string): Promise<Sessions> {
    //   "SELECT * FROM sdgdetectives.sessions where sessionID=$(sessionID)"

    return {
      id: 4,
      sessionID: "test",
      expiry: new Date(),
      userID: 1,
    } as Sessions;
  }

  public async startSession(user: User, sessionID: string): Promise<boolean> {
    let sessionStarted: boolean = false;
    //   "Insert into sdg_detectives.sessions(sessionID,userID,expiry,createdAt,updatedAt) values(?,?,?,?,?)"
    //   [sessionID,User.id,WEEK_IN_SECONDS, new Date(), new Date(),]
    return sessionStarted;
  }

  public async deleteSession(sessionID: string): Promise<boolean> {
    let sessionDeleted: boolean = false;
    //   "DELETE FROM sdgdetectives.sessions where sessionID=$(sessionID)"
    return sessionDeleted;
  }
}

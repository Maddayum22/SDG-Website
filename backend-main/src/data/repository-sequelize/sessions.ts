import { SessionRepositoryInterface } from "../models/session-interface";
import { Sessions } from "../models/sessions";
import { User } from "../models/users";

export class SessionRepository implements SessionRepositoryInterface {
  public constructor() {}

  /**
   *  @author Madelief van Slooten
   * Checks if session is already in database.
   * @param sessionID sessionID pulled out of cookie of user.
   * @returns Promise<Sessions | null> If session exsists it gets sent back, if not, null is returned.
   */
  public async findSession(sessionID: string): Promise<Sessions | null> {
    try {
      return await Sessions.findOne({ where: { sessionID: sessionID } });
    } catch (error: unknown) {
      return null;
    }
  }

  /**
   *  @author Madelief van Slooten
   * Starts and stores a session in the database
   * @param User User object that logged in.
   * @param sessionID string of sessionID created when user logged in.
   * @returns boolean if session is created or not.
   */
  public async startSession(User: User, sessionID: string): Promise<boolean> {
    let sessionStarted: boolean = false;
    let now = new Date();
    const WEEK_IN_SECONDS: Date = new Date(
      now.getTime() + 7 * 24 * 60 * 60 * 1000
    );

    try {
      await Sessions.create({
        sessionID: sessionID,
        userID: User.id,
        expiry: WEEK_IN_SECONDS,
      });
      sessionStarted = true;
    } catch (error: unknown) {
      console.log(error);
    }
    return sessionStarted;
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

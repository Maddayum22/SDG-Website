import crypto from "crypto";
import { User } from "../data/models/users";
import { SessionRepositoryInterface } from "../data/models/session-interface";
import { SessionBusiness } from "../business/models/sessions";
import { response } from "express";

export class SessionService {
  public constructor(private sessionRepository: SessionRepositoryInterface) {}

  /**
   *  @author Madelief van Slooten
   * Generates a session id.
   * @returns random string
   */
  public generateSessionId(): string {
    return crypto.randomBytes(16).toString("hex");
  }

  /**
   *  @author Madelief van Slooten
   * Checks if session is found in repository layer and returns userid or 0.
   * @param sessionID Sessionid that gets taken out of cookie from user.
   * @returns Promise<number> Returns the userID number of a 0 if no user is found.
   */
  public async checkSession(sessionID: string): Promise<number> {
    let returnValue: SessionBusiness.Sessions | null =
      await this.sessionRepository.findSession(sessionID);
    let now: Date = new Date();

    if (returnValue !== null && returnValue?.expiry > now) {
      return returnValue.userID;
    } else {
      await this.sessionRepository.deleteSession(sessionID);
      return 0;
    }
  }

  /**
   * @author Madelief van Slooten
   * Starts and saves a session.
   * @param User User object to start session with.
   * @param sessionID SessionID that is randomly generated with login.
   * @returns Promise<boolean> if session is started or not.
   */
  public async startSession(User: User) {
    let startSessionSucces: boolean = false;
    let sessionID: string = this.generateSessionId();
    let sessionInfo = {
      succesStatus: startSessionSucces,
      sessionID: sessionID,
    };
    console.log(sessionInfo.sessionID);
    try {
      await this.sessionRepository.startSession(User, sessionID);
      startSessionSucces = true;
    } catch (error) {
      response.status(400).json("Something went wrong, session not started.");
    }

    return sessionInfo;
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

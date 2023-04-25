/** @author Madelief van Slooten */

import { SessionService } from "../services/sessions";
import { Request, Response } from "express";

export class SessionController {
  public constructor(private sessionService: SessionService) {}

  /**
   * Checks if a session already excists, if not, makes sure startSession is called.
   * @param request Request
   * @param response Response
   */
  public async checkSession(
    request: Request,
    response: Response
  ): Promise<void> {
    let requestSessionId: string = request.cookies.SessionID!;
    let responseValue: number = await this.sessionService.checkSession(
      requestSessionId
    );

    if (responseValue > 0 && requestSessionId !== undefined) {
      response.status(200).json(responseValue);
    } else if (responseValue === 0) {
      response.status(204).json("No session active");
    } else {
      response.status(400).end();
    }
  }

  public async deleteSession(
    request: Request,
    response: Response
  ): Promise<void | boolean> {
    let sessionID = request.cookies.SessionID;
    let deleteSession: boolean = await this.sessionService.deleteSession(
      sessionID
    );
    if (deleteSession) {
      response.clearCookie("SessionID");
      response.status(200).json("Succes");
    } else {
      response.status(401).json("Error");
    }
  }
}

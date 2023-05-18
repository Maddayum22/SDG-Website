/** @author Madelief van Slooten */

import { SessionService } from '../services/sessions';
import { Request, Response } from 'express';

export class SessionController {
    public constructor(private sessionService: SessionService) {}

    /**
     * @author Madelief van Slooten
     * Checks if a session already excists, if not, makes sure startSession is called.
     * @param request Request
     * @param response Response
     */
    public async checkSession(request: Request, response: Response): Promise<void> {
        try {
            let responseValue: number = await this.sessionService.checkSession(request.cookies.SessionID!);
            responseValue !== 0 && request.cookies.SessionID! !== undefined
                ? response.status(200).json(responseValue)
                : response.status(204).json('No session active');
        } catch (err) {
            response.status(500).json('Something went wrong.');
        }
    }

    /**
     * @author Madelief van Slooten
     * Deletes a session by given session ID
     * @param request Request
     * @param response Response
     */
    public async deleteSession(request: Request, response: Response): Promise<void | boolean> {
        let deleteSession: boolean = await this.sessionService.deleteSession(request.cookies.SessionID);
        deleteSession
            ? response.clearCookie('SessionID').status(200).json('Succes')
            : response.status(500).json('Something went wrong.');
    }
}

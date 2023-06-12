import { SessionService } from '../services/sessions';
import { Request, Response } from 'express';

export class SessionController {
    /**
     * @author Madelief van Slooten
     * Controller class that handles session-related requests using the SessionService class.
     * @param sessionService The service class for sessions.
     */
    public constructor(private sessionService: SessionService) {}

    /**
     * @author Madelief van Slooten
     * Checks if a session already excists, if not, calls startSession.
     * @param request Request
     * @param response Response
     */
    public async checkSession(request: Request, response: Response): Promise<void> {
        let sessionExcists: number = 0;
        try {
            if (request.cookies.SessionID! !== undefined) {
                sessionExcists = await this.sessionService.checkSession(request.cookies.SessionID!);
            }
            if (sessionExcists !== 0 && request.cookies.SessionID! !== undefined) {
                response.status(200).json(sessionExcists);
            } else {
                response.status(204).json('No session found');
            }
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
        if (deleteSession) {
            response.clearCookie('SessionID').status(200).json('Succes');
        } else {
            response.status(500).json('Something went wrong.');
        }
    }
}

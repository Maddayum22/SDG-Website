/** @author Madelief van Slooten */ // Only the base of the controller.
/** @author Sven Molenaar */ //authenticate function
import { Request, Response } from 'express';
import { UserService } from '../services/users';
import { UserInterface } from '../business/models/users';

export class UserController {
    public constructor(private userService: UserService) { }

    public async getUser(request: Request, response: Response): Promise<void> { }

    public async getUserById(request: Request, response: Response): Promise<void> {
        const userId: number = parseInt(request.params.id);
        const user: UserInterface | null = await this.userService.getUserById(userId);

        if (user === null) {
            response.status(400).json('User not found');
        } else {
            response.status(200).json(user);
        }
    }

    /**
     * @author Rowen Zaal
     * @param request is an object of the register input.
     * @param response is either a succes or error message depending on if the other layers encounter any issues.
     */
    public async addUser(request: Request, response: Response): Promise<void> {
        /** @author Rowen Zaal */ // Registers an user in the database.
        const validResponse: boolean = await this.userService.addUser(request.body);
        if (validResponse === true) {
            response.status(200).json('Succesfully added user data');
        } else {
            response.status(400).json('Invalid user data');
        }
    }

    /**
     * @author Sven Molenaar
     * Authenticates a user based on their email and password.
     * @param request The request object containing the user's email and password.
     * @param response The response object to send the authentication result and session ID.
     * @returns The response containing the user's session ID if authentication is successful, or an error message if not.
     */
    public async authenticateUser(request: Request, response: Response): Promise<void> {
        const userInputPassword: string = request.body.password;
        const userInputEmail: string = request.body.emailAdress;
        const sessionID = await this.userService.authenticateUser(userInputEmail, userInputPassword);
        if (sessionID === null) {
            response.status(400).json('Wrong email or password');
        } else {
            response
                .cookie('SessionID', sessionID, {
                    maxAge: 604800000,
                    httpOnly: true,
                })
                .status(200)
                .json(sessionID);
        }
    }

    /**
     * @author Rowen Zaal
     * @param request contains an id of the user in the params.
     * @param response the usertype of an user if user exists, or an error message if not.
     */
    public async getUserType(request: Request, response: Response): Promise<void> {
        /** @author Rowen Zaal */ // Requests usertype of the user.
        const userId: number = parseInt(request.params.id);
        const userType = await this.userService.getUserType(userId);
        if (userType !== null) {
            response.status(200).json(userType);
        } else {
            response.status(404).json('Not found');
        }
    }

    public async updateUser(request: Request, response: Response): Promise<void> {
        try {
            let userId: number = parseInt(request.params.id);
            const user = await this.userService.updateUser(userId, request.body);
            if (user) {
                response.status(200).json('Successfully updated');
            } else {
                response.status(400).json('Bad request');
            }
        } catch (error) {
            response.status(500).json("Server error")
        }
    }
}

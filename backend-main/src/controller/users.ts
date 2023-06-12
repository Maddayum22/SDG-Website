/** @author Madelief van Slooten */ // Only the base of the controller.
/** @author Sven Molenaar */ //authenticate function
import { Request, Response } from 'express';
import { UserService } from '../services/users';
import { User } from '../data/models/users';

export class UserController {
    public constructor(private userService: UserService) {}

    public async getUser(request: Request, response: Response): Promise<void> {}

    public async getUserById(request: Request, response: Response): Promise<void> {
        const userId: number = parseInt(request.params.id);
        const user: User | null = await this.userService.getUserById(userId);

        if (user === null) {
            response.status(400).json('User not found');
        } else {
            response.status(200).json(user);
        }
    }

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
     * @param request The request object containing the user's email and password.
     * @param response The response object to send the authentication result and session ID.
     * @returns The response containing the users sessionID if authentication is successful, or an error message if not.
     */
    public async authenticateUser(request: Request, response: Response) {
        const userInputPassword: string = request.body.password;
        const userInputEmail: string = request.body.emailAdress;
        const sessionID = await this.userService.authenticateUser(userInputEmail, userInputPassword);
        if (sessionID === null) {
            return response.status(400).json('wrong email or password');
        }
        response
            .cookie('SessionID', sessionID, {
                maxAge: 604800000,
                httpOnly: true,
            })
            .status(200)
            .json(sessionID);
    }

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
        /** @author William Nguyen */
        const userId: number = parseInt(request.params.id);
        const { username, firstName, lastName, emailAdress, password, areaOfExpertise, age, education } = request.body;
        try {
            const user: User | null = await this.userService.getUserById(userId);
            if (!user) {
                response.status(404).json({ message: 'Not found' });
                return;
            }
            const updatedUser = {
                ...user,
                username: username || user.username,
                firstName: firstName || user.firstName,
                lastName: lastName || user.lastName,
                emailAdress: emailAdress || user.emailAdress,
                password: password || user.password,
                areaOfExpertise: areaOfExpertise || user.areaOfExpertise,
                age: age || user.age,
                education: education || user.education,
            };
            await User.update(updatedUser, { where: { id: userId } });

            response.status(200).json({ message: 'Successfully updated' });
        } catch (error) {
            response.status(500).json({ message: 'Server error' });
        }
    }
}

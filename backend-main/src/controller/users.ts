/** @author Madelief van Slooten */ // Only the base of the controller.
import { Request, Response } from "express";
import { UserService } from "../services/users";
import { SessionService } from "../services/sessions";

export class UserController {
  public constructor(
    private userService: UserService,
    private sessionService: SessionService
  ) {}

  public async getUsers(_request: Request, response: Response): Promise<void> {}

  public async getUserById(
    request: Request,
    response: Response
  ): Promise<void> {}

  public async addUser(request: Request, response: Response): Promise<void> {
    /** @author Rowen Zaal */ // Registers an user in the database.
    const validResponse: boolean = await this.userService.addUser(request.body);
    if (validResponse === true) {
      response.status(200).json("Succesfully added user data");
    } else {
      response.status(400).json("Invalid user data");
    }
  }

  public async updateUser(
    request: Request,
    response: Response
  ): Promise<void> {}

  public async authenticateUser(request: Request, response: Response) {
    let userInputPassword: string = request.body.password;
    let userInputEmail: string = request.body.emailAdress;

    //sends a
    let user = await this.userService.getUserByEmail(userInputEmail);
    if (user === null) {
      response.status(400).json("wrong email or password");
    } else {
      let DbEmail = user.emailAdress;
      let DbPassword = user.password;
      //compares input data to database data
      let responseAnswer = await this.userService.authenticateUser(
        userInputEmail,
        userInputPassword,
        DbEmail,
        DbPassword
      );

      if (!responseAnswer) {
        response.status(400).json("wrong email or password");
      } else {
        let startSession: {
          succesStatus: boolean;
          sessionID: string;
        } = await this.sessionService.startSession(user);
        response
          .cookie("SessionID", startSession!.sessionID, {
            maxAge: 604800000,
            httpOnly: true,
          })
          .status(200)
          .json(user);
      }
    }
  }

  public async getUserType(
    request: Request,
    response: Response
  ): Promise<void> {
    const usertype = "student";
    response.status(200).json(usertype);
  }
}

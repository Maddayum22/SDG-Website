import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { User } from "./data/models/users";

import loadRoutes from "./routing/helpers/load_routes";
import { Database } from "./util/database";
import { Sessions } from "./data/models/sessions";
import { Post } from "./data/models/posts";
import { PostController } from "./controller/posts";
import { PostRepository } from "./data/repository-sequelize/posts";
import { PostService } from "./services/posts";
import { UserRepository } from "./data/repository-sequelize/users";
import { UserService } from "./services/users";
import { UserController } from "./controller/users";
import { SessionRepository } from "./data/repository-sequelize/sessions";
import { SessionController } from "./controller/sessions";
import { SessionService } from "./services/sessions";
import { SQLUserRepository } from "./data/repository-sql/users";
import { SQLPostRepository } from "./data/repository-sql/posts";
import { UserRepositoryInterface } from "./data/models/user-interface";
import { PostRepositoryInterface } from "./data/models/post-interface";
import { SessionRepositoryInterface } from "./data/models/session-interface";
import { SQLSessionRepository } from "./data/repository-sql/sessions";

/**
 * @author Madelief van Slooten
 * Server class - changes server configuration, depending on the .env type
 */
export class Server {
  private static instance: Server | null = null;
  private app: express.Express;
  public database: Database;

  public userController: UserController;
  private userService: UserService;
  private userRepository: UserRepositoryInterface;
  public postController: PostController;
  private postService: PostService;
  private postRepository: PostRepositoryInterface;
  public sessionController: SessionController;
  private sessionService: SessionService;
  private sessionRepository: SessionRepositoryInterface;

  private port = 3000;

  private constructor() {
    this.database = new Database(process.env.DB_TYPE!);
    this.app = express();
    this.configuration();

    if (process.env.DB_TYPE === "sql") {
      this.userRepository = new SQLUserRepository();
      this.postRepository = new SQLPostRepository(this.database);
      this.sessionRepository = new SQLSessionRepository();
    } else {
      this.userRepository = new UserRepository();
      this.postRepository = new PostRepository();
      this.sessionRepository = new SessionRepository();
    }
    this.sessionService = new SessionService(this.sessionRepository);
    this.sessionController = new SessionController(this.sessionService);

    this.userService = new UserService(this.userRepository);
    this.userController = new UserController(
      this.userService,
      this.sessionService
    );

    this.postService = new PostService(this.postRepository);
    this.postController = new PostController(this.postService);
  }

  public static getInstance(): Server {
    if (Server.instance === null) {
      Server.instance = new Server();
    }
    return Server.instance;
  }

  /**
   * @author Madelief van Slooten
   * Server configuration
   */
  private configuration() {
    this.setHeaders();
    this.parseOptions();
    this.setRoutes();
  }

  /**
   * @author Madelief van Slooten
   * Server headers
   */
  private setHeaders() {
    this.app.use(function (_request: Request, response: Response, next) {
      response.setHeader(
        "Access-Control-Allow-Origin",
        "http://localhost:4200"
      );
      response.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );
      response.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
      );
      response.setHeader("Access-Control-Allow-Credentials", "true");
      next();
    });
  }

  /**
   * @author Madelief van Slooten
   * Parsing options
   */
  private parseOptions() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  /**
   * @author Madelief van Slooten
   * Loads the routes that sit in their own files for organization.
   */
  private setRoutes() {
    loadRoutes(this.app);
  }

  /**
   * @author Madelief van Slooten
   * Server configuration to start a sequelize server. This loads the correct models for sequelize.
   */
  public sequelizeConfig() {
    this.database.sequelize!.addModels([User, Sessions, Post]);

    this.database
      .sequelize! //{ force: true }
      .sync()
      .then((_result: any) => {
        this.app.listen(this.port, (): void => {
          console.log(`Connected successfully on port ${this.port}`);
        });
      })
      .catch((error: any) => {
        console.error(`Error occured: ${error.message}`);
      });
  }

  /**
   * @author Madelief van Slooten
   * Server configuration to start a simple server that uses a mysql database configuration.
   */
  public sqlConfig() {
    this.app.listen(this.port, () =>
      console.log(`Connected successfully on port ${this.port}`)
    );
  }
}

/**
 * @author Madelief van Slooten
 * Main function to initialize the Server class and makes sure the right server gets started, depending  on the .env DB_TYPE.
 */
function main() {
  const server = Server.getInstance();
  if (process.env.DB_TYPE === "sql") {
    server.sqlConfig();
  } else {
    server.sequelizeConfig();
  }
}

main();

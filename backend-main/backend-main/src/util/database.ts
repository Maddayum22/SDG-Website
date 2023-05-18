import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
import { Dialect } from "sequelize";
import * as mysql2 from "mysql2";
import { Pool } from "mysql2";
dotenv.config();

/**
 * @author Madelief van Slooten
 * Database class that changes database configuration, depending on the .env type
 */
export class Database {
  public pool: Pool | undefined;
  public sequelize: Sequelize | undefined;

  private DB_NAME: string = process.env.DB_NAME!;
  private DB_USER: string = process.env.DB_USER!;
  private DB_PASSWORD: string = process.env.DB_PASSWORD!;
  private DB_DIALECT: Dialect = process.env.DB_DIALECT! as Dialect;

  private SQL_DB_NAME: string = process.env.SQL_DB_NAME!;
  private SQL_DB_USER: string = process.env.SQL_DB_USER!;
  private SQL_DB_PASSWORD: string = process.env.SQL_DB_PASSWORD!;

  public constructor(databaseType: string) {
    if (databaseType === "sql") {
      this.pool = mysql2.createPool(this.sqlConfig());
    } else {
      this.sequelize = new Sequelize(this.sequelizeConfig());
    }
  }

  private sqlConfig() {
    return {
      host: "localhost",
      user: this.SQL_DB_USER,
      password: this.SQL_DB_PASSWORD,
      database: this.SQL_DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    };
  }

  private sequelizeConfig() {
    return {
      database: this.DB_NAME,
      dialect: this.DB_DIALECT as Dialect,
      username: this.DB_USER,
      password: this.DB_PASSWORD,
      storage: ":memory:",
      host: "localhost",
      models: [__dirname + "/models"],
    };
  }
}

/** @author Madelief van Slooten */
import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  HasMany,
} from "sequelize-typescript";
import { Post } from "./posts";

@Table
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER.UNSIGNED)
  id?: number;

  @AllowNull(false)
  @Column(DataType.STRING(25))
  username!: string;

  @AllowNull(true)
  @Column(DataType.STRING(255))
  firstName?: string;

  @AllowNull(true)
  @Column(DataType.STRING(45))
  preposition?: string;

  @AllowNull(true)
  @Column(DataType.STRING(255))
  lastName?: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  password!: string;

  @AllowNull(false)
  @Column(DataType.STRING(500))
  emailAdress!: string;

  @AllowNull(false)
  @Column(
    DataType.ENUM(
      "Applied Social Sciences and Law",
      "Business and Economics",
      "Digital Media and Creative Industries",
      "Education",
      "Health",
      "Sports and Nutrition",
      "Technology"
    )
  )
  areaOfExpertise!:
    | "Applied Social Sciences and Law"
    | "Business and Economics"
    | "Digital Media and Creative Industries"
    | "Education"
    | "Health"
    | "Sports and Nutrition"
    | "Technology";

  @AllowNull(false)
  @Column(DataType.ENUM("student", "teacher", "admin"))
  userType!: "student" | "teacher" | "admin";

  @HasMany(() => Post)
  posts?: Post[];
}

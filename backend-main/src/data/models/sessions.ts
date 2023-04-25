/** @author Madelief van Slooten */

import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table
export class Sessions extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER.UNSIGNED)
  id?: number;

  @AllowNull(false)
  @Column(DataType.STRING(32))
  sessionID!: string;

  @AllowNull(false)
  @Column(DataType.INTEGER.UNSIGNED)
  userID!: number;

  @AllowNull(false)
  @Column(DataType.DATE)
  expiry!: Date;
}

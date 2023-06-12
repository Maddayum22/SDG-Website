/** @author Madelief van Slooten */

import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import { User } from './users';

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
    @Column(DataType.DATE)
    expiry!: Date;

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column(DataType.INTEGER.UNSIGNED)
    userID!: number;

    @BelongsTo(() => User)
    user!: User;
}

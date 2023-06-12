/** @author Madelief van Slooten */
import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { User } from './users';
import { AreaOfExpertise } from './types';

@Table
export class Post extends Model {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER.UNSIGNED)
    id?: number;

    @AllowNull(false)
    @Column(DataType.INTEGER.UNSIGNED)
    @ForeignKey(() => User)
    userId!: number;

    @AllowNull(false)
    @Column(DataType.STRING(100))
    title!: string;

    @AllowNull(false)
    @Column(DataType.STRING(300))
    description!: string;

    @AllowNull(true)
    @Column(DataType.BLOB)
    image?: string;

    @AllowNull(false)
    @Column(DataType.INTEGER.UNSIGNED)
    sdgId!: number;

    @AllowNull(false)
    @Column(
        DataType.ENUM(
            'Applied Social Sciences and Law',
            'Business and Economics',
            'Digital Media and Creative Industries',
            'Education',
            'Health',
            'Sports and Nutrition',
            'Technology'
        )
    )
    areaOfExpertise!: AreaOfExpertise;

    @BelongsTo(() => User)
    user?: User;
}

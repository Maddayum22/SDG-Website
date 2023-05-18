/** @author Madelief van Slooten */
import { AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Post } from './posts';
import { Sessions } from './sessions';
import { AreaOfExpertise, UserType } from './types';

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

    @AllowNull(false)
    @Column(DataType.ENUM('student', 'teacher', 'admin'))
    userType!: UserType;

    @AllowNull(true)
    @Column(DataType.STRING(100))
    education?: string;

    @AllowNull(true)
    @Column(DataType.INTEGER)
    age?: number;

    @HasMany(() => Sessions)
    sessions!: Sessions[];

    @HasMany(() => Post)
    posts?: Post[];
}

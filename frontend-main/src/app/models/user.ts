import {Expertises} from "./expertises";
import {UserType} from "./usertype";

export interface User {
    id?: number;
    username: string;
    firstName?: string;
    preposition?: string;
    lastName?: string;
    oldPassword?: string;
    newPassword?: string;
    repeatNewPassword?: string;
    emailAdress: string;
    areaOfExpertise: Expertises;
    userType?: UserType;
    education?: string;
    age?: number;
}


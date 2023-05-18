import * as argon2 from 'argon2';
import { AreaOfExpertise, UserType } from '../../data/models/types';

/** @author Rowen Zaal */
export interface UserInterface {
    id?: number;
    username: string;
    firstName?: string;
    preposition?: string;
    lastName?: string;
    password: string;
    emailAdress: string;
    areaOfExpertise: AreaOfExpertise;

    userType: UserType;
    createdAt?: string;
    updatedAt?: string;
}

export namespace UserBusiness {
    export class User implements UserInterface {
        username!: string;
        password!: string;
        emailAdress!: string;
        areaOfExpertise!: AreaOfExpertise;

        userType!: UserType;

        /**
         * @author Rowen Zaal
         * This function checks for special characters in a string.
         * @param string is the data from the user object.
         * @returns a promise with a boolean: true/false
         */
        public async isValid(user: UserInterface): Promise<boolean> {
            user.userType = UserType.Student;
            if (
                this.containsSpecialChars(user.username) ||
                this.containsEmptyString(user.username) ||
                this.hasWhiteSpace(user.username) ||
                this.hasPasswordLength(user.password) ||
                !this.containsSpecialChars(user.password) ||
                this.hasWhiteSpace(user.password) ||
                !this.validateEmail(user.emailAdress) ||
                !this.validExpertise(user.areaOfExpertise)
            ) {
                return false;
            }
            return true;
        }

        /**
         * @author Rowen Zaal
         * This function checks for special characters in a string.
         * @param string is the data from the user object.
         * @returns a boolean: true/false
         */
        private containsSpecialChars(string: string): boolean {
            const specialChars = /[`!@#$%^&*()+=\[\]{};':"\\|,.<>\/?~]/;
            return specialChars.test(string);
        }

        /**
         * @author Rowen Zaal
         * This function checks if the email string is filled in correctly.
         * @param string is the data from the user object.
         * @returns a boolean: true/false
         */
        private validateEmail(string: string): boolean {
            const emailString = /^[A-Z0-9+_-]+(?:[A-Z0-9+_.-]+)@[A-Z0-9-]+\.(?:[A-Z0-9\.-]+)$/gim;
            return emailString.test(string);
        }

        /**
         * @author Rowen Zaal
         * This function checks if the length of the string has 8 or more characters.
         * @param string is the data from the user object.
         * @returns a boolean: true/false
         */
        private hasPasswordLength(string: string): boolean {
            return string.length >= 8 ? false : true;
        }

        /**
         * @author Rowen Zaal
         * This function checks if the string is empty by checking the length.
         * @param string is the data from the user object.
         * @returns a boolean: true/false
         */
        private containsEmptyString(string: string): boolean {
            return string.length === 0 ? true : false;
        }

        /**
         * @author Rowen Zaal
         * This function checks if string has a whitespace.
         * @param string is the data from the user object.
         * @returns a boolean: true/false
         */
        private hasWhiteSpace(string: string): boolean {
            return /\s/g.test(string);
        }

        /**
         * @author Rowen Zaal & Madelief van Slooten
         * This function checks if the area of expertise exists by comparing the enum to the string.
         * @param string is the data from the user object.
         * @returns a boolean: true/false
         */
        private validExpertise(string: string): boolean {
            enum expertises {
                A = AreaOfExpertise.AppliedSocialSciencesAndLaw,
                B = AreaOfExpertise.BusinessAndEconomics,
                C = AreaOfExpertise.DigitalMediaAndCreativeIndustries,
                D = AreaOfExpertise.Education,
                E = AreaOfExpertise.Health,
                F = AreaOfExpertise.SportsAndNutrition,
                G = AreaOfExpertise.Technology,
            }
            const options = Object.values(expertises);
            for (const option of options) {
                if (option === string) {
                    return true;
                }
            }
            return false;
        }

        /**
         * @author Sven Molenaar
         * An function which verifies the input password against the password in the database connected to that user,
         * @param inputPassword an string which contains the password inputted by the user on login
         * @returns an boolean, true if the passwords match, false if they dont.
         */
        public async verifyPassword(inputPassword: string) {
            const isVerified = await argon2.verify(this.password, inputPassword);
            return isVerified;
        }
    }
}

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
    education?: string;
    age?: number;
    createdAt?: string;
    updatedAt?: string;
}

export namespace UserBusiness {
    export class User implements UserInterface {
        id?: number;
        username!: string;
        firstName?: string;
        lastName?: string;
        password!: string;
        emailAdress!: string;
        areaOfExpertise!: AreaOfExpertise;
        userType!: UserType;
        education?: string;
        age?: number;

        /**
         * @author Rowen Zaal
         * This is the constructor of the UserInterface, used for the register and authenticate functions.
         * @param inputUser is the register input of the user.
         */
        public constructor(inputUser: UserInterface) {
            (this.username = inputUser.username),
                (this.firstName = inputUser.firstName),
                (this.lastName = inputUser.lastName),
                (this.password = inputUser.password),
                (this.emailAdress = inputUser.emailAdress),
                (this.areaOfExpertise = inputUser.areaOfExpertise),
                (this.education = inputUser.education);
        }

        /**
         * @author Rowen Zaal
         * This function checks if the user input is valid.
         * @returns a promise with a boolean: true/false
         */
        public async isValid(): Promise<boolean> {
            if (
                this.containsSpecialChars(this.username) ||
                this.containsEmptyString(this.username) ||
                this.hasWhiteSpace(this.username) ||
                this.hasPasswordLength(this.password) ||
                !this.containsSpecialChars(this.password) ||
                this.hasWhiteSpace(this.password) ||
                !this.validateEmail(this.emailAdress) ||
                !this.validExpertise(this.areaOfExpertise)
            ) {
                return false;
            }
            return true;
        }

        /**
         * @author Rowen Zaal
         * This function checks for special characters in a string.
         * @param string is the data from the user object.
         * @returns a boolean: true/false or null when string doesn't match.
         */
        private containsSpecialChars(string: string): boolean | null {
            if (string == this.username || this.firstName || this.lastName || this.emailAdress || this.education) {
                const specialChars = /[`!@#$%^&*()+=\[\]{};':"\\|,.<>\/?~]/;
                return specialChars.test(string);
            } else if (string == this.password) {
                const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
                return specialChars.test(string);
            }
            return null;
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
         * Verifies the input password against the password stored in the user's database record.
         * @param inputPassword The password inputted by the user during login.
         * @returns A boolean value indicating whether the passwords match (true) or not (false).
         */
        public async verifyPassword(inputPassword: string): Promise<boolean> {
            const isVerified = await argon2.verify(this.password, inputPassword);
            return isVerified;
        }

        /**
         * @author William Nguyen
         * Function that validates the user details that have been sent 
         * @returns a boolean. Returns false if user details are invalid, returns true if they are valid
         */

        public async isValidUpdate(): Promise<boolean> {
            if (this.hasEmptyFields()) {
                return false
            }
            if (
                (this.username && (this.isInvalidUsername())) ||
                (this.emailAdress && (this.isInvalidEmail())) ||
                (this.areaOfExpertise && (this.isInvalidExpertise())) ||
                (this.firstName && (this.isInvalidFirstName())) ||
                (this.lastName && (this.isInvalidLastName())) ||
                (this.education && (this.isInvalidEducation()))
            ) {
                return false;
            }
            return true;
        }

        /**
         * @author William Nguyen
         * functions that check if Username is invalid
         * @returns a boolean. If Username is invalid returns true, if valid returns false.
         */

        private hasEmptyFields(): boolean {
            return (this.username === '') ||
                (this.emailAdress === '') ||
                (this.firstName === '') ||
                (this.lastName === '') ||
                (this.education === '');
        }

        private isInvalidUsername(): boolean {
            if (this.hasWhiteSpace(this.username)) {
                return true;
            }
            return false;
        }

        /**
        * @author William Nguyen
        * functions that check if Email is invalid
        * @returns a boolean. If Email is invalid returns true, if valid returns false.
        */
        private isInvalidEmail(): boolean {
            if (this.emailAdress && (!this.validateEmail(this.emailAdress))) {
                return true;
            }
            return false;
        }

        /**
        * @author William Nguyen
        * functions that check if Area of Expertise is invalid
        * @returns a boolean. If Area of Expertise is invalid returns true, if valid returns false.
        */
        private isInvalidExpertise(): boolean {
            if (this.areaOfExpertise && (!this.validExpertise(this.areaOfExpertise))) {
                return true;
            }
            return false;
        }

        /**
        * @author William Nguyen
        * functions that check if First Name is invalid
        * @returns a boolean. If First Name is invalid returns true, if valid returns false.
        */
        private isInvalidFirstName(): boolean {
            if (this.firstName && (this.containsSpecialChars(this.firstName) || this.hasWhiteSpace(this.firstName))) {
                return true;
            }
            return false;
        }

        /**
        * @author William Nguyen
        * functions that check if Last Name is invalid
        * @returns a boolean. If Last Name is invalid returns true, if valid returns false.
        */
        private isInvalidLastName(): boolean {
            if (this.lastName && (this.containsSpecialChars(this.lastName) || this.hasWhiteSpace(this.lastName))) {
                return true;
            }
            return false;
        }

        /**
        * @author William Nguyen
        * functions that check if Education is invalid
        * @returns a boolean. If Education is invalid returns true, if valid returns false.
        */
        private isInvalidEducation(): boolean {
            if (this.education && (this.containsSpecialChars(this.education))) {
                return true;
            }
            return false;
        }
    }
}

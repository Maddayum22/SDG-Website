import * as argon2 from "argon2";
import {randomBytes} from "crypto";

export class Auth {
    private static instance: Auth | null = null;

    public constructor() {}

    /**
     * @description Creates a new instance of the Auth class.
     * @author Justin Plein
     * @public
     */
    public static getInstance(): Auth {
        if (Auth.instance === null) {
            Auth.instance = new Auth();
        }
        return Auth.instance;
    }

    /**
     * @description Generates a random salt string.
     * @author Justin Plein
     * @private
     */
    private generateSaltString() {
        const salt = randomBytes(16).toString('hex');

        return salt;
    }

    /**
     * @description Hashes the given password.
     * @author Justin Plein
     * @param password: string
     * @public
     */
    public async hashPassword(password: string) {
        const salt = this.generateSaltString();

        const hash = await argon2.hash(password);

        const hashWithSalt = salt + ":" + hash;

        return hashWithSalt;
    }

    /**
     * @description Verifies the given password with the given hash from the database.
     * @author Justin Plein
     * @param passwordToVerify: string
     * @param hashWithSalt: string
     * @public
     */
    public async verifyPassword(passwordToVerify: string, hashWithSalt: string) {
        const [_, hash] = hashWithSalt.split(":");

        const isVerified = await argon2.verify(hash, passwordToVerify);

        return isVerified;
    }

    /**
     * @description Verifies the given email with the given email from the database.
     * @author Justin Plein
     * @param emailToVerify: string
     * @param emailFromDatabase: string
     * @public
     */
    public async verifyEmail(emailToVerify: string, emailFromDatabase: string) {
        const emailToVerifyLowerCase: string = emailToVerify.toLowerCase();
        const emailFromDatabaseLowerCase: string = emailFromDatabase.toLowerCase();

        const emailIsEqual = emailToVerifyLowerCase === emailFromDatabaseLowerCase;

        return emailIsEqual;
    }
}

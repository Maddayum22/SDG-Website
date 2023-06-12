/** @author Madelief van Slooten */
import crypto from 'crypto';

export interface SessionInterface {
    id?: number;
    sessionID: string;
    userID: number;
    expiry: Date;
    createdAt?: string;
    updatedAt?: string;
}

export namespace SessionBusiness {
    export class Sessions implements SessionInterface {
        sessionID!: string;
        userID!: number;
        expiry!: Date;
        WEEK_IN_MILLISECONDS: number = 7 * 24 * 60 * 60 * 1000;

        /**
         * @author Madelief van Slooten
         * Creates a new session with a unique session ID and an expiry date of one week.
         * @param userId The user ID of the user that owns the session.
         */
        public constructor(userId: number) {
            this.userID = userId;
        }

        /**
         * @author Madelief van Slooten
         * Sets a randomly generated sessionID and sets an expirydate a week from now.
         */
        public setSessionInfo(): void {
            this.sessionID = this.generateSessionId();
            this.expiry = this.createExpiryDate();
        }

        /**
         * @author Madelief van Slooten
         * Generates a random session ID.
         * @returns A randomly generated session ID as a string.
         */
        private generateSessionId(): string {
            return crypto.randomBytes(16).toString('hex');
        }

        /**
         * @author Madelief van Slooten
         * Creates an expiry date one week from the current date.
         */
        private createExpiryDate(): Date {
            let now = new Date();
            return new Date(now.getTime() + this.WEEK_IN_MILLISECONDS);
        }
    }
}

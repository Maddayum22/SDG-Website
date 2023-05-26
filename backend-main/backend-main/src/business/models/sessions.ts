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
        WEEK_IN_SECONDS: number = 7 * 24 * 60 * 60 * 1000;

        public constructor(userId: number) {
            this.sessionID = this.generateSessionId();
            this.createExpiryDate();
            this.userID = userId;
        }

        /**
         * @author Madelief van Slooten
         * Generates a session id.
         * @returns random string
         */
        private generateSessionId(): string {
            return crypto.randomBytes(16).toString('hex');
        }

        /**
         * @author Madelief van Slooten
         * creates an expiry date a week from now.
         */
        private createExpiryDate(): void {
            let now = new Date();
            this.expiry = new Date(now.getTime() + this.WEEK_IN_SECONDS);
        }
    }
}

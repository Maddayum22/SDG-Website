/** @author Madelief van Slooten */

export namespace SessionBusiness {
  export class Sessions {
    id?: number;
    sessionID!: string;
    userID!: number;
    expiry!: Date;
    createdAt?:string;
    updatedAt?:string
  }
}

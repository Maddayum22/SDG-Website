/** @author Madelief van Slooten */
export namespace UserBusiness {
  export class User {
    id?: number;
    username!: string;
    firstName?: string;
    preposition?: string;
    lastName?: string;
    password!: string;
    emailAdress!: string;
    areaOfExpertise!:
      | "Applied Social Sciences and Law"
      | "Business and Economics"
      | "Digital Media and Creative Industries"
      | "Education"
      | "Health"
      | "Sports and Nutrition"
      | "Technology";

    userType!: "student" | "teacher" | "admin";
    createdAt?:string;
    updatedAt?:string
  }
}

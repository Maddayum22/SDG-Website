/** @author Madelief van Slooten */
export namespace PostBusiness {
  export class Post {
    id?: number;
    userId!: number;
    title!: string;
    description!: string;
    image?: string;
    sdgId!: number;
    areaOfExpertise!:
      | "Applied Social Sciences and Law"
      | "Business and Economics"
      | "Digital Media and Creative Industries"
      | "Education"
      | "Health"
      | "Sports and Nutrition"
      | "Technology";
      createdAt?:string;
    updatedAt?:string
  }
}

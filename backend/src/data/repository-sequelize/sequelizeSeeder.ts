/**
 * @author Sven Molenaar
 * This code fills an sequelize database when called with the seed command in terminal
 */
import { User } from "../models/users";
import { Post } from "../models/posts";
import { Database } from "../../util/database";
import { Sessions} from "../models/sessions";
import * as argon2 from "argon2";

export class Seeder {
  private database = new Database("sequelize");
  public constructor() {
    this.database.sequelize!.addModels([User, Post, Sessions]);
  }
  public async postSeeder() {
    try {
      await Post.bulkCreate([
        {
          title: "Gender equality starts with education",
          description:
            "Empowering girls with education can help break the cycle of poverty and improve gender equality. Let's work towards achieving #SDG4.",
          sdgId: 4,
          areaOfExpertise: "Education",
          userId: 1,
        },
        {
          title: "Clean water and sanitation for all",
          description:
            "Access to clean water and sanitation is a basic human right. Let's work towards achieving #SDG6 to ensure that everyone has access to these vital resources.",
          sdgId: 6,
          areaOfExpertise: "Health",
          userId: 2,
        },
        {
          title: "Reducing inequalities in our communities",
          description:
            "Let's work towards reducing inequalities within and among communities to achieve sustainable development. #SDG10",
          sdgId: 10,
          areaOfExpertise: "Business and Economics",
          userId: 3,
        },
        {
          title: "Affordable and clean energy for all",
          description:
            "Access to affordable and clean energy is key to achieving sustainable development. Let's work towards achieving #SDG7.",
          sdgId: 7,
          areaOfExpertise: "Technology",
          userId: 4,
        },
        {
          title: "Ensuring good health and well-being for all",
          description:
            "Let's work towards achieving #SDG3 to ensure that everyone has access to quality health services and promote well-being for all.",
          sdgId: 3,
          areaOfExpertise: "Health",
          userId: 1,
        },
        {
          title: "Reducing the environmental impact of our cities",
          description:
            "Let's work towards building livable, resilient, and sustainable cities to achieve #SDG11.",
          sdgId: 11,
          areaOfExpertise: "Business and Economics",
          userId: 2,
        },
        {
          title: "Reducing poverty through sustainable economic growth",
          description:
            "Let's work towards achieving #SDG8 to promote sustained, inclusive, and sustainable economic growth and reduce poverty.",
          sdgId: 8,
          areaOfExpertise: "Business and Economics",
          userId: 3,
        },
        {
          title: "Promoting responsible consumption and production",
          description:
            "Let's work towards achieving #SDG12 to promote sustainable consumption and production patterns and reduce our environmental impact.",
          sdgId: 2,
          areaOfExpertise: "Digital Media and Creative Industries",
          userId: 1,
        },
        {
          title: "Building partnerships for sustainable development",
          description:
            "Let's work together to achieve the #SDGs and create a more sustainable future for all.",
          sdgId: 17,
          areaOfExpertise: "Applied Social Sciences and Law",
          userId: 4,
        },
        {
          title: "The role of women in sustainable development",
          description:
            "Empowering women and promoting gender equality is key to achieving sustainable development. Let's work towards achieving #SDG5.",
          sdgId: 5,
          areaOfExpertise: "Applied Social Sciences and Law",
          userId: 3,
        },
      ]).then(() => console.log("Post data have been saved"));
    } catch (error: unknown) {
      console.log(error);
    }
  }

  public async userSeeder() {
    try {
      await User.bulkCreate([
        {
          username: "Admin",
          password: await argon2.hash("Admin123!"),
          emailAdress: "Admin@Test.com",
          firstName: "Matt",
          preposition: "",
          lastName: "Smith",
          areaOfExpertise: "Technology",
          userType: "admin",
          age:"29",
        },
        {
          username: "Teacher",
          password: await argon2.hash("Teacher123!"),
          emailAdress: "Teacher@Test.com",
          firstName: "Bob",
          preposition: "van",
          lastName: "Dyke",
          areaOfExpertise: "Technology",
          userType: "teacher",
          age:"45",
        },
        {
          username: "Student1",
          password: await argon2.hash("Student1!"),
          emailAdress: "Student1@Test.com",
          firstName: "John",
          preposition: "",
          lastName: "Doe",
          areaOfExpertise: "Technology",
          userType: "student",
          age:"19",
        },
        {
          username: "Student2",
          password: await argon2.hash("Student2!"),
          emailAdress: "Student2@Test.com",
          firstName: "Jane",
          preposition: "",
          lastName: "Doe",
          areaOfExpertise: "Technology",
          userType: "student",
          age:"20",
        },
      ]).then(() => console.log("Users data have been saved"));
    } catch (error: unknown) {
      console.log(error);
    }
  }
}
/**
 * runs on startup to get an new seeder and activates the userSeeder and postSeeder
 */
async function Seed() {
  const seeder = new Seeder();
  await seeder.userSeeder();
  await seeder.postSeeder();
}
Seed();

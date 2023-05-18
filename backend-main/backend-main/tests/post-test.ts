import chai, { expect } from "chai";
import { describe, it } from "mocha";
import chaiHttp = require("chai-http");
import sinon from "sinon";
import { PostBusiness } from "../src/business/models/posts";
import { PostRepository } from "../src/data/repository-sequelize/posts";
chai.use(chaiHttp);

describe("Post structure integration", () => {
  it("should return a 200 response when a post is correctly made.", (done) => {
    let postData = {
      title: "water use",
      description: "Lorem ipsum",
      sdgId: 5,
      areaOfExpertise: "Technology",
      userId: 3,
    };
    chai
      .request("http://localhost:3000")
      .post("/posts/")
      .send(postData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

// describe("PostRepository unit tests", () => {
//   const createPostStub = sinon.stub(PostRepository.prototype, "createPost");
//   const getPostsStub = sinon.stub(PostRepository.prototype, "getPosts");

//   let postData: PostBusiness.Post = {
//     title: "water use",
//     description: "Lorem ipsum",
//     sdgId: 5,
//     areaOfExpertise: "Technology",
//     userId: 3,
//   };

//   afterEach(() => {
//     createPostStub.restore();
//   });

//   it("should create a post and return true if succeeded", async () => {
//     createPostStub.resolves(true);
//     const postRepository = new PostRepository();
//     const result = await postRepository.create(postData);
//     expect(result).to.be.true;
//   });

//   it("should get all post and return a succes status", async () => {
//     //TODO: To be filled.
//   });
// });

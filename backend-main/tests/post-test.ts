import chai, { assert, expect } from "chai";
import { describe, it } from "mocha";
import * as tssinon from "ts-sinon";
import chaiHttp = require("chai-http");
import { PostBusiness } from "../src/business/models/posts";
import { PostRepository } from "../src/data/repository-sequelize/posts";
import { PostService } from "../src/services/posts";
chai.use(chaiHttp);

/**
 * @author Madelief van Slooten
 * Post repository unit tests.
 */
describe("PostRepository unit tests", () => {
  let postRepository = new PostRepository();
  let repositoryStub: tssinon.StubbedInstance<PostRepository> | null = null;

  let postData: PostBusiness.Post = {
    title: "water use",
    description: "Lorem ipsum",
    sdgId: 5,
    areaOfExpertise: "Technology",
    userId: 3,
  };

  beforeEach(() => {
    repositoryStub = tssinon.stubObject<PostRepository>(postRepository);
    repositoryStub.create.resolves(true);
    repositoryStub.findAll.resolves([postData, postData]);
  });

  afterEach(() => {});

  it("should create a post and return true if succeeded", async () => {
    const result = await repositoryStub!.create(postData);
    expect(result).to.be.true;
  });

  it("should return false if post was not created", async () => {
    repositoryStub!.create.resolves(false);
    const result = await repositoryStub!.create(postData);
    expect(result).to.be.false;
  });

  it("should get all posts", async () => {
    const result = await repositoryStub!.findAll();
    expect(result).to.deep.equal([postData, postData]);
  });

  it("should return an empty array when there are no posts", async () => {
    repositoryStub!.findAll.resolves([]);
    const result = await repositoryStub!.findAll();
    expect(result).to.deep.equal([]);
  });
});

/**
 * @author Madelief van Slooten
 * Post Service unit tests.
 */
describe("Post Service unit tests", () => {
  let postRepository = new PostRepository();
  let repositoryStub = tssinon.stubObject<PostRepository>(postRepository);
  let postService = new PostService(repositoryStub);
  let serviceStub: tssinon.StubbedInstance<PostService> | null = null;

  let postData: PostBusiness.Post = {
    title: "water use",
    description: "Lorem ipsum",
    sdgId: 5,
    areaOfExpertise: "Technology",
    userId: 3,
  };

  beforeEach(() => {
    serviceStub = tssinon.stubObject<PostService>(postService);
    serviceStub.create.resolves(true);
    serviceStub.findAll.resolves([postData, postData]);
  });

  afterEach(() => {});

  it("should check a post and return true if succeeded", async () => {
    const result = await serviceStub!.create(postData);
    expect(result).to.be.true;
  });

  it("should return false if post was not correct", async () => {
    postData.description =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ";
    serviceStub!.create.resolves(false);
    const result = await serviceStub!.create(postData);
    expect(result).to.be.false;
  });

  it("should get all posts", async () => {
    const result = await serviceStub!.findAll();
    expect(result).to.deep.equal([postData, postData]);
  });

  it("should return an empty array when there are no posts", async () => {
    postData.description = "Lorem ipsum";
    serviceStub!.findAll.resolves([]);
    const result = await serviceStub!.findAll();
    expect(result).to.deep.equal([]);
  });
});

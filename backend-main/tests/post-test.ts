import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import { PostBusiness, PostInterface } from '../src/business/models/posts';
import { PostTestHelper } from './post-test-helper';
import chaiAsPromised from 'chai-as-promised';
import { Request, Response } from 'express';
chai.use(chaiAsPromised);

/**
 * @author Madelief van Slooten
 * Tests the post business.
 */
describe('Post Business unit tests', () => {
    let postHelper = new PostTestHelper();
    let postBusiness: PostBusiness.Post;

    it('creates a Post object if the input values are valid', () => {
        postBusiness = new PostBusiness.Post(postHelper.fakePostData());
        const expectedValue = postHelper.fakePostData();

        expect(postBusiness).to.deep.equal(expectedValue);
    });

    it('does not create a Post object if the input values are not valid', () => {
        expect(() => {
            postBusiness = new PostBusiness.Post(postHelper.fakePostDataIncorrect());
        }).to.throw('Invalid post data');
    });
});

/**
 * @author Madelief van Slooten
 * Post Service unit tests.
 */
describe('Post Service integration tests', () => {
    const postHelper = new PostTestHelper();
    const postService = postHelper.getPostService();
    const postData = postHelper.fakePostData();

    it('should check and create a post using repository and return true if succeeded', async () => {
        const result: boolean = await postService!.create(postData);
        expect(result).to.be.true;
    });

    it('should throw error if post was not correct', async () => {
        await expect(postService.create(postHelper.fakePostDataIncorrect())).to.be.rejectedWith(
            Error,
            'Invalid post data'
        );
    });

    it('finds all posts using repository and returns an array of posts', async () => {
        const result: PostInterface[] = await postService!.findAll();
        expect(result).to.deep.equal([postData, postData]);
    });
});

/**
 * @author Madelief van Slooten
 * Post Controller unit tests.
 */
describe('Post Controller integration tests', () => {
    const postHelper = new PostTestHelper();
    const postController = postHelper.getPostController();

    it('should call service to create a post and return HTTP 201 if succeeded', async () => {
        const request = {} as Request;
        const response = {
            status: (statusCode: number) => ({
                json: (message: any) => {
                    expect(statusCode).to.equal(201);
                    expect(message).to.equal('Post created');
                },
            }),
        } as Response;
        await postController!.create(request, response);
    });

    it('should call service to find all posts and return HTTP 200 and posts if succeeded', async () => {
        const request = {} as Request;
        const response = {
            status: (statusCode: number) => ({
                json: (message: any) => {
                    expect(statusCode).to.equal(200);
                },
            }),
        } as Response;
        await postController!.findAll(request, response);
    });
});

/** @author Madelief van Slooten */

import { describe, it } from "mocha";
import chai, { expect } from "chai";
import sinon from "sinon";
import { SessionBusiness } from "../src/business/models/sessions";
import { SessionRepository } from "../src/data/repository-sequelize/sessions";
import { User } from "../src/data/models/users";
import { UserBusiness } from "../src/business/models/users";

describe("SessionRepository unit tests", () => {
  let now = new Date();
  const WEEK_IN_SECONDS: Date = new Date(
    now.getTime() + 7 * 24 * 60 * 60 * 1000
  );
  const createSessionStub = sinon.stub(
    SessionRepository.prototype,
    "startSession"
  );
  const findSessionStub = sinon.stub(
    SessionRepository.prototype,
    "findSession"
  );

  let sessionData: SessionBusiness.Sessions = {
    sessionID: "680f1f759444b61a16884de8280c9ccH",
    userID: 3,
    expiry: WEEK_IN_SECONDS,
  };

  let user: UserBusiness.User = {
    username: "username",
    password: "hashedPassword",
    emailAdress: "emailAdress",
    areaOfExpertise: "Technology",
    userType: "student",
  };

  afterEach(() => {
    createSessionStub.restore();
    findSessionStub.restore();
  });
  describe("create Session", () => {
    it("should create a session and return true if succeeded", async () => {
      createSessionStub.resolves(true);
      const postRepository = new SessionRepository();
      const result = await postRepository.startSession(
        user as User,
        sessionData.sessionID
      );
      expect(result).to.be.true;
    });
  });

  describe("find Session", () => {
    it("should return null if session does not exist", async () => {
      findSessionStub.resolves(null);
      const sessionRepository = new SessionRepository();
      const result = await sessionRepository.findSession(sessionData.sessionID);
      expect(result).to.be.null;
    });
  });
});

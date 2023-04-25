/** @author Madelief van Slooten */

import { describe, it } from "mocha";
import chai, { expect } from "chai";
import sinon from "sinon";
import { SessionBusiness } from "../src/business/models/sessions";
import { SessionRepository } from "../src/data/repository-sequelize/sessions";
import { User } from "../src/data/models/users";
import { UserBusiness } from "../src/business/models/users";
import * as tssinon from "ts-sinon";
import { SessionService } from "../src/services/sessions";
import { SessionController } from "../src/controller/sessions";

describe("SessionRepository unit tests", () => {
  let sessionRepository = new SessionRepository();
  let repositoryStub: tssinon.StubbedInstance<SessionRepository> | null = null;
  let sessionService = null;
  let sessionController = null;
  let serviceSpy = null;

  let now = new Date();
  const WEEK_IN_SECONDS: Date = new Date(
    now.getTime() + 7 * 24 * 60 * 60 * 1000
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

  beforeEach(() => {
    repositoryStub = tssinon.stubObject<SessionRepository>(sessionRepository);
    repositoryStub.findSession.returns(Promise.resolve(null));
    repositoryStub.startSession.returns(Promise.resolve(true));

    sessionService = new SessionService(repositoryStub);
    sessionController = new SessionController(sessionService);

    serviceSpy = tssinon.default.spy(sessionService);
  });

  afterEach(() => {});

  describe("create Session", () => {
    it("should create a session and return true if succeeded", async () => {
      const result = await repositoryStub!.startSession(
        user as User,
        sessionData.sessionID
      );
      expect(result).to.be.true;
    });
  });

  describe("find Session", () => {
    it("should return null if session does not exist", async () => {
      const result = await repositoryStub!.findSession(sessionData.sessionID);
      expect(result).to.be.null;
    });
  });
});

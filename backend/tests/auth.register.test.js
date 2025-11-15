const { json } = require("express");
const { register } = require("../controller/auth.controller.js");
const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

jest.mock("../models/user.model.js");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("Register Controller", () => {
    let req, res, next;
    beforeEach(() => {
        req = {
            body: {
                username: "testuser",
                email: "test@gmail.com",
                password: "Password1",
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            cookie: jest.fn(),
            json: jest.fn(),
        };
        next = jest.fn();
    });
    it("should register user successfully", async () => {
        User.findOne.mockResolvedValue(null);
        bcrypt.hash.mockResolvedValue("hashedpw");
        User.prototype.save = jest.fn();
        jwt.sign.mockReturnValue("testtoken");
        await register(req, res, next);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalled();
        expect(res.cookie).toHaveBeenCalled();
    });
    it("should return error if email already exists", async () => {
    User.findOne.mockResolvedValue({ email: "test@example.com" });

    await register(req, res, next);

    expect(next).toHaveBeenCalled();
  });
})

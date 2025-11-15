const { login } = require("../controller/auth.controller.js");
const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

jest.mock("../models/user.model.js");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("Login Controller", () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {
                email: "test@example.com",
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

    it("should return error if fields missing", async () => {
        req.body = { email: "", password: "" };

        await login(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it("should return error if user not found", async () => {
        User.findOne.mockResolvedValue(null);

        await login(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it("should return error if password is wrong", async () => {
        User.findOne.mockResolvedValue({ password: "hashedpw" });
        bcrypt.compare.mockResolvedValue(false);

        await login(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it("should login successfully", async () => {
        User.findOne = jest.fn().mockReturnValue({
            select: jest.fn().mockResolvedValue({
                _id: "123",
                username: "test",
                email: "test@example.com",
                password: "hashedpw"
            })
        });

        bcrypt.compare = jest.fn().mockResolvedValue(true);
        jwt.sign = jest.fn().mockReturnValue("token123");


        await login(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.cookie).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalled();
    });
});

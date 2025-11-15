const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/auth.middleware.js');
const User = require('../models/user.model.js');


jest.mock('jsonwebtoken');
jest.mock('../models/user.model.js');

describe('protect middleware', () => {
  let mockReq, mockRes, mockNext;

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  beforeEach(() => {
    mockReq = { headers: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
    jest.clearAllMocks(); 
  });

  afterAll(() => {
    console.error.mockRestore(); 
  });

  it('should verify token and call next', async () => {
    const mockDecoded = { _id: '123' };
    jwt.verify.mockReturnValue(mockDecoded);

    const mockUser = { _id: '123', name: 'Test User' };
    User.findById.mockResolvedValue(mockUser);

    mockReq.headers.authorization = 'Bearer validtoken123';

    await protect(mockReq, mockRes, mockNext);

    expect(jwt.verify).toHaveBeenCalledWith('validtoken123', process.env.JWT_SECRET);
    expect(User.findById).toHaveBeenCalledWith('123', '-password');
    expect(mockReq.user).toEqual(mockUser);
    expect(mockNext).toHaveBeenCalled();
  });

  it('should return 401 if no token provided', async () => {
    await protect(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Not authorized, no token provided'
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return 401 if token verification fails', async () => {
    jwt.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    mockReq.headers.authorization = 'Bearer invalidtoken';

    await protect(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Not authorized, token failed'
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return 401 if user not found', async () => {
    const mockDecoded = { _id: '123' };
    jwt.verify.mockReturnValue(mockDecoded);

    User.findById.mockResolvedValue(null);

    mockReq.headers.authorization = 'Bearer validtoken123';

    await protect(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Not authorized, user not found'
    });
    expect(mockNext).not.toHaveBeenCalled();
  });
});

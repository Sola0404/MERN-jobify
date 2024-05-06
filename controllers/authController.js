import { StatusCodes } from "http-status-codes";
import User from '../models/UserModel.js';
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";

export const register = async (req, res) => {
  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? 'admin' : 'user';

  // hash password
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'user created' });
};

export const login = async (req, res) => {
  // check if user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new UnauthenticatedError('invalid credentials');

  // check if password is correct
  const isPasswordCorrect = await comparePassword(req.body.password, user.password);
  if (!isPasswordCorrect) throw new UnauthenticatedError('invalid credentials');

  res.send('login route');
};
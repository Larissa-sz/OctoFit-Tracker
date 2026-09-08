import { Router } from 'express';
import User from '../models/User.js';

const usersRouter = Router();

usersRouter.get('/', async (_request, response, next) => {
  try {
    response.json(await User.find().populate('team').sort({ username: 1 }).lean());
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
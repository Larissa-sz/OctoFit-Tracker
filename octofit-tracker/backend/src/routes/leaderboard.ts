import { Router } from 'express';
import Leaderboard from '../models/Leaderboard.js';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_request, response, next) => {
  try {
    response.json(await Leaderboard.find().populate('user').sort({ rank: 1 }).lean());
  } catch (error) {
    next(error);
  }
});

export default leaderboardRouter;
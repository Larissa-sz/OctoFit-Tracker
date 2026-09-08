import { Router } from 'express';
import Workout from '../models/Workout.js';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_request, response, next) => {
  try {
    response.json(await Workout.find().sort({ title: 1 }).lean());
  } catch (error) {
    next(error);
  }
});

export default workoutsRouter;
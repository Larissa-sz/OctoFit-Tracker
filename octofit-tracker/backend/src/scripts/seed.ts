import mongoose from 'mongoose';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');
  await mongoose.connect(connectionString);

  try {
    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { username: 'maya_runner', email: 'maya@example.com', firstName: 'Maya', lastName: 'Chen' },
      { username: 'noah_lifts', email: 'noah@example.com', firstName: 'Noah', lastName: 'Williams' },
      { username: 'sofia_moves', email: 'sofia@example.com', firstName: 'Sofia', lastName: 'Patel' },
      { username: 'liam_trains', email: 'liam@example.com', firstName: 'Liam', lastName: 'Garcia' },
    ]);

    const teams = await Team.create([
      {
        name: 'Trail Blazers',
        description: 'A team focused on consistent outdoor training.',
        members: [users[0]._id, users[2]._id],
      },
      {
        name: 'Strength Squad',
        description: 'Building strength through smart, sustainable workouts.',
        members: [users[1]._id, users[3]._id],
      },
    ]);

    await User.bulkWrite([
      { updateOne: { filter: { _id: users[0]._id }, update: { team: teams[0]._id } } },
      { updateOne: { filter: { _id: users[1]._id }, update: { team: teams[1]._id } } },
      { updateOne: { filter: { _id: users[2]._id }, update: { team: teams[0]._id } } },
      { updateOne: { filter: { _id: users[3]._id }, update: { team: teams[1]._id } } },
    ]);

    await Activity.create([
      { user: users[0]._id, type: 'Running', durationMinutes: 42, distanceKm: 7.2, calories: 510, completedAt: new Date('2026-09-05T07:30:00Z') },
      { user: users[1]._id, type: 'Strength Training', durationMinutes: 55, calories: 420, completedAt: new Date('2026-09-05T18:00:00Z') },
      { user: users[2]._id, type: 'Cycling', durationMinutes: 65, distanceKm: 18.5, calories: 610, completedAt: new Date('2026-09-06T09:00:00Z') },
      { user: users[3]._id, type: 'Swimming', durationMinutes: 35, distanceKm: 1.4, calories: 330, completedAt: new Date('2026-09-06T17:30:00Z') },
      { user: users[0]._id, type: 'Yoga', durationMinutes: 30, calories: 150, completedAt: new Date('2026-09-07T06:45:00Z') },
      { user: users[2]._id, type: 'Running', durationMinutes: 28, distanceKm: 4.6, calories: 320, completedAt: new Date('2026-09-07T08:15:00Z') },
    ]);

    await Leaderboard.create([
      { user: users[0]._id, points: 1260, workoutsCompleted: 18, rank: 1 },
      { user: users[2]._id, points: 1140, workoutsCompleted: 16, rank: 2 },
      { user: users[1]._id, points: 980, workoutsCompleted: 14, rank: 3 },
      { user: users[3]._id, points: 865, workoutsCompleted: 12, rank: 4 },
    ]);

    await Workout.create([
      { title: 'Foundation Strength', description: 'A full-body strength session for building a reliable base.', category: 'Strength', difficulty: 'Beginner', durationMinutes: 30, exercises: ['Bodyweight squats', 'Incline push-ups', 'Glute bridges', 'Plank'] },
      { title: 'Tempo Run Builder', description: 'A progressive run session to improve pace and endurance.', category: 'Cardio', difficulty: 'Intermediate', durationMinutes: 40, exercises: ['Warm-up jog', 'Tempo intervals', 'Cool-down walk'] },
      { title: 'Mobility Reset', description: 'A gentle sequence to restore range of motion after training.', category: 'Mobility', difficulty: 'Beginner', durationMinutes: 20, exercises: ['Cat-cow', 'Worlds greatest stretch', '90/90 switches', 'Childs pose'] },
      { title: 'Power Circuit', description: 'A challenging circuit that combines strength and conditioning.', category: 'Conditioning', difficulty: 'Advanced', durationMinutes: 45, exercises: ['Kettlebell swings', 'Burpees', 'Reverse lunges', 'Mountain climbers'] },
    ]);

    console.log('Seed complete: 4 users, 2 teams, 6 activities, 4 leaderboard entries, and 4 workouts.');
  } finally {
    await mongoose.disconnect();
  }
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exitCode = 1;
});

import CollectionState from './CollectionState.jsx';
import useCollection from './useCollection.js';

export default function Leaderboard() {
  const { records, loading, error } = useCollection('/api/leaderboard/');
  return <section><div className="page-heading"><div><p className="eyebrow">The weekly race</p><h1>Leaderboard</h1><p>Consistency earns the top spot.</p></div><div className="stat"><strong>{records.length}</strong><span>ranked</span></div></div><CollectionState loading={loading} error={error}><div className="data-grid">{records.map((entry) => <article className="data-card rank-card" key={entry._id}><span className="rank">{entry.rank}</span><div className="card-copy"><span className="card-kicker">{entry.user?.team?.name || 'OctoFit member'}</span><h2>{entry.user?.firstName ? `${entry.user.firstName} ${entry.user.lastName}` : entry.user?.username || 'Athlete'}</h2><p>{entry.workoutsCompleted} workouts completed</p></div><span className="score">{entry.points} pts</span></article>)}</div></CollectionState></section>;
}
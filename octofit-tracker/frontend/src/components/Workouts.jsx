import CollectionState from './CollectionState.jsx';
import useCollection from './useCollection.js';

export default function Workouts() {
  const { records, loading, error } = useCollection('/api/workouts/');
  return <section><div className="page-heading"><div><p className="eyebrow">Choose your challenge</p><h1>Workouts</h1><p>Plans for every kind of training day.</p></div><div className="stat"><strong>{records.length}</strong><span>plans</span></div></div><CollectionState loading={loading} error={error}><div className="data-grid">{records.map((workout) => <article className="data-card" key={workout._id}><span className="card-kicker">{workout.category}</span><h2>{workout.title}</h2><p>{workout.description}</p><div className="meta-row"><span>{workout.durationMinutes} min</span><span className="tag">{workout.difficulty}</span></div></article>)}</div></CollectionState></section>;
}
'-8000.app.github.dev/api/workouts'
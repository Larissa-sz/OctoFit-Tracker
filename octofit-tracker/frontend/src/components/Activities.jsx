import CollectionState from './CollectionState.jsx';
import useCollection from './useCollection.js';

export default function Activities() {
  const { records, loading, error } = useCollection('/api/activities/');
  return <section><div className="page-heading"><div><p className="eyebrow">Movement log</p><h1>Activities</h1><p>Recent effort from across your teams.</p></div><div className="stat"><strong>{records.length}</strong><span>sessions</span></div></div><CollectionState loading={loading} error={error}><div className="data-grid">{records.map((activity) => <article className="data-card" key={activity._id}><span className="card-kicker">{activity.type}</span><h2>{activity.user?.firstName || activity.user?.username || 'Athlete'}</h2><p>{activity.durationMinutes} minutes of training{activity.distanceKm ? ` / ${activity.distanceKm} km` : ''}</p><div className="meta-row"><span>{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : 'Completed'}</span><span className="score">{activity.calories} kcal</span></div></article>)}</div></CollectionState></section>;
}
'-8000.app.github.dev/api/activities'
import CollectionState from './CollectionState.jsx';
import useCollection from './useCollection.js';

export default function Users() {
  const { records, loading, error } = useCollection('users');
  return <section><div className="page-heading"><div><p className="eyebrow">Your training circle</p><h1>People</h1><p>Meet the athletes making progress together.</p></div><div className="stat"><strong>{records.length}</strong><span>members</span></div></div><CollectionState loading={loading} error={error}><div className="data-grid">{records.map((user) => <article className="data-card" key={user._id}><span className="card-kicker">@{user.username}</span><h2>{user.firstName} {user.lastName}</h2><p>{user.email}</p><div className="meta-row"><span>{user.team?.name || 'No team yet'}</span><span className="tag">Member</span></div></article>)}</div></CollectionState></section>;
}
import CollectionState from './CollectionState.jsx';
import useCollection from './useCollection.js';

export default function Teams() {
  const { records, loading, error } = useCollection('teams');
  return <section><div className="page-heading"><div><p className="eyebrow">Find your people</p><h1>Teams</h1><p>Shared goals make the miles lighter.</p></div><div className="stat"><strong>{records.length}</strong><span>teams</span></div></div><CollectionState loading={loading} error={error}><div className="data-grid">{records.map((team) => <article className="data-card" key={team._id}><span className="card-kicker">Training crew</span><h2>{team.name}</h2><p>{team.description}</p><div className="meta-row"><span>{team.members?.length || 0} members</span><span className="tag">Active</span></div></article>)}</div></CollectionState></section>;
}
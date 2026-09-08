export default function CollectionState({ loading, error, children }) {
  if (loading) return <div className="state">Loading your tracker data...</div>;
  if (error) return <div className="state error">{error}</div>;
  return children;
}
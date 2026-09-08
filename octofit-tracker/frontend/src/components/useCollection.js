import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

export default function useCollection(endpoint) {
  const [state, setState] = useState({ records: [], loading: true, error: '' });
  useEffect(() => {
    const controller = new AbortController();
    fetchCollection(endpoint, controller.signal)
      .then((records) => setState({ records, loading: false, error: '' }))
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ records: [], loading: false, error: error.message });
      });
    return () => controller.abort();
  }, [endpoint]);
  return state;
}
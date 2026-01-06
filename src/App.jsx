import { useEffect, useReducer, useState } from 'react';
import { fetchPosts } from './api/postsApi';
import { postsReducer, initialState } from './reducer/postsReducer';
import PostList from './components/PostList';
import FilterForm from './components/FilterForm';
import './index.css';

function App() {
  const [state, dispatch] = useReducer(postsReducer, initialState);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadPosts = async () => {
      dispatch({ type: 'FETCH_START' });
      try {
        const data = await fetchPosts();
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', payload: data });
        }
      } catch (err) {
        if (isMounted) {
          dispatch({ type: 'FETCH_ERROR', payload: err.message });
        }
      }
    };

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredPosts = state.posts.filter((post) =>
    post.title.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>Post Dashboard</h1>

      <FilterForm 
        filterText={filterText} 
        onFilterChange={setFilterText} 
      />

      <hr />

      {state.loading && (
        <div className="status-message">Loading posts...</div>
      )}

      {state.error && (
        <div className="error-message">Error: {state.error}</div>
      )}

      {!state.loading && !state.error && (
        <>
          {filteredPosts.length > 0 ? (
            <PostList posts={filteredPosts} />
          ) : (
            <div className="status-message">No posts found.</div>
          )}
        </>
      )}
    </div>
  );
}

export default App;

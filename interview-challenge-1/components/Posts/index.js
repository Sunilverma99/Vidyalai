import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post.js';
import Container from '../common/Container';
import { useWindowWidth } from '../contexts/WindowWidthContext';

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@gmail.com'
  });

  const { isSmallerDevice } = useWindowWidth();
  const limit = 12;

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const { data: newPosts } = await axios.get('/api/v1/posts', {
          params: { _page: page, _limit: limit },
        });

        setPosts((prevPosts) => [...prevPosts, ...newPosts]);

        // If the number of fetched posts is less than the limit, it means there are no more posts to load
        if (newPosts.length < limit) {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Container>
      <PostListContainer>
        {posts.map((post) => (
          <Post key={post.id} post={post} user={user} />
        ))}
      </PostListContainer>

      {hasMore && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LoadMoreButton onClick={handleLoadMore} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}
          </LoadMoreButton>
        </div>
      )}
    </Container>
  );
}


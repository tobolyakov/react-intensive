import { FETCH_POSTS } from './typets';

export const fetchPosts = (posts) => ({
    type:   FETCH_POSTS,
    payload: posts,
});

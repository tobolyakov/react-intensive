import { MAIN_URL, TOKEN, MAIN_POST } from './config';

export const  api = {
    async fetchPosts () {
        const response = await fetch(`${MAIN_URL}?size=20`, {
            method: 'GET',
        });

        if (response.status !== 200) {
            throw  new Error('Posts were not loader');
        }

        const { data: posts } = await  response.json();

        return posts;
    },

    async createPost (comment) {
        const response = await fetch(MAIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: TOKEN,
            },
            body: JSON.stringify({ comment }),
        });

        if (response.status !== 200) {
            throw  new Error('Posts were not loader');
        }

        const { data: post } = await  response.json();

        return post;
    },

    async deletePosts (id) {
        const response = await fetch(`${MAIN_URL}/${id}`, {
            method: 'DELETE',
        });

        if (response.status !== 200) {
            throw  new Error('Posts were not loader');
        }

        const { data: posts } = await  response.json();

        return posts;
    },
};
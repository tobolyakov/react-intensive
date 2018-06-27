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

    async fetchQuote () {
        const response = await fetch(`${MAIN_URL}`, {
            method: 'GET',
        });

        if (response.status !== 200) {
            throw  new Error('Posts were not loader');
        }

        const { data: quote } = await  response.json();

        return quote;
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

    async removePosts (id) {
        const response = await fetch(`${MAIN_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: TOKEN,
            },
        });

        if (response.status !== 204) {
            throw  new Error('Posts were not loader');
        }
    },

    async likePost (id) {
        const response = await fetch(`${MAIN_URL}/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: TOKEN,
            },
        });

        if (response.status !== 200) {
            throw  new Error('Posts were not loader');
        }

        const { data: post } = await  response.json();

        return post;
    },
};
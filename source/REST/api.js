import { MAIN_URL, TOKEN } from './config';

export const  api = {
    async fetchPosts () {
        const response = await fetch(MAIN_URL, {
            method: 'GET',
        });

        if (response.status !== 200) {
            throw  new Error('Posts were not loader');
        }

        const { data } = await  response.json();

        return posts;
    },
    async createPost (comment) {
        const response = await fetch(MAIN_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authentication: TOKEN,
            },
            body: JSON.stringify({ comment }),
        });

        if (response.status !== 200) {
            throw  new Error('Posts were not loader');
        }

        const { data: post } = await  response.json();

        return post;
    },

};
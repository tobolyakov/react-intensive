//Core
import { EventEmitter } from 'events';

//Instrumens
import dispatcher from '../dispatcher';
import { fetchPosts } from  '../actions/posts';
import { FETCH_POSTS } from '../actions/typets';

export default new class PostsStore extends EventEmitter {
    constructor () {
        super();

        this.store = {
            posts: [],

        };

        dispatcher.register((action) => {
            console.log(action.type);
            switch (action.type) {
                case FETCH_POSTS: {
                    this.fetchPosts(action.payload);
                    break;
                }
                default:
                    return false;
            }
        });
    }

    subscribe (callback) {
        console.log('change', callback);
        this.on('change', callback);
    }

    unsubscribe (callback) {
        this.removeListener('change', callback);
    }

    update () {
        console.log(this.store);
        this.emit('change');
    }

    getStore () {
        return this.store;
    }

    getPosts () {
        return this.store.posts;
    }

    fetchPosts (post) {
        this.store.posts = post;
        this.update();
    }
}();
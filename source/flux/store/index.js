//Core
import { EventEmitter } from 'events';

//Instrumens
import dispatcher from '../dispatcher';
import { fetchPosts } from  '../actions/posts';
import { FETCH_POSTS, STOP_SPINNING, START_SPINNING } from '../actions/typets';

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
                case START_SPINNING:
                case STOP_SPINNING: {
                    this.setSpinningState(action.payload);
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

    getSpinningState () {
        return this.store.isSpinning;
    }

    fetchPosts (post) {
        this.store.posts = post;
        this.update();
    }

    setSpinningState (status) {
        this.store.isSpinning = status;
        this.update();
    }
}();
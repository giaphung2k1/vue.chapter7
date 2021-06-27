import Vue from 'vue'
import Vuex from 'vuex'

import post from './modulePost';
import user from './moduleUser';
import example from './moduleExample';

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
	state: {

		isLoading: false
    },
    actions: {
       
        setLoading({ commit }, loading = false) {
            commit('SET_LOADING', loading)
        }
    },
    mutations: {
        
        SET_LOADING: (state, loading = false) => {
            state.isLoading = loading;
        }
    },
	modules: {
        example,
        post,
        user
    },
    getters:{
       
    }
});

export default store;
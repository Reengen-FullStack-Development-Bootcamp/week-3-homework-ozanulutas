import Vue from 'vue'
import Vuex from 'vuex'

import axios from "@/plugins/axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuth: false,  // indicates whether the user is authenticated or not
    symbols: [] // symbol search results
  },
  mutations: {
    SET_IS_AUTH(state, payload) { 
      state.isAuth = payload;
    },
    SET_SYMBOLS(state, payload) { 
      state.symbols = payload;
    },
  },
  actions: {
    authenticate({ commit }, payload) { // sets the isAuth state - authenticates the user
      commit("SET_IS_AUTH", payload);
    },
    findSymbols({ commit }, payload) { // finds symbol by company name
      return axios.get("/query", {
        params: { 
          keywords: payload,
          function: 'SYMBOL_SEARCH', 
          datatype: 'json'
        }
      })
        .then(resp => {
          console.log(resp.data);
          if(resp.status === 200) {
            commit("SET_SYMBOLS", resp.data.bestMatches)
          }
        })
        .catch(err => console.log(err))
    }
  },

})

import axios from "axios";

const state = {
  searchResult: [],
};

const getters = {
  getSearchResults: (state) => state.searchResult,
};

const actions = {
  //search action
  async search({ commit }, search) {
    commit("user_search");
    try {
      let res = await axios.get("http://localhost:5000/api/search/coworker", {
        params: {
          name: search
        },
      });
      if(res.data.success) {
        const results = res.data;
        commit("user_search", results)
      }
    } catch (err) {

    }
  },
};

const mutations = {
  user_search(state, result) {
    state.searchResult = result;
  }
}

export default {
  state, 
  actions, 
  mutations, 
  getters
}
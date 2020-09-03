const state = {
    microAppName: '',
    microAppEntry: '',
}

const mutations = {
  SET_MICRO_APP_NAME: (state, microAppName) => {
      state.microAppName = microAppName  
  },
  SET_MICRO_APP_ENTRY: (state, microAppEntry) => {
      state.microAppEntry = microAppEntry
  }
}

const actions = {
  changeMicroSetting({ commit }, {name, entry}) {
    commit('SET_MICRO_APP_NAME', name)
    commit('SET_MICRO_APP_ENTRY', entry)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginState: {
      isAuthenticated: 'true', // 有unknown，true，false三种状态
      username: '精小仪',
      roleLevel: 3
    },

    dialogs: {
      loginDialog: false
    },
    drawer: false,
    routeState: {
    }
  },
  getters: {
    getLoginState (state) {
      return state.loginState
    },

    getLoginDialogState (state) {
      return state.dialogs.loginDialog
    },

    getDrawerState (state) {
      return state.drawer
    }
  },
  mutations: {
    changeLogin (state, loginInfo) {
      state.loginState.isAuthenticated = loginInfo.isAuthenticated
      if (loginInfo.isAuthenticated === 'true') {
        state.loginState.username = loginInfo.username
      } else {
        state.loginState.username = '精小仪'
      }
    },

    changeLoginDialogState (state, dialogOn) {
      state.dialogs.loginDialog = dialogOn
    },

    changeDrawerState (state, drawerOn) {
      state.drawer = drawerOn
    }
  },
  actions: {
  },
  modules: {
  }
})

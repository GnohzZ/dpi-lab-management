import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginState: {
      isAuthenticated: 'true', // 有unknown，true，false三种状态
      username: 'username',
      roleLevel: 0
    },

    dialogs: {
      loginDialog: false,
      passwordDialog: true
    },

    drawer: false,
    routeState: {
    },

    profile: {
      name: '精小仪',
      username: 'username',
      role: 'Normal User',
      email: 'abc123@mail.com',
      studentID: '1234567890'
    }
  },
  getters: {
    getLoginState (state) {
      return state.loginState
    },

    getLoginDialogState (state) {
      return state.dialogs.loginDialog
    },

    getPasswordDialogState (state) {
      return state.dialogs.passwordDialog
    },

    getDrawerState (state) {
      return state.drawer
    },

    getProfile (state) {
      return state.profile
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

    changePasswordDialogState (state, dialogOn) {
      state.dialogs.passwordDialog = dialogOn
    },

    changeDrawerState (state, drawerOn) {
      state.drawer = drawerOn
    },

    changeEmail (state, newEmail) {
      state.profile.email = newEmail
    },

    changeUsername (state, newUsername) {
      state.profile.username = newUsername
    }
  },
  actions: {
  },
  modules: {
  }
})

<template>
  <v-app
    v-touch = "{
      left: () => swipe('left'),
      right: () => swipe('right')
    }"
  >
    <v-navigation-drawer
      v-model="drawer"
      class="flex-grow-1 flex-shrink-0"
      hide-overlay
      flat
      app
      disable-route-watcher
    >
      <v-list
        nav
      >
        <v-list-item>
            <v-list-item-content pa-2 ma-2>
              <v-list-item-title class="title">Welcome to DPI Lab!</v-list-item-title>
              <v-list-item-subtitle>{{username}}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item-group
          v-model="selection"
          active-class="primary--text text--accent-4"
          mandatory
        >

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-magnify</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Search</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-information</v-icon>
            </v-list-item-icon>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item>

          <v-list-item v-if = "isAuthenticated">
            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Manage</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      flat
      dense
      max-height="50"
    >
      <v-app-bar-nav-icon
        @click.stop="changeDrawer"
      >
      </v-app-bar-nav-icon>
      <v-toolbar-title>{{this.$route.name}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            v-on="on"
            @click="toDarkmode"
          >
            <v-icon v-if="dark"> mdi-brightness-5 </v-icon>
            <v-icon v-else> mdi-brightness-4 </v-icon>
          </v-btn>
        </template>
        <span>Dark Mode</span>
      </v-tooltip>
    </v-app-bar>

  <v-main>
    <router-view> </router-view>
  </v-main>
  <LoginDialog></LoginDialog>
  <v-footer
    dense
    app
  >
    <span>Powered by Vue</span>
    <v-spacer></v-spacer>
    <span>&copy; {{ new Date().getFullYear() }}</span>
  </v-footer>

  </v-app>
</template>

<script>
import LoginDialog from './components/LoginDialog'
export default {
  name: 'App',

  components: {
    LoginDialog
  },

  data: () => ({

  }),

  computed: {
    // router computed prop
    selection: {
      get () {
        switch (this.$route.name) {
          case 'Home':
            return 0
          case 'Search':
            return 1
          case 'Account':
            return 2
          case 'About':
            return 3
          case 'Manage':
            return 4
          default:
            return 0
        }
      },
      set (value) {
        if ((this.$vuetify.breakpoint.name !== 'lg') && (this.$vuetify.breakpoint.name !== 'xl')) {
          this.$store.commit('changeDrawerState', false)
        }
        switch (value) {
          case 0:
            this.$router.push('/home')
            break
          case 1:
            this.$router.push('/search').catch(() => { })
            break
          case 2:
            this.$router.push('/account/' + this.username)
            break
          case 3:
            this.$router.push('/about')
            break
          case 4:
            this.$router.push('/manage')
            break
          default:
            this.$router.push('/home')
        }
      }
    },

    // user computed prop
    username: function () {
      return this.$store.getters.getLoginState.username
    },
    isAuthenticated: function () {
      if (this.$store.getters.getLoginState.isAuthenticated === 'true') {
        return true
      } else {
        return false
      }
    },

    // theme computed prop
    dark: function () {
      return this.$vuetify.theme.dark
    },

    // ui prop
    drawer: {
      get () {
        return this.$store.getters.getDrawerState
      },
      set (val) {
        this.$store.commit('changeDrawerState', val)
      }
    }
  },

  watch: {

  },

  methods: {
    toDarkmode: function (event) {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },

    changeDrawer: function (event) {
      this.$store.commit('changeDrawerState', !this.$store.getters.getDrawerState)
    },

    // touch methods
    swipe: function (direction) {
      if (direction === 'left') this.$store.commit('changeDrawerState', false)
      else if (direction === 'right') this.$store.commit('changeDrawerState', true)
    }
  },

  created: function () {
    // 在非移动设备上使左侧菜单栏初始状态为可见
    if ((this.$vuetify.breakpoint.name === 'lg') || (this.$vuetify.breakpoint.name === 'xl')) {
      this.$store.commit('changeDrawerState', true)
    }
  }
}
</script>

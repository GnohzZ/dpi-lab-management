<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      class="flex-grow-1 flex-shrink-0"
      hide-overlay
      flat
      app
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
    >
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
      >
      </v-app-bar-nav-icon>
      <v-toolbar-title>{{this.$route.name}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="toDarkmode">
        <v-icon v-if="dark"> mdi-brightness-5 </v-icon>
        <v-icon v-else> mdi-brightness-4 </v-icon>
      </v-btn>
    </v-app-bar>

  <v-main>
    <router-view> </router-view>
  </v-main>
  <LoginDialog></LoginDialog>
  <v-footer
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
    drawer: false,
    homeActive: true
  }),

  computed: {
    // router computed prop
    selection: {
      get () {
        console.log(this.$route.name)
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
        switch (value) {
          case 0:
            console.log(this.$router.push('/home'))
            break
          case 1:
            console.log(this.$router.push('/search').catch(() => { }))
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
    }
  },

  watch: {
    selection: function (newSelection, oldSelection) {
      console.log(newSelection)
      console.log(oldSelection)
    }
  },

  methods: {
    toDarkmode: function (event) {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  },

  created: function () {
    // 在非移动设备上使左侧菜单栏初始状态为可见
    if ((this.$vuetify.breakpoint.name === 'lg') || (this.$vuetify.breakpoint.name === 'xl')) {
      this.drawer = true
    }
  }
}
</script>

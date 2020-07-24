<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      class="flex-grow-1 flex-shrink-0"
      hide-overlay
      flat
    >
      <v-list
        nav
        dense
      >
        <v-list-item class="px-2">
              <v-list-item-avatar>
                <v-img></v-img>
              </v-list-item-avatar>
        </v-list-item>

        <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">Hello! {{username}}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item-group
          active-class="deep-purple--text text--accent-4"
          mandatory
        >

          <v-list-item
            @click="toHome"
          >
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item @click="toSearch">
            <v-list-item-icon>
              <v-icon>mdi-magnify</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Search</v-list-item-title>
          </v-list-item>

          <v-list-item @click="toAccount">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>

          <v-list-item @click="toAbout">
            <v-list-item-icon>
              <v-icon>mdi-information</v-icon>
            </v-list-item-icon>
            <v-list-item-title>About</v-list-item-title>
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
      <v-toolbar-title>DPI Lab</v-toolbar-title>
    </v-app-bar>

  <v-main>
    <router-view> </router-view>
  </v-main>

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
export default {
  name: 'App',

  components: {

  },

  data: () => ({
    drawer: false,
    username: ''
  }),

  computed: {

  },

  methods: {
    toHome () {
      this.$router.push('/home')
      console.log(this.$route.path)
    },
    toSearch () {
      this.$router.push('/search')
    },
    toAccount () {
      this.$router.push('/account/' + this.username)
    },
    toAbout () {
      this.$router.push('/about')
    }
  }
}
</script>

<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-dialog
      v-model="showingLoginDialog"
      max-width="580px"
      persistent
      hide-overlay
    >
      <v-card>
        <v-toolbar
          color="primary"
          dark
          flat
        >
          <v-toolbar-title>Please Login</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                large
                v-on="on"
                @click="closeLoginDialog"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </template>
            <span>Close</span>
          </v-tooltip>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              label="Login"
              name="login"
              prepend-icon="mdi-account"
              type="text"
            ></v-text-field>

            <v-text-field
              id="password"
              label="Password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'LoginDialog',
  data: () => ({
  }),
  computed: {
    showingLoginDialog: {
      get () {
        return this.$store.getters.getLoginDialogState
      },
      set (value) {
        this.$store.commit('changeLoginDialogState', value)
      }
    }
  },
  methods: {
    closeLoginDialog () {
      this.$store.commit('changeLoginDialogState', false)
    }
  }
}
</script>

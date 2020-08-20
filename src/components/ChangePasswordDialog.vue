<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-dialog
      value = "true"
      max-width="600px"
    >
      <v-card>
        <v-toolbar
          color="primary"
          dark
          flat
        >
          <v-toolbar-title>Change password</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                large
                v-on="on"
                @click="closePasswordDialog"
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
              label="Old password"
              name="oldPassword"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>

            <v-text-field
              id="newPassword"
              label="New password"
              name="New password"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>

            <v-text-field
              id="confirmNewPassword"
              label="Confirm new password"
              name="confirmNewPassword"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-row justify="center" class = "mt-n4">
          <v-card-actions>
            <v-btn color="primary">Submit</v-btn>
          </v-card-actions>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'PasswordDialog',
  data: () => ({
  }),
  computed: {
  },
  methods: {
    closePasswordDialog () {
      this.showing = false
      this.$emit('clickClose')
    }
  }
}
</script>

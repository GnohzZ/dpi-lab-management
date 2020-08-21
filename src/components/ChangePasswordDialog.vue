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
              :rules="[rules.required]"
              v-model="oldPassword"
              :error.sync="oldPwdErr"
            ></v-text-field>

            <v-text-field
              id="newPassword"
              label="New password"
              name="New password"
              prepend-icon="mdi-lock"
              type="password"
              :rules="[rules.required, rules.simple]"
              v-model="newPassword"
              :error.sync="newPwdErr"
            ></v-text-field>

            <v-text-field
              id="confirmNewPassword"
              label="Confirm new password"
              name="confirmNewPassword"
              prepend-icon="mdi-lock"
              type="password"
              v-model="confirmNewPassword"
              :rules="[rules.required, repeat]"
              :error.sync="repeatPwdErr"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-row justify="center" class = "mt-n4">
          <v-card-actions>
            <v-btn
              color="primary"
              @click="submitPassword"
            >
              Submit
            </v-btn>
          </v-card-actions>
        </v-row>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
      color="error"
      top
    >
      {{snackbarText}}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="secondary"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
export default {
  name: 'PasswordDialog',
  data: () => ({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',

    rules: {
      required: value => !!value || 'Required.',
      counter: value => value.length <= 20 || 'Max 20 characters',
      simple: value => {
        var pattern = /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,30}/
        return pattern.test(value) || 'Password must contain UPPER and lower case letters and Numbers, 8-30 characters.'
      }
    },

    oldPwdErr: false,
    newPwdErr: false,
    repeatPwdErr: false,

    snackbar: false,
    snackbarText: ''
  }),
  computed: {
  },
  methods: {
    closePasswordDialog () {
      this.showing = false
      this.$emit('clickClose')
    },
    repeat: function (value) {
      if (value !== this.newPassword) {
        return 'Different from the new password above'
      } else {
        return true
      }
    },
    submitPassword: function () {
      // TODO:if there are errors in text field, alert
      if (this.newPassword === '' || (this.oldPassword === '') || (this.confirmNewPassword === '')) {
        this.snackbar = true
        this.snackbarText = 'Please complete the passwords.'
      } else if (this.oldPwdErr || this.newPwdErr || this.repeatPwdErr) {
        this.snackbar = true
        this.snackbarText = 'Please check the errors.'
      } else {
        // TODO:send request to edit password
        this.oldPassword = ''
        this.newPassword = ''
        this.confirmNewPassword = '' // TODO:here is an error
        this.$emit('clickClose')
      }
    }
  }
}
</script>

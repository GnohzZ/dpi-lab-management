<template>
  <v-container
    class="flex-grow-1 flex-shrink-0"
    fluid
    v-resize = "onResize"
  >
    <v-row
      align="start"
      justify="center"
    >
      <v-col
        cols="12"
        align="start"
        justify="start"
        align-content = "start"
      >
        <v-card
            class = "py-1"
          >
            <v-card-title
              class = "pt-3"
            >
              Profile
            </v-card-title>
            <v-card
              flat
              :max-height = "maxHeight"
              class = "overflow-y-auto pa-2"
            >
              <v-card-title class="text-h4">
                {{profile.name}}
              </v-card-title>
              <v-card-subtitle class="text-subtitle-1">
                {{profile.role}}
              </v-card-subtitle>
              <v-divider class = "mx-3 mr-10"></v-divider>
              <v-card-text>
                <v-card
                  max-width="600"
                  flat
                >
                  <v-container class="pa-2 text-body-1">
                    <v-row justify = "start" no-gutters class = "mb-1">
                      <v-col width = "80" justify = "start" align-self = "center" class="font-italic">
                        ID
                      </v-col>
                      <v-col cols="5" justify = "start" align-self = "center">
                        <v-text-field
                          readonly
                          label="ID"
                          dense
                          solo
                          flat
                          hide-details
                          :value = "profile.studentID"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                      </v-col>
                    </v-row>
                    <v-row justify = "start" no-gutters>
                      <v-col width = "80" justify = "start" align-self = "center" class="font-italic" v-if = "!isEditingUsername">
                        Username
                      </v-col>
                      <v-col width = "80" justify = "start" align-self = "center" class="font-italic" v-else>
                        New Username
                      </v-col>
                      <v-col cols="5" justify = "start" align-self = "center">
                        <v-text-field
                          readonly
                          v-if = "!isEditingUsername"
                          label="Username"
                          dense
                          solo
                          flat
                          hide-details
                          :value.sync = "profile.username"
                        ></v-text-field>
                        <v-text-field
                          v-if = "isEditingUsername"
                          label="Username"
                          dense
                          single-line
                          flat
                          :rules="[rules.required, rules.counter]"
                          v-model = "newUsername"
                          v-on:update:error="usernameErr = $event"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-btn
                          icon
                          @click="editingUsername"
                          color = "primary"
                        >
                          <v-icon
                            v-if="isEditingUsername"
                            small
                          >
                            mdi-close
                          </v-icon>
                          <v-icon v-else small>mdi-pencil</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-row justify = "start" no-gutters v-show = "isEditingUsername">
                      <v-col width = "80" justify = "start" align-self = "center" class="font-italic">
                        Confirm Password
                      </v-col>
                      <v-col cols="5" justify = "start" align-self = "center">
                        <v-text-field
                          id="password1"
                          label="Password"
                          name="password"
                          prepend-icon="mdi-lock"
                          type="password"
                          dense
                          single-line
                          flat
                          :rules="[rules.required]"
                          v-model = "pwd1"
                          v-on:update:error="pwd2Err = $event"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-btn
                          icon
                          @click="requestEditUsername"
                          color = "primary"
                        >
                          <v-icon
                            v-if="isEditingUsername"
                            small
                          >
                            mdi-check
                          </v-icon>
                          <v-icon v-else small>mdi-pencil</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-row justify = "start" no-gutters>
                      <v-col width = "80" justify = "start" align-self = "center" class="font-italic" v-if = "!isEditingEmail">
                        Email
                      </v-col>
                      <v-col width = "80" justify = "start" align-self = "center" class="font-italic" v-else>
                        New Email
                      </v-col>
                      <v-col cols="5" justify = "start" align-self = "center">
                        <v-text-field
                          readonly
                          v-if = "!isEditingEmail"
                          label="Email"
                          dense
                          solo
                          flat
                          hide-details
                          :value.sync = "profile.email"
                        ></v-text-field>
                        <v-text-field
                          v-if = "isEditingEmail"
                          label="Email"
                          dense
                          single-line
                          flat
                          v-model = "newEmail"
                          :rules="[rules.required, rules.email]"
                          v-on:update:error="emailErr = $event"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-btn
                          icon
                          @click="editingEmail"
                          color = "primary"
                        >
                          <v-icon
                            v-if="isEditingEmail"
                            small
                          >
                            mdi-close
                          </v-icon>
                          <v-icon v-else small>mdi-pencil</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-row justify = "start" no-gutters v-show = "isEditingEmail">
                      <v-col width = "80" justify = "start" align-self = "center" class="font-italic">
                        Confirm Password
                      </v-col>
                      <v-col cols="5" justify = "start" align-self = "center">
                        <v-text-field
                          id="password2"
                          label="Password"
                          name="password"
                          prepend-icon="mdi-lock"
                          type="password"
                          dense
                          single-line
                          flat
                          :rules="[rules.required]"
                          v-model = 'pwd2'
                          v-on:update:error="pwd2Err = $event"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-btn
                          icon
                          @click="requestEditEmail"
                          color = "primary"
                        >
                          <v-icon
                            v-if="isEditingEmail"
                            small
                          >
                            mdi-check
                          </v-icon>
                          <v-icon v-else small>mdi-pencil</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-row justify = "start" align = "center" class = "mt-3">
                      <v-btn class = "mx-2" color="primary" @click="changePwd">Change password</v-btn>
                      <v-btn class = "mx-2" color="error" @click ="requestLogout">log out</v-btn>
                    </v-row>
                  </v-container>
                </v-card>
              </v-card-text>
            </v-card>
        </v-card>
        <v-card
          class = "py-1 my-1"
        >
          <v-card-title>Items on loan</v-card-title>
          <v-data-table
            fixed-header
            :loading = "tableLoading"
            :headers="headers"
            hide-default-footer
            hide-default-header
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <ChangePasswordDialog
      v-if = "isChangingPwd"
      v-on:clickClose="closePasswordDialog"
    ></ChangePasswordDialog>
  </v-container>
</template>

<style>

</style>

<script>
import ChangePasswordDialog from '../components/ChangePasswordDialog'
export default {
  components: {
    ChangePasswordDialog
  },

  data () {
    return {
      breakPoint: '',
      windowHeight: 500,
      isEditingUsername: false,
      isEditingEmail: false,
      isChangingPwd: false,

      profile: {
        name: '精小仪',
        username: '精小仪',
        role: 'Normal User',
        email: '',
        studentID: ''
      },
      newUsername: '',
      newEmail: '',
      rules: {
        required: value => !!value || 'Required.',
        counter: value => value.length <= 20 || 'Max 20 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      },
      pwd1: '',
      pwd2: '',
      emailErr: false,
      usernameErr: false,
      pwd1Err: false,
      pwd2Err: false,

      tableLoading: false,
      headers: [
        { text: 'Name of item', value: 'name' },
        { text: 'Loan Date', value: 'date' },
        { text: 'Actions', value: 'actions', sortable: false }
      ]
    }
  },

  methods: {
    onResize: function () {
      this.windowHeight = window.innerHeight
      this.breakPoint = this.$vuetify.breakpoint.name
    },

    editingUsername: function () {
      if (this.isEditingUsername) {
        this.newUsername = ''
        this.pwd1 = ''
      }
      this.isEditingUsername = !this.isEditingUsername
    },

    editingEmail: function () {
      if (this.isEditingEmail) {
        this.newEmail = ''
        this.pwd2 = ''
      }
      this.isEditingEmail = !this.isEditingEmail
    },

    requestEditUsername: function () {
      // TODO:if there are errors in text field, alert
      if (!this.usernameErr && !this.pwd1Err && !(this.newUsername === '')) {
        // TODO:send request to edit username and change local (vuex and this page) username
        this.pwd1 = '' // TODO:here is an error
        this.isEditingUsername = false
      } else {
        console.log('err')
      }
    },

    requestEditEmail: function () {
      // TODO:if there are errors in text field, alert
      if (!this.emailErr && !this.pwd2Err && !(this.newEmail === '')) {
        // TODO:send request to edit username and change local (vuex and this page) username
        this.pwd2 = '' // TODO:here is an error
        this.isEditingEmail = false
        console.log(this.emailErr)
      } else {
        console.log('err')
      }
    },

    changePwd: function () {
      this.isChangingPwd = true
    },

    closePasswordDialog: function () {
      this.isChangingPwd = false
    },

    requestLogout: function () {

    }
  },

  computed: {
    maxHeight: function () {
      return this.windowHeight - 200
    }
  },

  created () {
    this.onResize()
    this.profile = this.$store.getters.getProfile
  }
}
</script>

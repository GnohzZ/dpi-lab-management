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
                      <v-col cols="4" justify = "start" align-self = "center">
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
                      <v-col width = "80" justify = "start" align-self = "center" class="font-italic">
                        Username
                      </v-col>
                      <v-col cols="4" justify = "start" align-self = "center">
                        <v-text-field
                          readonly
                          v-if = "!isEditingUsername"
                          label="Username"
                          dense
                          solo
                          flat
                          hide-details
                          :value = "profile.username"
                        ></v-text-field>
                        <v-text-field
                          v-if = "isEditingUsername"
                          label="Username"
                          dense
                          single-line
                          flat
                          hide-details
                          :value = "showingUsername"
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
                      <v-col cols="4" justify = "start" align-self = "center">
                        <v-text-field
                          id="password1"
                          label="Password"
                          name="password"
                          prepend-icon="mdi-lock"
                          type="password"
                          dense
                          single-line
                          flat
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-btn
                          icon
                          @click="editUsername"
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
                      <v-col width = "80" justify = "start" align-self = "center" class="font-italic">
                        Email
                      </v-col>
                      <v-col cols="4" justify = "start" align-self = "center">
                        <v-text-field
                          readonly
                          v-show = "!isEditingEmail"
                          label="Email"
                          dense
                          solo
                          flat
                          hide-details
                          :value = "profile.email"
                        ></v-text-field>
                        <v-text-field
                          v-show = "isEditingEmail"
                          label="Email"
                          dense
                          single-line
                          flat
                          hide-details
                          v-model = "showingEmail"
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
                      <v-col cols="4" justify = "start" align-self = "center">
                        <v-text-field
                          id="password2"
                          label="Password"
                          name="password"
                          prepend-icon="mdi-lock"
                          type="password"
                          dense
                          single-line
                          flat
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-btn
                          icon
                          @click="editEmail"
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
                  </v-container>
                </v-card>
              </v-card-text>
            </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>

</style>

<script>
export default {
  data () {
    return {
      breakPoint: '',
      windowHeight: 500,
      isEditingUsername: false,
      isEditingEmail: false,
      profile: {
        name: '精小仪',
        username: '精小仪',
        role: 'Normal User',
        email: '',
        studentID: ''
      },
      showingUsername: '',
      showingEmail: ''
    }
  },

  methods: {
    onResize: function () {
      this.windowHeight = window.innerHeight
      this.breakPoint = this.$vuetify.breakpoint.name
    },

    editingUsername: function () {
      if (this.isEditingUsername) {
        this.showingUsername = ''
      }
      this.isEditingUsername = !this.isEditingUsername
    },

    editingEmail: function () {
      if (this.isEditingEmail) {
        this.showingEmail = ''
      }
      this.isEditingEmail = !this.isEditingEmail
    },

    editUsername: () => {

    },

    editEmail: () => {

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

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
            <v-divider></v-divider>
            <v-card
              flat
              :max-height = "maxHeight"
              class = "overflow-y-auto"
            >
              <v-card-title>
                {{profile.name}}
              </v-card-title>
              <v-card-subtitle>
                {{profile.username}}
              </v-card-subtitle>
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
      profile: {
        name: '精小仪',
        username: '精小仪',
        role: 'Normal User',
        email: '',
        studentID: ''
      }
    }
  },

  methods: {
    onResize: function () {
      this.windowHeight = window.innerHeight
      this.breakPoint = this.$vuetify.breakpoint.name
      console.log(this.breakPoint)
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
    console.log(this.profile)
  }
}
</script>

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
              About DPI
            </v-card-title>
            <v-divider class = "mx-3 mr-10 mt-n3"></v-divider>
            <v-card-text>
              <span>The home page of Department of precision instrument of Tsinghua Univ.: </span>
              <a href="http://www.dpi.tsinghua.edu.cn/"> http://www.dpi.tsinghua.edu.cn/ </a>
            </v-card-text>
        </v-card>
        <v-card
          class = "py-1 my-1"
        >
          <v-card-title>About DPI SAST</v-card-title>
          <v-divider class = "mx-3 mr-10 mt-n3"></v-divider>
          <v-card-text>
          </v-card-text>
        </v-card>
        <v-card
          class = "py-1 my-1"
        >
          <v-card-title>About this website</v-card-title>
          <v-divider class = "mx-3 mr-10 mt-n3"></v-divider>
          <v-card-text>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      breakPoint: '',
      windowHeight: 500
    }
  },

  methods: {
    onResize: function () {
      this.windowHeight = window.innerHeight
      this.breakPoint = this.$vuetify.breakpoint.name
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

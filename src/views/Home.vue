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
              Notice
            </v-card-title>
            <v-card
              flat
              :max-height = "maxHeight"
              class = "overflow-y-auto"
            >
              <v-expansion-panels
                focusable
                hover
                :value = "selectedPanel"
                active-class="primary--text"
              >
                <v-expansion-panel
                  v-for="(notice,i) in sortedNotices"
                  :key="i"
                >
                  <v-expansion-panel-header>
                    <v-row class = "py-0">
                      <v-col class = "py-1" v-if = "breakPoint !== 'xs'">
                        <v-row>
                          <v-col cols = "9" class="font-weight-light ma-0 pa-0 mr-n1">{{notice.publishTime}}</v-col>
                          <v-col cols = "1" class="font-italic ma-0 pa-0 mr-2">
                            <v-icon
                              v-if = "notice.toTop"
                              small
                            >
                              mdi-pin
                            </v-icon>
                          </v-col>
                          <v-col cols = "1" class="font-italic ma-0 pa-0">
                            <v-icon
                              v-if = "notice.importance > 0"
                              small
                              color = "primary"
                            >
                              mdi-alert-circle
                            </v-icon>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col class = "py-1 mr-2 ml-1" align = "start" md = "9" sm = "8">
                        <span class="font-weight-black">
                          {{notice.title}}
                        </span>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content class = "mt-4">
                    <span v-if = "breakPoint === 'xs'">
                      <v-row>
                        <v-col class="font-weight-light ma-0 pa-0 ml-3">{{notice.publishTime}}</v-col>
                        <v-col cols = "1" class="font-italic ma-0 pa-0 mr-2">
                          <v-icon
                            v-if = "notice.toTop"
                            small
                            color = "primary"
                          >
                            mdi-pin
                          </v-icon>
                        </v-col>
                        <v-col cols = "1" class="font-italic ma-0 pa-0">
                          <v-icon
                            v-if = "notice.importance > 0"
                            small
                            color = "primary"
                          >
                            mdi-star
                          </v-icon>
                        </v-col>
                      </v-row>
                    </span>
                    <v-card flat> <!--用v-card避免文字跟随active属性变化-->
                      <p>{{notice.content}}</p>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
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
      selectedPanel: 0, // 若要启用multiple属性，将此处改为数组
      breakPoint: '',
      windowHeight: 500,
      page: 1,
      itemsPerPage: 10,
      itemNumberPerPage: [5, 10, 15, 20],
      search: '',
      tFooterProp: {
        'items-per-page-text': 'Per page'
      },
      notices: [
        {
          title: '重要置顶',
          publishTime: '2020-08-01 14:14',
          content: '今儿👴在做Home页',
          importance: 1,
          toTop: true
        },
        {
          title: '重要不置顶试一试标题长度的影响吧吧吧吧吧吧',
          publishTime: '2020-08-01 14:20',
          content: '今儿👴在做Home页',
          importance: 1,
          toTop: false
        },
        {
          title: '重要不置顶',
          publishTime: '2020-07-01 14:14',
          content: '下个月👴在做Home页',
          importance: 1,
          toTop: false
        },
        {
          title: '不重要置顶',
          publishTime: '2020-02-01 14:14',
          content: '半年后👴在做Home页',
          importance: 0,
          toTop: true
        },
        {
          title: '不重要不置顶',
          publishTime: '2020-08-01 14:14',
          content: '今儿👴在做Home页',
          importance: 0,
          toTop: false
        },
        {
          title: '不重要不置顶',
          publishTime: '2020-08-01 14:14',
          content: '今儿👴在做Home页',
          importance: 0,
          toTop: false
        },
        {
          title: '不重要不置顶',
          publishTime: '2020-08-01 14:14',
          content: '今儿👴在做Home页',
          importance: 0,
          toTop: false
        },
        {
          title: '来个老一点的',
          publishTime: '2020-01-01 14:14',
          content: '半年以后👴在做Home页',
          importance: 0,
          toTop: false
        }
      ]
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
    },
    pageCount: {
      get () {
        return Math.ceil(this.desserts.length / this.itemsPerPage)
      },
      set () {}
    },

    sortedNotices: function () {
      let sn = this.notices
      sn.sort((a, b) => {
        if (a.toTop !== b.toTop) {
          return b.toTop - a.toTop
        } else if (b.publishTime.split(' ').join('').split('-').join('').split(':').join('') !== a.publishTime.split(' ').join('').split('-').join('').split(':').join('')) {
          return b.publishTime.split(' ').join('').split('-').join('').split(':').join('') - a.publishTime.split(' ').join('').split('-').join('').split(':').join('')
        } else return b.importance - a.importance
      })

      // 筛除六个月前的notice和超过7条的notice
      const today = new Date()
      const todayString = today.getFullYear() + (today.getMonth() < 9 ? ('0' + (today.getMonth() + 1)) : (today.getMonth() + 1))
      for (let i = 1; i < sn.length; i++) {
        if (((todayString - sn[i].publishTime.split(' ').shift().split('-').slice(0, 2).join('') > 6) || (i > 6)) && !sn[i].toTop) {
          sn = sn.slice(0, i)
          break
        }
      }
      return sn
    }
  },
  created () {
    this.onResize()
    // 若expansion panel改为multiple属性，则取消此处注释可实现自动打开所有置顶notice
    // let count = 0
    // for (let i = 0; i < this.notices.length; i++) {
    //   if (this.notices[i].toTop) {
    //     this.selectedPanel.push(count)
    //     count++
    //   }
    // }
    // if (count === 0) this.selectedPanel.push(0)
  }
}
</script>

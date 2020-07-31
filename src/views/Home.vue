<template>
  <v-container
    class="flex-grow-1 flex-shrink-0"
    fluid
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
              class = "pt-0"
            >
              Nutrition
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :height="maxHeight"
              fixed-header
              :loading = "tableLoading"
              :headers="headers"
              :items="desserts"
              :search="search"
              :footer-props="tFooterProp"
              :page.sync="page"
              @page-count="pageCount = $event"
              :items-per-page="itemsPerPage"
              hide-default-footer
              v-resize = "onResize"
            ></v-data-table>
            <v-divider></v-divider>
            <v-row
              align="center"
              justify="center"
            >
              <v-spacer class="hidden-sm-and-down"></v-spacer>
              <v-select
                v-model = "itemsPerPage"
                :items="itemNumberPerPage"
                label="Items per page"
                dense
                class="mt-4 mb-n4 ml-6 mr-6"
              ></v-select>
              <v-pagination
                v-model="page"
                :length="pageCount"
                :total-visible="3"
                class = "pb-0 mb-n1 mt-0 mr-3"
              ></v-pagination>
            </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      windowHeight: 500,
      tableLoading: false,
      page: 1,
      itemsPerPage: 10,
      itemNumberPerPage: [5, 10, 15, 20],
      search: '',
      tFooterProp: {
        'items-per-page-text': 'Per page'
      },
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' }
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%'
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%'
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%'
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%'
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%'
        }
      ]
    }
  },

  methods: {
    onResize: function () {
      this.windowHeight = window.innerHeight
    }
  },

  computed: {
    maxHeight: function () {
      const mheight = this.windowHeight - 265
      if (mheight > 48 * (this.itemsPerPage + 1)) return 48 * (this.itemsPerPage + 1)
      else return this.windowHeight - 265
    },
    pageCount: {
      get () {
        return Math.ceil(this.desserts.length / this.itemsPerPage)
      },
      set () {}
    }
  },
  created () {
    this.onResize()
  }
}
</script>

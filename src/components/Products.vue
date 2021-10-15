<template>
  <div style="width: 100%">
    <v-card
      rounded="lg"
      class="pa-5"
      outlined
      style="width: 100%"
    >
      <v-row>
        <v-col class="pa-0" cols="3">
          <v-img
            :src="product.product_image"
            lazy-src="https://picsum.photos/id/11/100/60"
            height="80"
            width="80"
            class="rounded"
          >
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
        <v-col
          cols=6
          class="pa-0 pl-2"
          style="position: relative"
        >
          <p class="ma-0 pr-5 text-subtitle-2 text-left">{{product.product_name}}</p>
          <v-chip
            small
            color="success"
            class="ml-2"
            outlined
            style="position: absolute; bottom: 0; left: 0"
          >
            Stock: {{product.total_stock}}
          </v-chip>
        </v-col>
        <v-col
          cols=3
          class="pa-0"
          style="font-size: 16px;"
        >
          <p style="text-align: right" class="ma-0">
            &#8358; {{product.price}}
          </p>
          <div>
            <v-icon style="float: left; top: 30px" v-if="display==true">mdi-store-outline</v-icon>
            <v-icon style="float: left; top: 30px" v-else>mdi-store-remove</v-icon>
            <span class="switch">
              <v-switch
              class="mt-0 pt-0 pr-2"
              color="success"
              style="position: absolute; right: -12px; bottom: 10px"
              v-model="display"
              inset
              hide-details=""
              @change="toggleDisplay()"
            >
            </v-switch>
            </span>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>  
  export default {
    name: 'Products',
    props: [
      "product",
    ],
    components: {
    },
    data: () => {
			return {
        display: true,
      }
    },
    methods: {
      toggleDisplay() {
        // update display at server level
        // update store to new display status
      }
    },
    mounted() {
      this.display = this.product.display
    }
  }
</script>

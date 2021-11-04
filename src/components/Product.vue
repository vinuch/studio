<template>
  <div style="width: 100%"
    @click="viewProduct(product)"
  >
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
              @click.stop=""
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
  import * as mutationTypes from "@/store/mutationTypes"
  import { EventBus } from '@/services/eventBus'
  import {
    fethcStoreInventory,
    updateProduct,
  } from "@/services/apiServices"

  export default {
    name: 'Product',
    props: [
      "product",
    ],
    data: () => {
			return {
        display: true,
      }
    },
    methods: {
      toggleDisplay () {
        let data = {display: this.display}

        updateProduct(data, this.product.id)
          .then(() => {
            EventBus.$emit(
              "open_alert",
              "success",
              this.currentItem
                ? "Product displayed in gallery"
                : "Removed from gallery"
            )
            fethcStoreInventory(this.product.slug) // perhaps fetch only this item and update it
          })
          .catch((err) => {
            EventBus.$emit("open_alert", "error", `There was an error changing display status ${err}`)
          })
          .finally(() => {
            this.loading = false;
          });
      },
      viewProduct(product) {
        this.$store.commit(mutationTypes.SET_PRODUCT_TO_BE_EDITTED, product);
        this.$emit('viewProduct')
      },
    },
    mounted() {
      this.display = this.product.display
    }
  }
</script>

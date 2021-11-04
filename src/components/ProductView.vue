<template>
  <div>
    <h2 class="text-left text-h6 ma-5" @click="back()">
      <v-icon>mdi-chevron-left</v-icon> Inventory
    </h2>
    <!-- <v-icon
      class="mr-5" 
      style="float: right; top: -47px;"
      @click="close"
    >mdi-close-thick</v-icon> -->
    <!-- <v-divider></v-divider> -->
    <div class="pa-5">
      <v-container
        fluid
        class="pa-0"
      >
        <v-img
          :src="currentProduct.product_image"
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

        <v-divider class="ma-5 mr-0 ml-0"></v-divider>

        <v-row class="pb-5">
          <v-col cols=5 class="pa-0">
            <v-card-text class="text-left text-body-2 pb-0">Product name</v-card-text>
          </v-col>
          <v-col cols=7 class="pa-0">
            <v-card-text class="text-right text-body-2 pb-0">{{ currentProduct.product_name }}</v-card-text>
          </v-col>
        </v-row>

        <v-divider class="ma-5 mr-0 ml-0"></v-divider>
      
        <v-row class="pb-5">
          <v-col cols=5 class="pa-0">
            <v-card-text class="text-left text-body-2 pb-0">Price</v-card-text>
          </v-col>
          <v-col cols=7 class="pa-0">
            <v-card-text class="text-right text-body-2 pb-0">{{ currentProduct.price }}</v-card-text>
          </v-col>
        </v-row>

        <v-divider class="ma-5 mr-0 ml-0"></v-divider>
      
        <v-row class="pb-3">
          <v-col cols=5 class="pa-0">
            <v-card-text class="text-left text-body-2 pb-0">Stock</v-card-text>
          </v-col>
          <v-col cols=7 class="pa-0">
            <v-card-text class="text-right text-body-2 pb-0">{{ currentProduct.total_stock }}</v-card-text>
          </v-col>
        </v-row>

        <v-divider class="ma-5 mr-0 ml-0"></v-divider>

        <v-row class="pb-3">
          <v-col cols=5 class="pa-0">
            <v-card-text class="text-left text-body-2 pb-0">Discount</v-card-text>
          </v-col>
          <v-col cols=7 class="pa-0">
            <v-card-text class="text-right text-body-2 pb-0">Type: {{ currentProduct.discount_type }}</v-card-text>
            <v-card-text class="text-right text-body-2 pb-0">Off: {{ currentProduct.discount }}</v-card-text>
            <v-card-text class="text-right text-body-2 pb-0">New price {{ currentProduct.discount_type }}</v-card-text>
          </v-col>
        </v-row>

        <v-divider class="ma-5 mr-0 ml-0"></v-divider>

        <div
        style="text-align: left; color: #69747E;"
        >Display in gallery 
          <span class="switch">
            <v-switch
            class="float-right mt-0 pt-0"
            color="success"
            style="position: relative; right: -12px;"
            id="switch"
            v-model="display"
            inset
            @change="toggleDisplay()"
          >
            </v-switch>
          </span>
        </div>

        <v-divider class="ma-5 mr-0 ml-0"></v-divider>

        <v-card-text class="text-left text-body-2 pa-0">Description</v-card-text>
        <v-card-text 
          v-if="currentProduct.description"
          class="text-left text-body-2 pa-0 pt-5"
        >
          {{ currentProduct.description }}
        </v-card-text>
  
        <v-divider class="ma-5 mr-0 ml-0"></v-divider>
      
        <v-card-text class="text-left text-body-2 pa-0 pb-5">Variants</v-card-text>

        <v-row class="pb-5" v-if="currentProduct.first_variant_name">
          <v-col cols=5 class="pa-0">
            <v-card-text class="text-left text-body-2 pb-0">{{ currentProduct.first_variant_name }}</v-card-text>
          </v-col>
          <v-col cols=7 class="pa-0">
            <v-card-text class="text-right text-body-2 pb-0">{{ currentProduct.first_variant }}</v-card-text>
          </v-col>
        </v-row>
        <v-row class="pb-5" v-if="currentProduct.second_variant_name">
          <v-col cols=5 class="pa-0">
            <v-card-text class="text-left text-body-2 pb-0">{{ currentProduct.second_variant_name }}</v-card-text>
          </v-col>
          <v-col cols=7 class="pa-0">
            <v-card-text class="text-right text-body-2 pb-0">{{ currentProduct.second_variant }}</v-card-text>
          </v-col>
        </v-row>
        <v-row class="pb-5" v-if="currentProduct.third_variant_name">
          <v-col cols=5 class="pa-0">
            <v-card-text class="text-left text-body-2 pb-0">{{ currentProduct.third_variant_name }}</v-card-text>
          </v-col>
          <v-col cols=7 class="pa-0">
            <v-card-text class="text-right text-body-2 pb-0">{{ currentProduct.third_variant }}</v-card-text>
          </v-col>
        </v-row>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Options
                </th>
                <th class="text-left pl-0">
                  Qty
                </th>
                <th class="text-left pl-0">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              <div>

              </div>
              <tr
                v-for="vars in variants"
                :key="vars.name"
              >
                <td class="pr-0 text-left">{{ vars.name }}</td>
                <td class="pl-0">
                  {{ vars.qty }}
                </td>
                <td class="pl-0 pr-0">
                  {{ vars.price }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>

        <v-divider class="ma-5 mr-0 ml-0"></v-divider>
      
        <v-card-actions class="pa-0">
          <v-spacer></v-spacer>
          <v-btn 
            class="mr-5"
            color="error"
            text
            @click="deleteProduct()"
          >
            Delete
          </v-btn>
          <v-btn 
            class="ml-5"
            outlined
            color="main_blue"
            @click="edit()"
          >
            Edit
          </v-btn>
        </v-card-actions>
      </v-container>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex"
  import * as mutationTypes from "@/store/mutationTypes"
  import {
    fethcStoreInventory,
    updateProduct,
  } from "@/services/apiServices"
  import { EventBus } from "@/services/eventBus"

  export default {
    name: 'AddOrViewProduct',
    components: {
    },
    data: () => {
			return {
        display: true,
        variants: [],
      }
    },
    methods: {
      back() {
        this.$emit("back")
      },
      close() {
        this.$emit("close")
      },
      edit() { // already has product_to_be_edited
        this.$store.commit(mutationTypes.UNSAVED_CHANGE, false);
        this.$emit('editProduct')
      },
      toggleDisplay () {
        let data = {display: this.display}

        updateProduct(data, this.currentProduct.id)
          .then(() => {
            EventBus.$emit(
              "open_alert",
              "success",
              this.currentItem
                ? "Product displayed in gallery"
                : "Removed from gallery"
            )
            fethcStoreInventory(this.currentProduct.slug) // perhaps fetch only this item and update it
          })
          .catch((err) => {
            EventBus.$emit("open_alert", "error", `There was an error changing display status ${err}`)
          })
          .finally(() => {
            this.loading = false;
          });
      },
    },
    computed: {
      ...mapGetters({
        currentProduct: "getProductToBeEditted",
      }),
    },
    mounted() {
      this.display = this.currentProduct.display

      if (this.currentProduct.has_variant) {
        let options_1 = this.currentProduct.first_variant.split(",")
        let options_2
        let options_3

        this.currentProduct.second_variant
          ? options_2 = this.currentProduct.second_variant.split(",")
          : options_2 = []
        this.currentProduct.third_variant
          ? options_3 = this.currentProduct.third_variant.split(",")
          : options_3 = []
        let variant_options = this.currentProduct.variant_options.split(";")
        let split_ops = []

        variant_options.forEach(var_options => {
          split_ops.push(var_options.split(","))
        })

        if (options_1.length && options_2.length && options_3.length) { // three variants
          let x=0
          for (let i=0; i<options_1.length; i++) {
            for (let j=0; j<options_2.length; j++) {
              for (let k=0; k<options_3.length; k++) {
                let object = {
                  name: options_1[i] + " / " + options_2[j] +" / "+ options_3[k],
                  qty: split_ops[x][1],
                  price: split_ops[x][2]
                }
                this.variants.push(object)
                x++
              }
            }
          }
        } else if (options_1.length && options_2.length) { // two variants
          let x=0
          for (let i=0; i<options_1.length; i++) {
            for (let j=0; j<options_2.length; j++) {
              let object = {
                name: options_1[i] + " / " + options_2[j],
                qty: split_ops[x][1],
                price: split_ops[x][2]
              }
              this.variants.push(object)
              x++
            }
          }
        } else if (options_1.length) { // one variant
          let x=0
          for (let i=0; i < options_1.length; i++) {
            this.variants.push({
              name: options_1[i],
              qty: split_ops[x][1],
              price: split_ops[x][2]
            })
            x++
          }
        }
      }
    },
  }
</script>

<style scoped>
  .describe {
    font-size: 14px;
    text-align: left;
    color: #69747E;
    margin-bottom: 0;
  }
</style>
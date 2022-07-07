<template>
  <div v-if="currentProduct">
    <h2
      class="text-left text-h6 ma-5 font-weight-bold text-color-primaryDark"
      @click="back()"
    >
      <v-icon>mdi-chevron-left</v-icon>
      Inventory
    </h2>
    <!-- <v-icon
      class="mr-5" 
      style="float: right; top: -47px;"
      @click="close"
    >mdi-close-thick</v-icon> -->
    <!-- <v-divider></v-divider> -->
    <div class="pa-5" style="padding-bottom: 6rem !important;">
      <v-container fluid class="pa-0">
        <v-img
          :src="currentProduct.product_image"
          lazy-src="https://picsum.photos/id/11/100/60"
          height="80"
          width="80"
          class="rounded-md"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>

        <v-divider class="ma-5 mr-0 ml-0"></v-divider>

        <v-row class="pb-5">
          <v-col cols="5" class="pa-0">
            <v-card-text class="text-left text-body-2 pb-0"
              >Product Name</v-card-text
            >
          </v-col>
          <v-col cols="7" class="pa-0">
            <v-card-text
              class="text-right text-subtitle-1 text-capitalize font-weight-medium pb-0 text-color-primaryDark"
              >{{ currentProduct.product_name }}</v-card-text
            >
          </v-col>
        </v-row>

        <v-divider class="ma-5 mr-0 ml-0"></v-divider>

        <v-row class="pb-5">
          <v-col cols="5" class="pa-0">
            <v-card-text class="text-left text-body-2 pb-0">Price</v-card-text>
          </v-col>
          <v-col cols="7" class="pa-0">
            <v-card-text
              class="text-right text-subtitle-1 text-capitalize font-weight-medium pb-0 text-color-primaryDark"
              >{{ formatter.format(currentProduct.price) }}</v-card-text
            >
          </v-col>
        </v-row>

        <v-divider class="ma-5 mr-0 ml-0"></v-divider>

        <v-row class="pb-3">
          <v-col cols="5" class="pa-0">
            <v-card-text class="text-left text-body-2 pb-0"
              >Stock Quantity</v-card-text
            >
          </v-col>
          <v-col cols="7" class="pa-0">
            <v-card-text
              class="text-right text-subtitle-1 text-capitalize font-weight-medium pb-0 text-color-primaryDark"
              >{{ currentProduct.total_stock }}</v-card-text
            >
          </v-col>
        </v-row>

        <v-divider class="ma-5 mr-0 ml-0"></v-divider>

        <div v-if="currentProduct.has_discount">
          <v-row class="pb-3">
            <v-col cols="5" class="pa-0">
              <v-card-text class="text-left text-body-2 pb-0"
                >Discount</v-card-text
              >
            </v-col>
            <v-col cols="7" class="pa-0">
              <v-card-text class="text-right text-body-2 pb-0"
                >Type: {{ discount_type }}</v-card-text
              >
              <v-card-text class="text-right text-body-2 pb-0"
                >Amount taken off: {{ currentProduct.discount }}</v-card-text
              >
              <v-card-text class="text-right text-body-2 pb-0"
                >New price {{ currentProduct.discount_type }}</v-card-text
              >
            </v-col>
          </v-row>
          <v-divider class="ma-5 mr-0 ml-0"></v-divider>
        </div>

        <div
          style="display: flex; align-items: center justify-content: space-between"
        >
          <v-card-text class="text-left text-body-2 pb-0 pt-5 pl-0"
            >Display Product</v-card-text
          >

          <div class="d-flex align-center">
            <v-icon style="" v-if="currentProduct.display == true"
              >mdi-store-outline</v-icon
            >
            <v-icon style="" v-else>mdi-store-remove</v-icon>
            <span class="switch ml-3">
              <v-switch
                color="success"
                style=""
                id="switch"
                v-model="currentProduct.display"
                inset
                disabled
              >
              </v-switch>
            </span>
          </div>
        </div>

        <v-divider class="ma-5 mr-0 ml-0"></v-divider>

        <v-card-text class="text-left text-body-2 pa-0 pb-5"
          >Variant and Variant Quantity</v-card-text
        >

        <!-- <v-row class="pb-5" v-if="currentProduct.first_variant_name">
          <v-col cols="5" class="pa-0">
            <v-card-text class="text-left text-body-2 pb-0">{{
              currentProduct.first_variant_name
            }}</v-card-text>
          </v-col>
          <v-col cols="7" class="pa-0">
            <v-card-text class="text-right text-subtitle-2 text-capitalize font-weight-medium pb-0 text-color-primaryDark">{{
              currentProduct.first_variant
            }}</v-card-text>
          </v-col>
        </v-row>
        <v-row class="pb-5" v-if="currentProduct.second_variant_name">
          <v-col cols="5" class="pa-0">
            <v-card-text class="text-left text-body-2 pb-0">{{
              currentProduct.second_variant_name
            }}</v-card-text>
          </v-col>
          <v-col cols="7" class="pa-0">
            <v-card-text class="text-right text-subtitle-2 text-capitalize font-weight-medium pb-0 text-color-primaryDark">{{
              currentProduct.second_variant
            }}</v-card-text>
          </v-col>
        </v-row> -->
        <v-row class="pb-5" v-if="currentProduct.third_variant_name">
          <v-col cols="5" class="pa-0">
            <v-card-text class="text-left text-body-2 pb-0">{{
              currentProduct.third_variant_name
            }}</v-card-text>
          </v-col>
          <v-col cols="7" class="pa-0">
            <v-card-text class="text-right text-body-2 pb-0">{{
              currentProduct.third_variant
            }}</v-card-text>
          </v-col>
        </v-row>
        <v-simple-table
          v-if="currentProduct.has_variant"
          style="border: 0.5px solid #E2E8F0;box-shadow: -2px 8px 16px rgba(181, 181, 181, 0.08);
border-radius: 8px;padding: .5rem"
        >
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left" style="color: rgba(51, 65, 85, 0.33)">
                  Variant Name
                </th>
                <th class="text-left pl-0" style="color: rgba(51, 65, 85, 0.33)">
                  Qty
                </th>
                <th class="text-left pl-0" style="color: rgba(51, 65, 85, 0.33)">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              <div></div>
              <tr v-for="vars in variants" :key="vars.name">
                <td class="pr-0 text-left">{{ vars.name && vars.name.replaceAll('/', ' / ') }}</td>
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

        <v-card-text class="text-left text-body-2 pa-0"
          >Description</v-card-text
        >
        <v-card-text
          v-if="currentProduct.description"
          class="text-left text-body-2 font-weight-regular pa-0 pt-5 text-color-primaryDark"
        >
          {{ currentProduct.description }}
        </v-card-text>

        <v-divider class="ma-5 mr-0 ml-0"></v-divider>

        <v-card-actions class="pa-0">
          <v-spacer></v-spacer>
          <!-- <v-btn
            class="mr-5 font-weight-bold body-1"
            color="error"
            text
            @click="deleteProduct(currentProduct.id)"
          >
            Delete
          </v-btn> -->
          <v-btn class="ml-5" outlined color="primary" @click="editProduct()">
            Edit
          </v-btn>
        </v-card-actions>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as mutationTypes from "@/store/mutationTypes";
import {
  fethcStoreInventory,
  updateProduct,
  deleteProduct,
} from "@/services/apiServices";
import { EventBus } from "@/services/eventBus";

export default {
  name: "ProductView",
  props: ["clear_variants"],
  data: () => {
    return {
      formatter: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "NGN",

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      }),
      display: null,
      variants: {
        options_1: [],
        options_2: [],
        options_3: [],
        variants: [],
      },
      // options_1: [],
      // options_2: [],
      // options_3: [],
      // variants: [],
    };
  },
  methods: {
    back() {
      this.$emit("back");
    },
    editProduct() {
      // already has product_to_be_edited
      this.$store.commit(mutationTypes.UNSAVED_CHANGE, false);
      this.$emit("editProduct", this.variants);
    },
    deleteProduct(id) {
      deleteProduct(id).then((res) => {
        // console.log(res);
      });
    },
    toggleDisplay() {
      let data = { display: this.display };

      updateProduct(data, this.currentProduct.id)
        .then(() => {
          EventBus.$emit(
            "open_alert",
            "success",
            this.display
              ? "This product has been added to your gallery. Your visitors will now see it when they visit."
              : "This product has been removed from your gallery. Your visitors will no longer see it."
          );
          fethcStoreInventory(this.currentProduct.slug); // perhaps fetch only this item and update it
        })
        .catch((err) => {
          EventBus.$emit(
            "open_alert",
            "error",
            `There was an error changing display status ${err}`
          );
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
    discount_type() {
      let type;
      this.currentProduct.discount_type == 0 ? (type = "None") : "";
      this.currentProduct.discount_type == 1 ? (type = "Percentage") : "";
      this.currentProduct.discount_type == 2 ? (type = "Amount") : "";
      return type;
    },
  },
  mounted() {
    if (this.currentProduct) {
      this.display = this.currentProduct.display;
      let _currentProduct = this.currentProduct;

      // this.$nextTick(function() {
      // console.log(_currentProduct);
      if (_currentProduct.has_variant) {
        // extracts options for each existing variant
        // as well as their prices and quantities
        let options_1 = _currentProduct.first_variant
          .split(",")
          .filter((item) => item !== "");
        options_1.slice(-1)[0] == "" ? options_1.splice(-1) : "";
        let options_2 = _currentProduct.second_variant
          .split(",")
          .filter((item) => item !== "");
        let options_3;

        _currentProduct.second_variant
          ? (options_2 = _currentProduct.second_variant.split(","))
          : (options_2 = []);
        options_2.slice(-1)[0] == "" ? options_2.splice(-1) : "";

        _currentProduct.third_variant
          ? (options_3 = _currentProduct.third_variant.split(","))
          : (options_3 = []);
        options_3.slice(-1)[0] == "" ? options_3.splice(-1) : "";

        let variant_options = _currentProduct.variant_options
          .split(";")
          .filter((item) => item !== "");
        let options_object = {};
        // console.log(variant_options)
        for (let index = 0; index < variant_options.length; index++) {
          let option_properties = variant_options[index].split(",");
          options_object[option_properties[0]] = {
            qty: option_properties[1],
            price: option_properties[2],
          };
        }

        // console.log("options object ", options_object);

        this.variants.options_1 = options_1;
        this.variants.options_2 = options_2;
        this.variants.options_3 = options_3;

        // variant_options.forEach((var_options) => {
        //   split_ops.push(var_options.split(","));
        // });

        if (options_1?.length && options_2?.length && options_3?.length) {
          // three variants
          for (let i = 0; i < options_1?.length; i++) {
            for (let j = 0; j < options_2?.length; j++) {
              for (let k = 0; k < options_3?.length; k++) {
                // let object = {
                //   name:
                //     options_1[i] +
                //     " / " +
                //     options_2[j] +
                //     " / " +
                //     this.options_3[k],
                // };
                // this.variants.push(object);
              }
            }
          }
        } else if (options_1?.length && options_2?.length) {
          // console.log(this.variants);
          this.variants = {};

          // two variants
          for (let i = 0; i < options_1?.length; i++) {
            for (let j = 0; j < options_2?.length; j++) {
              if (!this.variants[`${options_1[i]}/${options_2[j]}`]) {
                this.variants = {
                  ...this.variants,
                  ...{
                    [`${options_1[i]}/${options_2[j]}`]: {
                      name: `${options_1[i]}/${options_2[j]}`,
                      price:
                        options_object[`${options_1[i]}/${options_2[j]}`]
                          ?.price,
                      qty:
                        options_object[`${options_1[i]}/${options_2[j]}`]?.qty,
                    },
                  },
                };
                // console.log("2 variants", this.variants);
                // this.variants[options_1[i]] = { name: options_1[i] }
              }
              // let object = {
              //   name: options_1[i] + " / " + options_2[j],
              // };
              // this.variants.push(object);
            }
          }
        } else if (options_1?.length) {
          // console.log("1 varoi")
          this.variants = {};

          for (let i = 0; i < options_1?.length; i++) {
            // console.log(i)
            // this.variants.push({ name: options_1[i] });
            // console.log(this.variants,options_1[i])
            // console.log(options_1[i], options_1)
            if (!this.variants[options_1[i]]) {
              this.variants = {
                ...this.variants,
                ...{
                  [`${options_1[i]}`]: {
                    name: `${options_1[i]}`,
                    price: options_object[options_1[i]]?.price,
                    qty: options_object[options_1[i]]?.qty,
                  },
                },
              };
              // this.variants[options_1[i]] = { name: options_1[i] }
            }
            // console.log(this.variants, 'fdfa')
            // this.variants[options_1[i]] = { name: options_1[i] }
            // console.log(this.variants)

            // this.variants = []
          }
        }

        // let options = _currentProduct.variant_options
        //   ?.split(";")
        //   .filter((item) => item !== "");
        // console.log("optioons", _currentProduct.variant_options, options);
        // if (!options) {
        //   return;
        // }
        // options.forEach((item) => {
        // console.log(item);
        // let option_values = item.split(",");
        // console.log(option_values, options_1, item[0]);
        // this.variants[options_1[item[0]]] = {
        //   name: options_1[item[0]],
        //   qty: option_values[1],
        //   price: option_values[2],
        // };

        // this.variants[option_values[0]] ? this.variants[option_values[0]].qty = option_values[1] : null
        // this.variants[option_values[0]] ? this.variants[option_values[0]].price = option_values[2] : null
        // });

        // console.log("variants", this.variants);

        // if (options_1.length && options_2.length && options_3.length) {
        //   // three variants
        //   let x = 0;
        //   for (let i = 0; i < options_1.length; i++) {
        //     for (let j = 0; j < options_2.length; j++) {
        //       for (let k = 0; k < options_3.length; k++) {
        //         let object = {
        //           name:
        //             options_1[i] +
        //             " / " +
        //             options_2[j] +
        //             " / " +
        //             options_3[k],
        //           qty: split_ops[x][1],
        //           price: split_ops[x][2],
        //         };
        //         this.variants.variants.push(object);
        //         x++;
        //       }
        //     }
        //   }
        // } else if (options_1.length && options_2.length) {
        //   // two variants
        //   let x = 0;
        //   for (let i = 0; i < options_1.length; i++) {
        //     for (let j = 0; j < options_2.length; j++) {
        //       let object = {
        //         name: options_1[i] + " / " + options_2[j],
        //         qty: split_ops[x][1],
        //         price: split_ops[x][2],
        //       };
        //       this.variants.variants.push(object);
        //       x++;
        //     }
        //   }
        // } else if (options_1.length) {
        //   // one variant
        //   let x = 0;
        //   for (let i = 0; i < options_1.length; i++) {
        //     this.variants.variants.push({
        //       name: options_1[i],
        //       qty: split_ops[x][1],
        //       price: split_ops[x][2],
        //     });
        //     x++;
        //   }
        // }
      }
      // });
      // console.log("variants", this.variants);
    }
  },
};
</script>

<style scoped>
.describe {
  font-size: 14px;
  text-align: left;
  color: #69747e;
  margin-bottom: 0;
}
</style>

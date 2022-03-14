<template>
  <div>
    <h2 class="text-left text-h6 ma-5" @click="back()">
      <v-icon>mdi-chevron-left</v-icon>
      <span v-if="currentProduct">Edit {{ currentProduct.product_name }}</span>
      <span v-else>Add product</span>
    </h2>
    <v-icon class="mr-5" style="float: right; top: -47px;" @click="close"
      >mdi-close-thick</v-icon
    >

    <div class="pa-5">
      <v-container fluid class="pa-0">
        <v-card-text
          v-if="!currentProduct"
          class="text-left text-body-2 pb-2 mt-5 "
          >Upload up to five product images</v-card-text
        >

        <input
          v-if="!currentProduct"
          type="file"
          accept="image/*"
          @change="uploadImage"
        />

        <span v-if="currentProduct">
          <v-img v-if="image_preview" :src="image_preview"></v-img>
          <v-img v-else :src="currentProduct.product_image"></v-img>
        </span>
        <span v-else>
          <v-img v-if="image_preview" :src="image_preview"></v-img>
        </span>

        <input
          v-if="currentProduct"
          class="mt-5"
          type="file"
          @change="uploadImage"
          accept="image/png,image/gif,image/jpeg"
        />

        <v-card-text class="text-left text-body-2 pb-0 mt-5 px-0"
          >Product name</v-card-text
        >
        <v-text-field
          outlined
          hide-details
          class="mt-2 mb-0"
          @keyup="unsavedChangeMade()"
          v-model="product.product_name"
          :placeholder="!currentProduct ? '' : currentProduct.product_name"
        ></v-text-field>
        <v-card-text
          v-if="!currentProduct"
          class="text-left text-body-2 pt-0 mt-1 mb-5 describe"
          >Give your product a short and clear name.</v-card-text
        >
        <v-card-text class="text-left text-body-2 pb-0 mt-5 px-0"
          >Price</v-card-text
        >
        <v-text-field
          type="number"
          outlined
          hide-details
          class="mt-2 mb-0"
          @keyup="unsavedChangeMade()"
          v-model="product.price"
          :placeholder="!currentProduct ? '' : `${currentProduct.price}`"
        ></v-text-field>

        <div v-if="!product.has_variant">
           <v-card-text class="text-left text-body-2 pb-0 mt-5 px-0"
          >Stock quantity</v-card-text
        >
        <v-text-field
          type="number"
          outlined
          hide-details
          class="mt-2 mb-0"
          @keyup="unsavedChangeMade()"
          v-model="total_stock"
          :placeholder="!currentProduct ? '' : `${currentProduct.price}`"
        ></v-text-field>

        </div>
       
        <v-card-text class="text-left pb-0 mt-5 describe px-0"
          >Product Description</v-card-text
        >

        <v-textarea
          outlined
          hide-details
          class="mt-2 mb-0"
          @keyup="unsavedChangeMade()"
          v-model="product.description"
          :placeholder="!currentProduct ? '' : currentProduct.description"
        ></v-textarea>
        <v-card-text
          class="text-left text-capitalize text-caption pt-0 mt-1 mb-5 describe px-0"
          >give your product a short and clear Description.</v-card-text
        >

        <v-sheet
          id="variants"
          elevation="0"
          rounded="lg"
          color="#FDFDFD"
          class="mb-0 pa-5"
          style="border: 0.5px solid #F3F3F3;"
        >
          <div>
            <p style="text-align: left; color: #143E32; font-weight: 600;">
              <span v-if="currentProduct && product.has_variant"
                >Add product variants</span
              >
              <span v-else>Add product variants</span>
              <span class="switch">
                <v-switch
                  class="float-right mt-0 pt-0"
                  color="#4CD964"
                  style="position: relative; right: -12px;"
                  v-model="product.has_variant"
                  inset
                >
                </v-switch>
              </span>
            </p>
          </div>
          <p class="describe text-caption ">
            Add product variants like size, colour, etc. Separate each variant
            option with a comma
          </p>
          <div v-for="i in variant_index" :key="i">
            <AddVariant
              v-if="product.has_variant"
              :send_variants="get_variants"
              @sendVariants="getVariants($event)"
              :first_variant="product.first_variant"
              :second_variant="product.second_variant"
              :third_variant="product.third_variant"
              :variant_options="product.variant_options"
              :product="product"
            />
          </div>
        </v-sheet>

        <!-- non-variant qty and pricing -->
        <!-- <v-sheet
          v-if="!product.has_variant"
          elevation="0"
          rounded="lg"
          color="bg_grey"
          class="mt-5 pa-5"
        >
          <v-row align="center" justify="center" class="pa-0">
            <v-col cols="6">
              <v-text-field
                outlined
                dense
                :placeholder="!currentProduct ? 'Price' : onePrice"
                background-color="grey lighten-5"
                hide-details="true"
                v-model="product.price"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                outlined
                dense
                :placeholder="!currentProduct ? 'Qty' : oneQty"
                background-color="grey lighten-5"
                hide-details="true"
                v-model="total_stock"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-sheet> -->

        <!-- Discount -->
        <v-sheet
          elevation="0"
          rounded="lg"
          color="#fdfdfd"
          style="border: 0.5px solid #E2E8F0;box-shadow: -2px 8px 16px rgba(181, 181, 181, 0.08);
border-radius: 8px;padding: .5rem"
          class="mt-5 pa-5"
        >
          <div>
            <p
              style="text-align: left; color: #69747E; font-weight: 600; position: relative;"
            >
              Add discount
              <span class="switch">
                <v-switch
                  class="mt-0 pt-0"
                  color="success"
                  style="position: absolute; right: -12px; top: 0;"
                  v-model="product.has_discount"
                  inset
                >
                </v-switch>
              </span>
            </p>
          </div>
          <p v-if="product.has_variant" class="describe">
            Apply a uniform discount across all variants.
          </p>
          <v-row v-if="product.has_discount" class="mt-2">
            <v-col cols="6">
              <v-select
                label="Mode"
                dense
                single-line
                hide-details="true"
                v-model="product.discount_type"
                outlined
                item-text="type"
                item-value="value"
                :items="discount_types"
                item-color="success"
                background-color="grey lighten-5"
              ></v-select>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="6">
              <v-text-field
                outlined
                dense
                placeholder="Amount"
                background-color="grey lighten-5"
                hide-details="true"
                v-model="product.discount"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-sheet>

        <!-- Display -->
        <v-sheet
          id="variants"
          elevation="0"
          rounded="lg"
          color="#fdfdfd"
          style="border: 0.5px solid #E2E8F0;box-shadow: -2px 8px 16px rgba(181, 181, 181, 0.08);
border-radius: 8px;padding: .5rem"
          class="mb-0 mt-5 pa-5"
        >
          <div>
            <p style="text-align: left; color: #69747E; font-weight: 600;">
              Display in gallery
              <span class="switch">
                <v-switch
                  class="float-right mt-0 pt-0"
                  color="success"
                  style="position: relative; right: -12px;"
                  v-model="product.display"
                  inset
                >
                </v-switch>
              </span>
            </p>
            <p class="describe ">
              Products displayed in your gallery are available for purchase. Set
              display to "off" to make them unavailable.
            </p>
          </div>
        </v-sheet>
        <!-- 
        <v-card-actions 
        class="mt-5 justify-center light_grey rounded-lg"
        > -->
        <!-- <v-btn 
            class="main_blue ma-3 ml-5"
            depressed
            @click="finishCreation()"
          > -->
        <!-- Add product -->
        <!-- </v-btn> -->

        <Button
          v-if="currentProduct"
          size="large"
          :containerStyle="{ marginTop: '2rem' }"
          label="Save Product"
          :block="true"
          :primary="true"
          @onClick="fetchVariants()"
        />

        <Button
          v-else
          size="large"
          :containerStyle="{ marginTop: '2rem' }"
          label="Add Product"
          :block="true"
          :primary="true"
          @onClick="fetchVariants()"
        />
        <!-- </v-card-actions> -->
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as mutationTypes from "@/store/mutationTypes";
import {
  createProduct,
  fethcStoreInventory,
  updateProduct,
} from "@/services/apiServices";
import { EventBus } from "@/services/eventBus";

import AddVariant from "@/components/AddVariant";
import Button from "./Button/Button.vue";

export default {
  name: "AddOrEditProduct",
  components: {
    AddVariant,
    Button,
  },
  data: () => {
    return {
      product: {
        first_variant: [],
        second_variant: [],
        third_variant: [],
      },
      variant_pairs: 25, // should be an array
      description: "",
      discount: "",
      discount_type: "0",
      discount_types: [
        // get this from API (not built yet)
        // {value: "0", type: 0}, doesn't recognise as true
        { value: 1, type: "Percentage" },
        { value: 2, type: "Amount" },
      ],
      // display: true,
      get_variants: false,
      // hasDiscountError: false, // change casing
      // has_discount: false,
      // has_variant: false,
      image_preview: null,
      // preview: null,
      // price: "",
      // id: null,
      // product_name: "",
      // product_image: "",
      loading: false,
      total_stock: "",
      uploading_image: false, // implement loading icon
      variants_with_options: [],
      variant_index: 1, // not zero indexed
      variant_data: {},
    };
  },
  methods: {
    back() {
      this.currentProduct ? this.$emit("back") : this.close();
    },
    close() {
      this.$emit("close");
      // this.$store.commit(mutationTypes.SET_PRODUCT_TO_BE_EDITTED, {});
    },
    fetchVariants() {
      if (this.product.has_variant) {
        this.get_variants = true;
      } else {
        this.finishCreation();
      }
      // this.get_variants = false
    },
    composePayload() {
      // this.has_variant ? (this.get_variants = true) : "";
      // var variant_1_options = this.variants_with_options.variant_1_options.reduce((acc, curr) => {
      //   acc += `${curr},`
      //   return acc
      // })
      // try {
      //   var variant_2_options = this.variants_with_options.variant_2_options.reduce((acc, curr) => {
      //     acc += `${curr},`
      //     return acc
      //   })
      // } catch {variant_2_options = ""}

      // let variant_options = this.generatePairs.reduce((acc, curr) => {
      //   acc += `${curr.text},${curr.qty},`;
      //   return acc;
      // }, "");

      // console.log(variant_options, this.variants)

      // let data = {
      //   // only add parameters that have values/new values so not to overwite the existing stuff with empty values
      //   product_name: this.product_name,
      //   description: this.description,
      //   has_discount: this.has_discount,
      //   has_variant: this.has_variant,
      //   first_variant_name: this.variants_with_options.variant_name_1,
      //   second_variant_name: this.variants_with_options.variant_name_2,
      //   first_variant: this.variants_with_options.variant_1_options,
      //   second_variant: this.variants_with_options.variant_2_options,
      //   variant_options: this.variants_with_options.variant_options,
      //   price: parseFloat(this.price) * 100,
      //   total_stock: this.total_stock,
      //   discount_type: this.discount_type,
      //   discount: this.discount,
      //   display: this.display,
      //   store: this.store.store_name,
      //   has_discount: this.addDiscount,

      //   // first_variant_name: this.variants[0] ? this.variants[0].key : "",
      //   // first_variant: this.variants[0]
      //   //   ? this.variants[0].values.reduce(
      //   //       (cumm, curr) => (cumm += `${curr.value},`),
      //   //       ""
      //   //     )
      //   //   : "",
      //   // second_variant_name: this.variants[1] ? this.variants[1].key : "",
      //   // second_variant: this.variants[1]
      //   //   ? this.variants[1].values.reduce(
      //   //       (cumm, curr) => (cumm += `${curr.value},`),
      //   //       ""
      //   //     )
      //   //   : "",
      // };
      // console.log(data)
      return this.product;
    },
    finishCreation() {
      // this.get_variants = true;
      // console.log(this.composePayload())
      let data = {
        ...this.product,
        ...{
          first_variant_name: this.variants_with_options.variant_name_1,
          second_variant_name: this.variants_with_options.variant_name_2,
          first_variant: this.variants_with_options.variant_1_options,
          second_variant: this.variants_with_options.variant_2_options,
          variant_options: this.variants_with_options.variant_options,
          store: this.store.store_name,
          price: Number(this.product.price),
          total_stock: this.total_stock,
        },
      };
      delete data.product_image;
      if (data.has_variant) {
        // data.price = 0;
        // data.total_stock = 0
      }
      if (this.hasDiscountError) {
        return;
      }
      if (this.product.id) {
        console.log(data, this.variants_with_options);
        updateProduct(data, this.product.id)
          .then(() => {
            EventBus.$emit(
              "open_alert",
              "success",
              this.currentProduct
                ? "Product updated successfully"
                : "Product created successfully"
            );
            this.product = {
              product_image: null,
              product_name: null,
              description: "",
              has_discount: false,
              has_variant: false,
              discount_type: "0",
              discount: "",
              product_id: null,
              price: null,
              total_stock: null,
              display: false,
            };
            EventBus.$emit("close_drawer");
            EventBus.$emit("close_drawer");
            fethcStoreInventory(this.storeSlug);
          })
          .catch((err) => {
            console.log(err.response.data);
            EventBus.$emit(
              "open_alert",
              "error",
              Object.values(err.response.data)[0][0]
            );
          })
          .finally(() => {
            this.loading = false;
            this.currentProduct ? this.$emit("back") : this.close();
          });
      } else {
        EventBus.$emit("open_alert", "error", "please upload a product image");
      }
      this.get_variants = false;

      // this.loading = true;
    },
    getVariants(variant_data) {
      this.variant_data = variant_data;
      this.variants_with_options = variant_data;
      if (this.product.has_variant) {
        this.total_stock = variant_data.total_stock;
      }
      // this.price = variant_data.price;

      // this.$nextTick(function(){
      //   this.get_variants = false
      // })
    },
    unsavedChangeMade() {
      this.$store.commit(mutationTypes.UNSAVED_CHANGE, true);
    },
    uploadImage(e) {
      const image = e.target.files[0];
      this.image_preview = URL.createObjectURL(image);

      let form = new FormData();
      form.append("product_image", e.target.files[0]);
      this.uploading_image = true;

      if (!this.product.id) {
        createProduct(form)
          .then((res) => {
            this.product.product_image = res.data.product_image;
            this.product.id = res.data.id;
            this.product.temp_id = res.data.id;
            console.log(res);
          })
          .catch((err) => {
            this.image_preview = "";
            EventBus.$emit(
              "open_alert",
              "error",
              Object.values(err.response.data)[0][0]
            );
          })
          .finally(() => {
            this.uploading_image = false;
          });
      } else {
        updateProduct(this.product, this.product.id)
          .then((res) => {
            console.log(res);
            // EventBus.$emit(
            //   "open_alert",
            //   "success",
            //   this.currentProduct
            //     ? "Product updated successfully"
            //     : "Product created successfully"
            // );
            // EventBus.$emit("close_drawer");
            fethcStoreInventory(this.store.slug);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
  watch: {
    variant_data() {
      this.finishCreation();
    },
  },
  computed: {
    ...mapGetters({
      store: "getStore",
      storeSlug: "getStoreSlug",
      currentProduct: "getProductToBeEditted",
      unsavedChange: "getUnsavedChange",
    }),
    onePrice() {
      try {
        return this.currentProduct.price.toString();
      } catch {
        return null;
      }
    },
    oneQty() {
      try {
        return this.currentProduct.total_stock.toString();
      } catch {
        return null;
      }
    },
    // has_variant = this.currentProduct.has_variant
  },
  mounted() {
    // console.log(this.currentProducct);
    EventBus.$on("get_variants", () => {
      console.log("get variants activated from edit product");
    });

    if (this.currentProduct) {
      this.product = this.currentProduct;
    } else {
      this.product = {
        product_image: null,
        product_name: null,
        description: "",
        has_discount: false,
        has_variant: false,
        discount_type: "0",
        discount: "",
        id: null,
        price: 0,
        total_stock: null,
        display: false,
      };
    }

    // this.has_variant = this.currentProduct?.has_variant;
    // console.log(this.currentProduct);
    // if (this.currentProduct) {
    //   this.product_image = this.currentProduct.product_image;
    //   this.product_name = this.currentProduct.product_name;
    //   this.description = this.currentProduct.description;
    //   this.has_discount = this.currentProduct.has_discount;
    //   this.has_variant = this.currentProduct.has_variant;
    //   this.discount_type = this.currentProduct.discount_type;
    //   this.discount = this.currentProduct.discount;
    //   this.product_id = this.currentProduct.id;
    //   this.price = this.currentProduct.price;
    //   this.total_stock = this.currentProduct.total_stock;
    //   this.display = this.currentProduct.display;

    //   //   let variants = [];
    //   //   this.variants = variants;
    // } else {
    //   this.product_image = null;
    //   this.product_name = null;
    //   this.description = "";
    //   this.has_discount = false;
    //   this.has_variant = false;
    //   this.discount_type = "0";
    //   this.discount = "";
    //   this.product_id = null;
    //   this.price = null;
    //   this.total_stock = null;
    //   this.display = false;
    // }
  },
  created() {
    // this.currentProduct.one_price ? this.generalPrice = currentProduct.total_stock
    // console.log(this.has_variant)
    // this.$nextTick(function(){
    //   this.has_variant = this.currentProduct.has_variant
    //   console.log(this.has_variant)
    // })
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

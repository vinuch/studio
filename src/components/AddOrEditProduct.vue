<template>
  <div>
    <h2 class="text-left text-h6 ma-5" @click="back()">
      <v-icon>mdi-chevron-left</v-icon>
      <span v-if="currentProduct.id">{{ currentProduct.product_name }}</span>
      <span v-else>Add product</span>
    </h2>
    <v-icon
      class="mr-5" 
      style="float: right; top: -47px;"
      @click="close"
    >mdi-close-thick</v-icon>

    <div class="pa-5">
      <v-container
        fluid
        class="pa-0"
      >
        <v-card-text class="text-left text-body-2 pb-2 mt-5 ">Upload up to five product images</v-card-text>

        <input type=file accept="image/*" @change="uploadImage">
        <v-img v-if="image_preview" :src="image_preview"></v-img>

        <v-card-text class="text-left text-body-2 pb-0 mt-5 ">Product name</v-card-text>
        <v-text-field
          outlined
          hide-details
          class="mt-2 mb-0"
          @keyup="unsavedChangeMade()"
          v-model="product_name"
          :placeholder="!currentProduct ? '' : currentProduct.product_name"
        ></v-text-field>
        <v-card-text
          v-if="!currentProduct"
          class="text-left text-body-2 pt-0 mt-1 mb-5 describe"
        >Give your product a short and clear name.</v-card-text>

        <v-card-text class="text-left pb-0 mt-5 describe">Description</v-card-text>

        <v-textarea
          outlined
          hide-details
          class="mt-2 mb-0"
          @keyup="unsavedChangeMade()"
          v-model="description"
          :placeholder="!currentProduct ? '' : currentProduct.description"
        ></v-textarea>
        <v-card-text class="text-left pt-0 mt-1 mb-5 describe">Provide a clear description for your customers.</v-card-text>

        <v-sheet
          id="variants"
          elevation="0"
          rounded="lg"
          color="bg_grey"
          class="mb-0 pa-5"
        >
          <div>
            <p
            style="text-align: left; color: #69747E; font-weight: 600;"
            >
              <span v-if="currentProduct.has_variant">Variants</span>
              <span v-else>Add product variants</span>
              <span class="switch">
                <v-switch
                class="float-right mt-0 pt-0"
                color="success"
                style="position: relative; right: -12px;"
                v-model="has_variant"
                inset
              >
              </v-switch>
              </span>
            </p>
          </div>
          <p class="describe ">This product comes in variants e.g. different sizes, colours, materials, etc.</p>
          <div
            v-for="i in variant_index"
            :key="i"
          >
            <AddVariant v-if="has_variant"
              :send_variants="get_variants"
              :variant_payload="variant_payload"
              @sendVariants="getVariants($event)"
            />
          </div>
        </v-sheet>

        <!-- non-variant qty and pricing -->
        <v-sheet
          v-if="!has_variant"
          elevation="0"
          rounded="lg"
          color="bg_grey"
          class="mt-5 pa-5"
        >
          <v-row
            align="center"
            justify="center"
            class="pa-0"
          > 
            <v-col cols=6>
              <v-text-field
                outlined
                dense
                :placeholder="!currentProduct ? 'Price' : onePrice"
                background-color="grey lighten-5"
                hide-details="true"
                v-model="price"
              ></v-text-field>
            </v-col>
            <v-col cols=6>
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
        </v-sheet>

        <!-- Discount -->
        <v-sheet
          elevation="0"
          rounded="lg"
          color="bg_grey"
          class="mt-5 pa-5"
        >
          <div>
            <p
              style="text-align: left; color: #69747E; font-weight: 600; position: relative;"
            >Add discount 
              <span class="switch">
                <v-switch
                class="mt-0 pt-0"
                color="success"
                style="position: absolute; right: -12px; top: 0;"
                id="switch"
                v-model="has_discount"
                inset
              >
              </v-switch>
              </span>
            </p>
          </div>
          <p v-if="has_variant" class="describe">Apply a uniform discount across all variants.</p>          
          <v-row v-if="has_discount" class="mt-2">
            <v-col cols=6>
              <v-select
                label="Mode"
                dense
                single-line
                hide-details="true"
                v-model="discount_type" 
                outlined 
                item-text="type"
                item-value="value"
                :items="discount_types"
                item-color="success"
                background-color="grey lighten-5"
              ></v-select>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols=6>
              <v-text-field
                outlined
                dense
                placeholder="Amount"
                background-color="grey lighten-5"
                hide-details="true"
                v-model="discount"
                ></v-text-field>
            </v-col>
          </v-row>
        </v-sheet>
        
        <!-- Display -->
        <v-sheet
          id="variants"
          elevation="0"
          rounded="lg"
          color="bg_grey"
          class="mb-0 mt-5 pa-5"
        >
          <div>
            <p
            style="text-align: left; color: #69747E; font-weight: 600;"
            >Display in gallery 
              <span class="switch">
                <v-switch
                class="float-right mt-0 pt-0"
                color="success"
                style="position: relative; right: -12px;"
                id="switch"
                v-model="display"
                inset
              >
                </v-switch>
              </span>
            </p>
            <p class="describe ">Products displayed in your gallery are available 
              for purchase. Set display to "off" to make them unavailable.</p>
          </div>
        </v-sheet>

        <v-card-actions 
        class="mt-5 justify-center light_grey rounded-lg"
        >
          <v-btn 
            class="main_blue ma-3 ml-5"
            depressed
            @click="finishCreation()"
          >
            Add product
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
    createProduct,
    fethcStoreInventory,
    updateProduct,
  } from "@/services/apiServices"
  import { EventBus } from "@/services/eventBus"

  import AddVariant from "@/components/AddVariant"

  export default {
    name: 'AddOrEditProduct',
    components: {
      AddVariant,
    },
    props: [
      "variant_payload",
    ],
    data: () => {
			return {
        variant_pairs: 25, // should be an array
        description: "",
        discount: "",
        discount_type: "0",
        discount_types: [
          // get this from API (not built yet)
          // {value: "0", type: 0}, doesn't recognise as true
          {value: 1, type: "Percentage"}, 
          {value: 2, type: "Amount"},
        ],
        display: true,
        get_variants: false,
        hasDiscountError: false, // change casing
        has_discount: false,
        has_variant: false,
        image_preview: null,
        preview: null,
        price: "",
        product_id: null,
        product_name: "",
        product_image: "",
        loading: false,
        total_stock: "",
        uploading_image: false, // implement loading icon
        variants_with_options: [],
        variant_index: 1, // not zero indexed
      }
    },
    methods: {
      back() {
        this.$emit("back")
      },
      close() {
        this.$emit("close")
        this.$store.commit(mutationTypes.SET_PRODUCT_TO_BE_EDITTED, {});
      },
      composePayload() {
        this.has_variant ? this.get_variants = true : ""
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

        let data = {
          // only add parameters that have values/new values so not to overwite the existing stuff with empty values
          product_name: this.product_name,
          description: this.description,
          has_discount: this.has_discount,
          has_variant: this.has_variant,
          first_variant_name: this.variants_with_options.variant_name_1,
          second_variant_name: this.variants_with_options.variant_name_2,
          first_variant: this.variants_with_options.variant_1_options,
          second_variant: this.variants_with_options.variant_2_options,
          variant_options: this.variants_with_options.variant_options,
          price: parseFloat(this.price) * 100,
          total_stock: this.total_stock,
          discount_type: this.discount_type,
          discount: this.discount,
          display: this.display,
          store: this.store.store_name,
          // has_discount: this.addDiscount,

          // first_variant_name: this.variants[0] ? this.variants[0].key : "",
          // first_variant: this.variants[0]
          //   ? this.variants[0].values.reduce(
          //       (cumm, curr) => (cumm += `${curr.value},`),
          //       ""
          //     )
          //   : "",
          // second_variant_name: this.variants[1] ? this.variants[1].key : "",
          // second_variant: this.variants[1]
          //   ? this.variants[1].values.reduce(
          //       (cumm, curr) => (cumm += `${curr.value},`),
          //       ""
          //     )
          //   : "",
        }
        return data
      },
      finishCreation() {
        let data = this.composePayload()
        if (this.hasDiscountError) {
          return;
        }
        this.loading = true;
        updateProduct(data, this.product_id)
          .then(() => {
            EventBus.$emit(
              "open_alert",
              "success",
              this.currentItem
                ? "Product updated successfully"
                : "Product created successfully"
            );
            EventBus.$emit("close_drawer");
            fethcStoreInventory(this.store.slug)
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.loading = false
          });
      },
      getVariants(variant_data) {
        this.variants_with_options = variant_data
        this.total_stock = variant_data.total_stock
        this.price += 1

        // this.$nextTick(function(){
        //   this.get_variants = false
        // })
      },
      unsavedChangeMade() {
        this.$store.commit(mutationTypes.UNSAVED_CHANGE, true);
      },
      uploadImage(e) {
        const image = e.target.files[0]
        this.image_preview = URL.createObjectURL(image)

        let form = new FormData();
        form.append("product_image", e.target.files[0]);
        this.uploading_image = true;
        createProduct(form)
          .then((res) => {
            this.product_image = res.data.product_image;
            this.product_id = res.data.id;
          })
          .catch(() => {
            EventBus.$emit("error", "There was an error uploading the image")
          })
          .finally(() => {
            this.uploading_image = false;
          });
      },
    },
    computed: {
      ...mapGetters({
        store: "getStore",
        currentProduct: "getProductToBeEditted",
        unsavedChange: "getUnsavedChange",
      }),
      onePrice() {
        try {
          return this.currentProduct.price.toString()
        } catch {
          return null
        }
      },
      oneQty() {
        try {
          return this.currentProduct.total_stock.toString()
        } catch {
          return null
        }
      },
      // has_variant = this.currentProduct.has_variant
    },
    created() {
      this.has_variant = this.currentProduct.has_variant
        // this.currentProduct.one_price ? this.generalPrice = currentProduct.total_stock

      // console.log(this.has_variant)
      // this.$nextTick(function(){
      //   this.has_variant = this.currentProduct.has_variant
      //   console.log(this.has_variant)
      // })
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
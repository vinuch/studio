<template>
  <div class="pa-5">
    <topNav>Inventory</topNav>
    <div
      :style="
        `margin-top: 4rem; min-height: 80vh; ${
          email_verified ? 'marginTop:4rem' : 'marginTop:8rem'
        }`
      "
    >
      <div
        v-if="inventory.length < 1"
        style="min-height: 80vh; display: flex; align-items: center"
      >
        <v-container>
          <Inventory />
          <h3
            class="justify-center"
            style="font-weight: 600; font-size: 1.3rem"
          >
            Add and manage your products
          </h3>
          <p>This is where you’ll add products and manage product.</p>

          <Button
            :block="true"
            label="Add your first product"
            :primary="true"
            size="large"
            @onClick="addProduct()"
          />
        </v-container>
      </div>
      <v-container v-else fluid class="pa-0">
        <!-- <v-row class="pa-0">
        <v-col cols="9">
          <v-text-field
            outlined
            prepend-inner-icon="mdi-magnify"
            placeholder="Name search"
            background-color="grey lighten-5"
          >
          </v-text-field>
        </v-col>
        <v-col cols="3" class="">
          <v-btn
            color="primary"
            height="55"
            depressed
            @click="edit_product_drawer = true"
            ><v-icon>mdi-plus</v-icon></v-btn
          >
        </v-col>
      </v-row> -->
        <v-row class="pa-0" style="align-items: flex-start">
          <v-col cols="9">
            <TextInput
              placeholder="Search by name"
              name="search"
              inputStyles="background-color: #FDFDFD; margin-bottom: 0 !important;"
              @update="handleSearch"
            >
              <!-- <template v-slot:prepend-inner>
                <Search />
              </template> -->
            </TextInput>
          </v-col>
          <v-col cols="3" class="">
            <Button
              :block="true"
              :primary="true"
              :containerStyle="{ marginTop: '.2rem' }"
              @onClick="edit_product_drawer = true"
            >
              <template v-slot:child>
                <v-icon>mdi-plus</v-icon>
              </template>
            </Button>
            <!-- <v-btn
              color="primary"
              height="55"
              depressed
              @click="product_drawer = true"
              ><v-icon>$vuetify.icons.filter</v-icon></v-btn
            > -->
          </v-col>
        </v-row>

        <div
          style="
            max-height: 70vh;
            width: 100%;
            overflow-y: auto;
            overflow-x: hidden;
             margin: -2rem 0;
            padding: 20px 0;
          "
        >
          <Product
            v-for="(product, i) in (filteredInventory || inventory)"
            :key="i"
            class="mb-5 cursor"
            :product="product"
            @viewProduct="viewProduct()"
          />
        </div>
      </v-container>
      <v-navigation-drawer app right :width="400" v-model="edit_product_drawer">
        <AddOrEditProduct
          v-if="edit_product_drawer"
          :variant_payload="variant_payload"
          @back="backToProductView()"
          @close="closeAddEditDrawer()"
        />
      </v-navigation-drawer>
      <v-navigation-drawer app right :width="400" v-model="view_product_drawer">
        <!-- @close="closeProductViewDrawer()"  -->
        <!-- :clear_variants="clear_variants" -->
        <ProductView
          v-if="currentProduct"
          @back="backToInventory()"
          @editProduct="editProduct($event)"
        />
      </v-navigation-drawer>
      <menu-spacer></menu-spacer>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as mutationTypes from "@/store/mutationTypes";
// import { fethcStoreInventory } from "@/services/apiServices";
// import { EventBus } from "@/services/eventBus";
import Button from "@/components/Button";
import Inventory from "@/components/Icons/Inventory";
import TextInput from "@/components/TextInput";
import { fethcStoreInventory } from "@/services/apiServices";
import topNav from "@/components/TopNav";
import Product from "@/components/Product";
import ProductView from "@/components/ProductView";
import AddOrEditProduct from "@/components/AddOrEditProduct";
import MenuSpacer from "@/components/MenuSpacer.vue";

export default {
  // name: 'Inventory',
  components: {
    Inventory,
    Button,
    topNav,
    Product,
    ProductView,
    AddOrEditProduct,
    MenuSpacer,
    TextInput,
  },
  data: () => {
    return {
      // clear_variants: false,
      display: true,
      edit_product_drawer: false,
      view_product_drawer: false,
      variant_payload: {},
      filteredInventory: null
      // inventory: [{
      //   has_variant: false,
      //   id: 1,
      //   product_name: 'book',

      // }]
    };
  },
  methods: {
    handleSearch(e) {
      this.filteredInventory = this.inventory.filter(item => item.product_name.toLowerCase().includes(e.toLowerCase()));
    },
    addProduct() {
      this.edit_product_drawer = true;
    },
    backToInventory() {
      // this.clear_variants=true
      this.view_product_drawer = false;
      this.$store.commit(mutationTypes.SET_PRODUCT_TO_BE_EDITTED, null);
    },
    backToProductView() {
      this.view_product_drawer = true;
      this.edit_product_drawer = false;
    },
    closeAddEditDrawer() {
      this.edit_product_drawer = false;
      // this.variant_payload = {
      //   options_1: [],
      //   options_2: [],
      //   options_3: [],
      //   variants: [],
      // }

      // if (this.currentProduct && this.unsavedChange) {
      //   this.showConfirm();
      // } else {
      //   this.visible = false;
      this.$store.commit(mutationTypes.SET_PRODUCT_TO_BE_EDITTED, null);
      // }
    },
    closeProductViewDrawer() {
      // this.view_product_drawer = false
    },
    editProduct(variant_payload) {
      this.variant_payload = variant_payload;
      this.view_product_drawer = false;
      this.edit_product_drawer = true;
    },
    openAdd() {
      this.$store.commit(mutationTypes.SET_PRODUCT_TO_BE_EDITTED, null);
      this.visible = true;
      this.emitOpen();
    },
    showConfirm() {
      this.$confirm({
        title: "Save progress?",
        content:
          "You have unsaved changes. Proceeding will mean losing these changes",
        onOk: () => {
          this.visible = false;
        },
        onCancel() {},
      });
    },
    viewProduct() {
      this.view_product_drawer = true;
    },
  },
  computed: {
    ...mapGetters({
      inventory: "getInventory",
      store: "getStore",
      storeSlug: "getStoreSlug",
      email_verified: "getEmailStatus",

      currentProduct: "getProductToBeEditted",
      // unsavedChange: "getUnsavedChange",
    }),
  },
  mounted() {
    this.$store.commit(mutationTypes.SET_PRODUCT_TO_BE_EDITTED, null);
    fethcStoreInventory(this.storeSlug);
  },
};
</script>

<style scoped>
.v-text-field__details {
  display: none !important;
}

.v-input__slot {
  margin-bottom: 0 !important;
}
</style>

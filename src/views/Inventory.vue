<template>
  <div class="pa-5">
    <topNav>Inventory</topNav>
		<v-container v-if="inventory.length < 1">
			<p>This is where your products will be.</p>
      <v-btn
        depressed 
        color="success" 
        @click="addProduct()"
      >Add your first product</v-btn>
		</v-container>

		<v-container
      v-else
      fluid
      class="pa-0"
    >
      <v-row class="pa-0">
        <v-col cols=9>
          <v-text-field
            outlined
            prepend-inner-icon="mdi-magnify"
            placeholder="Name search"
            background-color="grey lighten-5"
          >
          </v-text-field>
        </v-col>
        <v-col cols=3 class="">
          <v-btn
            color="primary"
            height="55"
            depressed
            @click="edit_product_drawer=true"
          ><v-icon>mdi-plus</v-icon></v-btn>
        </v-col>
      </v-row>

			<v-row class="ma-0">
        <OrderItem
          v-for="(order, i) in orders"
          :key="i"
          class="mb-5"
          :order="order"
          @viewProduct="viewProduct()"
        />
			</v-row>
			<!-- <v-row class="ma-0">
        <Product
          v-for="(product, i) in inventory"
          :key="i"
          class="mb-5"
          :product="product"
          @viewProduct="viewProduct()"
        />
			</v-row> -->
    </v-container>
    <v-navigation-drawer
      app
      right
      :width="400"
      v-model="edit_product_drawer"
    >
      <AddOrEditProduct
        :variant_payload="variant_payload"
        @back="backToProductView()"
        @close="closeAddEditDrawer()"
      />
    </v-navigation-drawer>
    <v-navigation-drawer
      app
      right
      :width="400"
      v-model="view_product_drawer"
    >
        <!-- @close="closeProductViewDrawer()"  -->
        <!-- :clear_variants="clear_variants" -->
      <ProductView
        @back="backToInventory()"
        @editProduct="editProduct($event)"
      />
    </v-navigation-drawer>
    <menu-spacer></menu-spacer>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import * as mutationTypes from "@/store/mutationTypes";
  // import { fethcStoreInventory } from "@/services/apiServices";
  // import { EventBus } from "@/services/eventBus";
  
  import topNav from "@/components/TopNav"
  // import Product from "@/components/Product"
  import OrderItem from "@/components/OrderItem"
  import ProductView from "@/components/ProductView"
  import AddOrEditProduct from "@/components/AddOrEditProduct"
  import MenuSpacer from '@/components/MenuSpacer.vue'

  export default {
    name: 'Inventory',
    components: {
      topNav,
      // Product,
      OrderItem,
      ProductView,
      AddOrEditProduct,
      MenuSpacer,
    },
    data: () => {
			return {
        // clear_variants: false,
        display: true,
        edit_product_drawer: false,
        view_product_drawer: false,
        variant_payload: {},
      }
    },
    methods: {
      addProduct() {
        this.edit_product_drawer=true
      },
      backToInventory() {
        // this.clear_variants=true
        this.view_product_drawer=false
        this.$store.commit(mutationTypes.SET_PRODUCT_TO_BE_EDITTED, {})
      },
      backToProductView() {
        this.view_product_drawer=true
        this.edit_product_drawer=false
      },
      closeAddEditDrawer() {
        this.edit_product_drawer = false
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
          this.$store.commit(mutationTypes.SET_PRODUCT_TO_BE_EDITTED, {})
        // }
      },
      closeProductViewDrawer() {
        // this.view_product_drawer = false
      },
      editProduct(variant_payload) {
        this.variant_payload = variant_payload
        this.view_product_drawer=false
        this.edit_product_drawer=true
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
        this.view_product_drawer=true
      },
    },
    computed: {
      ...mapGetters({
        inventory: "getInventory",
        store: "getStore",
        orders: "getOrders",
        // currentProduct: "getProductToBeEditted",
        // unsavedChange: "getUnsavedChange",
      }),
    },
  }
</script>

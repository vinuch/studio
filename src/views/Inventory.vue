<template>
  <div class="pa-5">
    <topNav>Inventory</topNav>
		<v-container v-if="!inventory">
			<p>You have no orders yet</p>
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
            @click="product_drawer=true"
          ><v-icon>mdi-plus</v-icon></v-btn>
        </v-col>
      </v-row>

			<v-row class="ma-0">
        <Products
          v-for="(product, i) in inventory"
          :key="i"
          class="mb-5"
          :product="product"
          @click="viewProduct(product)"
        />
			</v-row>
    </v-container>
    <v-navigation-drawer
      app
      right
      :width="400"
      v-model="product_drawer"
    >
      <AddProduct @close="close()" />
    </v-navigation-drawer>
    <menu-spacer></menu-spacer>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import * as mutationTypes from "@/store/mutationTypes";
  import { fethcStoreInventory } from "@/services/apiServices";
  import { EventBus } from "@/services/eventBus";
  
  import topNav from "@/components/TopNav"
  import Products from "@/components/Products"
  import AddProduct from "@/components/AddProduct"
  import MenuSpacer from '../components/MenuSpacer.vue'
  // import InventoryItem from "@/components/InventoryItem"

  export default {
    name: 'Inventory',
    components: {
      topNav,
      Products,
      AddProduct,
      MenuSpacer,
      // InventoryItem,
    },
    data: () => {
			return {
        display: true,
        product_drawer: null,
      }
    },
    methods: {
      close() {
        this.product_drawer = false
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
      closeDrawer() {
        if (this.currentProduct && this.unsavedChange) {
          this.showConfirm();
        } else {
          this.visible = false;
          this.$store.commit(mutationTypes.SET_PRODUCT_TO_BE_EDITTED, {});
        }
      },
      viewProduct(product) {
        this.$store.commit(mutationTypes.UNSAVED_CHANGE, false);
        this.$store.commit(mutationTypes.SET_PRODUCT_TO_BE_EDITTED, product);
        this.visible = true;
        this.emitOpen();
      },
      openAdd() {
        this.$store.commit(mutationTypes.SET_PRODUCT_TO_BE_EDITTED, null);
        this.visible = true;
        this.emitOpen();
      },
      emitOpen() {
        EventBus.$emit("openDrawer");
      },
    },
    computed: {
      ...mapGetters({
        inventory: "getInventory",
        store: "getStore",
        currentProduct: "getProductToBeEditted",
        unsavedChange: "getUnsavedChange",
      }),
    },
    mounted() {
      // if (window.innerWidth < 640) {
      //   this.drawerWidth = window.innerWidth;
      // }

      // window.addEventListener("resize", () => {
      //   if (this.$refs.inv.scrollWidth < 1000) {
      //     this.drawerWidth = window.innerWidth;
      //   } else {
      //     this.drawerWidth = 640;
      //   }
      // });

      fethcStoreInventory(this.store.slug);
      EventBus.$on("close_drawer", () => (this.visible = false));
    },
  }
</script>

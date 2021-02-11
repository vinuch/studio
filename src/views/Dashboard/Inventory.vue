<template>
  <div class="inventory">
    <p class="page-title utb">
      <span>
        Inventory
      </span>

      <a-button
        @click="openAdd()"
        class="main-btn"
        style="float: right; height: 40px"
      >
        Add product
      </a-button>
    </p>

    <div class="empty" v-if="!inventory.length">
      <img src="../../assets/discount.svg" alt="" />
    </div>

    <div class="inventory-items">
      <a-row :gutter="20">
        <a-col
          :sm="12"
          :md="8"
          :lg="6"
          v-for="(item, i) in inventory"
          :key="'order' + i"
          @click="viewProduct(item)"
        >
          <OrderItem :product="item" />
        </a-col>
      </a-row>
    </div>

    <a-drawer
      placement="right"
      :closable="false"
      :visible="visible"
      :width="drawerWidth"
      :maskStyle="{
        backgroundColor: 'rgba(16, 16, 44, 0.25);',
      }"
    >
      <div class="drawer-title" slot="title">
        <span class="utb">
          {{ currentItem ? "Update Product" : "Upload new product" }}
        </span>
        <img
          @click="closeDrawer"
          src="../../assets/close.svg"
          alt=""
          style="cursor: pointer"
        />
      </div>

      <AddProduct />
    </a-drawer>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import AddProduct from "../../components/AddProduct";
import OrderItem from "../../components/OrderItem";
import * as mutationTypes from "../../store/mutationTypes";
import { fethcStoreInventory } from "../../services/apiServices";
import { EventBus } from "../../services/eventBus";
export default {
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    ...mapGetters({
      inventory: "getInventory",
      store: "getStore",
      currentItem: "getItemToBeEditted",
      formTouched: "getFormTouched",
    }),
    drawerWidth() {
      return window.innerWidth > 640 ? 640 : window.innerWidth;
    },
  },
  components: {
    AddProduct,
    OrderItem,
  },
  mounted() {
    fethcStoreInventory(this.store.slug);
    EventBus.$on("close_drawer", () => (this.visible = false));
  },
  methods: {
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
      if (this.currentItem && this.formTouched) {
        this.showConfirm();
      } else {
        this.visible = false;
      }
    },
    viewProduct(item) {
      this.$store.commit(mutationTypes.FORM_TOUCHED, false);
      this.$store.commit(mutationTypes.SAVE_PRODUCT_TO_BE_EDITTED, item);
      this.visible = true;
      this.emitOpen();
    },
    openAdd() {
      this.$store.commit(mutationTypes.SAVE_PRODUCT_TO_BE_EDITTED, null);
      this.visible = true;
      this.emitOpen();
    },
    emitOpen() {
      EventBus.$emit("openDrawer");
    },
  },
};
</script>
<style lang="scss">
.inventory {
  padding: 30px 200px;
  text-align: left;
  .empty {
    width: 100%;
    padding-top: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .inventory-items {
  }
  @media (max-width: 767px) {
    padding: 0px 20px 100px;
    .page-title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
    .inventory-items {
      margin-top: 40px;
    }
  }
}
.ant-drawer-header {
  padding: 0 !important;
  border: 0 !important;
}
</style>

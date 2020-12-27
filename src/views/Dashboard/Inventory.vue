<template>
  <div class="inventory">
    <p class="page-title utb">
      <span>
        Inventory
      </span>

      <a-button
        @click="visible = true"
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
          :xs="12"
          :sm="12"
          :md="8"
          :lg="6"
          v-for="(item, i) in inventory"
          :key="'order' + i"
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
        <span class="utb">Add product</span>
        <img
          @click="visible = false"
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
.drawer-title {
  height: 72px;
  border-bottom: 1px solid #e6e9ef;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  span {
    font-size: 18px;
    line-height: 22px;
    color: #2b2b2b;
  }
}
</style>

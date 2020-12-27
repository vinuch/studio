<template>
  <div class="store-view">
    <StoreNav />
    <div class="empty" v-if="!inventory.length">
      <img src="../assets/discount.svg" alt="" />
      <p>No products yet, check back later</p>
    </div>

    <div class="order-items">
      <a-row :gutter="20">
        <a-col
          :xs="12"
          :sm="12"
          :md="8"
          :lg="6"
          v-for="(item, i) in inventory"
          :key="'item' + i"
        >
          <StoreItem :product="item" />
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import StoreItem from "../components/StoreItem";
import StoreNav from "../components/StoreNav";
import { fethcStoreInventory } from "../services/apiServices";
import * as mutationTypes from "../store/mutationTypes";
export default {
  data() {
    return {
      floatingConfig: {
        hasClearButton: false,
        line: false,
        labelOffset: {
          left: 20,
          top: 10,
        },
        colors: {
          focusColor: "#3A50D5",
          errorColor: "#ff0000",
          lineColor: "#128CED",
          blurredColor: "#66768A",
        },
      },
    };
  },
  components: {
    StoreItem,
    StoreNav,
  },
  computed: {
    ...mapGetters({
      inventory: "getVisitorStore",
    }),
  },
  methods: {},
  mounted() {
    fethcStoreInventory(this.$route.params.store_name, 1);
    this.$store.commit(
      mutationTypes.SAVE_VISITED_STORE_NAME,
      this.$route.params.store_name
    );
  },
};
</script>
<style lang="scss" scoped>
.store-view {
  .empty {
    width: 100%;
    padding-top: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    p {
      font-size: 16px;
      line-height: 20px;
      text-align: center;
      color: #8093ad;
    }
  }

  .order-items {
    padding: 60px 100px;
  }
}
</style>

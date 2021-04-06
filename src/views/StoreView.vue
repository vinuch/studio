<template>
  <div class="store-view">
    <StoreNav />
    <div v-if="loadingStore" style="padding-top: 20%">
      <a-icon type="loading" style="font-size: 40px; margin: 20px" />
      <p>
        Fetching store
      </p>
    </div>

    <div v-else>
      <div class="empty" v-if="!inventory.length">
        <img src="../assets/discount.svg" alt="" />
        <p v-if="visitedStoreInfo.id">
          No products yet, check back later
        </p>
        <p v-else>
          This store does not exist. Kindly confirm the url and try again
        </p>
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
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import StoreItem from "@/components/StoreItem";
import StoreNav from "@/components/StoreNav";
import {
  fethcStoreInventory,
  fetchStoreInfo,
  fetchStoreSettlement
} from "@/services/apiServices";
import { EventBus } from "@/services/eventBus";
import * as mutationTypes from "@/store/mutationTypes";
export default {
  data() {
    return {
      loadingStore: false,
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
      visitedStoreInfo: "getVisitedStoreInfo",
      visitedStoreName: "getVisitedStoreName",
    }),
  },
  methods: {},
  mounted() {
    var full = window.location.host;
    var parts = full.split(".");
    var sub = parts[0];

    let stName =
      process.env.NODE_ENV === "development"
        ? "olawalle"
        : parts.length > 2
        ? sub
        : "";

    if (this.visitedStoreName === stName) {
      // console.log("has been visited");
    } else {
      // call api to update storevisit count
      // console.log("first visit");
      this.loadingStore = true;
    }

    if (this.visitedStoreName) {
      fethcStoreInventory(this.visitedStoreName, 1);
      fetchStoreInfo(this.visitedStoreName);
      fetchStoreSettlement(this.visitedStoreName)
        .then(() => {})
        .catch(() => {
          EventBus.$emit(
            "open_alert",
            "error",
            "An error occured. Please confirm the store url and try again"
          );
        })
        .finally(() => (this.loadingStore = false));
    } else {
      this.$store.commit(mutationTypes.SAVE_VISITED_STORE_INFO, {});
      this.$store.commit(mutationTypes.SAVE_SETTLEMENT, {});
      this.$store.commit(mutationTypes.SAVE_VISITOR_INVENTORY, []);
    }
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

  @media (max-width: 767px) {
    .order-items {
      padding: 30px 20px;
    }
  }
}
</style>

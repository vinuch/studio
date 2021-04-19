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
      inventory: "getProducts",
      visitedStoreInfo: "getVisitedStoreInfo",
      visitedStoreName: "getVisitedStoreName",
    }),
  },
  methods: {
    onResize(){
      // if (window.innerWidth > 504) {
      //   this.display = "not_mobile"
      // } else  {
      //   this.display = "mobile"
      // }
      // this.whichZoom()
    },
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

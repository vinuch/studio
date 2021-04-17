<template>
  <div>
    <StoreNav />
    <!-- <Header :store="visitedStoreInfo" :display="galleryView" @showGrid="showThumbnail()" @showZoom="zoomGallery()"/> -->

    <div v-if="loadingStore" style="padding-top: 20%">
      <a-icon type="loading" style="font-size: 40px; margin: 20px" />
      <p>
        Fetching store
      </p>
    </div>

    <div v-else :class="display == 'thumbnail' ? 'prod_img' : 'prod_detail'">
      <div class="empty" v-if="!filteredInventory.length">
        <img src="../assets/discount.svg" alt="" />
        <p v-if="visitedStoreInfo.id">
          No products yet, check back later
        </p>
        <p v-else>
          This store does not exist. Kindly confirm the url and try again
        </p>
      </div>

      <div
        v-for="(product, i) in filteredInventory"
        :key="'item' + i"
        :class="display == 'thumbnail' ? 'thumbnail' : ''"
        :style="display == 'thumbnail' ? thumbStyle(i) : ''"
        @click="showDetail('section_' + i, i )"
        > <!-- should be direct child of prod_img/prod_detail because flex -->
          <Product
          v-if="product.total_stock > 0 && display != 'thumbnail'"
          :product="product"
          :i=i
          :logo="visitedStoreInfo.logo"
          />
      </div>
    </div>
    <!-- <BottomMenu :cartLength="cart.length"/> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import StoreItem from "@/components/StoreItem";
import Product from "@/components/Product";
import StoreNav from "@/components/StoreNav";
// import Header from "@/components/Header";

// import { EventBus } from "@/services/eventBus";
// import * as mutationTypes from "@/store/mutationTypes";
export default {
  components: {
    StoreNav,
    // Header,
    // StoreItem,
    Product,
  },
  data() {
    return {
      search: "", // product search/filtering
      display: 'thumbnail', // or detail

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
  computed: {
    ...mapGetters({
      inventory: "getVisitorStore",
      visitedStoreInfo: "getVisitedStoreInfo",
      visitedStoreName: "getVisitedStoreName",
    }),
    filteredInventory() {
      return this.inventory.filter((product) => {
        return product.product_name
          .toLowerCase()
          .match(this.search.toLowerCase());
      });
    },
    productImages() {
      let images = []
      for (let i=0; i<this.filteredInventory.length; i++) {
        images.push(this.filteredInventory[i].product_image)
      }
      return images
    },
  },
  methods: {
    showDetail(section) {
      if (this.display == 'thumbnail') {
        this.display = 'detail'
        this.zoomTo(section)
      }
    },
    thumbStyle(i) {
      let style = {
        'background-size': 'cover',
        'background-position': '50% 50%',
        'background-image': 'url(' + this.productImages[i] + ')'
      }
      return style
    },
    zoomTo(section) {
      setTimeout(() => {
        let element = document.getElementById(section);
        let headerOffset = 0;
        let elementPosition = element.offsetTop;
        let offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      });
    },
  },
  watch: {
    window_width() {
      // if (window.innerWidth > 600) {
      //   console.log("larger")
      //   this.$router.push({name: 'DeskGallery'})
      // }
      // console.log(window.innerWidth)
    }
  },
};
</script>
<style lang="scss" scoped>
  .prod_img {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  .prod_img::after {
    content: "";
    flex: auto;
  }
  .thumbnail {
    position: relative;
    width: 32%;
    padding-bottom: 32%;
    margin-top: 1%;
  }
  .prod_detail {
    display: flex;
    flex-direction: column;
  }
</style>

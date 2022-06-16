<template>
  <div>
    <StoreNav @show_thumbnail="showThumbnail()" />
    <div
      v-if="isMobile"
      :class="display == 'thumbnail' ? 'prod_img' : 'prod_detail'"
    >
      <div class="empty" v-if="!filteredInventory.length">
        <img src="../assets/discount.svg" alt="" />
        <p v-if="storeInfo.id">
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
        @click="showDetail('section_' + i, i)"
      >
        <!-- should be direct child of prod_img/prod_detail because flex -->
        <Product
          v-if="
            display != 'thumbnail' 
          "
          :product="product"
          :i="i"
          :logo="storeInfo.logo"
        />
      </div>

      <div v-if="blankThumbnail == 2" class="thumbnail"></div>
    </div>
    <DeskGallery v-else />
    <div class="prop"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Product from "@/components/Product";
import StoreNav from "@/components/StoreNav";
import DeskGallery from "@/components/DeskGallery";
import * as mutationTypes from "@/store/mutationTypes";
import {
  fethcProducts,
  fetchStoreInfo,
  fetchStoreSettlement
} from "@/services/apiServices";
import { EventBus } from "@/services/eventBus";

export default {
  components: {
    StoreNav,
    Product,
    DeskGallery,
  },
  data() {
    return {
      // window: window,
      isMobile: false,
      search: "", // product search/filtering
      display: "thumbnail", // or detail
    };
  },
  computed: {
    ...mapGetters({
      inventory: "getProducts",
      storeInfo: "getStoreInfo",
      visitedStoreName: "getStoreName",
       storeName: "getStoreName",
    }),
    // isMobile() {
    //   return window.innerWidth < 504;

    // },
    filteredInventory() {
      if (this.inventory) {
        return this.inventory.filter((product) => {
          if (product.display) {
            return product.product_name
              .toLowerCase()
              .match(this.search.toLowerCase());
          }
        });
      }
      return [];
    },
    blankThumbnail() {
      return this.filteredInventory.length % 3;
    },
    productImages() {
      let images = [];
      for (let i = 0; i < this.filteredInventory.length; i++) {
        images.push(this.filteredInventory[i].product_image);
      }
      return images;
    },
  },
  methods: {
    showDetail(section) {
      if (this.display == "thumbnail") {
        this.display = "detail";
        this.zoomTo(section);
      }
    },
    showThumbnail() {
      if (this.display == "detail") {
        this.display = "thumbnail";
        // this.zoomTo(section)
      }
    },
    thumbStyle(i) {
      let style = {
        "background-size": "cover",
        "background-position": "50% 50%",
        "background-image": "url(" + this.productImages[i] + ")",
      };
      return style;
    },
    zoomTo(section) {
      // console.log(section);
      setTimeout(() => {
        let element = document.getElementById(section);
        let headerOffset = 0;
        let elementPosition = element?.offsetTop;
        let offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      });
    },
  },
  mounted() {
    // console.log(this.filteredInventory);
    if (window.innerWidth < 504) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth < 504) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });


    var full = window.location.host;
    var parts = full.split(".");
    var sub = parts[0];

    let stName =
      process.env.NODE_ENV === "development"
        ? "vincent"
        : parts.length > 2
        ? sub
        : "";

    if (this.storeName === stName) {
      // console.log("has been visited");
    } else {
      // call api to update storevisit count
      // console.log("first visit");
      this.loadingStore = true;
    }

    if (this.storeName) {
      fetchStoreInfo(this.storeName);
      fethcProducts(this.storeName, 1);
      fetchStoreSettlement(this.storeName) // fetch nearer to checkout
        .catch(() => {
          EventBus.$emit(
            "open_alert",
            "error",
            "An error occured. Please confirm the store url and try again"
          );
        })
        .finally(() => (this.loadingStore = false));
    } else {
      this.$store.commit(mutationTypes.SAVE_STORE_INFO, {});
      this.$store.commit(mutationTypes.SAVE_SETTLEMENT, {}); // see fetchStoreSettlement comment
      this.$store.commit(mutationTypes.SAVE_PRODUCTS, []);
    }

    // if (window.innerWidth > 600) {
    //   this.$router.push({name: 'DeskGallery'}); // No front page yet for desktop
    // }
  
  },
  watch: {
    window() {
      // if (window.innerWidth > 600) {
      //   console.log("larger")
      //   this.$router.push({name: 'DeskGallery'})
      // }
      // console.log(window.innerWidth)
    },
  },
};
</script>
<style lang="scss" scoped>
.prod_img {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
// .prod_img::after {
//   content: "";
//   flex: auto;
// }
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
.prop {
  // pushes up the bottom most item up
  height: 60px;
  width: 100%;
}
</style>

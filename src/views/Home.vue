<template>
  <div class="about">
    <StoreNav
      @setIsAbout=setIsAbout
      :isAbout="isAbout"/>
    <div v-if="loadingStore" style="padding-top: 20%">
      <a-icon type="loading" style="font-size: 40px; margin: 20px" />
      <p>
        Fetching store
      </p>
    </div>

    <div v-else>
      <div>
        <!-- <img v-if="storeInfo.background" :src="storeInfo.background" width="100%" alt="" /> -->
        <!-- <div v-else style="background: #FFF000; height: 80vh;"></div> -->
        <div :style="bckgrndCol"></div>
        <!-- background photo or default image -->
      </div>
      <!-- <div>
        <p>About</p>
      </div> -->
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
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
      isAbout: true,
      loadingStore: false,
      floatStyle: "left",
      bckgrndCol: '',
      bck_colours: [ // ideally get this from dominant logo colour
        '#FCCD04',
        '#9FA8A3',
        '#E3E3E3',
        '#C39EA0',
        '#86C232',
        '#C38D9E',
        '#F64C72',
        '#5CDB95',
        '#97CAEF',
        '#2E151B',
        '#EAE7DC',
      ],
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
    StoreNav,
  },
  computed: {
    ...mapGetters({
      inventory: "getVisitorStore",
      storeInfo: "getVisitedStoreInfo",
      storeName: "getVisitedStoreName",
    }),
    // matchLogo() {
    //   return {
    //     "background": "blue",
    //     "color": "green",
    //     "height": "80vh",
    //   }
    // }
  },
  methods: {
    setIsAbout() {
      this.isAbout = false
    },
    onResize(){
      // if (window.innerWidth > 504) {
      //   this.display = "not_mobile"
      // } else  {
      //   this.display = "mobile"
      // }
      // this.whichZoom()
    },
  },
  created() {
    let i = Math.floor(Math.random() * this.bck_colours.length);
    this.bckgrndCol = {
      background: this.bck_colours[i],
      height: '100vh',
      width: '100%'
    }
  },
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

    if (this.storeName === stName) {
      // console.log("has been visited");
    } else {
      // call api to update storevisit count
      // console.log("first visit");
      this.loadingStore = true;
    }

    if (this.storeName) {
      fethcStoreInventory(this.storeName, 1);
      fetchStoreInfo(this.storeName);
      fetchStoreSettlement(this.storeName) // fetch this nearer to checkout
        // .then(() => {})
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
      this.$store.commit(mutationTypes.SAVE_SETTLEMENT, {}); // do this nearer to checkout
      this.$store.commit(mutationTypes.SAVE_INVENTORY, []);
    }

    if (window.innerWidth > 600) {
      this.$router.push({name: 'DeskGallery'}); // No front page yet for desktop
    }
  },
};
</script>
<style lang="scss" scoped>
.nav {
  position: absolute;
}
.about {
  .order-items {
    padding: 60px 100px;
  }

  @media (max-width: 767px) {
    .order-items {
      // padding: 30px 20px;
    }
  }
}
</style>

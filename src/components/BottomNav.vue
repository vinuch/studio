<template>
  <v-bottom-navigation fixed background-color="#FFF" class="py-1" height="80">
    <v-btn
      v-for="(nav, i) in navigation"
      :key="i"
      value="dash"
      @click="goTo(i)"
   
      :style="{'color': `${$route.name === nav.name ? '#4CAF50' : '#AAB2BD'} !important`}"
    >
      <p class="mt-2">{{nav.name}}</p>
      <!-- <v-icon color="#AAB2BD"></v-icon> -->
      <component :is="nav.icon"> Something else</component>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import * as mutationTypes from "@/store/mutationTypes";
import CurvedGraph from "./Icons/CurvedGraph.vue";
import Bookmark from "./Icons/Bookmark.vue";
import Bag from "./Icons/Bag.vue";
import Setting from "./Icons/Setting.vue";

export default {
  components: { CurvedGraph, Bookmark, Bag, Setting },
  name: "BottomNav",
  data() {
    return {
      navigation: [
        // Note the name is also used as the route name so change with caution
        { name: "Dashboard", value: "", icon: CurvedGraph },
        { name: "Inventory", value: "", icon: Bookmark },
        { name: "Orders", value: "", icon: Bag },
        { name: "Settings", value: "", icon: Setting },
      ],
    };
  },
  methods: {
    goTo(i) {
      let name = this.navigation[i].name;
      name == "Settings"
        ? this.$store.commit(mutationTypes.SET_SETTINGS_STATE, true)
        : "";
      this.$router.push({ name: `${name}` }).catch((err) => {
        if (
          err.name !== "NavigationDuplicated" &&
          !err.message.includes(
            "Avoided redundant navigation to current location"
          )
        ) {
          // console.log(err);
        }
      });
    },
  },

};
</script>
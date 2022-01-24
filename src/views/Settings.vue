<template>
  <v-container class="pa-5">
    <topNav>
      Settings
    </topNav>
    <div style="margin: 4rem 0;">
      <v-card class="elevation-0 overflow-hidden pa-0 rounded-xl" style="border: 0.5px solid #F3F3F3;">
        <v-tabs id="tab" v-model="tabs" fixed-tabs>
          <v-tab v-for="(link, i) in links" :key="i">
            <span class="caption"> {{link.name}}</span>
            <!-- <v-icon>{{ link.icon }}</v-icon> -->
           
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tabs">
          <v-tab-item v-for="(link, i) in links" :key="i">
            <v-card flat>
              <v-sheet class="mt-5 rounded-t-xl" >
                <h2
                  class="mb-3 pt-5 pl-5"
                  style="text-align: left; font-size: 16px; color: #94A3B8"
                >
                  {{ link.name }}
                </h2>
                <BankDetails v-if="i == 0" />
                <StoreDetails v-if="i == 1" />
                <BusinessHours v-if="i == 2" />
                <Shipping v-if="i == 3" />
              </v-sheet>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import topNav from "@/components/TopNav";
import BusinessHours from "@/components/BusinessHours";
import BankDetails from "@/components/BankDetails";
import Shipping from "@/components/Shipping";
import StoreDetails from "@/components/StoreDetails";

export default {
  name: "Settings",
  components: {
    topNav,
    BankDetails,
    BusinessHours,
    Shipping,
    StoreDetails,
  },
  data: () => {
    return {
      links: [
        { name: "Payment", icon: "mdi-bank-outline" },
        { name: "Store Details", icon: "mdi-store-outline" },
        { name: "Business Hours", icon: "mdi-clock-outline" },
        { name: "Shipping", icon: "mdi-moped-outline" },
      ],
      tabs: null,
    };
  },
};
</script>

<style>
/* Note that syle is not scoped in order to target: div.v-slide-group__prev, div.v-slide-group__next*/
div.v-slide-group__prev,
div.v-slide-group__next {
  display: none !important;
}

.v-tabs--fixed-tabs > .v-tabs-bar .v-tab{
  width: auto;
}
</style>

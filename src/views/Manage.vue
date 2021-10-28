<template>
  <v-container 
    class="pa-5"
  >
    <topNav>
      Manage
    </topNav>
    <v-card 
      class="pa-0 rounded-lg" 
      outlined
    >
      <v-tabs
        id="tab"
        v-model="tabs"
        fixed-tabs
      >
        <v-tab
          v-for="(link, i) in links"
          :key="i"
        >
          <v-icon>{{ link.icon }}</v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tabs">
        <v-tab-item
          v-for="(link, i) in links"
          :key="i"
        >
          <v-card
            color="basil"
            flat
          >
            <v-sheet
              class="mt-5 pa-5 rounded-t-xl"
              color="#F6F8FA"
            >
              <h2 style="text-align: left; font-size: 18px; color: #94A3B8">{{link.name}}</h2>
              <BankDetails v-if="i == 0" />
              <StoreDetails v-if="i == 1" />
              <BusinessHours v-if="i == 2" />
              <Shipping v-if="i == 3" />
            </v-sheet>
          </v-card>
        </v-tab-item>
      </v-tabs-items>

    </v-card>
  </v-container>
</template>

<script>
  import topNav from "@/components/TopNav"
  import BusinessHours from "@/components/BusinessHours"
  import BankDetails from "@/components/BankDetails"
  import Shipping from "@/components/Shipping"
  import StoreDetails from "@/components/StoreDetails"

  export default {
    name: 'Manage',
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
          {name: "Payment" ,icon: "mdi-bank-outline"},
          {name: "Store Details" ,icon: "mdi-store-outline"}, 
          {name: "Business Hours" ,icon: "mdi-clock-outline"}, 
          {name: "Shipping" ,icon: "mdi-moped-outline"}
        ],
        tabs: null,
      }
    }
  }
</script>

<style>
/* Note that syle is not scoped in order to target: div.v-slide-group__prev, div.v-slide-group__next*/
  div.v-slide-group__prev, div.v-slide-group__next {
    display: none !important;
  }
</style>
<template>
  <div>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        @click:outside="closeDialog"
      >
        <div class="white rounded-xl" style="position: relative">
          <v-btn
            @click="closeDialog"
            fab
            depressed
            x-small
            color="white"
            absolute
            style="top: 0.5rem; right: 1rem"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM15 13.59L13.59 15L10 11.41L6.41 15L5 13.59L8.59 10L5 6.41L6.41 5L10 8.59L13.59 5L15 6.41L11.41 10L15 13.59Z"
                fill="#94A3B8"
              />
            </svg>
          </v-btn>

          <VerifyID v-if="propModal == 'verify_auth'" />
          <BankDetails v-if="propModal == 'set_bank'" />
          <BusinessHours v-if="propModal == 'business_hours'" />
          <StoreDetails v-if="propModal == 'store_details'" />
          <Shipping v-if="propModal == 'shipping'" />
          <SuccessModal v-if="propModal == 'success'" />
          <FilterOrdersModal v-if="propModal == 'filter_orders'" />
          <CallCustomer v-if="propModal == 'call_customer'" :phone="phone" />
        </div>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { EventBus } from "@/services/eventBus";
import * as mutationTypes from "@/store/mutationTypes";

import VerifyID from "@/components/VerifyID";
import BankDetails from "@/components/BankDetails";
import BusinessHours from "@/components/BusinessHours";
import StoreDetails from "@/components/StoreDetails";
import Shipping from "@/components/Shipping";
import SuccessModal from "./successModal.vue";
import FilterOrdersModal from "./FilterOrdersModal.vue";
import CallCustomer from "./CallCustomer.vue";

export default {
  name: "Dialog",
  components: {
    VerifyID,
    BankDetails,
    BusinessHours,
    StoreDetails,
    Shipping,
    SuccessModal,
    FilterOrdersModal,
    CallCustomer,
  },
  props: ["modal", 'phone'],
  data: () => ({
    dialog: true, // default is false
    // propModal: "shipping",
  }),
  methods: {
    closeDialog() {
      this.$store.commit(mutationTypes.SET_SETTINGS_STATE, true);
      EventBus.$emit("dialog", "close", "");
    },
  },
  computed: {
    propModal() {
      return this.modal; // replace propModal in data with this
    },
    
  },
  mounted() {
    console.log(this.$props)
  }
};
</script>

<style scoped>
</style>

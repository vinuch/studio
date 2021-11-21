<template>
<div>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600"
    >
      <VerifyID v-if="propModal == 'verify_auth'" />
      <BankDetails v-if="propModal == 'set_bank'" />
      <BusinessHours v-if="propModal == 'business_hours'" />
      <StoreDetails v-if="propModal == 'store_details'"  />
      <Shipping v-if="propModal == 'shipping'"  />
    </v-dialog>
  </v-row>
</div>
</template>

<script>
// import { EventBus } from "@/services/eventBus"

import VerifyID from '@/components/VerifyID'
import BankDetails from '@/components/BankDetails'
import BusinessHours from '@/components/BusinessHours'
import StoreDetails from '@/components/StoreDetails'
import Shipping from '@/components/Shipping'

export default {
    name: 'Dialog',
    components: {
      VerifyID,
      BankDetails,
      BusinessHours,
      StoreDetails,
      Shipping,
    },
    props: [
      'modal',
    ],
    data: () => ({
      dialog: true, // default is false
      // propModal: "shipping",
    }),
    methods: {
    },
    computed: {
      propModal() {
        return this.modal // replace propModal in data with this
      },
    },
  }
</script>

<style scoped>

</style>

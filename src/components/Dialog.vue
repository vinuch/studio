<template>
<div>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600"
    >
      <VerifyID v-if="propModal == 'verify'" />
      <SetBankAcc v-if="propModal == 'set_bank'" />
      <BusinessHours v-if="propModal == 'business_hours'" />
      <StoreDetails v-if="propModal == 'store_details'"  />
      <SetShipping v-if="propModal == 'shipping'"  />
    </v-dialog>
  </v-row>
</div>
</template>

<script>
// import { EventBus } from "@/services/eventBus"

import VerifyID from '@/components/VerifyID'
import SetBankAcc from '@/components/SetBankAcc'
import BusinessHours from '@/components/BusinessHours'
import StoreDetails from '@/components/StoreDetails'
import SetShipping from '@/components/SetShipping'

export default {
    name: 'Dialog',
    components: {
      VerifyID,
      SetBankAcc,
      BusinessHours,
      StoreDetails,
      SetShipping,
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

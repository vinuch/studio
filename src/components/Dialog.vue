<template>
<div>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600"
    >
      <VerifyID v-if="modal == 'verify'" />
      <SetBankAcc v-if="modal == 'set_bank'" />
      <BusinessHours v-if="modal == 'business_hours'" />
      <StoreDetails v-if="modal == 'store_details'" />
      <SetShipping v-if="modal == 'shipping'" />
    </v-dialog>
  </v-row>
</div>
</template>

<script>
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
    data: () => ({
      dialog: true,
      modal: "shipping",
    }),
  }
</script>

<style scoped>

</style>

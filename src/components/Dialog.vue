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
    </v-dialog>
  </v-row>
</div>
</template>

<script>
import VerifyID from '@/components/VerifyID'
import SetBankAcc from '@/components/SetBankAcc'

export default {
    name: 'Dialog',
    components: {
      VerifyID,
      SetBankAcc,
    },
    data: () => ({
      dialog: true,
      modal: "set_bank",
    }),
  }
</script>

<style scoped>

</style>

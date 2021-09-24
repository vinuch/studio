<template>
<div>
  <v-card class="rounded-xl">
    <v-card-title class="title justify-center">
    Settlement Account
    </v-card-title>
    <v-card-text>
      Provide the bank details with which you want to receive payments.
    </v-card-text>
    <v-col
      class="d-flex pa-5 pt-0 pb-0"
    >
      <v-select
        :items="items"
        label="Select bank"
        outlined
      ></v-select>
    </v-col>
    <v-col
      class="d-flex pa-5 pt-0 pb-0"
    >
      <v-text-field
        label="Account number"
        v-model="email" 
        outlined
        :rules="emailRules"
      ></v-text-field>
    </v-col>
    <setupFooter
      @saveSetUp="saveSetUp()"
      @closeDialog="closeDialog()"
    >
      Save Bank Details
    </setupFooter>
  </v-card>
</div>
</template>

<script>
  import setupFooter from "@/components/setupFooter"

  export default {
    name: 'SetBankAcc',
    components: {
      setupFooter,
    },
    data: () => ({
      // dialog: true,
    }),
    methods: {
      closeDialog() {
        this.$emit('closeDialog')
      },
    }
  }
</script>

<style scoped>

</style>

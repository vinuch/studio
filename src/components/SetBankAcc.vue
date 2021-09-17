<template>
<div>
  <!-- <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600"
    > -->
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
        <v-card-actions 
          class="justify-center light_grey"
        >
          <v-text 
            @click="dialog=false"
            class="mr-5"
            depressed
          >Cancel</v-text>
          <v-btn 
            @click="dialog=false"
            class="main_blue ma-3 ml-5"
            depressed
          >Save account</v-btn>
        </v-card-actions>
      </v-card>
    <!-- </v-dialog>
  </v-row> -->
</div>
</template>

<script>
  export default {
    name: 'SetBankAcc',

    data: () => ({
      // dialog: true,
    }),
  }
</script>

<style scoped>

</style>

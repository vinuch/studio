<template>
<div>
  <v-card class="rounded-xl">
    <v-card-title class="title justify-center">
    Verify Email
    </v-card-title>
    <v-card-text>
      Enter the OTP sent to email@address.com
    </v-card-text>
    <v-card-actions 
      class="justify-center"
    >
      
      <v-btn 
        @click="dialog=false"
        class="main_blue"
      >Verify</v-btn>
    </v-card-actions>
    <v-card-text>
      Did not receive OTP? <span class="pointer">Resend</span>
    </v-card-text>
  </v-card>
</div>
</template>

<script>
  export default {
    name: 'VerifyID',

    data: () => ({
      // dialog: true,
    }),
  }
</script>

<style scoped>

</style>

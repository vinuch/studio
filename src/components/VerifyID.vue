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
    <!-- </v-dialog> -->
  <!-- </v-row> -->
</div>
</template>

<script>
  export default {
    name: 'Dialog',

    data: () => ({
      // dialog: true,
    }),
  }
</script>

<style scoped>

</style>

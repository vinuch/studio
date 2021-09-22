<template>
  <div>
    <v-card-actions 
      class="justify-center light_grey rounded-b-xl"
    >
      <v-btn 
        style="background-color: transparent; color: grey !important; font-weight: bold; letter-spacing: 0"
        depressed
      >Cancel</v-btn>
      <v-btn 
        class="main_blue ma-3 ml-5"
        depressed
      >Save account</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
  export default {
    name: 'setupFooter',

    data: () => ({
    }),
  }
</script>

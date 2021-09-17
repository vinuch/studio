<template>
<div>
  <v-snackbar
    :timeout="-1"
    :value="true"
    absolute
    centered
    top
    outlined
    color="success"
  >
    This is a bar.
    <v-btn depressed color="warning">Resend</v-btn>
  </v-snackbar>
</div>
</template>

<script>
  export default {
    name: 'Menu',

    data: () => ({
   
    }),
  }
</script>

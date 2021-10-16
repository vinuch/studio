<template>
<div>
  <v-snackbar
    :timeout="-1"
    :value="true"
    absolute
    centered
    top
    outlined
    :color="alert_type"
  >
    {{ this.message }}
    {{ alert_type }}
    <v-btn v-if="action" depressed :color="alert_type">{{ action }}</v-btn>
  </v-snackbar>
</div>
</template>

<script>
  export default {
    name: 'Snackbar',
    props: [
      "alert_type",
      "message",
      "action",
    ],
    data: () => ({
   
    }),
  }
</script>

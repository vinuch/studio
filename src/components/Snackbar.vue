<template>
<div style="z-index: 300">
  <v-snackbar
    :timeout="-1"
    :value="true"
    fixed
    centered
    top
    outlined
    :color="alert_type"
  >
    {{ this.message }}
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
      methods: {
        // actions here
      }
    }),
  }
</script>

<template>
  <v-container pa-0 fluid d-flex d-sm-none>
    <img
      :src="require('@/assets/green-banner.svg')"
      class=""
      :style="{width: '100%',  objectFit: 'cover'}"
    />
  </v-container>

</template>

<script>
  export default {
    name: 'MobileBanner',
  }
</script>

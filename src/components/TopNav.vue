<template>
  <v-container pa-0>
    <v-breadcrumbs class="pl-0 pr-0">
      <h1>
        <slot>Location</slot>
      </h1>
      <v-spacer></v-spacer>
      <v-icon class="mr-3">mdi-bell-outline</v-icon>
      <v-icon>mdi-chevron-down</v-icon>
    </v-breadcrumbs>      
  </v-container>
</template>

<script>
  export default {
    name: 'topNav',

    data: () => ({
   
    }),
  }
</script>
<style scoped>
  h1 {
    font-size: 20px;
  }
</style>

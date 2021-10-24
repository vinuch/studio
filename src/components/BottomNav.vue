<template>
  <v-bottom-navigation
    fixed
    background-color="#FBEDDA"
  >
    <v-btn
      v-for="(nav, i) in navigation"
      :key="i"
      value="dash"
      color="transparent"
      @click="goTo(i)"
    >
      <span style="color: #FD9400">{{nav.name}}</span>
      <v-icon color="#FD9400">{{nav.icon}}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
    name: 'BottomNav',
    components: {
    },
    props: [
    ],
    data: () => ({
      navigation: [
        // Note the name is also used as the route name so change with caution
        {name: "Dashboard", value: "", icon: "mdi-view-dashboard-outline"},
        {name: "Inventory", value: "", icon: "mdi-clipboard-list-outline"},
        {name: "Orders", value: "", icon: "mdi-cart-outline"},
        {name: "Manage", value: "", icon: "mdi-cog-outline"},
      ]
    }),
    methods: {
      goTo(i) {
        let name = this.navigation[i].name
        this.$router.push({name: `${name}`});
      },
    },
    computed: {
    },
  }
</script>

<style scoped>

</style>

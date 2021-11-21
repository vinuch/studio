<template>
  <v-container pa-0>
    <v-breadcrumbs class="pl-0 pr-0">
      <h1>
        <slot>Location</slot>
      </h1>
      <v-spacer></v-spacer>
      <v-icon class="mr-3">mdi-bell-outline</v-icon>
      <v-menu
        bottom
        left
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            icon
            dense
            v-bind="attrs"
            v-on="on"
          >
            <v-icon style="color: grey">mdi-chevron-down</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title @click="openDialog('verify_auth')">
              <v-icon style="color: grey">mdi-at</v-icon>Verify email
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="logout()">
              <v-icon style="color: grey">mdi-logout</v-icon>Logout
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-breadcrumbs>      
  </v-container>
</template>

<script>
  import { EventBus } from "@/services/eventBus"
  import * as mutationTypes from "@/store/mutationTypes"

  export default {    
    name: 'topNav',
    data: () => ({
   
    }),
    methods: {
      logout() {
        let store = {}
        sessionStorage.clear();
        localStorage.clear();
        this.$store.commit(mutationTypes.LOGGED_IN, false);
        this.$store.commit(mutationTypes.LOGOUT, store); // this should be the whole state not just store
        this.$router.push("/login");
      },
      openDialog(setup) {
        this.$store.commit(mutationTypes.SET_SETTINGS_STATE, false)
        EventBus.$emit("dialog", "open", setup)
      },
    }
  }
</script>
<style scoped>
  h1 {
    font-size: 20px;
  }
</style>

<template>
  <div :style="`position: fixed; width: 100%; left: 0; top: 0; z-index: 2;`">
    <v-app-bar
      :height="!getEmailStatus ? 140 :  65"
      class="elevation-0"
      color="white"
      :style="`position: sticky margin-bottom: 8rem`"
      pa-0
    >
      <!-- <v-breadcrumbs class="pl-0 pr-0"> -->
      <div style="display: flex;  width: 100%;  flex-direction: column;">
        <div style="display: flex; padding: 1rem 0; align-items: center  width: 100%;  justify-content: center">
          <h1>
            <slot>Location</slot>
          </h1>

          <v-spacer></v-spacer>
          <v-icon class="mr-3">mdi-bell-outline</v-icon>

          <v-menu style="box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.04);" bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                icon
                dense
                v-bind="attrs"
                v-on="on"
                style="margin-right: 0"
              >
                <img
                  :src="getStore.logo"
                  class="mx-2"
                  height="32px"
                  width="32px"
                  style="border-radius: 4px; object-fit: cover; ;object-position: top"
                />
                <v-icon style="color: grey">$vuetify.icons.arrowDown</v-icon>
              </v-btn>
            </template>

            <v-list>
              <!-- <v-list-item>
                <v-list-item-title @click="openDialog('verify_auth')">
                  <v-icon style="color: grey; margin-right: .5rem">mdi-account-outline</v-icon>Profile
                </v-list-item-title>
              </v-list-item> -->
              <v-list-item>
                <v-list-item-title @click="logout()">
                  <v-icon style="color: grey; margin-right: .5rem">mdi-logout</v-icon>Logout
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <div
          v-if="!getEmailStatus"
          style="bottom: -5rem; margin: 0 10px; left: 0;  z-index: 100;background: #FFE8E5;border-radius: 8px;padding: 13px 11px; width: 95%; display: flex;align-items: flex-start; justify-content: space-between  "
        >
          <p class="text-left caption" style="color: #ED6555; width: 70%">
            Verify your email (abdul@gmail.com) to take your store live
          </p>
          <button
            style="background: #FECACA; font-weight: 600; padding: 0.5rem 1rem; border-radius: 8px"
            @click="openDialog('verify_auth')"
          >
            verify
          </button>
        </div>
      </div>

      <!-- </v-breadcrumbs>       -->
    </v-app-bar>
  </div>
</template>

<script>
import { EventBus } from "@/services/eventBus";
import * as mutationTypes from "@/store/mutationTypes";
import { mapGetters } from "vuex";

export default {
  name: "topNav",
  data: () => ({}),
  methods: {
    logout() {
      let store = {};
      sessionStorage.clear();
      localStorage.clear();
      this.$store.commit(mutationTypes.LOGGED_IN, false);
      this.$store.commit(mutationTypes.LOGOUT, store); // this should be the whole state not just store
      this.$router.push("/login");
    },
    openDialog(setup) {
      this.$store.commit(mutationTypes.SET_SETTINGS_STATE, false);
      EventBus.$emit("dialog", "open", setup);
    },
  },
  computed: {
    ...mapGetters(["getEmailStatus", "getStore"]),
  },
};
</script>
<style scoped>
h1 {
  font-size: 20px;
}
</style>

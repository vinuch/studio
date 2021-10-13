<template>
<div class="pa-0">
  <xsTop />

  <div class="" fluid fill-height no-gutters>
    <v-row pa-0 ma-0>
      <v-col class="d-sm-flex d-none col-6 pa-0">
        <About />
      </v-col>

      <v-col :class="{'blue lighten-5': !$vuetify.breakpoint.xs}" class="auth mobile">
        <div class="pa-5 pb-0 pt-0">
          <v-img
            v-if="!$vuetify.breakpoint.xs"
            alt="leyyow logo"
            :src="require('@/assets/leyyow_logo_old.svg')"
            class="logo"
            contain
            position="center left"
          />
          <h1 class="text-left mt-5 pt-5 text-h6 text_pink--text">Log in</h1>
          <v-form class="auth_form_xs mt-2" :class="{'form_lg': !$vuetify.breakpoint.xs}">
            <v-text-field
              label="Email"
              v-model="username" 
              outlined
              :rules="storeNameRules"
            ></v-text-field>
            <v-text-field
              label="password"
              type="password"
              v-model="password" 
              outlined
              :rules="storeLinkRules"
            ></v-text-field>
            <p class="text-right footnote">
              <router-link to="/forgot_password"><span class="pink_link text-body-2">Forgot password</span></router-link>
            </p>
            <v-btn 
              block 
              depressed 
              height=56px 
              color="#F62873"
              @click="login()"
            >
              Login
            </v-btn>
            <p class="text-body-2 mt-5">Don't have a store?
              <router-link to="/register"><span class="pink_link">Create one</span></router-link>
            </p>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </div>
</div>
</template>

<script>
  import {
    apiLogin,
    fethcStoreInventory,
    fetchOrders,
  } from "@/services/apiServices"
  import * as mutationTypes from "@/store/mutationTypes"
  import axios from "axios"
  // import { EventBus } from "../services/eventBus"

  import About from '@/components/About'
  import xsTop from '@/components/xsTop'

  export default {
    name: 'Login',
    components: {
      About,
      xsTop,
    },
    data: () => ({
      email: null,
      password: null,
      storeName: "",
      storeLink: "",
      store_types: ["Food", "Fashion"],
      storeNameRules: [
        v => v.length >= 3 || "Store name should be three letters or more",
      ],
      storeLinkRules: [],
      username: null,
    }),
    methods: {
      toForgot() {
        this.$router.push("/reset-password");
      },
      login() {
        let data = {
          username: this.username,
          password: this.password,
        }
        // this.loading = true;
        apiLogin(data)
          .then((res) => {
            window.sessionStorage.setItem("leyyow_token", res.data.token);
            axios.defaults.headers.common[
              "Authorization"
            ] = `Token ${res.data.token}`;
            let store = res.data.store;
            let settlement = res.data.settlement;
            let acct_id = res.data.account_id;

            // fetch inventory
            fethcStoreInventory(store.slug);
            fetchOrders();

            this.$store.commit(mutationTypes.LOGGED_IN, true);
            this.$store.commit(mutationTypes.SAVE_STORE, store);
            this.$store.commit(mutationTypes.SAVE_SETTLEMENT, settlement);
            this.$store.commit(mutationTypes.SAVE_ACCOUNT_ID, acct_id);
            if (store.store_name) {
              this.$router.push("/dash");
            } else {
              this.$router.push("/dashboard/setup");
            }
          })
          .catch(() => {
            // EventBus.$emit(
            //   "open_alert",
            //   "error",
            //   "Wrong or invalid credentials. Please try again"
            // );
          })
          .finally(() => {
            this.loading = false;
          });
      },
    },
  }
</script>

<style scoped>
.form_lg {
  padding-top: 90px;
}
.footnote {
  position: relative;
  margin-top: -20px;
}
</style>

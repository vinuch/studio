<template>
<div class="pa-0">
  <xsTop style="display: none !important;" />

  <v-container class="pa-0" fluid no-gutters>
    <v-row class="">
      <v-col class="pink lighten-3 d-sm-flex d-none">
        <About />
      </v-col>

      <v-col class="auth blue lighten-5 pa-0"
      style="background: yellow;">
        <v-container ma-0>
          <!-- <v-img
            alt="leyyow logo"
            :src="require('@/assets/leyyow_logo_old.svg')"
            class="logo"
            contain
            position="center left"
          /> -->
          <!-- <h1 class="text-left text-h5">Welcome back</h1> -->
          <!-- <p class="text-left note">Enter your email and password to log in.</p> -->
          <v-form class="form_lg">
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
              <router-link to="/forgot_password"><span class="blue_link">Forgot password</span></router-link>
            </p>
            <v-btn
              block
              depressed
              height=56px
              color="#3A50D5"
              @click="login()"
            >Login</v-btn>
            <p>Don't have a store?
              <router-link to="/register"><span class="blue_link">Create one</span></router-link>
            </p>
          </v-form>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
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
      storeType: "",
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
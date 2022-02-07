<template>
  <div class="">
    <MobileBanner />

    <div class="">
      <v-row pa-0 ma-0>
        <v-col
          style="display: none !important"
          class="d-sm-flex d-none col-6 pa-0"
        >
          <About />
        </v-col>

        <v-col
          :class="{ 'blue lighten-5': !$vuetify.breakpoint.xs }"
          class="auth mobile"
        >
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
            <v-form
              class="auth_form_xs mt-2"
              :class="{ form_lg: !$vuetify.breakpoint.xs }"
            >
              <TextInput
                  label="Email"
                  name="email"

                  :validations="validations.email"
                  @update="(emailValue) => (username = emailValue)"
                >
                  <template v-slot:prepend-inner>
                    <svg
                      class="mr- absolute"
                      width="20"
                      height="20"
                      viewBox="0 0 19 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.2439 6.41211C14.2439 6.41211 11.4271 9.7928 9.36684 9.7928C7.30746 9.7928 4.45898 6.41211 4.45898 6.41211"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1 9C1 2.99956 3.08929 1 9.35716 1C15.625 1 17.7143 2.99956 17.7143 9C17.7143 14.9996 15.625 17 9.35716 17C3.08929 17 1 14.9996 1 9Z"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </template>
                </TextInput>
                <TextInput
                  label="Password"
                  name="password"
                  type="password"
                  :validations="validations.password"
                  @update="(passwordvl) => (password = passwordvl)"
                >
                  <template v-slot:prepend-inner>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 15 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.5026 6.71801V4.87112C11.4759 2.70625 9.69865 0.973661 7.53464 1.0003C5.41445 1.02695 3.69991 2.73375 3.66382 4.85393V6.71801"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7.58325 10.8027V12.7115"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.58314 6.2207C2.64579 6.2207 1 7.56827 1 11.6101C1 15.6528 2.64579 17.0004 7.58314 17.0004C12.5205 17.0004 14.1671 15.6528 14.1671 11.6101C14.1671 7.56827 12.5205 6.2207 7.58314 6.2207Z"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </template>
                  <template v-slot:append>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 21 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.72258 14.6723C2.46063 13.1914 1 10.9599 1 9.00225C1 5.67525 5.19932 1.59766 10.3825 1.59766C12.5025 1.59766 14.4703 2.27726 16.0526 3.33216"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18.3448 5.42188C19.2485 6.56807 19.775 7.83597 19.775 9.00245C19.775 12.3294 15.5655 16.407 10.3823 16.407C9.45924 16.407 8.55751 16.2752 7.7146 16.0419"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.11627 11.2614C7.51275 10.6639 7.17498 9.84943 7.178 9.00044C7.17396 7.23044 8.60619 5.79212 10.3772 5.78907C11.2292 5.78705 12.0468 6.12482 12.6493 6.72733"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M13.5366 9.57031C13.2993 10.8808 12.2738 11.9083 10.9633 12.1487"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18.3873 1L2.38733 17"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg> </template
                ></TextInput>
              <p class="text-right footnote">
                <router-link to="/forgot_password"
                  ><span class="pink_link text-body-2"
                    >Forgot password</span
                  ></router-link
                >
              </p>

              <Button
                size="large"
                label="Login"
                :block="true"
                :primary="true"
                @onClick="login()"
              />

              <p class="text-body-2 mt-5">
                Don't have a store?
                <router-link to="/register"
                  ><span class="primary_link">Create one</span></router-link
                >
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
} from "@/services/apiServices";
import * as mutationTypes from "@/store/mutationTypes";
import axios from "axios";
import { EventBus } from "@/services/eventBus";

import About from "@/components/About";
import MobileBanner from "@/components/MobileBanner";
import Button from "@/components/Button";
import { required, email, minLength } from "@vuelidate/validators";
import TextInput from "@/components/TextInput";

export default {
  name: "Login",
  components: {
    About,
    MobileBanner,
    Button,
    TextInput
  },
  data: () => ({
    email: null,
    password: null,
    storeName: "",
    storeLink: "",
    store_types: ["Food", "Fashion"],
    username: null,
        validations: {
      email: { required, email },
      password: { required, minLength: minLength(6) },
 
    },
  }),
  methods: {
    toForgot() {
      this.$router.push("/reset-password");
    },
    login() {
      let data = {
        username: this.username,
        password: this.password,
      };
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
          // For some reason, the slug wasn't being sent with the rest of the store data
          // so I included it explicitly as part of the API response hence why it needs
          // to be fetched as res.data.slug below, and then saved with the store.
          store.slug = res.data.slug;

          // fetch inventory
          fethcStoreInventory(store.slug);
          fetchOrders();

          this.$store.commit(mutationTypes.LOGGED_IN, true);
          this.$store.commit(mutationTypes.SAVE_STORE, store);
          this.$store.commit(mutationTypes.SAVE_SETTLEMENT, settlement);
          this.$store.commit(mutationTypes.SAVE_ACCOUNT_ID, acct_id);
          this.$router.push("/dash");
        })
        .catch(() => {
          EventBus.$emit(
            "open_alert",
            "error",
            "Wrong or invalid credentials. Please try again"
          );
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
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

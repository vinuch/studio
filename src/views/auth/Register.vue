<template>
  <div class="overflow-hidden">
    <MobileBanner />

    <div class="" fluid fill-height no-gutters>
      <v-row pa-0 ma-0>
        <v-col class="d-sm-flex d-none col-6 pa-0">
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
            <h1
              class="
                text-left
                mt-5
                pt-5
                text-h5
                
                font-weight-medium
              "
              style="color: #143E32"
            >
              Create your store
            </h1>
            <p class="text-left text-body-2" style="color: #445B54">
              Enter your store name and link, and select your store type
            </p>
            <v-form
              class="auth_form_xs"
              :class="{ form_lg: !$vuetify.breakpoint.xs }"
            >
              <v-stepper :value="step">
                <v-stepper-header>
                  <v-stepper-step
                    :complete="step1"
                    color="#4CAF50"
                    step="1"
                  ></v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step
                    :complete="step2"
                    :color="color2"
                    step="2"
                  ></v-stepper-step>
                </v-stepper-header>
              </v-stepper>
              <div v-show="step === 1">
                <TextInput
                  label="Store Name"
                  name="storeName"
                  @update="(vl) => (store_name = vl)"
                ></TextInput>

                <v-text-field
                  label="Store Link"
                  v-model="store_slug"
                  outlined
                  :hint="store_link_url"
                  persistent-hint
                  :rules="storeLinkRules"
                  @keyup="cleanStoreUrl()"
                  @blur="cleanStoreUrl('blur')"
                ></v-text-field>

                <v-select
                  label="Store Type"
                  v-model="store_type"
                  outlined
                  item-text="name"
                  item-value="type"
                  :items="store_types"
                  item-color="success"
                ></v-select>
              </div>
              <div v-show="step === 2">
                <TextInput
                  label="Email"
                  name="email"
                  :validations="validations.email"
                  @update="(emailValue) => (email = emailValue)"
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

                <p @click="previousStep">Back</p>
              </div>

              <Button
                v-if="step === 1"
                :block="true"
                label="Continue"
                :primary="true"
                size="large"
                :disabled="!step1"
                @onClick="createAccount()"
              />
              <Button
                :block="true"
                v-if="step === 2"
                label="Create store"
                :primary="true"
                size="large"
                :disabled="!step2"
                @onClick="createAccount()"
              />
              <p class="mt-5 text-body-2">
                Already have an account?
                <router-link to="/login"
                  ><span class="primary_link">Log in</span></router-link
                >
              </p>
              <p class="footnote text-body-2">
                By signing up, I agree to Leyyow's
                <span>Privacy Policy</span> and
                <span>Terms &#38; Conditions</span>
              </p>
              <!-- <div class="auth_float"></div> -->
            </v-form>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {
  fethcStoreInventory,
  fetchOrders,
  signUp,
  createStore,
} from "@/services/apiServices";
import * as mutationTypes from "@/store/mutationTypes";

import { EventBus } from "@/services/eventBus";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

import About from "@/components/About";
import MobileBanner from "@/components/MobileBanner";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";

export default {
  name: "Login",
  components: {
    About,
    MobileBanner,
    Button,
    TextInput,
  },
  setup() {
    return { v$: useVuelidate() };
  },

  data: () => ({
    color1: "#F62873",
    color2: "",
    step: 1, // current step displayed
    store_name: "",
    store_slug: "",
    store_link_url: "",
    email: "",
    password: "",
    store_type: null,
    store_types: [
      // get this from API (not built yet)
      // {name: "Food", type: 0}, doesn't recognise as true
      { name: "Food", type: 6 },
      { name: "Fashion & Accessories", type: 1 },
      { name: "Health & Beauty", type: 2 },
      { name: "Gadgets & Electronics", type: 3 },
      { name: "Events", type: 4 },
      { name: "Other", type: 5 },
    ],

    storeNameRules: [
      (v) => v.length >= 3 || "Store name should be three letters or more",
    ],
    emailRules: [],
    passwordRules: [],
    storeLinkRules: [],
    validations: {
      email: { required, email },
      password: { required, minLength: minLength(6) },
      storeLink: {},
      storeName: {},
    },
  }),
  methods: {
    // catchValidations(fieldName) {
    //   return this.v$[fieldName]?.$dirty
    //     ? !this.v$[fieldName]?.$error
    //       ? true
    //       : this.v$[fieldName]?.$errors[0]?.$message
    //     : false;
    // },
    createAccount() {
      // e.preventDefault()
      if (this.step === 1) {
        this.step = 2;

        // this.color2 = "primary"
        if (this.step1 == false) {
          this.color1 = "grey";
        }
      } else {
        if (this.step1 && this.step2 == true) {
          let data = {
            email: this.email,
            password: this.password,
          };
          signUp(data)
            .then((res) => {
              console.log("response:", res);
              window.sessionStorage.setItem("leyyow_token", res.data.token);
              axios.defaults.headers.common[
                "Authorization"
              ] = `Token ${res.data.token}`;

              let data = {
                store_name: this.store_name,
                slug: this.store_slug,
                business_type: this.store_type,
              };
              console.log(data);

              createStore(data)
                .then((createRes) => {
                  let store = createRes?.data.store;
                  let settlement = createRes?.data.settlement;
                  let acct_id = createRes?.data.store.id;
                  console.log(createRes, 'createRes');

                  fethcStoreInventory(store?.slug);
                  fetchOrders();
                  this.$store.commit(mutationTypes.LOGGED_IN, true);
                  this.$store.commit(mutationTypes.SAVE_STORE, store);
                  this.$store.commit(mutationTypes.SAVE_SETTLEMENT, settlement);
                  this.$store.commit(mutationTypes.SAVE_ACCOUNT_ID, acct_id);
                  this.$store.commit(mutationTypes.EMAIL_VERIFIED, false);
                })
                .catch((err) => {
                  console.log(err);
                  EventBus.$emit("open_alert", "error", "Signup error");
                })
                .finally(() => {
                  this.loading = false;
                  this.$router.push("/dash");
                });

              // EventBus.$emit(
              //   "open_alert",
              //   "success",
              //   "Sign up successful. please login"
              // );
            })
            .catch((err) => {
              console.log(err);
              EventBus.$emit("open_alert", "error", "Signup error");
            });
        } else {
          EventBus.$emit("open_alert", "error", "Sign up form incomplete");
        }
      }
    },
    cleanStoreUrl(blur) {
      if (this.store_slug) {
        this.store_slug = this.store_slug
          .toString()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") //remove diacritics
          .toLowerCase()
          .replace(/\s+/g, "-") //spaces to dashes
          .replace(/_/g, "-") //underscore to dashes
          .replace(/&/g, "-and-") //ampersand to and
          .replace(/[^\w-]+/g, "") //remove non-words
          .replace(/--+/g, "-") //collapse multiple dashes
          // .replace(/\-\-+/g, '-') //collapse multiple dashes
          .replace(/^-+/, ""); //trim starting dash

        this.store_link_url = this.store_slug + ".leyyow.com";

        if (blur == "blur") {
          this.store_slug = this.store_slug.replace(/-+$/, ""); //trim ending dash
          this.store_link_url = this.store_slug + ".leyyow.com";
        }
      } else {
        this.store_link_url = "";
      }
    },
    previousStep() {
      this.step = 1;
      this.color1 = "#F62873";
    },
  },
  computed: {
    step1() {
      if (this.store_name && this.store_slug && this.store_type) {
        return true;
      } else {
        return false;
      }
    },
    step2() {
      if (
        this.email &&
        this.password
        // !this.v$.email.$error &&
        // !this.v$.password.$error
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  watch: {},
};
</script>

<style scoped lang="scss">
.auth .v-sheet.v-stepper:not(.v-sheet--outlined) {
  box-shadow: 0 0 0;
  margin-bottom: 30px;
}
.v-stepper__header {
  height: 50px;
  width: 220px;
  margin: 0 auto;
  box-shadow: 0 0 0;
}
</style>

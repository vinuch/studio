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
          <h1 class="text-left mt-5 pt-5 text-h6 text_pink--text">Create your store</h1>
          <p class="text-left text-body-2 text_pink--text">Enter your store name, custom link, and select a store type.</p>
          <v-form class="auth_form_xs" :class="{'form_lg': !$vuetify.breakpoint.xs}">
            <v-stepper>
              <v-stepper-header>
                <v-stepper-step :complete="step1" :color="color1" step="1"></v-stepper-step>                
                <v-divider></v-divider>
                <v-stepper-step :complete="step2" :color="color2" step="2"></v-stepper-step>
              </v-stepper-header>
            </v-stepper>
            <div v-if="step === 1">
              <v-text-field
                label="Store Name"
                v-model="store_name" 
                outlined
                :rules="storeNameRules"
              ></v-text-field>
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
            <div v-if="step === 2">
              <v-text-field
                label="Email"
                v-model="email" 
                outlined
                :rules="emailRules"
              ></v-text-field>
              <v-text-field
                label="Password"
                v-model="password" 
                outlined
                type="password"
                :rules="passwordRules"
              ></v-text-field>
              <p @click="previousStep">Back</p>
            </div>
            <v-btn 
              block 
              depressed 
              height=56px 
              color="#F62873"
              @click="createAccount()"
            >
              <span v-if="step === 1" >Continue</span>
              <span v-if="step === 2" >Create store</span>
            </v-btn>
            <p class="mt-5 text-body-2">Already have an account?
              <router-link to="/login"><span class="pink_link">Log in</span></router-link>
            </p>
            <p class="footnote text-body-2">By signing up, I agree to Leyyow's <span>Privacy Policy</span> and <span>Terms &#38; Conditions</span></p>
            <!-- <div class="auth_float"></div> -->
          </v-form>
        </div>
      </v-col>
    </v-row>
  </div>
</div>
</template>

<script>
  import axios from "axios"
  import {
    signUp,
    createStore,
  } from "@/services/apiServices"
  import { EventBus } from "@/services/eventBus"

  import About from '@/components/About'
  import xsTop from '@/components/xsTop'

  export default {
    name: 'Login',
    components: {
      About,
      xsTop,
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
        {name: "Food", type: 6}, 
        {name: "Fashion & Accessories", type: 1},
        {name: "Health & Beauty", type: 2},
        {name: "Gadgets & Electronics", type: 3},
        {name: "Events", type: 4},
        {name: "Other", type: 5},
      ],
      storeNameRules: [
        v => v.lenght >= 3 || "Store name should be three letters or more",
      ],
      emailRules: [
      ],
      passwordRules: [
      ],
      storeLinkRules: []
    }),
    methods: {
      createAccount() {
        if (this.step === 1) {
          this.step = 2
          // this.color2 = "primary"
          if (this.step1 == false) {
            this.color1 = "grey"
          }
        } else {
          if (this.step1 && this.step2 == true) {
            let data = {
              email: this.email,
              password: this.password
            }
            signUp(data)
            .then((res) => {
              window.sessionStorage.setItem("leyyow_token", res.data.token);
              axios.defaults.headers.common[
                "Authorization"
              ] = `Token ${res.data.token}`;

              // create store
              let data = {
                store_name: this.store_name,
                slug: this.store_slug,
                business_type: this.store_type,
              }
              createStore(data)
            })
            .catch(() => {
              EventBus.$emit("open_alert", "error", "Signup error")
            })
            .finally(() => {
              this.loading = false;
              this.$router.push("/dash")
              EventBus.$emit("open_alert", "success", "Sign up successful")
            });
          } else {
              EventBus.$emit("open_alert", "error", "Sign up form incomplete")
          }
        }
      },
      cleanStoreUrl(blur) {
        if (this.store_slug) {
          this.store_slug = this.store_slug.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, "") //remove diacritics
            .toLowerCase()
            .replace(/\s+/g, '-') //spaces to dashes
            .replace(/_/g, '-') //underscore to dashes
            .replace(/&/g, '-and-') //ampersand to and
            .replace(/[^\w-]+/g, '') //remove non-words
            .replace(/--+/g, '-') //collapse multiple dashes
            // .replace(/\-\-+/g, '-') //collapse multiple dashes
            .replace(/^-+/, '') //trim starting dash

          this.store_link_url = this.store_link + ".leyyow.com"

          if (blur == 'blur'){
            this.store_slug = this.store_slug.replace(/-+$/, ''); //trim ending dash
            this.store_link_url = this.store_slug + ".leyyow.com"
          }
        } else {
          this.store_link_url = ""
        }
      },
      previousStep() {
        this.step = 1
        this.color1 = "#F62873"
      }
    },
    computed: {
      step1() {
        if (this.store_name && this.store_slug && this.store_type) {
          return true
        } else {
          return false
        }
      },
      step2() {
        if (this.email && this.password) {
          return true
        } else {
          return false
        }
      }
    },
    watch: {
    },
  }
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

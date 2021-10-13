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
                v-model="storeName" 
                outlined
                :rules="storeNameRules"
              ></v-text-field>
              <v-text-field
                label="Store Link"
                v-model="storeLink" 
                outlined
                :rules="storeLinkRules"
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
                :rules="passwordRules"
              ></v-text-field>
              <p @click="previousStep">Back</p>
            </div>
            <v-btn 
              block 
              depressed 
              height=56px 
              color="#F62873"
              @click="createStore()"
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
      storeName: "",
      storeLink: "",
      storeType: "",
      email: "",
      password: "",
      store_type: null,
      store_types: [
        {name: "Food", type: 0}, 
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
      createStore() {
        if (this.step === 1) {
          this.step = 2
          // this.color2 = "primary"
          if (this.step1 == false) {
            this.color1 = "grey"
          }
        } else {
          if (this.step1 && this.step2 == true) {
            console.log("submit form")
          } else {
            console.log ("incomplete")
          }
        }
      },
      previousStep() {
        this.step = 1
        this.color1 = "#F62873"
      }
    },
    computed: {
      step1() {
        if (this.storeName && this.storeLink && this.storeType) {
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
    }
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

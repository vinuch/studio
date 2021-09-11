<template>
<v-container class="pa-0" fluid no-gutters>
  <xsTop />

  <v-container fluid no-gutters>
    <v-row>
      <v-col class="pink lighten-3 d-sm-flex d-none col-5">
        <About />
      </v-col>

      <v-col class="auth blue lighten-5 pa-0">
        <v-container>
          <v-img
            alt="leyyow logo"
            :src="require('@/assets/leyyow_logo_old.svg')"
            class="logo"
            contain
            position="center left"
            height="20"
          />
          <h1 class="text-left">Create your store</h1>
          <!-- <p class="text-left note">Enter your store name, custom link, and select a store type.</p> -->
          <v-form class="form_lg">
            <v-stepper>
              <v-stepper-header>
                <v-stepper-step :complete="step1" step="1"></v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="step2" step="2"></v-stepper-step>
              </v-stepper-header>
            </v-stepper>
            <div v-if="step === 1">
              <p class="text-left label">Store Name</p>
              <v-text-field
                v-model="storeName" 
                outlined
                :rules="storeNameRules"
              ></v-text-field>
              <p class="text-left label">Store Link</p>
              <v-text-field
                v-model="storeLink" 
                outlined
                :rules="storeLinkRules"
              ></v-text-field>
              <p class="text-left label">Store Type</p>
              <v-select
                v-model="storeType" 
                outlined 
                :store_types="store_types"
              ></v-select>
            </div>
            <div v-if="step === 2">
              <p class="text-left label">Email address</p>
              <v-text-field
                v-model="email" 
                outlined
                :rules="storeNameRules"
              ></v-text-field>
              <p class="text-left label">Create password</p>
              <v-text-field
                v-model="password" 
                outlined
                :rules="storeLinkRules"
              ></v-text-field>
            </div>
            <v-btn 
              block 
              depressed 
              height=56px 
              color="#3A50D5"
              @click="createStore()"
            >
              <span v-if="step === 1" >Continue</span>
              <span v-if="step === 2" >Create store</span>
            </v-btn>
            <p>Already have an account?
              <router-link to="/login"><span class="blue_link">Log in</span></router-link>
            </p>
            <p class="footnote">By signing up, I agree to Leyyow's <span>Privacy Policy</span> and <span>Terms &#38; Conditions</span></p>
          </v-form>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</v-container>
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
      step: 1, // current step displayed
      storeName: "",
      storeLink: "",
      storeType: "",
      email: "",
      password: "",
      store_types: ["Food", "Fashion"],
      storeNameRules: [
        v => v.lenght >= 3 || "Store name should be three letters or more",
      ],
      storeLinkRules: []
    }),
    methods: {
      createStore() {
        if (this.step === 1) {
          this.step = 2
        } else {
          if (this.step1 && this.step2 == true) {
            console.log("submit form")
          } else {
            console.log ("incomplete")
          }
        }
      }
    },
    computed: {
      step1() {
        if (this.storeName && this.storeLink) {
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
</style>

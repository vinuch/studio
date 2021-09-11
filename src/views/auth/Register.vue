<template>
<v-container class="pa-0" fluid no-gutters>
  <XSTop />

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
                <v-stepper-step class="" step="1"></v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="2"></v-stepper-step>
              </v-stepper-header>
            </v-stepper>
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
            <v-btn block depressed height=56px color="#3A50D5">Continue</v-btn>
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
  import XSTop from '@/components/XSTop'

  export default {
    name: 'Login',
    components: {
      About,
      XSTop,
    },
    data: () => ({
      storeName: "",
      storeLink: "",
      storeType: "",
      store_types: ["Food", "Fashion"],
      storeNameRules: [
        v => v.lenght >= 3 || "Store name should be three letters or more",
      ],
      storeLinkRules: []
    }),
    computed: {

    }
  }
</script>

<style scoped lang="scss">
  .auth .v-sheet.v-stepper:not(.v-sheet--outlined) {
    box-shadow: 0 0 0;
    margin-bottom: 30px;
  }
</style>

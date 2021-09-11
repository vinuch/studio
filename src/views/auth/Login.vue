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
          <h1 class="text-left">Welcome back</h1>
          <p class="text-left note">Enter your email and password to log in.</p>
          <v-form class="form_lg">
            <p class="text-left label">Email address</p>
            <v-text-field
              v-model="storeName" 
              outlined
              :rules="storeNameRules"
            ></v-text-field>
            <p class="text-left label">Password</p>
            <v-text-field
              v-model="storeLink" 
              outlined
              :rules="storeLinkRules"
            ></v-text-field>
            <p class="footnote">
              <router-link to="/forgot_password"><span class="blue_link">Forgot password</span></router-link>
            </p>
            <v-btn block depressed height=56px color="#3A50D5">Login</v-btn>
            <p>Don't have a store?
              <router-link to="/register"><span class="blue_link">Create one</span></router-link>
            </p>
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

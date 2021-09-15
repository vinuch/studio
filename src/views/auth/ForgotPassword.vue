<template>
<v-container class="pa-0" fluid fill-height no-gutters>
  <xsTop />

  <v-container class="pa-0" fluid fill-height no-gutters>
    <v-row class="full_row">
      <v-col class="pink lighten-3 d-sm-flex d-none col-6">
        <About />
      </v-col>

      <v-col class="auth blue lighten-5 pa-0">
        <v-container fill-height>
          <v-img
            alt="leyyow logo"
            :src="require('@/assets/leyyow_logo_old.svg')"
            class="logo"
            contain
            position="center left"
          />
          <h1 class="text-left">Forgot Password?</h1>
          <p class="text-left note">Enter the email address you created your store with.</p>
          <v-form :class="{'form_lg': !$vuetify.breakpoint.xs}">
            <v-text-field
              label="Email"
              v-model="email" 
              outlined
              :rules="emailRules"
            ></v-text-field>
            <v-btn block depressed height=56px color="#3A50D5">Request reset password</v-btn>
            <p>Remember your password?
              <router-link to="/login"><span class="blue_link">Log in</span></router-link>
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
      newPassword: "",
      newPassword2: "",
    }),
    computed: {

    }
  }
</script>

<style scoped>
.form_lg {
  padding-top: 90px;
}
</style>
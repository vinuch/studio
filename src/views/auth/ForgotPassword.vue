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
          <h1 class="text-left mt-5 pt-5 text-h6 text_pink--text">Forgot Password?</h1>
          <p class="text-left text-body-2 text_pink--text">Enter the email address you created your store with.</p>
          <v-form class="auth_form_xs mt-2" :class="{'form_lg': !$vuetify.breakpoint.xs}">
            <v-text-field
              label="Email"
              v-model="email" 
              outlined
              :rules="storeNameRules"
            ></v-text-field>
            <v-btn 
              block 
              depressed 
              height=56px 
              color="#F62873"
              @click="login()"
            >
              Request reset password
            </v-btn>
            <p class="text-body-2 mt-5">Remember your password?
              <router-link to="/login"><span class="pink_link">Log in</span></router-link>
            </p>
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
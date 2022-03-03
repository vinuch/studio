<template>
  <div class="pa-0">
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
            <h1 class="text-left mt-5 pt-5 text-h6" style="color: #0C3E26">
              Forgot Password?
            </h1>
            <p class="text-left text-body-2" style="color: #445B54">
              Enter the email associated with your account.
            </p>
            <v-form
              class="auth_form_xs mt-2"
              :class="{ form_lg: !$vuetify.breakpoint.xs }"
            >
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
              <Button
                :block="true"
                label="send"
                :primary="true"
                size="large"
                @onClick="requestPassworReset"
              />
              <p class="text-body-2 mt-5">
                Remember your password?
                <router-link to="/login"
                  ><span class="primary_link">Log in</span></router-link
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
import About from "@/components/About";
import MobileBanner from "@/components/MobileBanner";
import TextInput from "@/components/TextInput";
import { required, email } from "@vuelidate/validators";
import { EventBus } from "@/services/eventBus";

import Button from "@/components/Button";

export default {
  name: "Login",
  components: {
    About,
    MobileBanner,
    Button,
    TextInput,
  },
  data: () => ({
    validations: {
      email: { required, email },
    },
  }),
  methods: {
    requestPassworReset() {
      // this.$store.commit(mutationTypes.SET_SETTINGS_STATE, false);
      EventBus.$emit("dialog", "open", "success_password_reset_mail");

    }
  },
  computed: {},
};
</script>

<style scoped>
.form_lg {
  padding-top: 90px;
}
</style>

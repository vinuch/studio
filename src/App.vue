<template>
  <v-app id="app" class="mobileHide">
    <div id="main-content">
      <Snackbar
        v-if="show_alert"
        :message="message"
        :alert_type="alert_type"
        :action="action"
      />

      <Dialog
        v-if="dialog == true"
        :modal="modal"
        :phone="phone"
        :name="name"
        @closeDialog="closeDialog()"
      />

      <div class="mb-5">
        <v-main>
          <router-view />
        </v-main>
      </div>

      <BottomNav v-if="logged_in" />
    </div>

    <div
      class=" justify-center align-center d-none d-sm-flex"
      style="height: 100%"
    >
      Please view this site on a mobile device to continue.
    </div>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import { EventBus } from "@/services/eventBus";

import Dialog from "@/components/Dialog";
import Snackbar from "@/components/Snackbar";
import BottomNav from "@/components/BottomNav";
import * as mutationTypes from "@/store/mutationTypes";

export default {
  name: "App",
  components: {
    BottomNav,
    Dialog,
    Snackbar,
  },
  data: () => ({
    action: "",
    alert_type: "", // colour theme e.g. success, etc
    dialog: false,
    phone: "",
    name: "",
    message: "",
    modal: "",
    show_alert: false,
  }),
  computed: {
    ...mapGetters({
      logged_in: "getLoggedIn",
    }),
  },
  mounted() {
    // console.log(this.logged_in);
  },
  created() {
    let token = window.sessionStorage.getItem("leyyow_token");
    if (token) {
      this.$store.commit(mutationTypes.LOGGED_IN, true);
    } else {
      this.$store.commit(mutationTypes.LOGGED_IN, false);
    }

    EventBus.$on("get_variants", () => {
      console.log("get variants activated from edit product");
    });
    EventBus.$on("open_alert", (type, message, action) => {
      // console.log("receiving emit")
      this.show_alert = true;
      this.alert_type = type;
      this.message = message;
      this.action = action;
      setTimeout(() => {
        this.show_alert = false;
        this.action = "";
        this.alert_type = "";
        this.message = "";
      }, 6000);
    }),
      EventBus.$on("dialog", (state, modal, phone, name) => {
        state == "open" ? (this.dialog = true) : (this.dialog = false);
        modal == "" ? (this.modal = "") : (this.modal = modal);
        phone ? (this.phone = phone) : null;
        name ? (this.name = name) : null;
      });
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600&display=swap");

* {
  font-family: "graphik", Helvetica, Arial, sans-serif !important;
}

@font-face {
  font-family: "graphik";
  src: url("./assets/fonts/GraphikBold.woff") format("woff");
  font-weight: 700;
  font-style: normal;
}
@font-face {
  font-family: "graphik";
  src: url("./assets/fonts/GraphikBlack.woff") format("woff");
  font-weight: 900;
  font-style: normal;
}
@font-face {
  font-family: "graphik";
  src: url("./assets/fonts/GraphikMedium.woff") format("woff");
  font-weight: 500;
  font-style: normal;
}
@font-face {
  font-family: "graphik";
  src: url("./assets/fonts/GraphikLight.woff") format("woff");
  font-weight: 300;
  font-style: normal;
}
@font-face {
  font-family: "graphik";
  src: url("./assets/fonts/GraphikThin.woff");
  font-weight: 100;
  font-style: normal;
}
@font-face {
  font-family: "graphik";
  src: url("./assets/fonts/GraphikRegular.woff") format("woff");
  font-weight: 400;
  font-style: normal;
}

/* use a media query to filter small devices */
@media (min-width: 801px) {
  /* show the popup */
  #main-content {
    display: none;
  }
}
.v-application {
  [class*="text-"] {
    font-family: "graphik", Helvetica, Arial, sans-serif !important;
  }
  font-family: "graphik", Helvetica, Arial, sans-serif !important;
}
#app {
  font-family: "graphik", Helvetica, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

:root {
  --primary: #4caf50;
  --primaryDark: #143e32;
}

.text-color-primaryDark {
  color: var(--primaryDark) !important;
}
.text-color-primary {
  color: var(--primary) !important;
}

.v-stepper__header
  .v-stepper__step.v-stepper__step--active
  > span.v-stepper__step__step {
  background: none !important;
  border: 1px solid var(--primary);
  border-radius: 6px;
  color: var(--primary);
}
.v-stepper__header
  .v-stepper__step.v-stepper__step--complete
  > span.v-stepper__step__step {
  background: var(--primary) !important;
}
.v-stepper__header .v-stepper__step > span.v-stepper__step__step {
  background: none !important;
  border: 1px solid #e5e9f2;
  border-radius: 6px;
  color: #e5e9f2;
}

.v-dialog {
  border-radius: 32px;
}

h1,
.h1 {
  font-size: 20px;
}
h2,
.h2 {
  font-size: 16px;
}
h3 {
  font-size: 14px;
}
.body1 {
  font-size: 14px;
}
.body2 {
  font-size: 12px;
}
.medium {
  font-weight: 500;
}
.semibold {
  font-weight: 600;
}
.regular {
  font-weight: 400;
}
.v-btn {
  text-transform: none !important;
  color: #fff !important;
}
.note {
  font-size: 18px;
  color: #868b90;
}
.footnote {
  // font-size: 14px;
}
.auth .logo {
  margin-top: 50px;
  margin-bottom: 50px;
  width: 100%;
  height: 25px;
}
.form_lg {
  background: #fff;
  width: 100%;
  padding-top: 30px;
  padding-bottom: 0;
}
.auth .form_lg .v-btn {
  margin-bottom: 20px;
}
// vuetify input, select and button radius
.v-text-field--outlined,
.v-btn:not(.v-btn--round).v-size--default {
  border-radius: 8px !important;
}
.v-text-field--outlined fieldset {
  border: 1px solid #e5e5e5 !important;
}
.auth_float {
  width: 100%;
  height: 20px;
  position: relative;
  bottom: 0;
  background: green;
}
.title {
  font-size: 22px;
  line-height: 24px;
}
.pointer {
  cursor: pointer;
}
.float-right {
  float: right;
}
.float-left {
  float: left;
}
/* COLOURS */
.light_grey {
  // background: #ECF0F4;
  // background: #F6F8FA;
  background: #eaecee;
}
.blue_link {
  color: #3a50d5;
}
.pink_link {
  color: #f62873;
}
.primary_link {
  color: var(--primary);
}

.button--primary {
  color: white !important;
  background: var(--primary) !important;
}
.button--secondary {
  color: #333;
  background-color: transparent;
  /* box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset; */
}

.button--medium {
  font-size: 14px;
  padding: 11px 20px;
}
.button--large {
  font-size: 16px;
  padding: 18px 24px;
}
</style>

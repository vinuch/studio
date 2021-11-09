<template>
  <v-app id="app">
    <Snackbar
      v-if="show_alert"
      :message="message"
      :alert_type="alert_type"
      :action="action"
    />

    <Dialog
      v-if="dialog == true" 
      :modal="modal" 
      @closeDialog = closeDialog()
    />

    <v-main>
      <router-view/>
    </v-main>

    <BottomNav v-if="this.logged_in"/>

  </v-app>
</template>

<script>
import { mapGetters } from "vuex"
import { EventBus } from "@/services/eventBus";

import Dialog from "@/components/Dialog"
import Snackbar from "@/components/Snackbar"
import BottomNav from "@/components/BottomNav"

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
    message: "",
    modal:"",
    show_alert: false,
  }),
  computed: {
    ...mapGetters({
      logged_in: "getLoggedIn",
    }),
  },
  created() {
    EventBus.$on("get_variants", () => {
      console.log("get variants activated from edit product")
    })
    EventBus.$on("open_alert", (type, message, action) => {
      // console.log("receiving emit")
      this.show_alert = true
      this.alert_type = type
      this.message = message
      this.action = action
      setTimeout(() => {
        this.show_alert = false
        this.action = ""
        this.alert_type = ""
        this.message = ""
      }, 6000)
    }),
    EventBus.$on("dialog", (state, modal) => {
      state == "open" ? this.dialog = true : this.dialog = false
      modal == "" ? this.modal = "" : this.modal = modal
    })
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600&display=swap');

#app {
  font-family: "Poppins", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
h1, .h1 {
  font-size: 20px;
}
h2, .h2 {
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
  color: #FFF !important;
}
.note {
  font-size: 18px;
  color: #868B90;
}
.footnote {
  // font-size: 14px;
}
.auth .logo {
  margin-top: 50px;
  margin-bottom: 50px;
  width: 100%;
  height:25px;
}
.form_lg {
  background: #FFF;
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
  border: 1px solid #E5E5E5 !important;
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
  background: #EAECEE;
}
.blue_link {
  color: #3A50D5;
}
.pink_link {
  color: #F62873;
}
</style>
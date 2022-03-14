<template>
  <div>
    <v-card class="rounded-xl pa-3">
      <h1 class="my-4 text-capitalize">verification</h1>

      <v-card-text>
        Enter the OTP code sent to your ({{ store.email }}) mail
      </v-card-text>
      <ul class="otp_list pa-0">
        <li>
          <v-text-field
            id="otp_1"
            v-model="otp_1"
            outlined
            hide-details
            type="text"
            maxLength="1"
            dense
            @keyup="nextDigit($event)"
            @paste="pasteOTP"
          />
        </li>
        <li>
          <v-text-field
            id="otp_2"
            v-model="otp_2"
            outlined
            hide-details
            type="text"
            maxLength="1"
            dense
            @keyup="nextDigit($event)"
          />
        </li>
        <li>
          <v-text-field
            id="otp_3"
            v-model="otp_3"
            outlined
            hide-details
            type="text"
            maxLength="1"
            dense
            @keyup="nextDigit($event)"
          />
        </li>
        <li class="ma-0 dash">-</li>
        <li>
          <v-text-field
            id="otp_4"
            v-model="otp_4"
            outlined
            hide-details
            type="text"
            maxLength="1"
            dense
            @keyup="nextDigit($event)"
          />
        </li>
        <li>
          <v-text-field
            id="otp_5"
            v-model="otp_5"
            outlined
            hide-details
            type="text"
            maxLength="1"
            dense
            @keyup="nextDigit($event)"
          />
        </li>
        <li>
          <v-text-field
            id="otp_6"
            v-model="otp_6"
            outlined
            hide-details
            type="text"
            maxLength="1"
            dense
            @keyup="nextDigit($event)"
          />
        </li>
      </ul>
      <Button
        :block="true"
        :label="!otp_check ? 'Verify' : 'Clear'"
        :primary="true"
        size="large"
        @onClick="clearOTP"
        :containerStyle="{ marginTop: '1rem' }"
      />

      <v-card-text>
        Did not receive OTP?
        <span class="pointer" @click="resendEmail()">Resend</span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { EventBus } from "@/services/eventBus";
import { verifyEmailPhone } from "@/services/apiServices";
import * as mutationTypes from "@/store/mutationTypes";
import Button from "@/components/Button";

export default {
  name: "VerifyID",
  components: {
    Button,
  },
  data: () => ({
    otp: "",
    otp_1: "",
    otp_2: "",
    otp_3: "",
    otp_4: "",
    otp_5: "",
    otp_6: "",
    otp_check: false,
  }),
  methods: {
    clearOTP() {
      this.otp = "";
      this.otp_1 = "";
      this.otp_2 = "";
      this.otp_3 = "";
      this.otp_4 = "";
      this.otp_5 = "";
      this.otp_6 = "";
      this.otp_check = false;
    },
    nextDigit(e) {
      if (this.otp.length < 5) {
        this.otp += e.key;

        console.log(this.otp);
        if (this.otp.length > 5) {
          this.resolveOTP();
        }

        // document.getElementById(`otp_${this.otp.length}`).disabled = true;
        document.getElementById(`otp_${this.otp.length + 1}`).focus();
        // prevent from future focus/disable
        // except backspace conditions
      } else {
        this.resolveOTP();
      }
    },
    pasteOTP(e) {
      e.stopPropagation();
      e.preventDefault();

      this.otp = e.clipboardData.getData("text");
      this.otp_1 = this.otp[0];
      this.otp_2 = this.otp[1];
      this.otp_3 = this.otp[2];
      this.otp_4 = this.otp[3];
      this.otp_5 = this.otp[4];
      this.otp_6 = this.otp[5];

      for (let i = 1; i <= this.otp.length; i++) {
        document.getElementById(`otp_${i}`).disabled = true;
      }

      this.otp.length > 5 ? this.resolveOTP() : "";
    },
    resendEmail() {
      console.log("resend email");
    },
    resolveOTP() {
      verifyEmailPhone(this.otp, this.store.email) // modify to use account email not store email
        .then((res) => {
          console.log(res);
          if (res.data.status == "Success") {
            this.otp = "";
            this.$store.commit(mutationTypes.EMAIL_VERIFIED, true);
            this.$store.commit(mutationTypes.SET_SETTINGS_STATE, true); // confirm what this is
            EventBus.$emit("open_alert", "success", "Email verified.");
            EventBus.$emit("dialog", "close", "");
          } else {
            EventBus.$emit(
              "open_alert",
              "danger",
              "Incorrect OTP ",
              res.data.staus
            );
            this.otp_check = true;
          }
        })
        .finally(() => {});
    },
  },
  computed: {
    ...mapGetters({
      store: "getStore",
    }),
  },
};
</script>

<style scoped>
.otp_list {
  list-style-type: none;
}
.otp_list li {
  width: 35px;
  display: inline-block;
  margin-right: 10px;
  text-align: center;
}
li.dash {
  margin-left: -15px !important;
  margin-right: -7px !important;
  padding: 0;
}
</style>

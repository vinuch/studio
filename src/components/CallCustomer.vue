<template>
  <div class="rounded-xl ">
    <v-card class="elevation-0 overflow-hidden">
      <img
        :src="require('@/assets/man-and-woman.png')"
        width="150"
        class="mt-8"
        alt=""
      />
      <div class="my-4">
        <h3 class=" justify-center" style="font-weight:600; font-size:1.3rem">
          Call customer
        </h3>
        <span class="body-2" style="color: #646464;">
          Are you sure you want to call your customer ({{ phone }})
        </span>
      </div>
      <v-card-actions class="justify-center mb-2">
        <span
          style="color: #445B54; font-weight: 600;margin: 0 1rem"
          @click="closeDialog()"
          >Cancel</span
        >
    <a :href="`tel:${phone}`">
         <Button
          :containerStyle="{ margin: '0 1rem' }"
          label="Call"
          :primary="true"
        />
    </a>
       
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { EventBus } from "@/services/eventBus";
import {
  bankList,
  resolveAcc,
  createSubAcc,
  saveMerchSettlement,
} from "@/services/apiServices";
import * as mutationTypes from "@/store/mutationTypes";
import Button from "./Button/Button.vue";

export default {
  name: "BankDetails",
  components: {
    Button,
  },
  props: ["phone"],
  data: () => ({
    acc_name: "",
    acc_no: "",
    acc_resolved: false,
    acc_set: false,
    banks: [],
    bank_code: "",
    bank_name: "",
  }),
  methods: {
    closeDialog() {
      this.$store.commit(mutationTypes.SET_SETTINGS_STATE, true);
      EventBus.$emit("dialog", "close", "");
    },
    addAccount() {
      this.$store.commit(mutationTypes.SET_SETTINGS_STATE, false);
    },
    save() {
      EventBus.$emit("dialog", "open", "success");
      let trans_data = {
        business_name: this.store.store_name, // should be business name - model not implemented
        settlement_bank: this.bank_code,
        account_number: this.acc_no,
        percentage_charge: 5.0, // this shouldn't be hard coded. Model not yet implemented
        description:
          "Creating merchant settlement account as sub account for Leyyow",
      };
      createSubAcc(trans_data)
        .then((response) => {
          let save_data = {
            acc_name: this.acc_name,
            bank: this.bank_name,
            bank_code: this.bank_code,
            acc_no: this.acc_no,
            subaccount: response.data.data.subaccount_code,
            store: this.store.store_name,
          };
          saveMerchSettlement(save_data).then(() => {
            // this.$store.commit(mutationTypes.SAVE_STORE, response)
            EventBus.$emit("open_alert", "success", "Bank details added");
            this.$router.go(0);
          });
        })
        .catch((err) => {
          EventBus.$emit(
            "open_alert",
            "error",
            "Error saving account details" + err
          );
        })
        .finally(() => {});
    },
  },
  computed: {
    ...mapGetters({
      store: "getStore",
      settlement: "getSettlement",
      settings: "getSettingsState",
    }),
  },
  created() {
    bankList().then((response) => {
      this.banks = response.data.data;
    });
  },
  watch: {
    acc_no() {
      if (this.bank_code != "" && this.acc_no.length == 10) {
        // disable input temporarily
        // show loading symbol
        resolveAcc(this.bank_code, this.acc_no)
          .then((response) => {
            this.acc_name = response.data.data.account_name;
            let the_bank = this.banks.filter((bank) => {
              return bank.id == response.data.data.bank_id;
            });
            this.bank_name = the_bank[0].name;
            this.acc_resolved = true;
          })
          .catch((err) => {
            EventBus.$emit(
              "open_alert",
              "error",
              "Error getting account details" + err
            );
          });
      }
    },
  },
  mounted() {
    if (this.store.verified[1] == 1) {
      this.acc_set = true;
    }
  },
};
</script>

<style scoped>
.v-messages__message {
  color: green !important;
}
/* div.theme--light.v-messages div.v-messages__message {
    color: green !important;
    background: orange; */
/* } */
</style>

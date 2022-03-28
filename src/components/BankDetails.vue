<template>
  <div class="rounded-xl ">
    <div v-if="settings" class="pa-5 pt-0">
      <div v-if="acc_set">
        <div class="pa-3 rounded-xl" style="border: 1px solid black;">
          <p @click="addAccount()">+ <br />Change bank account</p>
        </div>
        <v-card class="mt-5 pa-5 rounded-xl" flat>
          <p class="text-left ">{{ settlement.acc_name }}</p>
          <div class="pb-5">
            <p class="text-left" style="float: left">{{ settlement.acc_no }}</p>
            <p class="text-right" style="float: right">{{ settlement.bank }}</p>
          </div>
        </v-card>
      </div>
    </div>
    <v-card v-else class="elevation-0 overflow-hidden">
      <v-card-text>
        <v-card-title
          class=" justify-center"
          style="font-weight:600; font-size:1.3rem"
        >
          Settlement Account
        </v-card-title>
        Provide your bank account details so you can receive payments.
      </v-card-text>
      <div>
        <v-col class="d-flex pa-5 pt-0 pb-0">
          <v-autocomplete
            v-model="bank_code"
            :items="banks"
            label="Select bank"
            item-text="name"
            item-value="code"
            item-color="success"
            outlined
          ></v-autocomplete>
          <!-- <v-select
            item-text="name"
            item-value="code"
            v-model="bank_code"
            :items="banks"
            label="Select bank"
            item-color="success"
            outlined
          ></v-select> -->
        </v-col>
        <v-col class="d-flex pa-5 pt-0 pb-0 mb-2">
          <v-text-field
            label="Account number"
            outlined
            type="number"
            name="acc_no"
            maxLength="10"
            v-model.trim="acc_no"
            :hint="acc_name"
            persistent-hint
          >
          </v-text-field>
        </v-col>
      </div>
      <setupFooter @saveSetUp="save()" :disabled="!acc_name" />
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
  updateStore,
} from "@/services/apiServices";
import * as mutationTypes from "@/store/mutationTypes";
import setupFooter from "@/components/setupFooter";

export default {
  name: "BankDetails",
  components: {
    setupFooter,
  },
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
    addAccount() {
      this.$store.commit(mutationTypes.SET_SETTINGS_STATE, false);
    },
    save() {
      let trans_data = {
        business_name: this.store.store_name, // should be business name - model not implemented
        settlement_bank: this.bank_code,
        account_number: this.acc_no,
        percentage_charge: 5.0, // this shouldn't be hard coded. Model not yet implemented
        description:
          "Creating merchant settlement account as sub account for Leyyow",
      };
      createSubAcc(trans_data, this.settlement.paystack_secret_key)
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
            EventBus.$emit("dialog", "open", "success");

            let verified = this.store.verified;
            let split = verified.split("");

            split[1] = "1";
            split.join("");

            console.log(split);

            updateStore({ verified: "01100" }, this.store.id)
              .then((res) => {
                let store = res.data;
                console.log(store);
                this.$store.commit(mutationTypes.SAVE_STORE, store);
                this.$router.go(0);

                //     let verified = this.store.verified
                //     verified[3] = 1

                // this.$store.commit(mutationTypes.SAVE_STORE, {...this.store, verified})
              })
              .catch((err) => {
                console.log(err);
              })
              .finally(() => {});
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
        console.log(this.settlement)
        resolveAcc(
          this.bank_code,
          this.acc_no,
          this.settlement.paystack_secret_key || this.settlement.keys.paystack_secret_key
        )
          .then((response) => {
            this.acc_name = response.data.data.account_name;
            let the_bank = this.banks.filter((bank) => {
              return bank.id == response.data.data.bank_id;
            });
            this.bank_name = the_bank[0].name;
            this.acc_resolved = true;
          })
          .catch(() => {
            EventBus.$emit("open_alert", "error", "invalid account details");
          });
      } else {
        console.log("adlaksdjfa");
        this.acc_name = "";
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

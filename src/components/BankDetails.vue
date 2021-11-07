<template>
<div>
  <div v-if="manage" class="pa-5 pt-0">
    <div v-if="acc_set">
      <div class="pa-3 rounded-xl" style="border: 1px solid black;">
        <p @click="addAccount()">+ <br />Change bank account</p>
      </div>
      <v-card
        class="mt-5 pa-5 rounded-xl"
        flat
      >
        <p class="text-left font-weight-bold">{{ settlement.acc_name }}</p>
        <div class="pb-5">
          <p class="text-left" style="float: left">{{ settlement.acc_no }}</p>
          <p class="text-right" style="float: right">{{ settlement.bank }}</p>
        </div>
      </v-card>
    </div>
  </div>
  <v-card v-else class="rounded-xl">
    <v-card-text>
      <v-card-title class="title justify-center">
        Settlement Account
      </v-card-title>
      Payments from your orders will be settled in this account:
    </v-card-text>
    <div>
      <v-col
        class="d-flex pa-5 pt-0 pb-0"
      >
        <v-select
          item-text="name"
          item-value="code"
          v-model="bank_code"
          :items="banks"
          label="Select bank"
          item-color="success"
          outlined
        ></v-select>
      </v-col>
      <v-col
        class="d-flex pa-5 pt-0 pb-0 mb-5"
      >
        <v-text-field
          label="Account number" 
          outlined
          type="number"
          name="acc_no" 
          v-model.trim="acc_no"
          :hint="acc_name"
          persistent-hint
        >
        </v-text-field>
      </v-col>
    </div>
    <setupFooter
      @saveSetUp="save()"
    >
      Save Bank Details
    </setupFooter>
  </v-card>
    <div style="height: 50px"></div>
</div>
</template>

<script>
  import { mapGetters } from "vuex"
  import { EventBus } from "@/services/eventBus"
  import {
    bankList,
    resolveAcc,
    createSubAcc,
    saveMerchSettlement,
  } from "@/services/apiServices";
  import * as mutationTypes from "@/store/mutationTypes"
  import setupFooter from "@/components/setupFooter"

  export default {
    name: 'BankDetails',
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
        this.$store.commit(mutationTypes.SET_MANAGE_STATE, false)
      },
      save(){
        let trans_data = {
          business_name: this.store.store_name, // should be business name - model not implemented
          settlement_bank: this.bank_code,
          account_number: this.acc_no,
          percentage_charge: 5.0, // this shouldn't be hard coded. Model not yet implemented
          description: "Creating merchant settlement account as sub account for Leyyow",
        }
        createSubAcc(trans_data)
        .then(response => {
          let save_data = {
            acc_name: this.acc_name,
            bank: this.bank_name,
            bank_code: this.bank_code,
            acc_no: this.acc_no,
            subaccount: response.data.data.subaccount_code,
            store: this.store.store_name
          }
          saveMerchSettlement(save_data)
          // .then(response => (
          //   this.$store.commit(mutationTypes.SAVE_STORE, response)
          // ))
        })
        .catch(err => {
          EventBus.$emit("open_alert", "error", "Error creating subaccount or saving settlement" + err) 
        })
        .finally(() => {
          EventBus.$emit("open_alert", "success", "Settlement bank details added")
          EventBus.$emit("dialog", "close", "")
        });
      }
    },
    computed: {
      ...mapGetters({
        store: "getStore",
        settlement: "getSettlement",
        manage: "getManageState",
      }),
    },
    created(){
      bankList()
      .then(response => {
        this.banks = response.data.data
      })
    },
    watch: {
      acc_no() {
        if (this.bank_code != "" && this.acc_no.length == 10) {
          // disable input temporarily
          // show loading symbol
          resolveAcc(this.bank_code, this.acc_no)
          .then(response => {
            this.acc_name = response.data.data.account_name
            let the_bank = this.banks.filter((bank) => {
              return bank.id == response.data.data.bank_id
            })
            this.bank_name = the_bank[0].name
            this.acc_resolved = true
          })
          .catch((err) => {
            EventBus.$emit("open_alert", "error", "Error getting account details" + err) 
          })
        }
      }
    },
    mounted() {
      if (this.store.verified[1] == 1) {
        this.acc_set = true
      }
    },
  }
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

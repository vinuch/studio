<template>
<div>
  <v-card class="rounded-xl">
    <v-card-title class="title justify-center">
    Settlement Account
    </v-card-title>
    <v-card
      v-if="acc_set == false"

    >
      <p class="sub-title">Payments from orders will be settled in this account:</p>
      <ul>
        <li>{{ settlement.acc_name }}</li>
        <li>{{ settlement.acc_no }}</li>
        <li>{{ settlement.bank }}</li>
      </ul>
    </v-card>
    <v-card-text v-else>
      Payments from your orders will be settled in this account:
    </v-card-text>
    <div v-if="acc_set">
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
      @saveSetUp="saveSetUp()"
    >
      Save Bank Details
    </setupFooter>
  </v-card>
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

  import setupFooter from "@/components/setupFooter"

  export default {
    name: 'SetBankAcc',
    components: {
      setupFooter,
    },
    data: () => ({
      // dialog: true,
      acc_name: "",
      acc_no: "",
      acc_resolved: false,
      acc_set: false,
      banks: [],
      bank_code: "",
      bank_name: "",
    }),
    methods: {
      // closeDialog() {
      //   this.$emit('closeDialog')
      // },
      saveSetUp(){
        let trans_data = {
          business_name: "Another business name",
          settlement_bank: this.bank_code,
          account_number: this.acc_no,
          percentage_charge: 5.0,
          description: "Transaction on merchant.leyyow.com",
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
        })
        .catch(err => {
          EventBus.$emit("open_alert", "error", "Error creating subaccount or saving settlement" + err) 
        })
        .finally(() => {
          EventBus.$emit("open_alert", "success", "Settlement bank details added")
          // this.$router.push("/dash");
        });
      }
    },
    computed: {
      ...mapGetters({
        store: "getStore",
        settlement: "getSettlement"
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
            this.acc_resolved = true
          })
          .catch(() => {})
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

<template>
  <div class="rounded-xl py-5">
    <v-card class="elevation-0 overflow-hidden">
      <v-card-text>
        <v-card-title
          class="justify-center"
          style="font-weight: 600; font-size: 1.3rem"
        >
          Filter
        </v-card-title>
      </v-card-text>
      <div>
        <v-col cols="12" class=" pa-5 pt-0 pb-0 mb-2">
          <p class="text-left text-body-2 font-weight-bold">Order Price</p>
          <v-text-field
            label="Amount"
            outlined
            type="number"
            name="acc_no"
            v-model.trim="acc_no"
            :hint="acc_name"
            persistent-hint
          >
          </v-text-field>
        </v-col>
        <!-- <v-col cols="12" class=" pa-5 pt-0 pb-0 mb-2"> -->
          <p class="text-left text-body-2 font-weight-bold px-5">Order Dates</p>
          <div v-for="(period, i) in periods" :ref="'period_' + i" :key="i">
            <v-icon
              v-if="always_open != true"
              class="delete"
              @click="deletePeriod(i)"
            >
              mdi-delete-outline
            </v-icon>
            <OpenHours
              v-if="always_open != true"
              @setSelectedDay="setSelectedDay($event)"
              @setOpenTime="setOpenTime($event)"
              @setCloseTime="setCloseTime($event)"
              :isset_status="isset_status"
              :disable_set_days="disable_set_days"
              :set_indexes="set_indexes"
            />
          </div>
          <Button
            :block="true"
            :primary="true"
            label="Apply"
            size="large"
            :containerStyle="{ margin: '1rem ', }"
            @onClick="
              {
              }
            "
          />
        <!-- </v-col> -->
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

// import * as mutationTypes from "@/store/mutationTypes";
import Button from "@/components/Button";
import OpenHours from "@/components/OpenHours"

export default {
  name: "BankDetails",
  components: {
    Button,
    OpenHours
  },
  data: () => ({
    acc_name: "",
    acc_no: "",
    acc_resolved: false,
    acc_set: false,
    banks: [],
    bank_code: "",
    bank_name: "",
    periods: [{}]
  }),
  methods: {
    setCloseTime(time) {
      this.close = time;
    },
    setOpenTime(time) {
      this.open = time;
    },
    setSelectedDay(days) {
      this.days = days;
    },
  },
  computed: {
    ...mapGetters({
      store: "getStore",
      settlement: "getSettlement",
      settings: "getSettingsState",
    }),
  },
  created() {},
  watch: {},
  mounted() {},
};
</script>

<style scoped>
 ul {
    max-width: 300px;
    background: orange;
    margin: 0;
    padding: 0;
  }
  li {
    list-style-type: none;
    width: 52px;
    padding: 4px;
    margin-right: 5px;
    border: 1px solid #E2E8F0;
    color: #69747E;
    border-radius: 8px;
    display: inline-block;
  }
  .describe {
    font-size: 14px;
    text-align: left;
    color: #69747E;
    margin-bottom: 0;
  }
  .time input {
    width: 50px;
    border: 1px solid #3A50D5;
    border-radius: 8px;
    padding-left: 5px;
  }
  .delete {
    color: red;
    background: #FFF;
    padding: 4px;
    border-radius: 16px;
    float: right;
    right: 25px;
    top: -16px;
    cursor: pointer;
  }
</style>

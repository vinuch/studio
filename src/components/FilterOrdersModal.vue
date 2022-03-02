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
          <v-select
            :items="filterOptions"
            outlined
            label="Filter By"
            v-model="selectedFilterOption"
          ></v-select>
        </v-col>
        <!-- <v-col cols="12" class=" pa-5 pt-0 pb-0 mb-2"> -->
        <p class="text-left text-body-2 font-weight-bold px-5">Order Dates</p>

        <Button
          :block="true"
          :primary="true"
          label="Apply"
          size="large"
          :containerStyle="{ margin: '1rem ' }"
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
// import OpenHours from "@/components/OpenHours"
import * as mutationTypes from "@/store/mutationTypes";

export default {
  name: "BankDetails",
  components: {
    Button,
    // OpenHours
  },
  data: () => ({
    filterOptions: ["Customer name", "phone number", "Order number"],
    selectedFilterOption: "",
    acc_name: "",
    acc_no: "",
    acc_resolved: false,
    acc_set: false,
    banks: [],
    bank_code: "",
    bank_name: "",
    periods: [{}],
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
      filterOption: 'getFilterOption'

    }),
  },
  created() {},
  watch: {
    selectedFilterOption() {
      console.log(this.selectedFilterOption)
      this.$store.commit(mutationTypes.SET_FILTER_OPTION, this.selectedFilterOption);
    },
  },
  mounted() {
    this.selectedFilterOption = this.filterOption
  },
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
  border: 1px solid #e2e8f0;
  color: #69747e;
  border-radius: 8px;
  display: inline-block;
}
.describe {
  font-size: 14px;
  text-align: left;
  color: #69747e;
  margin-bottom: 0;
}
.time input {
  width: 50px;
  border: 1px solid #3a50d5;
  border-radius: 8px;
  padding-left: 5px;
}
.delete {
  color: red;
  background: #fff;
  padding: 4px;
  border-radius: 16px;
  float: right;
  right: 25px;
  top: -16px;
  cursor: pointer;
}
</style>

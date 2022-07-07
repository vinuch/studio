<template>
  <div class="rounded-xl">
    <v-card class="elevation-0 overflow-hidden ">
      <!-- <v-card-title class="title justify-center">
        Business Hours
      </v-card-title>
      <v-card-text>
        Set the hours you are available to receive orders
      </v-card-text> -->

      <v-sheet elevation="0" rounded="lg" class="ma-5 mb-0 py-5">
        <div>
          <p style="text-align: left; color: #69747E; font-weight: 600;">
            Always open?
            <span class="switch">
              <v-switch
                class="float-right mt-0 pt-0"
                style="position: relative; right: -12px;"
                id="switch"
                :input-value="always_open"
                inset
                @click="confirmSwitch"
              >
              </v-switch>
            </span>
          </p>
        </div>
        <p class="describe" v-if="always_open">
          Setting your store to <b>“Always open”</b> means that you can receive
          orders at any time and delivering your service isn’t time sensitive.
        </p>
      </v-sheet>
      <div v-if="always_open == true" style="height: 50px"></div>

      <div v-for="(period, i) in periods" :ref="'period_' + i" :key="i">
        <v-icon
          v-if="always_open != true && i > 0"
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
          :days="days"
          :period="i"
          :periods="periods"
        />
      </div>
      <!-- {{set_indexes.length}} {{days.length}} -->
      <div class="d-flex justify-space-between align-center block">
        <p
          v-if="always_open != true && !allDaysSet"
          class="text-left mb-5 pl-5 pointer describe"
          style="color: #4CAF50"
          @click="addPeriod()"
        >
          + specify more days and times
        </p>
        <!-- <p
          v-if="always_open != true && set_indexes.length <= days.length"
          class="text-left mb-5 pr-5 pointer describe"
          style="color: red"
          @click="deleteAllPeriods()"
        >
          <v-icon small v-if="always_open != true" class="delete">
            mdi-delete-outline
          </v-icon>
          clear
        </p> -->
      </div>

      <setupFooter @saveSetUp="save()" :modal="modal">
        Save Business Hours
      </setupFooter>
    </v-card>
  </div>
</template>

<script>
import { updateStore } from "@/services/apiServices";
import { mapGetters } from "vuex";
import * as mutationTypes from "@/store/mutationTypes";
import { EventBus } from "@/services/eventBus";

import setupFooter from "@/components/setupFooter";
import OpenHours from "@/components/OpenHours";

export default {
  name: "BusinessHours",
  props: ["modal"],
  components: {
    setupFooter,
    OpenHours,
  },

  data: () => ({
    always_open: true,
    close: null, // current closing time
    // days: [], // days of the week with truthy values
    days_with_times: [],
    disable_set_days: false,
    freeze: false, // freeze all edits after time is set
    isset_status: null,
    loading: false,
    open: null, // current open time
    periods: [{ days: [], open: null, close: null }], // days with same open and closing times
    set_indexes: [],
    stringified_hours: "",
    days: [
      { day: "Mon", open: "", close: "", selected: false, isset: false },
      { day: "Tue", open: "", close: "", selected: false, isset: false },
      { day: "Wed", open: "", close: "", selected: false, isset: false },
      { day: "Thu", open: "", close: "", selected: false, isset: false },
      { day: "Fri", open: "", close: "", selected: false, isset: false },
      { day: "Sat", open: "", close: "", selected: false, isset: false },
      { day: "Sun", open: "", close: "", selected: false, isset: false },
    ],
  }),

  methods: {
    confirmSwitch() {
      if (this.periods.length && !this.always_open) {
        let confirmed = confirm(
          "You’re switching your store hours to Always Open. All unsaved hours will be cleared."
        );
        if (confirmed) {
          this.always_open = !this.always_open;
        }
      } else {
        // this.periods = [{ days: [], open: null, close: null }];
        this.always_open = !this.always_open;
      }
    },
    deleteAllPeriods() {
      this.periods = [];

      this.days = [
        { day: "Mon", open: "", close: "", selected: false, isset: false },
        { day: "Tue", open: "", close: "", selected: false, isset: false },
        { day: "Wed", open: "", close: "", selected: false, isset: false },
        { day: "Thu", open: "", close: "", selected: false, isset: false },
        { day: "Fri", open: "", close: "", selected: false, isset: false },
        { day: "Sat", open: "", close: "", selected: false, isset: false },
        { day: "Sun", open: "", close: "", selected: false, isset: false },
      ];
      this.periods.push({});
      this.close = null;
      this.open = null;
    },
    addPeriod() {
      this.preSave();
      if (this.stringifyBizHrs()) {
        if (
          !this.periods[this.periods.length - 1].close ||
          !this.periods[this.periods.length - 1].open
        ) {
          EventBus.$emit(
            "open_alert",
            "error",
            "Set an opening time | Set a closing time ser"
          );
        } else if (this.set_indexes.length < this.days.length) {
          this.periods.push({ days: [], open: null, close: null });
          this.open = null;
          this.close = null;
          this.disable_set_days = false; // in case not already false

          this.$nextTick(function() {
            this.disable_set_days = true;
            this.isset_status = false;
          });
        }
      } else {
        // EventBus.$emit(
        //   "open_alert",
        //   "error",
        //   "Opening and closing hours have already been set for all days of the week"
        // );
      }
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
    deletePeriod(index) {
      let _days = this.periods[index].days;
      this.periods[index].close = null;
      this.periods[index].open = null;
      if (_days.length) {
        _days.forEach((day) => {
          this.days.find((item) => item.day === day)
            ? (this.days.find((item) => item.day === day).isset = false)
            : null;
        });
      }
      this.periods.splice(index, 1);
    },
    preSave() {
      if (this.days && this.open && this.close) {
        for (let i = 0; i < this.days.length; i++) {
          if (this.days[i].selected == true && this.days[i].isset == false) {
            this.days[i].open = this.open;
            this.days[i].close = this.close;
            this.set_indexes.push(i);
          }
        }
        this.isset_status = true; // prevent next period from editing
      } else {
        if (!this.days) {
          EventBus.$emit(
            "open_alert",
            "error",
            "Please select a day or days for this time-block "
          );
        }
      }
    },
    save() {
      if (this.always_open) {
        this.days = [
          {
            day: "Mon",
            open: "00:00",
            close: "11:59",
            selected: true,
            isset: false,
          },
          {
            day: "Tue",
            open: "00:00",
            close: "11:59",
            selected: true,
            isset: false,
          },
          {
            day: "Wed",
            open: "00:00",
            close: "11:59",
            selected: true,
            isset: false,
          },
          {
            day: "Thu",
            open: "00:00",
            close: "11:59",
            selected: true,
            isset: false,
          },
          {
            day: "Fri",
            open: "00:00",
            close: "11:59",
            selected: true,
            isset: false,
          },
          {
            day: "Sat",
            open: "00:00",
            close: "11:59",
            selected: true,
            isset: false,
          },
          {
            day: "Sun",
            open: "00:00",
            close: "11:59",
            selected: true,
            isset: false,
          },
        ];
        this.periods = [
          {
            days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            open: "00:00",
            close: "11:59",
          },
        ];
      }
      // this.preSave();
      if (this.stringifyBizHrs()) {
        let data = {
          open_hours: this.stringified_hours,
        };

        updateStore(data, this.store.id)
          .then((res) => {
            let store = res.data;
            this.$store.commit(mutationTypes.SAVE_STORE, store);
            EventBus.$emit("open_alert", "success", "Business hours updated");
            this.$router.go(0);
            //     let verified = this.store.verified
            //     verified[3] = 1

            // this.$store.commit(mutationTypes.SAVE_STORE, {...this.store, verified})
          })
          .catch((err) => {
            EventBus.$emit(
              "open_alert",
              "error",
              "Error saving business hours" + err
            );
          })
          .finally(() => {});
      }
    },
    setCloseTime(params) {
      let { time, period } = params;
      this.periods[period].close = time;
    },
    setOpenTime(params) {
      let { time, period } = params;
      this.periods[period].open = time;
    },
    setSelectedDay(param) {
      let { day, period } = param;
      if (day.isset && this.periods[period].days.includes(day.day)) {
        const index = this.periods[period].days.indexOf(day.day);
        if (index > -1) {
          this.periods[period].days.splice(index, 1); // 2nd parameter means remove one item only
          day.isset = false;
        }
      } else if (!day.isset) {
        this.periods[period].days.push(day.day);
        day.isset = true;
      }

      // this.days = days;
      // if (day.selected == true && day.isset == false) {
      //   // can't undo already set day
      //   day.selected = false;
      // } else if (day.selected == false && day.isset == false) {
      //   day.selected = true;
      // }
    },
    stringifyBizHrs() {
      let error = false;
      this.stringified_hours = "";
      for (let i = 0; i < this.periods.length; i++) {
        if (!this.periods[i].days.length) {
          EventBus.$emit(
            "open_alert",
            "error",
            `please select at least one day `
          );
          error = true;
        } else {
          this.periods[i].days.forEach((item) => {
            this.stringified_hours += item + ",";
            if (this.periods[i].open) {
              this.stringified_hours += this.periods[i].open + ",";
            } else {
              EventBus.$emit(
                "open_alert",
                "error",
                `please add an opening time for ${this.periods[i].days.join(
                  ", "
                )}`
              );
              error = true;
            }
            if (this.periods[i].close) {
              this.stringified_hours += this.periods[i].close + ",";
            } else {
              EventBus.$emit(
                "open_alert",
                "error",
                `please add a closing time for ${this.periods[i].days.join(
                  ", "
                )}`
              );

              error = true;
            }
          });
        }
      }
      

      if (error) {
        return false;
      } else {
        return true;
      }
    },
  },
  watch: {
    isset_status() {
      if (this.isset_status == true) {
        for (let i = 0; i < this.days.length; i++) {
          // this.days[i].isset = this.isset_status;
        }
      }
    },
    disable_set_days() {
      if (this.disable_set_days == true) {
        for (let i = 0; i < this.set_indexes.length; i++) {
          this.days[this.set_indexes[i]].isset = true;
        }
      }
    },
  },
  computed: {
    ...mapGetters({
      store: "getStore",
    }),
    allDaysSet() {
      let result = this.days[0].isset;
      this.days.map((item) => {
        result = result && item.isset_status;
      });
      //  console.log(this.periods, this.days)
      return result;
    },
  },
  mounted() {
    if (this.store.open_hours !== "00:00") {
      this.always_open = false;
      // Mon,00:01,06:30,Sun,00:01,06:30,
      let reconstructedPeriod = [];
      let splitHours = this.store.open_hours
        .split(",")
        .filter((item) => item !== "");
      for (let index = 0; index < splitHours.length / 3; index++) {
        this.days.find((day) => day.day === splitHours[index * 3])
          ? (this.days.find(
              (day) => day.day === splitHours[index * 3]
            ).isset = true)
          : null;
        let periodWithSameTime = reconstructedPeriod.find((item) => {
          return (
            item.open === splitHours[index * 3 + 1] &&
            item.close === splitHours[index * 3 + 2]
          );
        });

        if (periodWithSameTime) {
          periodWithSameTime.days.push(splitHours[index * 3]);
        } else {
          reconstructedPeriod.push({
            days: [splitHours[index * 3]],
            open: splitHours[index * 3 + 1] || "00:00",
            close: splitHours[index * 3 + 2] || "00:00",
          });
        }

        // console.log(index * 3, splitHours)
      }
      // console.log(reconstructedPeriod);

      this.periods = reconstructedPeriod;
      // console.log(this.periods, this.days);
    }
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
  font-size: 13px;
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
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);
}
</style>

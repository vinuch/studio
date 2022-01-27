<template>
  <div class="rounded-xl">
    <v-card class="elevation-0 overflow-hidden">
      <v-card-title class="title justify-center">
        Business Hours
      </v-card-title>
      <v-card-text>
        Set the hours you are available to receive orders
      </v-card-text>

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
<!-- {{set_indexes.length}} {{days.length}} -->
      <p
        v-if="always_open != true && ( set_indexes.length <= days.length)"
        class="text-left mb-5 pl-5 pointer describe"
        style="color: #4CAF50"
        @click="addPeriod()"
      >
        + specify more days and times
      </p>

      <setupFooter @saveSetUp="save()">
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

  components: {
    setupFooter,
    OpenHours,
  },

  data: () => ({
    always_open: true,
    close: null, // current closing time
    days: [], // days of the week with truthy values
    days_with_times: [],
    disable_set_days: false,
    freeze: false, // freeze all edits after time is set
    isset_status: null,
    loading: false,
    open: null, // current open time
    periods: [{}], // days with same open and closing times
    set_indexes: [],
    stringified_hours: "",
  }),

  methods: {
    confirmSwitch() {
      console.log(this.periods);
      if (this.periods.length && !this.always_open) {
        let confirmed = confirm(
          "You’re switching your store hours to Always Open. All unsaved hours will be cleared."
        );
        if (confirmed) {
          this.always_open = !this.always_open;
        }
      } else {
        this.periods = [{}];
        this.always_open = !this.always_open;
      }
    },
    addPeriod() {
      this.preSave();
      if (!this.close || !this.open) {
        // EventBus.$emit(
        //   "open_alert",
        //   "error",
        //   "Set an opening time | Set a closing time"
        // );
      } else if (this.set_indexes.length < this.days.length) {
        this.periods.push({});
        this.disable_set_days = false; // in case not already false

        this.$nextTick(function() {
          this.disable_set_days = true;
          this.isset_status = false;
        });

        this.stringifyBizHrs();
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
        }else if(!this.close || !this.open){
            EventBus.$emit(
            "open_alert",
            "error",
            "Please Set an opening time | Set a closing time for this time-block "
          );
        }

        console.log("days is empty");
      }
    },
    save() {
      if (this.always_open) {
        this.days = [
          {
            day: "Mon",
            open: "",
            close: "",
            selected: true,
            isset: false,
          },
          {
            day: "Tue",
            open: "",
            close: "",
            selected: true,
            isset: false,
          },
          {
            day: "Wed",
            open: "",
            close: "",
            selected: true,
            isset: false,
          },
          {
            day: "Thu",
            open: "",
            close: "",
            selected: true,
            isset: false,
          },
          {
            day: "Fri",
            open: "",
            close: "",
            selected: true,
            isset: false,
          },
          {
            day: "Sat",
            open: "",
            close: "",
            selected: true,
            isset: false,
          },
          {
            day: "Sun",
            open: "",
            close: "",
            selected: true,
            isset: false,
          },
        ];
        this.setOpenTime("00:00");
        this.setCloseTime("11:59");
      }
      this.preSave();
      this.stringifyBizHrs();
      let data = {
        open_hours: this.stringified_hours,
      };
      console.log(data)
      updateStore(data, this.store.id)
        .then((res) => {
          let store = res.data;
          this.$store.commit(mutationTypes.SAVE_STORE, store);
          EventBus.$emit("open_alert", "success", "Business hours updated");
          this.$router.go(0);
        })
        .catch((err) => {
          EventBus.$emit(
            "open_alert",
            "error",
            "Error saving business hours" + err
          );
        })
        .finally(() => {});
    },
    setCloseTime(time) {
      this.close = time;
    },
    setOpenTime(time) {
      this.open = time;
    },
    setSelectedDay(days) {
      this.days = days;
    },
    stringifyBizHrs() {
      for (let i = 0; i < this.days.length; i++) {
        if (this.days[i].selected) {
          this.stringified_hours += this.days[i].day + ",";
          this.stringified_hours += this.days[i].open + ",";
          this.stringified_hours += this.days[i].close + ",";
        }
      }
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
}
</style>

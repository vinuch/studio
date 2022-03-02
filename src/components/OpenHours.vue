<template>
  <v-sheet
    elevation="0"
    rounded="lg"
    color="#FDFDFD"
    class="ma-5 pa-5 outlined"
    style="border: 1px solid #F3F3F3;"
  >
    <div class="top">
      <!-- {{periods[period]}} -->
      <li
        class="day"
        v-for="(day, i) in days"
        :key="i"
        :class="{ bcg: periods[period].days.includes(day.day) }"
        :style="
          day.isset && !periods[period].days.includes(day.day)
            ? 'color: #626C7A;background: #F6F6F6; border: none'
            : ''
        "
        @click="toggleDay(day)"
      >
        {{ day.day }}
      </li>
    </div>
    <div class="text-left mt-3 pt-0 describe">
      <p style="margin: 0 0 0;line-height: 1px;">Orders from</p> <br />
      <span class="time">
        <v-dialog
          ref="open_time"
          v-model="time_modal2"
          :return-value.sync="time"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <input
              v-model="open_time"
              class="time_input"
              readonly
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-time-picker
            v-if="time_modal2"
            @change="setOpenTime()"
            v-model="open_time"
            full-width
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="time_modal2 = false">
              Cancel
            </v-btn>
            <v-btn text color="primary" @click="$refs.open_time.save(time)">
              OK
            </v-btn>
          </v-time-picker>
        </v-dialog>
      </span>
      to
      <span class="time">
        <v-dialog
          ref="close_time"
          v-model="time_modal"
          :return-value.sync="time"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <input
              v-model="close_time"
              class="time_input"
              readonly
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-time-picker
            v-if="time_modal"
            @change="setCloseTime()"
            v-model="close_time"
            full-width
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="time_modal = false">
              Cancel
            </v-btn>
            <v-btn text color="primary" @click="$refs.close_time.save(time)">
              OK
            </v-btn>
          </v-time-picker>
        </v-dialog>
      </span>
    </div>
  </v-sheet>
</template>
<script>
export default {
  props: [
    "isset_status",
    "set_indexes",
    "disable_set_days",
    "days",
    "period",
    "periods",
  ],
  data() {
    return {
      close: null,
      close_time: null,
      // days: [
      //   {day: 'Mon', open:'', close: '', selected: false, isset: false},
      //   {day: 'Tue', open:'', close: '', selected: false, isset: false},
      //   {day: 'Wed', open:'', close: '', selected: false, isset: false},
      //   {day: 'Thu', open:'', close: '', selected: false, isset: false},
      //   {day: 'Fri', open:'', close: '', selected: false, isset: false},
      //   {day: 'Sat', open:'', close: '', selected: false, isset: false},
      //   {day: 'Sun', open:'', close: '', selected: false, isset: false}
      // ],
      open: null,
      open_time: null,
      loading: false,
      time: null,
      time_modal: false,
      time_modal2: false,
    };
  },
  methods: {
    toggleDay(day) {
      this.$emit("setSelectedDay", { day: day, period: this.period });
    },
    setCloseTime() {
      console.log("setclose");
      this.$emit("setCloseTime", {
        time: this.close_time,
        period: this.period,
      });
    },
    setOpenTime() {
      this.$emit("setOpenTime", { time: this.open_time, period: this.period });
    },
  },
  watch: {
    periods() {
      this.close_time = this.periods[this.period].close;
      this.open_time = this.periods[this.period].open;
    },
    // open_time() {
    //   this.$emit('setOpenTime',{time: this.open_time, period: this.period})
    // },
    // close_time() {
    //   this.$emit('setCloseTime', {time: this.close_time, period: this.period})
    // },
  },
  mounted() {
    this.close_time = this.periods[this.period].close;
    this.open_time = this.periods[this.period].open;
  },
};
</script>
<style lang="scss">
.describe {
  font-size: 14px;
  text-align: left;
  color: #69747e;
  margin-bottom: 0;
}
.hide {
  display: none;
}
.trash {
  margin-left: 20px;
}
.time_panel {
  padding-top: 20px;
}
.top {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  span {
    font-size: 16px;
    line-height: 20px;
    color: #2b2b2b;
  }
  .day {
    border: 1px solid #e6e9ef;
    border-radius: 4px;
    width: 55px;
    height: 35px;
    margin: 0 5px 8px 0;
    padding-top: 5px;
    color: #66768a;
    list-style-type: none;
    font-size: 16px;
    cursor: pointer;
    border-radius: 8px;
  }
  .bcg {
    background-color: #4caf50;
    border: 1px solid #4caf50;
    color: #fff;
  }
}

.time_input {
  padding: 6px 16px;
  width: 5rem;
  border: 1px solid #e5e9f2;
  border-radius: 6px;
}
</style>

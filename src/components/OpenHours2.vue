<template>
  <v-sheet elevation="0" rounded="lg" color="bg_grey" class="ma-5 pa-5">
    <div class="top">
    

      <li
      class="day"
      v-for="(day, i) in allDays"
      :key="i"
      
      @click="toggleDay(day)">
        {{day.day}}
      </li>
    </div>
    <p class="text-left mt-3 pt-0 describe">
      Take orders from
      <span class="time">
        <v-dialog ref="open_time" v-model="time_modal2" :return-value.sync="time" persistent width="290px">
          <template v-slot:activator="{ on, attrs }">
            <input v-model="open_time" readonly v-bind="attrs" v-on="on">
          </template>
          <v-time-picker v-if="time_modal2" v-model="open_time" full-width>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="time_modal2 = false">
              Cancel
            </v-btn>
            <v-btn text color="primary" @click="$refs.open_time.save(time)">
              OK
            </v-btn>
          </v-time-picker>
        </v-dialog>
      </span> to
      <span class="time">
        <v-dialog ref="close_time" v-model="time_modal" :return-value.sync="time" persistent width="290px">
          <template v-slot:activator="{ on, attrs }">
            <input v-model="close_time" readonly v-bind="attrs" v-on="on">
          </template>
          <v-time-picker v-if="time_modal" v-model="close_time" full-width>
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
    </p>
  </v-sheet>
</template>
<script>
export default {
  props: [
    'isset_status',
    'allDays',
  ],
  data() {
    return {
      close: null,
      close_time: null,
      days: [],
      open: null,
      open_time: null,
      loading: false,
      time: null,
      time_modal: false,
      time_modal2: false,
    };
  },
  methods: {
    toggleDay(day){
      if (day.selected == false){
        this.$emit('addDay', {day: day.day, open:'', close: '', selected: true})
      }
      // if (day.selected == true && day.isset == false){ // can't undo already set day
      //   day.selected = false
      // } else if (day.selected == false && day.isset == false) {
      //   day.selected = true
      // }
      // this.$emit('setSelectedDay', this.days)
    },
  },
  watch: {
    open_time() {
      this.$emit('setOpenTime', this.open_time)
    },
    close_time() {
      this.$emit('setCloseTime', this.close_time)
    },
    isset_status() {
      if (this.isset_status == true) {
        for (let i=0; i < this.days.length; i++) {
          this.days[i].isset = this.isset_status
        }
      }
    },
    disable_set_days() {
      if (this.disable_set_days == true) {
        for (let i=0; i < this.set_indexes.length; i++) {
          this.days[this.set_indexes[i]].isset = true
        }
      }
    }
  },
  // mounted() {
  //   this.days = 
  // }
};
</script>
<style lang="scss">
.describe {
  font-size: 14px;
  text-align: left;
  color: #69747E;
  margin-bottom: 0;
}
.hide {
  display: none;
}
.trash {
  margin-left: 20px;
}
.time_panel{
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
    border: 1px solid #E6E9EF;
    border-radius: 4px;
    width: 55px;
    height: 35px;
    margin: 0 5px 5px 0;
    padding-top: 5px;
    color: #66768A;
    list-style-type: none;
    font-size: 16px;
    cursor: pointer;
  }
  .bcg {
    background-color: #fff;
    border: 1px solid #4CAF50;
    color: #4CAF50;
  }
}
.time input {
  width: 50px;
  border: 1px solid #3A50D5;
  border-radius: 8px;
  padding-left: 5px;
}
</style>

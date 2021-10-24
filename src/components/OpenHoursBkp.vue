<template>
  <v-sheet elevation="0" rounded="lg" color="bg_grey" class="ma-5">
    <div class="pa-4">
      <v-chip-group v-model="selected_days" active-class="primary--text" column multiple>
        <v-chip
          v-for="(day, i) in days"
          :key="i"
          :class="{bcg: day.selected}"
          @click="toggleDay(day)"
        >
          {{ day.day }}
        </v-chip>
      </v-chip-group>
    </div>
    <p class="text-left pa-5 pt-0 describe">
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


    <v-icon
      class="delete"
      @click="deletePeriod(i)"
    >
      mdi-delete-outline
    </v-icon>

    <p
      class="text-left mb-5 pl-5 pointer describe"
      style="color: blue"
      @click="addPeriod()"
    >+ specify more days and times</p>

  </v-sheet>
</template>

<script>
  export default {
    name: 'OpenHours',

    props: [
      'freeze',
      'days_with_times',
      'disable_days_with_times',
      'periods',
    ],

    data: () => ({
      close_time: null,
      days: [
        {day: 'Sun', open:'', close: '', selected: false, time_is_fixed: false},
        {day: 'Mon', open:'', close: '', selected: false, time_is_fixed: false},
        {day: 'Tue', open:'', close: '', selected: false, time_is_fixed: false},
        {day: 'Wed', open:'', close: '', selected: false, time_is_fixed: false},
        {day: 'Thu', open:'', close: '', selected: false, time_is_fixed: false},
        {day: 'Fri', open:'', close: '', selected: false, time_is_fixed: false},
        {day: 'Sat', open:'', close: '', selected: false, time_is_fixed: false},
      ],
      menu2: "",
      open_time: null,
      selected_days: [],
      time: null,
      time_modal: false,
      time_modal2: false,
    }),
    methods: {
      addPeriod(){
        if (this.days_selected) {
          this.preSave()
          this.incrementPeriod()
          this.stringifyBizHrs()
          this.days_selected = false
          this.open = null
          this.close = null
        }
      },
      toggleDay(day) {
        if (day.selected == true && day.time_is_fixed == false){ // can't undo already set day
          day.selected = false
        } else if (day.selected == false && day.time_is_fixed == false) {
          day.selected = true
        }
      },
    },
    watch: {
      open_time() {
        this.$emit('setOpenTime', this.open_time)
      },
      close_time() {
        this.$emit('setCloseTime', this.close_time)
      },
      disable_days_with_times() {
        if (this.disable_days_with_times == true) {
          for (let i=0; i < this.days_with_times.length; i++) {
            this.days[this.days_with_times[i]].time_is_fixed = true
          }
        }
      },
      freeze() {
        if (this.freeze == true) {
          for (let i=0; i < this.days.length; i++) {
            this.days[i].time_is_fixed = true
          }
        }
      },
    },
  }
</script>

<style scoped>
  .describe {
    font-size: 14px;
    text-align: left;
    color: #69747E;
    margin-bottom: 0;
  }
  .bcg {
    background-color: #10102C;
    color: #FFF;
  }
  .time input {
    width: 50px;
    border: 1px solid #3A50D5;
    border-radius: 8px;
    padding-left: 5px;
  }
</style>

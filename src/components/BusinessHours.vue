<template>
<div>
  <v-card class="rounded-xl">
    <v-card-title class="title justify-center">
    Business Hours
    </v-card-title>
    <v-card-text>
      Set the hours you are available to receive orders
    </v-card-text>

    <v-sheet
      elevation="0"
      rounded="lg"
      color="bg_grey"
      class="ma-5 mb-0 pa-5"
    >
      <div>
        <p
        style="text-align: left; color: #69747E; font-weight: 600;"
        >Always open? 
          <span class="switch">
            <v-switch
            class="float-right mt-0 pt-0"
            style="position: relative; right: -12px;"
            id="switch"
            v-model="always_open"
            inset
          >
          </v-switch>
          </span>
        </p>
      </div>
      <p class="describe">Setting your store to <b>"Always open"</b> means that you are always available to receive orders.</p>
    </v-sheet>
    <div v-if="always_open == true" style="height: 50px"></div>

    <div
      v-for="(period, i) in periods" 
      :ref="'period_' + i"
      :key="i"
    >
      <v-icon
        v-if="always_open != true"
        class="delete"
        @click="deletePeriod(i)"
      >
        mdi-delete-outline
      </v-icon>
     <Period 
        v-if="always_open != true" 
        @setSelectedDay="setSelectedDay($event)"
        @setOpenTime="setOpenTime($event)"
        @setCloseTime="setCloseTime($event)"
        :days_with_times="days_with_times"
        :disable_days_with_times="disable_days_with_times"
        :freeze="freeze"
        :periods="periods"
      />
    </div>

    <p
      v-if="always_open != true"
      class="text-left mb-5 pl-5 pointer describe"
      style="color: blue"
      @click="addPeriod()"
    >+ specify more days and times</p>

    <setupFooter
      @saveSetUp="saveSetUp()"
      @closeDialog="closeDialog()"
    >
      Save Business Hours
    </setupFooter>
  </v-card>
</div>
</template>

<script>
  import setupFooter from "@/components/setupFooter"
  import Period from "@/components/Period"

  export default {
    name: 'BusinessHours',

    components: {
      setupFooter,
      Period,
    },

    data: () => ({
      always_open: true,
      close: null, // current closing time
      days: null, // days of the week with truthy values
      days_with_times: [],
      disable_days_with_times: false,
      freeze: false, // freeze all edits after time is set
      open: null, // current open time
      periods: [{}], // days with same open and closing times
      stringified_hours: "",
    }),

    methods: {
      addPeriod(){
        this.ensureDaysSelected()
        if (this.days_selected) {
          this.preSave()
          this.incrementPeriod()
          this.stringifyBizHrs()
          this.days_selected = false
          this.open = null
          this.close = null
        }
      },
      closeDialog() {
        this.$emit('closeDialog')
      },
      deletePeriod(index) {
        // ask if sure
        this.periods.splice(index, 1)
        // $refs.["period_" + index].
        // this.periods[index]
        // emit remove days
        // remove days
      },
      ensureDaysSelected() {
        if (this.periods.length > 1) { // subsequent days
            this.days.forEach(e => {
              if (e.selected == true && e.time_is_fixed == false) {
                this.days_selected = true // it's ok not to break because short loop
              }
            })
            this.days_selected ? "" : console.log("please select more days")
        } else { // first day(s)
          if (this.days) {
            this.days.forEach(e => {
              if (e.selected == true && e.time_is_fixed == false) {
                this.days_selected = true // it's ok not to break because short loop
              }
            })
          }
          this.days_selected ? "" : console.log("please select a day - first")
        }
      },
      incrementPeriod() {
        if (this.days_with_times.length < this.days.length) {
          if (this.open != null && this.close != null) {
            this.periods.push({})
            this.disable_days_with_times = false // in case not already false
          } else {
            console.log("please set opening and closing times")
          }
        } else {
          console.log("business hours have been set for all days of the week")
        }

        this.$nextTick(function(){
          this.disable_days_with_times = true
          this.freeze = false
        })
      },
      preSave() {
        for (let i=0; i < this.days.length; i++) {
          if (this.days[i].selected == true && this.days[i].time_is_fixed == false && this.days.length <= 7) {
            this.days[i].open = this.open
            this.days[i].close = this.close
            this.days[i].period = this.periods.length
            this.days_with_times.push(i)
          } else  {
            console.log("you might have reached the limit of days in days_with_times")
          }
        }
        this.freeze = true // prevent days from being double-set in next period
      },
      save(){
      //   this.preSave()
      //   this.stringifyBizHrs()
      //   let data = {
      //     open_hours: this.stringified_hours,
      //   }
      //   updateStore(data, this.store.id)
      //   .then(res => {
      //     let store = res.data
      //     this.$store.commit(mutationTypes.SAVE_STORE, store);
      //   })
      //   .catch(err => console.log(err))
      //   .finally(() => {
      //     this.$router.push("/dashboard/dash");
      //   });
      },
      setCloseTime(time){
        this.close = time
      },
      setOpenTime(time){
        this.open = time
      },
      setSelectedDay(days) {
        this.days = days
      },
      stringifyBizHrs() {
        for (let i=0; i < this.days.length; i++) {
          if (this.days[i].selected) {
            this.stringified_hours += this.days[i].day + ","
            this.stringified_hours += this.days[i].open + ","
            this.stringified_hours += this.days[i].close + ","
          }
        }
      },
    },
    computed: {
      // ...mapGetters({
      //   store: "getStore",
      // }),
    },
  }
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

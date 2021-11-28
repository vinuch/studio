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

    <p
      v-if="always_open != true"
      class="text-left mb-5 pl-5 pointer describe"
      style="color: blue"
      @click="addPeriod()"
    >+ specify more days and times</p>

    <setupFooter
      @saveSetUp="save()"
    >
      Save Business Hours
    </setupFooter>
  </v-card>
</div>
</template>

<script>
  import {
    updateStore,
  } from "@/services/apiServices"
  import { mapGetters } from "vuex"
  import * as mutationTypes from "@/store/mutationTypes"
  import { EventBus } from "@/services/eventBus"

  import setupFooter from "@/components/setupFooter"
  import OpenHours from "@/components/OpenHours"

  export default {
    name: 'BusinessHours',

    components: {
      setupFooter,
      OpenHours,
    },

    data: () => ({
      always_open: true,
      close: null, // current closing time
      days: null, // days of the week with truthy values
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
      addPeriod(){
        this.preSave()

        if (this.set_indexes.length < this.days.length) {
          this.periods.push({})
          this.disable_set_days = false // in case not already false
        } else {
          EventBus.$emit("open_alert", "error", "Business hours have been set for all days of the week")
        }

        this.$nextTick(function(){
          this.disable_set_days = true
          this.isset_status = false
        })

        this.stringifyBizHrs()
      },
      closeDialog() {
        this.$emit('closeDialog')
      },
      deletePeriod(index) {
        this.periods.splice(index, 1)
      },
      preSave() {
        if(this.days){
          for (let i=0; i < this.days.length; i++) {
            if (this.days[i].selected == true && this.days[i].isset == false) {
              this.days[i].open = this.open
              this.days[i].close = this.close
              this.set_indexes.push(i)
            }
          }
          this.isset_status = true // prevent next period from editing
        } else {
          EventBus.$emit("open_alert", "error", "Select at least one day")
          console.log("days is empty")
        }
      },
      save(){
        this.preSave()
        this.stringifyBizHrs()
        let data = {
          open_hours: this.stringified_hours,
        }
        updateStore(data, this.store.id)
        .then(res => {
          let store = res.data
          this.$store.commit(mutationTypes.SAVE_STORE, store)
          EventBus.$emit("open_alert", "success", "Business hours updated")
          this.$router.go(0)
        })
        .catch(err => {
          EventBus.$emit("open_alert", "error", "Error saving business hours" + err) 
        })
        .finally(() => {
        })
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
      ...mapGetters({
        store: "getStore",
      }),
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

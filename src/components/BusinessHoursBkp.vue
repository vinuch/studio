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
    
    <OpenHours 
      v-if="always_open != true" 
      @setSelectedDay="setSelectedDay($event)"
      @setOpenTime="setOpenTime($event)"
      @setCloseTime="setCloseTime($event)"
    />
    <setupFooter
      @saveSetUp="saveSetUp()"
    >
      Save Business Hours
    </setupFooter>
  </v-card>
</div>
</template>

<script>
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
      disable_days_with_times: false,
      freeze: false, // freeze all edits after time is set
      open: null, // current open time
      stringified_hours: "",
    }),

    methods: {
      deletePeriod() {
      },
      incrementPeriod() {
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

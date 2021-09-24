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
      class="ma-5 pa-5"
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

    <v-col
      cols="12"
      sm="7"
      md="6"
      lg="5"
      class="pa-5"
    >
      <v-sheet
        elevation="0"
        rounded="lg"
        color="bg_grey"
      >
        <v-icon class="delete">mdi-delete-outline</v-icon>
        <div class="pa-4">
          <v-chip-group
            active-class="primary--text"
            column
          >
            <v-chip
              v-for="(day, i) in days"
              :key="i"
            >
              {{ day.day }}
            </v-chip>
          </v-chip-group>
        </div>
        <p
          class="text-left pa-5 pt-0 describe"
        >
          Take orders from
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
                  readonly
                  v-bind="attrs"
                  v-on="on"
                >
              </template>
              <v-time-picker
                v-if="time_modal2"
                v-model="open_time"
                full-width
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="time_modal2 = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.open_time.save(time)"
                >
                  OK
                </v-btn>
              </v-time-picker>
            </v-dialog>
          </span> to
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
                  readonly
                  v-bind="attrs"
                  v-on="on"
                >
              </template>
              <v-time-picker
                v-if="time_modal"
                v-model="close_time"
                full-width
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="time_modal = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.close_time.save(time)"
                >
                  OK
                </v-btn>
              </v-time-picker>
            </v-dialog>
          </span>
        </p>
      </v-sheet>
      <p class="text-left mt-5 pl-5 blue_link pointer">+ specify more days and times</p>
    </v-col>

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

  export default {
    name: 'BusinessHours',
    components: {
      setupFooter,
    },
    data: () => ({
      days: [
        {day: 'Mon', open:'', close: '', selected: false, isset: false},
        {day: 'Tue', open:'', close: '', selected: false, isset: false},
        {day: 'Wed', open:'', close: '', selected: false, isset: false},
        {day: 'Thu', open:'', close: '', selected: false, isset: false},
        {day: 'Fri', open:'', close: '', selected: false, isset: false},
        {day: 'Sat', open:'', close: '', selected: false, isset: false},
        {day: 'Sun', open:'', close: '', selected: false, isset: false}
      ],
      time_modal: false,
      time_modal2: false,
      time: null,
      always_open: null,
      close_time: null,
      open_time: null,
      menu2: "",
    }),
    methods: {
      closeDialog() {
        this.$emit('closeDialog')
      },
    }
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
    right: 10px;
    top: -16px;
    cursor: pointer;
  }
</style>

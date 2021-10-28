<template>
<div class="pa-5">
  <topNav>Dashboard</topNav>
  <div style="width: 100%; height: 6em">
    <h2 class="title" style="margin-top: 1em">Welcome to {{ store.store_name }} &#128526;</h2>
  </div>

  <v-container
    v-if="setup_steps < 4"
    class="rounded-xl" 
    style="border: 1px solid #E2E8F0; overflow: hidden" 
    fluid 
    fill-height
    pa-0
  >
    <div>
      <p class="text-left pa-5 ma-0">Setup progress: <span>{{setup_steps}}/4</span></p>

      <v-row class="ma-0">
        <v-col v-for="(dash, i) in dashboard" :key="i" cols=12 class="pa-0">
          <v-card
            class="text-left pa-3 pb-5 pl-5" 
            tile 
            flat 
            outlined
            style="background: #F6F8FA; border: none; border-top: 1px solid #E2E8F0"
          >
            <v-checkbox
              v-model="dash.status"
              class="ma-0 veri_check"
              dense 
              readonly
              color="success"
              hide-details=""
            >
            </v-checkbox>
            <v-card-title class="pa-0" style="font-size: 1.1rem; margin-bottom: -4px">{{dash.title}}</v-card-title>
            <v-card-text class="pa-0 pb-3">{{dash.text}}</v-card-text>
            <v-btn
              depressed
              small
              class="main_blue"
              @click="openDialog(dash.modal)"
            >
              {{dash.btn_title}}
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
  <menu-spacer></menu-spacer>
</div>
</template>

<script>
  import { mapGetters } from "vuex";
  import * as mutationTypes from "@/store/mutationTypes";
  import { EventBus } from "@/services/eventBus"
  // import * as dayjs from "dayjs";

  import topNav from "@/components/TopNav"
  import MenuSpacer from '@/components/MenuSpacer.vue'

  export default {
    name: 'Dashboard',
    components: {
      topNav,
      MenuSpacer,
    },
    data: () => ({
      dashboard: [
        {status: 0, title: "Payments", text: "Get paid by customers", btn_title: "Setup payment account", modal: "set_bank"},
        {status: 0, title: "Store details", text: "Store contacts, etc", btn_title: "Add store details", modal: "store_details"},
        {status: 0, title: "Business hours", text: "Opening & closing hours", btn_title: "Set hours", modal: "business_hours"},
        {status: 0, title: "Shipping", text: "Delivery & pick-up arrangements", btn_title: "Set shipping", modal: "shipping"}
      ],
      dialog: false,
      // dialog: false, default is false
      modal: null,
      setup_steps: 0,
      verified: "00000",
    }),
    methods: {
      openDialog(setup) {
        EventBus.$emit("dialog", "open", setup)
      },
    },
    computed: {
      ...mapGetters({
        store: "getStore",
        orders: "getOrders",
      }),
      // time() {
      //   let hrs = dayjs().get("hours");
      //   return hrs < 12
      //     ? "morning"
      //     : hrs >= 12 && hrs < 6
      //     ? "afternoon"
      //     : "evening";
      // },
      // today() {
      //   return dayjs().format("DD MMM YYYY");
      // },
      // yesterday() {
      //   return dayjs()
      //     .subtract(1, "days")
      //     .format("DD MMM YYYY");
      // },
      // reshapedOrders() {
      //   return this.orders.map((order) => {
      //     let date = dayjs(order.created).format("DD MMM YYYY");
      //     return {
      //       ...order,
      //       date,
      //       isToday: date === this.today,
      //       isYesterday: date === this.yesterday,
      //     };
      //   });
      // },
      // metrics() {
        // let todayOrders = this.reshapedOrders.filter((order) => order.isToday);
        // let yesterdayOrders = this.reshapedOrders.filter(
        //   (order) => order.isYesterday
        // );

        // let ordersCount = this.reshapedOrders.length;
        // let todaySalesCount = this.reshapedOrders.filter((order) => order.isToday)
        //   .length;
        // let yesterdaySalesCount = this.reshapedOrders.filter(
        //   (order) => order.isYesterday
        // ).length;

        // let totalSales = this.reshapedOrders.reduce((agg, curr) => {
        //   agg += curr.total_amount / 100;
        //   return agg;
        // }, 0);
        // let todaySalesTotal = todayOrders.length
        //   ? todayOrders.reduce((agg, curr) => {
        //       agg += curr.total_amount / 100;
        //       return agg;
        //     }, 0)
        //   : 0;
        // let yesterdaySalesTotal = yesterdayOrders.length
        //   ? yesterdayOrders.reduce((agg, curr) => {
        //       agg += curr.total_amount / 100;
        //       return agg;
        //     }, 0)
        //   : 0;

        // let changeInSales = todaySalesTotal - yesterdaySalesTotal;
        // let changeInSalesCount = todaySalesCount - yesterdaySalesCount;

        // let avgCheckoutSize = totalSales / ordersCount;
        // let todayAvgCheckoutSize = todaySalesCount
        //   ? todaySalesTotal / todaySalesCount
        //   : 0;
        // let yesterdayAvgCheckoutSize = yesterdaySalesTotal / yesterdaySalesCount;
        // let changeInAvgCheckoutSize =
        //   todayAvgCheckoutSize - yesterdayAvgCheckoutSize;

        // return [
        //   {
        //     title: "Total sales",
        //     // count: `NGN ${numeral(totalSales).format("0,0")}`,
        //     percent: `${Math.abs(changeInSales / yesterdaySalesTotal) * 100}%`,
        //     up: changeInSales > 0,
        //   },
        //   {
        //     title: "Number of transactions",
        //     count: this.reshapedOrders.length,
        //     percent: `${Math.abs(changeInSalesCount / yesterdaySalesCount) *
        //       100}%`,
        //     up: changeInSalesCount > 0,
        //   },
        //   {
        //     title: "Average checkout size",
        //     // count: `NGN ${numeral(avgCheckoutSize).format("0,0")}`,
        //     percent: `${Math.abs(
        //       changeInAvgCheckoutSize / yesterdayAvgCheckoutSize
        //     ) * 100}`,
        //     up: changeInAvgCheckoutSize > 0,
        //   },
        //   {
        //     title: "Number of store visits",
        //     count: "0",
        //     percent: "0%",
        //     up: true,
        //   },
        // ];
      // },
    },
    created() {
      this.verified = this.store.verified
      if (this.verified[0] == 0) {
        EventBus.$emit("open_alert", "warning", "email not verified", "Verify Email")
      }

      for (var i=1; i < this.verified.length; i++) { // starting loop from 1 not 0
        this.dashboard[i-1].status = parseInt(this.verified[i]) // the first i is the email status
        if (this.store.verified[i] == 1) {
          this.setup_steps += 1
        }
      }

      if (this.verified[0] == 0) {
        this.$store.commit(mutationTypes.EMAIL_VERIFIED, false);
      } else {
        this.$store.commit(mutationTypes.EMAIL_VERIFIED, true);
      }
    },
  }
</script>
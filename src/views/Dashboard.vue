<template>
<div class="pa-5">
  <topNav>Dashboard</topNav>
  <div style="width: 100%; height: 4em">
    <h2 class="title" style="margin-top: 1em">Good {{ time }} {{ store.store_name }}</h2>
  </div>

  <!-- store setup -->
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

  <!-- metrics -->
  <v-container
    v-if="setup_steps > 3"
    class="rounded-lg pa-4" 
    style="border: 1px solid #E2E8F0; background: #F1EDFF; overflow: hidden" 
    fluid 
    fill-height
    pa-0
  >
    <v-card
      v-for="(data, i) in metrics"
      :key=i
      class="pa-5 mb-5 rounded-lg"
      outlined
      width=100%
    >
      <v-row>
        <v-col cols=3>
          <v-card
            class="pa-2 rounded-lg"
            outlined
            color="#FFC35014"
          >
            <v-icon class="data_icon">{{data.icon}}</v-icon>
          </v-card>
        </v-col>
        <v-col cols=9>
          <h5 class="text-left" style="color: #9C9C9C">{{data.title}}</h5>
          <p class="text-left mb-0 medium h1">
            {{data.currency}}{{data.data}}
            <span
              :class="data.up ? 'gain' : 'loss'" class="body1"
              style="letter-spacing: -5px"
            >
              <v-icon :class="data.up ? 'gain' : 'loss'" v-if="data.up">mdi-menu-up</v-icon>
              <v-icon :class="data.up ? 'gain' : 'loss'" v-else>mdi-menu-down</v-icon>
              {{ isNaN(data.percent) ? 0 : data.percent }}
            </span>
          </p>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
  <menu-spacer></menu-spacer>
</div>
</template>

<script>
  import { mapGetters } from "vuex"
  import * as mutationTypes from "@/store/mutationTypes"
  import { EventBus } from "@/services/eventBus"
  import * as dayjs from "dayjs"

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
        {status: 0, title: "Shipping", text: "Delivery & pick-up arrangements", btn_title: "Set shipping", modal: "shipping"},
      ],
      dialog: true,
      // dialog: false, default is false
      modal: null,
      setup_steps: 0,
      verified: "00000",
    }),
    methods: {
      openDialog(setup) {
        this.$store.commit(mutationTypes.SET_SETTINGS_STATE, false)
        EventBus.$emit("dialog", "open", setup)
      },
    },
    computed: {
      ...mapGetters({
        store: "getStore",
        orders: "getOrders",
        email_verified: "getEmailStatus"
      }),
      time() {
        let hrs = dayjs().get("hours");
        return hrs < 12
          ? "morning"
          : hrs >= 12 && hrs < 6
          ? "afternoon"
          : "evening";
      },
      today() {
        return dayjs().format("DD MMM YYYY");
      },
      yesterday() {
        return dayjs()
          .subtract(1, "days")
          .format("DD MMM YYYY");
      },
      reshapedOrders() {
        return this.orders.map((order) => {
          let date = dayjs(order.created).format("DD MMM YYYY");
          return {
            ...order,
            date,
            isToday: date === this.today,
            isYesterday: date === this.yesterday,
          };
        });
      },
      metrics() {
        // let todayOrders = this.reshapedOrders.filter((order) => order.isToday);
        let todayOrders = this.reshapedOrders; // all time not today only
        let yesterdayOrders = this.reshapedOrders.filter(
          (order) => order.isYesterday
        );

        let ordersCount = this.reshapedOrders.length;
        let todaySalesCount = this.reshapedOrders.filter((order) => order.isToday)
          .length;
        let yesterdaySalesCount = this.reshapedOrders.filter(
          (order) => order.isYesterday
        ).length;

        let totalSales = this.reshapedOrders.reduce((agg, curr) => {
          agg += curr.total_amount / 100;
          return agg;
        }, 0);
        let todaySalesTotal = todayOrders.length
          ? todayOrders.reduce((agg, curr) => {
              agg += curr.total_amount / 100;
              return agg;
            }, 0)
          : 0;
        let yesterdaySalesTotal = yesterdayOrders.length
          ? yesterdayOrders.reduce((agg, curr) => {
              agg += curr.total_amount / 100;
              return agg;
            }, 0)
          : 0;

        let changeInSales = todaySalesTotal - yesterdaySalesTotal;
        let changeInSalesCount = todaySalesCount - yesterdaySalesCount;

        let avgCheckoutSize = totalSales / ordersCount;
        let todayAvgCheckoutSize = todaySalesCount
          ? todaySalesTotal / todaySalesCount
          : 0;
        let yesterdayAvgCheckoutSize = yesterdaySalesTotal / yesterdaySalesCount;
        let changeInAvgCheckoutSize =
          todayAvgCheckoutSize - yesterdayAvgCheckoutSize;

        return [
          {
            title: "Total sales",
            // data: `NGN ${numeral(totalSales).format("0,0")}`,
            data: Math.round(totalSales),
            percent: `${Math.abs(changeInSales / yesterdaySalesTotal) * 100}%`, 
            icon: "mdi-chart-box", 
            colour: "#FFC35014", 
            currency: "",
            // up: changeInSales > 0,
            up: true,
          },
          {
            title: "Number of baskets", 
            data: this.reshapedOrders.length,
            percent: `${Math.abs(changeInSalesCount / yesterdaySalesCount) * 100}%`,
            icon: "mdi-basket", 
            colour: "#FFC35014",
            // up: changeInSales > 0,
            up: false,
          },
          {
            title: "Average checkout",
            // data: `NGN ${numeral(avgCheckoutSize).format("0,0")}`,
            data: Math.round(avgCheckoutSize),
            percent: `${Math.abs(changeInAvgCheckoutSize / yesterdayAvgCheckoutSize) * 100}%`,
            icon: "mdi-cash-register", colour: "#FFC35014", currency: "",
            // up: changeInSales > 0,
            up: true,
          },
          {
            title: "Store visits", 
            data: 0,
            percent: "4%", 
            icon: "mdi-account-arrow-left", 
            colour: "#FFC35014",
            up: true,
          },
          {
            title: "Return visits", data: "18", percent: "5%", icon: "mdi-account-sync", colour: "#FFC35014",
            up: false,
            // up: changeInSales > 0,
          },
        ];
      },
    },
    created() {
      this.verified = this.store.verified
  
      for (var i=1; i < this.verified.length; i++) { // starting loop from 1 not 0
        this.dashboard[i-1].status = parseInt(this.verified[i]) // the i==0 is the email status
        if (this.store.verified[i] == 1) {
          this.setup_steps += 1
        }
      }

      if (this.verified[0] == 0) {
        !this.email_verified
          ? EventBus.$emit("open_alert", "warning", "email not verified. You can verify from here if you close this", "Verify Email")
          : ""
      } else {
        this.$store.commit(mutationTypes.EMAIL_VERIFIED, true);
      }
    },
  }
</script>

<style scoped>
  .data_icon {
    color: #FFC350
  }
  .gain {
    color: green;
  }
  .loss {
    color: red;
  }
</style>
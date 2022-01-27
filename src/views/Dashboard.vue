<template>
  <div class="pa-5 mb-5">
    <topNav>Dashboard</topNav>
    <div style="width: 100%; height: 4em;marginTop:4rem;marginBottom: .8rem">
      <h2 class="title" style="margin-top: 1em">
        <!-- Good {{ time }} {{ store.store_name }} -->
        Welcome, Abdulraheem 😎
      </h2>
      <p class="body-2" v-if="setup_steps < 4">Let’s get you started with Leyyow</p>
      <p class="body-2" v-else>Here’s how your bussiness is doing</p>
    </div>

    <!-- <div class="d-flex justify-end"> -->
    <v-select
    v-if="setup_steps > 3"
      style="float: right; width: 10rem;"
      class="d-inline-block right"
      :items="['This week', 'This month', 'This year']"
     v-model="timeFrame"
      outlined
    ></v-select>
    <!-- </div> -->

    <!-- store setup -->
    <v-container
      v-if="setup_steps < 4"
      class="rounded-xl mt-4"
      style="border: 1px solid #e2e8f0; overflow: hidden; margin-top: 1rem"
      fluid
      fill-height
      pa-0
    >
      <div style="width: 100%">
        <p class="text-left pa-5 ma-0">
          Setup progress: <span>{{ setup_steps }}/4</span>
        </p>

        <div>
          <v-col v-for="(dash, i) in dashboard" :key="i" cols="12" class="pa-0">
            <v-card
              class="text-left pa-3 pb-5 pl-5"
              tile
              flat
              outlined
              style="
                background: #f6f8fa;
                border: none;
                border-top: 1px solid #e2e8f0;
              "
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
              <v-card-title
                class="pa-0"
                style="font-size: 1.1rem; margin-bottom: -4px"
                >{{ dash.title }}</v-card-title
              >
              <v-card-text class="pa-0 pb-3">{{ dash.text }}</v-card-text>
              <!-- <v-btn
              depressed
              small
              color="primary"
              @click="openDialog(dash.modal)"
            >
              {{dash.btn_title}}
            </v-btn> -->

              <Button
                size="small"
                :label="dash.btn_title"
                :primary="true"
                @onClick="openDialog(dash.modal)"
              />
            </v-card>
          </v-col>
        </div>
      </div>
    </v-container>

    <!-- metrics -->
    <v-container
      v-if="setup_steps > 3"
      class="rounded-lg pa-4"
      style="border: 1px solid #e2e8f0; background: #fff; overflow: hidden"
      fluid
      fill-height
      pa-0
    >
      <v-card
        v-for="(data, i) in metrics"
        :key="i"
        class=" mb-5 rounded-lg elevation-0"
        width="100%"
      >
        <div
          class="pa-5"
          style="width: 100%; box-shadow: -2px 8px 16px rgba(14, 10, 10, 0.05;"
        >
          <v-row>
            <v-col cols="3">
              <component :is="data.icon" />
            </v-col>
            <v-col cols="9">
              <h5 class="text-left font-weight-medium" style="color: #9c9c9c">
                {{ data.title }}
              </h5>
              <p class="text-left mb-0 medium h1">
                {{ data.currency }}{{ data.data }}
                <span
                  :class="data.up ? 'gain' : 'loss'"
                  class="body1"
                  style="letter-spacing: -5px"
                >
                  <!-- <v-icon :class="data.up ? 'gain' : 'loss'" v-if="data.up"
                    >mdi-menu-up</v-icon
                  > -->
                  <svg
                    class="mx-3"
                    v-if="data.up"
                    width="12"
                    height="12"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.754 0.913462C4.79267 0.95113 4.958 1.09336 5.094 1.22585C5.94933 2.0026 7.34933 4.0289 7.77667 5.08946C7.84533 5.25053 7.99067 5.65774 8 5.87531C8 6.08378 7.952 6.28252 7.85467 6.47216C7.71867 6.70856 7.50467 6.8982 7.252 7.00211C7.07667 7.06901 6.552 7.17292 6.54267 7.17292C5.96867 7.27683 5.036 7.33398 4.00533 7.33398C3.02333 7.33398 2.12867 7.27683 1.546 7.19175C1.53667 7.18201 0.884666 7.0781 0.661333 6.96444C0.253333 6.75597 0 6.34876 0 5.91297V5.87531C0.00999975 5.59149 0.263333 4.99464 0.272667 4.99464C0.700667 3.99123 2.032 2.01169 2.91667 1.21611C2.91667 1.21611 3.144 0.992046 3.286 0.894628C3.49 0.742655 3.74267 0.667318 3.99533 0.667318C4.27733 0.667318 4.54 0.752397 4.754 0.913462Z"
                      fill="#3CB29A"
                    />
                  </svg>
                  <svg
                    class="mx-3"
                    v-else
                    width="12"
                    height="12"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.246 7.08654C3.20733 7.04887 3.042 6.90664 2.906 6.77415C2.05067 5.9974 0.650667 3.9711 0.223333 2.91054C0.154667 2.74947 0.00933333 2.34226 0 2.12469C0 1.91622 0.048 1.71748 0.145333 1.52784C0.281333 1.29144 0.495333 1.1018 0.748 0.997888C0.923333 0.930994 1.448 0.827081 1.45733 0.827081C2.03133 0.723168 2.964 0.666016 3.99467 0.666016C4.97667 0.666016 5.87133 0.723168 6.454 0.808246C6.46333 0.817988 7.11533 0.921901 7.33867 1.03556C7.74667 1.24403 8 1.65124 8 2.08703V2.12469C7.99 2.40851 7.73667 3.00536 7.72733 3.00536C7.29933 4.00877 5.968 5.98831 5.08333 6.78389C5.08333 6.78389 4.856 7.00795 4.714 7.10537C4.51 7.25734 4.25733 7.33268 4.00467 7.33268C3.72267 7.33268 3.46 7.2476 3.246 7.08654Z"
                      fill="#FF0000"
                    />
                  </svg>

                  {{ isNaN(data.percent) ? 0 : data.percent }}
                </span>
              </p>
              <div class="text-left caption">vs {{timeFrame.replace('This', 'last')}}</div>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-container>
    <menu-spacer></menu-spacer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as mutationTypes from "@/store/mutationTypes";
import { EventBus } from "@/services/eventBus";
import * as dayjs from "dayjs";
import Button from "@/components/Button";

import topNav from "@/components/TopNav";
import MenuSpacer from "@/components/MenuSpacer.vue";
import Arrows from "@/components/Icons/Arrows.vue";
import Transaction from "@/components/Icons/Transaction.vue";
import Sale from "@/components/Icons/Sale.vue";
import Cart from "@/components/Icons/Cart.vue";

export default {
  name: "Dashboard",
  components: {
    topNav,
    MenuSpacer,
    Button,
    Arrows,
    Sale,
    Cart,
    Transaction,
  },
  data: () => ({
    dashboard: [
      {
        status: 0,
        title: "Payments",
        text: "Get paid by customers",
        btn_title: "Setup payment account",
        modal: "set_bank",
      },
      {
        status: 0,
        title: "Store details",
        text: "Store contacts, etc",
        btn_title: "Add store details",
        modal: "store_details",
      },
      {
        status: 0,
        title: "Business hours",
        text: "Opening & closing hours",
        btn_title: "Set hours",
        modal: "business_hours",
      },
      {
        status: 0,
        title: "Shipping",
        text: "Delivery & pick-up arrangements",
        btn_title: "Set shipping",
        modal: "shipping",
      },
    ],
    // dialog: true,
    timeFrame: 'This week',
    dialog: false, // default is false
    modal: null,
    setup_steps: 0,
    verified: "00000",
  }),
  methods: {
    openDialog(setup) {
      this.$store.commit(mutationTypes.SET_SETTINGS_STATE, false);
      EventBus.$emit("dialog", "open", setup);
    },
  },
  computed: {
    ...mapGetters({
      store: "getStore",
      orders: "getOrders",
      email_verified: "getEmailStatus",
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
          icon: Sale,
          colour: "#FFC35014",
          currency: "",
          // up: changeInSales > 0,
          up: true,
        },
        {
          title: "Number of transactions",
          data: this.reshapedOrders.length,
          percent: `${Math.abs(changeInSalesCount / yesterdaySalesCount) *
            100}%`,
          icon: Transaction,
          colour: "#FFC35014",
          // up: changeInSales > 0,
          up: false,
        },
        {
          title: "Number of store visit",
          // data: `NGN ${numeral(avgCheckoutSize).format("0,0")}`,
          data: Math.round(avgCheckoutSize),
          percent: `${Math.abs(
            changeInAvgCheckoutSize / yesterdayAvgCheckoutSize
          ) * 100}%`,
          icon: Cart,
          colour: "#FFC35014",
          currency: "",
          // up: changeInSales > 0,
          up: true,
        },
        {
          title: "Number of return visit",
          data: 0,
          percent: "4%",
          icon: Arrows,
          colour: "#FFC35014",
          up: true,
        },
        // {
        //   title: "Return visits",
        //   data: "18",
        //   percent: "5%",
        //   // icon: "mdi-account-sync",
        //   colour: "#FFC35014",
        //   up: false,
        //   // up: changeInSales > 0,
        // },
      ];
    },
  },
  created() {
    this.verified = this.store.verified;

    if (this.verified) {
      for (var i = 1; i < this.verified.length; i++) {
        // starting loop from 1 not 0
        this.dashboard[i - 1].status = parseInt(this.verified[i]); // the i==0 is the email status
        if (this.store.verified[i] == 1) {
          this.setup_steps += 1;
        }
      }

      if (this.verified[0] == 0) {
        !this.email_verified
          ? EventBus.$emit(
              "open_alert",
              "warning",
              "email not verified. You can verify from here if you close this",
              "Verify Email"
            )
          : "";
      } else {
        this.$store.commit(mutationTypes.EMAIL_VERIFIED, true);
      }
    }
  },
};
</script>

<style scoped>
.data_icon {
  color: #ffc350;
}
.gain {
  color: green;
}
.loss {
  color: red;
}

</style>

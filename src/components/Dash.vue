<template>
  <div class="dashboard">
    <p class="greet">
      Here’s how your business is doing
    </p>

    <p class="page-title utb">
      <span>
        Dashboard
      </span>
      <a-select :default-value="store.store_name" class="pick">
        <a-select-option :value="store.store_name">
          {{ store.store_name }}
        </a-select-option>
      </a-select>
    </p>

    <a-row :gutter="20">
      <a-col
        :sm="24"
        :md="12"
        :lg="8"
        v-for="(item, i) in metrics"
        :key="'item' + i"
      >
        <div class="box">
          <p class="box-title utm">
            {{ item.title }}
          </p>
          <p class="box-count utb">
            {{ item.count }}
          </p>
          <p class="box-metrics">
              <!-- <v-icon>mdi-menu-up</v-icon> -->
              <svg  v-if="item.up" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.754 0.913462C4.79267 0.95113 4.958 1.09336 5.094 1.22585C5.94933 2.0026 7.34933 4.0289 7.77667 5.08946C7.84533 5.25053 7.99067 5.65774 8 5.87531C8 6.08378 7.952 6.28252 7.85467 6.47216C7.71867 6.70856 7.50467 6.8982 7.252 7.00211C7.07667 7.06901 6.552 7.17292 6.54267 7.17292C5.96867 7.27683 5.036 7.33398 4.00533 7.33398C3.02333 7.33398 2.12867 7.27683 1.546 7.19175C1.53667 7.18201 0.884666 7.0781 0.661333 6.96444C0.253333 6.75597 0 6.34876 0 5.91297V5.87531C0.00999975 5.59149 0.263333 4.99464 0.272667 4.99464C0.700667 3.99123 2.032 2.01169 2.91667 1.21611C2.91667 1.21611 3.144 0.992046 3.286 0.894628C3.49 0.742655 3.74267 0.667318 3.99533 0.667318C4.27733 0.667318 4.54 0.752397 4.754 0.913462Z" fill="#3CB29A"/>
</svg>
              <v-icon else>mdi-menu-down</v-icon>
            <span :class="item.up ? 'green' : 'red'">{{
              isNaN(item.percent) ? 0 : item.percent
            }}</span>
            <span class="vs">vs yesterday</span>
          </p>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import * as dayjs from "dayjs";
import numeral from "numeral";
export default {
  data() {
    return {
      verified_count: 0,
      verified: "",
      bar_width: "1%",
    };
  },
  computed: {
    ...mapGetters({
      store: "getStore",
      orders: "getOrders",
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
      let todayOrders = this.reshapedOrders.filter((order) => order.isToday);
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
          count: `NGN ${numeral(totalSales).format("0,0")}`,
          percent: `${Math.abs(changeInSales / yesterdaySalesTotal) * 100}%`,
          up: changeInSales > 0,
        },
        {
          title: "Number of transactions",
          count: this.reshapedOrders.length,
          percent: `${Math.abs(changeInSalesCount / yesterdaySalesCount) *
            100}%`,
          up: changeInSalesCount > 0,
        },
        {
          title: "Average checkout size",
          count: `NGN ${numeral(avgCheckoutSize).format("0,0")}`,
          percent: `${Math.abs(
            changeInAvgCheckoutSize / yesterdayAvgCheckoutSize
          ) * 100}`,
          up: changeInAvgCheckoutSize > 0,
        },
        {
          title: "Number of store visits",
          count: "0",
          percent: "0%",
          up: true,
        },
      ];
    },
  },
  mounted() {
    // console.log(dayjs().get("hours"));
    this.verified = this.store.verified
    for (var i=0; i < this.verified.length; i++) {
      if (this.store.verified[i] == 1) {
        this.verified_count += 1
      }
    }
    let bar_width = this.verified_count * 20
    this.bar_width = bar_width + "%"
  },
};
</script>
<style lang="scss">
.dashboard {
  padding: 80px 150px;
  text-align: left;
  .before-heading {
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 0.05em;
    color: #8093ad;
  }
  .before-wrap {
    border: 1px solid #e6e9ef;
    box-sizing: border-box;
    border-radius: 4px;
    border-bottom-width: 4px;
    padding: 32px;
    margin-bottom: 40px;
    position: relative;
    .before-items {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      z-index: 2;
    }
    .bar {
      height: 4px;
      background-color: #09ad5f;
      position: absolute;
      bottom: -4px;
      left: 0;
    }
    .before {
      display: flex;
      flex-direction: row;
      align-items: baseline;
      padding: 0 0 0 10px;
      width: 20%;
      img {
        position: relative;
        top: 3px;
      }
      .txt {
        flex-direction: column;
        padding: 0 0 0 10px;
        .first {
          font-size: 16px;
          line-height: 20px;
          color: #10102c;
          margin-bottom: 2px;
        }
        .second {
          font-size: 14px;
          line-height: 17px;
          color: #66768a;
          margin-bottom: 5px;
        }
        .before-btn {
          font-weight: 500;
          font-size: 14px;
          line-height: 17px;
          color: #3a50d5 !important;
        }
      }
    }
  }
  .welcome {
    font-size: 28px;
    line-height: 35px;
    color: #2b2b2b;
  }
  .greet {
    font-size: 16px;
    line-height: 20px;
    color: #4d5868;
    margin-top: 5px;
  }

  .box {
    background: #ffffff;
    border: 2px solid #e6e9ef;
    border-radius: 4px;
    padding: 20px;
    width: 100%;
    margin-bottom: 20px;
    .box-title {
      font-size: 14px;
      line-height: 17px;
      color: #66768a;
    }
    .box-count {
      font-size: 28px;
      line-height: 35px;
      color: #2b2b2b;
      margin-top: 40px;
      margin-bottom: 5px;
      white-space: nowrap;
      overflow: hidden;
    }
    .box-metrics {
      font-size: 12px;
      line-height: 15px;
      color: #a7a8aa;
      margin-bottom: 5px;
      img {
        margin-right: 3px;
      }
      .vs {
        margin-left: 3px;
      }
      .red {
        color: #ee0000;
      }
      .green {
        color: #09ad5f;
      }
    }
  }

  @media (max-width: 1000px) {
    .before-wrap {
      .before {
        width: 33.33%;
      }
    }
  }
  @media (max-width: 767px) {
    padding: 30px 15px 100px;
    .page-title {
      margin-bottom: 75px;
      span {
        display: block;
      }
    }

    .before-wrap {
      flex-direction: column;
      padding: 15px 15px 0 10px;
      .before {
        width: 100%;
        padding-bottom: 20px;
        .txt {
          display: flex;
          flex-direction: row;
          width: 100%;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>

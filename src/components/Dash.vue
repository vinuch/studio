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
              <v-icon v-if="item.up">mdi-menu-up</v-icon>
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

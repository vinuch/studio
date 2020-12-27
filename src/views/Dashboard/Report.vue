<template>
  <div class="report">
    <div class="welcome utb">
      Good afternoon <img src="../../assets/drink.svg" alt="" />
    </div>
    <p class="greet">
      Here’s how your business is doing
    </p>

    <p class="page-title utb">
      <span>
        Reports
      </span>
      <a-select default-value="lucy" class="pick">
        <a-select-option value="jack">
          Jack
        </a-select-option>
        <a-select-option value="lucy">
          Lucy
        </a-select-option>
        <a-select-option value="Yiminghe">
          yiminghe
        </a-select-option>
      </a-select>
    </p>

    <a-row :gutter="20">
      <a-col :sm="24" :md="8" v-for="(item, i) in metrics" :key="'item' + i">
        <div class="box">
          <p class="box-title utm">
            {{ item.title }}
          </p>
          <p class="box-count utb">
            {{ item.count }}
          </p>
          <p class="box-metrics">
            <img src="../../assets/up.svg" v-if="item.up" alt="" />
            <img src="../../assets/down.svg" v-else alt="" />
            <span :class="item.up ? 'green' : 'red'">{{ item.percent }}</span>
            <span class="vs">vs yesterday</span>
          </p>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      metrics: [
        {
          title: "Total sales",
          count: "NGN 234,000.00",
          percent: "0%",
          up: true,
        },
        {
          title: "Number of transactions",
          count: "23,432",
          percent: "20%",
          up: false,
        },
        {
          title: "Average checkout size",
          count: "NGN 100,250.00",
          percent: "12.4%",
          up: true,
        },
        {
          title: "Number of store visits",
          count: "500",
          percent: "15%",
          up: true,
        },
      ],
    };
  },
};
</script>
<style lang="scss">
.report {
  padding: 80px 150px;
  text-align: left;
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

  @media (max-width: 767px) {
    padding: 30px 30px 100px;
    .page-title {
      margin-bottom: 75px;
      span {
        display: block;
      }
    }
  }
}
</style>

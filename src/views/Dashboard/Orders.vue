<template>
  <div class="orders">
    <p class="page-title utb">
      <span>
        Orders
      </span>
    </p>

    <div class="empty" v-if="!orders.length">
      <img src="../../assets/hand.svg" alt="" />
    </div>
    <div class="orders-list" v-else>
      <div
        class="collapse"
        v-for="(order, i) in orders"
        :key="'order' + i"
        :class="i === activeKey ? 'bordered' : ''"
      >
        <div class="top" @click="openCollapse(i)">
          <div class="left">
            <p class="date">15 Sep 2020, Order #{{ order.order_ref }}</p>
            <div class="name">
              {{ order.full_name }} — N{{ order.products_total }}
            </div>
            <p class="date" v-if="i === activeKey">
              {{ order.address }}, {{ order.city }}, {{ order.phone }},
              {{ order.email }}
            </p>
          </div>
          <div class="right">
            <a-icon
              type="loading"
              v-if="i === loadingIndex && loading"
              style="color: #3a50d5"
            />
            <span v-else>
              {{ order.fulfilled }}/{{ order.items_count }}
              <img
                src="../../assets/caret.svg"
                alt=""
                style="margin-left: 5px"
              />
            </span>
          </div>
        </div>
        <div class="btm" :class="i === activeKey ? 'open' : ''">
          <p class="title">
            ITEMS — mark available items
            <span class="blue" @click="markAll(orderItems, i)">
              Mark all
            </span>
          </p>
          <div
            class="roww"
            v-for="(orderItem, j) in orderItems"
            :class="j === orderItems.length - 1 ? 'last' : ''"
            :key="orderItem.order"
            @click="markAsCompleted(orderItem.id, i)"
          >
            <div class="left">
              <!-- <img src="../../assets/img.svg" alt="" /> -->
              <span class="item-name">
                {{ orderItem.product_name }} (Qty: {{ orderItem.qty }})
              </span>
            </div>
            <div class="right">
              <img
                v-if="orderItem.status"
                src="../../assets/check.svg"
                alt=""
              />
              <img v-else src="../../assets/circle.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {
  fetchOrderItems,
  updateOrderStatus,
  fetchOrders,
} from "../../services/apiServices";
export default {
  data() {
    return {
      pageWidth: true,
      activeKey: null,
      orderItems: [],
      expandIconPosition: "right",
      loading: false,
      loadingIndex: null,
      text:
        "loren iuagut fduvuys vuya hvuysfvsyhdvyuysv duyv ayu veuyvdfuyj ouiab davdiua viu",
    };
  },
  computed: {
    ...mapGetters({
      orders: "getOrders",
    }),
    pageWidth_() {
      return window.innerWidth;
    },
  },
  watch: {
    pageWidth_() {
      this.pageWidth_ > 767
        ? (this.pageWidth = true)
        : (this.pageWidth_ = false);
    },
  },
  methods: {
    openCollapse(i) {
      if (this.activeKey === i) {
        this.activeKey = null;
        return;
      }
      this.activeKey = null;
      this.loading = true;
      this.loadingIndex = i;
      this.orderItems = [];
      fetchOrderItems(this.orders[i].order_ref)
        .then((res) => {
          this.orderItems = res.data;
          this.activeKey = i;
        })
        .catch((err) => {
          console.log({ err });
          this.orderItems = [];
        })
        .finally(() => (this.loading = false));
    },
    markAsCompleted(id, i) {
      updateOrderStatus(id)
        .then(() => {
          fetchOrders();
          this.openCollapse(i);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    markAll(items, i) {
      items.forEach((item) => {
        this.markAsCompleted(item.id, i);
      });
    },
  },
  mounted() {
    console.log(this.orders);
    this.pageWidth = window.innerWidth > 767;
  },
};
</script>
<style lang="scss" scoped>
.orders {
  padding: 30px 300px;
  text-align: left;
  .empty {
    width: 100%;
    padding-top: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .orders-list {
    .order-item {
      border: 1px solid #e6e9ef;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 30px;
      .order-header {
        padding: 12px 20px;
        background: #f8f9fa;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .date {
          font-size: 14px;
          line-height: 17px;
          color: #66768a;
        }
        .blue {
          font-size: 14px;
          line-height: 17px;
          text-align: right;
          color: #3a50d5;
        }
      }
      .order-body {
        padding: 20px;
        display: flex;
        flex-direction: row;
        .items-header {
          font-size: 12px;
          line-height: 15px;
          letter-spacing: 0.05em;
          color: #8093ad;
        }
        .items {
          width: 100%;
          .good {
            padding: 12px 0;
            border-bottom: 1px solid #e6e9ef;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            .good-name {
              img {
                height: 30px;
                border-radius: 4px;
                margin-right: 5px;
              }
              span {
                font-size: 16px;
                line-height: 20px;
                color: #2b2b2b;
              }
            }
            .price {
              font-size: 16px;
              line-height: 20px;
              text-align: right;
              color: #4d5868;
            }
          }

          .total {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0 5px;
            .total-label {
              font-size: 16px;
              line-height: 20px;
              color: #4d5868;
            }
            .total-amt {
              font-size: 16px;
              line-height: 20px;
              text-align: right;
              color: #4d5868;
            }
          }
        }
        .customer {
          padding-left: 60px;
          width: 100%;
          .customer-name {
            font-size: 16px;
            line-height: 20px;
            color: #2b2b2b;
          }
          .detail {
            font-size: 16px;
            line-height: 150%;
            color: #4d5868;
            margin-bottom: 6px;
            img {
              float: right;
            }
          }
        }
      }
    }
  }
  .collapse {
    margin-bottom: 20px !important;
    border-radius: 3px !important;
    transition: linear all 0.3s;
    border: 1px solid #f8f9fa !important;
    &.bordered {
      border: 1px solid #e6e9ef !important;
    }
    .top {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 3px 3px 0px 0px;
      cursor: pointer;
      .date {
        font-size: 14px;
        line-height: 17px;
        color: #66768a;
        margin-bottom: 3px;
      }
      .name {
        font-size: 16px;
        line-height: 20px;
        color: #10102c;
        margin-bottom: 10px;
        font-family: untitled-sans-medium !important;
      }
    }
    .btm {
      transition: linear all 0.3s;
      overflow: hidden;
      padding: 0 15px;
      height: 0;
      &.open {
        height: auto;
        padding: 15px 15px 0;
      }
      .title {
        margin-bottom: -10px;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 0.05em;
        color: #66768a;
        font-family: untitled-sans-medium !important;
        span {
          float: right;
          font-size: 12px;
          line-height: 15px;
          text-align: right;
          color: #3a50d5;
          cursor: pointer;
        }
      }
      .roww {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e6e9ef;
        padding: 12px 0;
        width: 100%;
        cursor: pointer;
        &:hover {
          background-color: #fafafa;
        }
        &.last {
          border: 0;
        }
        .item-name {
          padding-left: 0px;
        }
      }
    }
  }
  @media (max-width: 767px) {
    padding: 0px 20px 100px;
    .orders-list {
      .order-item {
        .order-body {
          flex-direction: column;
          .items {
            width: 100%;
          }
          .customer {
            padding-left: 0;
            width: 100%;
            margin-bottom: 30px;
          }
        }
      }
    }
  }
}
</style>

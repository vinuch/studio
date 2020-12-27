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
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="Pending">
          <div class="order-item" v-for="order in orders" :key="order">
            <div class="order-header">
              <span class="date">
                01 Nov 2020
              </span>
              <span class="blue utm">
                Mark as fulfilled
              </span>
            </div>
            <div class="order-body">
              <a-row style="width: 100%" type="flex">
                <a-col :sm="24" :md="14" :order="pageWidth ? 0 : 2">
                  <div class="items">
                    <p class="items-header utm">
                      ITEMS (16)
                    </p>
                    <div class="good">
                      <div class="good-name">
                        <img
                          src="https://images.unsplash.com/photo-1593642531955-b62e17bdaa9c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                          alt=""
                        />
                        <span>
                          Name of item (4)
                        </span>
                      </div>
                      <div class="price">
                        N9,760.42
                      </div>
                    </div>
                    <div class="good">
                      <div class="good-name">
                        <img
                          src="https://images.unsplash.com/photo-1593642531955-b62e17bdaa9c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                          alt=""
                        />
                        <span>
                          Name of item (4)
                        </span>
                      </div>
                      <div class="price">
                        N9,760.42
                      </div>
                    </div>
                    <br />
                    <div class="total">
                      <div class="total-label">
                        Subtotal
                      </div>
                      <div class="total-amt">
                        N20,260.42
                      </div>
                    </div>
                    <div class="total">
                      <div class="total-label">
                        Delivery fee
                      </div>
                      <div class="total-amt">
                        N1,560.00
                      </div>
                    </div>
                    <div class="total">
                      <div class="total-label utb">
                        Total
                      </div>
                      <div class="total-amt utb">
                        N21,760.42
                      </div>
                    </div>
                  </div>
                </a-col>
                <a-col :sm="24" :md="10">
                  <div class="customer" :order="pageWidth ? 0 : 1">
                    <p class="items-header utm">
                      CUSTOMER
                    </p>
                    <p class="customer-name utm">
                      Bunmi Adekunle
                    </p>
                    <p class="detail">
                      15, Ajayi Street, Gbagada
                    </p>
                    <p class="detail">
                      0812 678 0928
                      <img src="../../assets/phone.svg" alt="" />
                    </p>
                    <p class="detail">
                      bunmi@gmail.com
                      <img src="../../assets/mail.svg" alt="" />
                    </p>
                  </div>
                </a-col>
              </a-row>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Fullfilled">
          <p>nothing here</p>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orders: [1, 2, 3],
      pageWidth: true,
    };
  },
  computed: {
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
  mounted() {
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

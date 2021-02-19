<template>
  <div class="store-cart">
    <StoreNav />

    <div class="empty" v-if="!cart.length">
      <img src="../assets/discount.svg" alt="" />
      <p class="utm">
        You’ve not added any product to cart
      </p>
      <router-link :to="`/`">
        <button class="main-btn">
          Start shopping
        </button>
      </router-link>
    </div>
    <a-row v-else class="inner">
      <a-col :sm="24" :md="12" class="carts">
        <p class="heading utm">
          YOU’RE BUYING
        </p>
        <div class="cart-item" v-for="(item, i) in cartItems" :key="i">
          <div class="info">
            <div
              class="image"
              :style="{ backgroundImage: `url('${item.product_image}')` }"
            ></div>
            <div class="details">
              <p class="name utm">
                {{ item.product_name }}
              </p>
              <div class="desc">
                <span>
                  {{
                    item.first_variant_name ? item.first_variant_name + ":" : ""
                  }}
                  {{
                    item.picked_variant_value[0]
                      ? item.picked_variant_value[0] + ","
                      : ""
                  }}
                  {{ " " }}
                  {{
                    item.second_variant_name
                      ? item.second_variant_name + ":"
                      : ""
                  }}
                  {{ item.picked_variant_value[1] }}
                </span>
              </div>
              <div class="count">
                <img
                  @click="removeFromCart(item.id)"
                  style="cursor: pointer"
                  src="../assets/trash.svg"
                  alt=""
                />
                <div class="grey">
                  <svg
                    width="14"
                    height="2"
                    viewBox="0 0 14 2"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    @click="changeCount('down', item.id)"
                    style="cursor: pointer"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0 1C0 0.44772 0.44772 0 1 0H13C13.5523 0 14 0.44772 14 1C14 1.5523 13.5523 2 13 2H1C0.44772 2 0 1.5523 0 1Z"
                      fill="#8093AD"
                    />
                  </svg>

                  <span class="utb">{{ item.qty_requested }}</span>

                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    @click="changeCount('up', item.id)"
                    style="cursor: pointer"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5 0C5.5523 0 6 0.44772 6 1V4H9C9.5523 4 10 4.44772 10 5C10 5.5523 9.5523 6 9 6H6V9C6 9.5523 5.5523 10 5 10C4.44771 10 4 9.5523 4 9V6H1C0.44772 6 0 5.5523 0 5C0 4.44771 0.44772 4 1 4H4V1C4 0.44772 4.44771 0 5 0Z"
                      fill="#8093AD"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-col>
      <a-col :sm="24" :md="12" class="form">
        <div class="grey-fields">
          <p>
            <span class="info"> Sub total ({{ this.cart.length }} items) </span>
            <span class="price utm"> N{{ numeral(total).format("0,0") }} </span>
          </p>
          <a-button class="main-btn" @click="submit">
            Enter delivery address
          </a-button>
        </div>
      </a-col>
    </a-row>

    <a-drawer
      placement="right"
      :closable="false"
      :visible="visible"
      :width="drawerWidth"
      :maskStyle="{
        backgroundColor: 'rgba(16, 16, 44, 0.25);',
      }"
    >
      <div class="drawer-title" slot="title">
        <span class="utb">
          Complete purchase
        </span>
        <img
          @click="closeDrawer"
          src="../assets/close.svg"
          alt=""
          style="cursor: pointer"
        />
      </div>
      <AddressForm />
    </a-drawer>
  </div>
</template>
<script>
import StoreNav from "../components/StoreNav";
import AddressForm from "../components/AddressForm";
import { mapGetters } from "vuex";
import * as mutationTypes from "../store/mutationTypes";
import numeral from "numeral";
import { EventBus } from "../services/eventBus";
export default {
  data() {
    return {
      visible: false,
    };
  },
  components: { StoreNav, AddressForm },
  computed: {
    ...mapGetters({
      cart: "getVisitorCart",
      storeItems: "getVisitorStore",
      storeInfo: "getVisitedStoreInfo",
    }),
    drawerWidth() {
      return window.innerWidth > 640 ? 640 : window.innerWidth;
    },
    cartItems() {
      return this.storeItems
        .filter((item) => this.cart.find((cart) => cart.id === item.id))
        .map((c) => {
          return {
            ...c,
            qty_requested: this.cart.find((cart) => cart.id === c.id)
              .qty_requested,
          };
        });
    },
    total() {
      return this.cartItems.reduce((agg, curr) => {
        agg += curr.qty_requested * curr.price;
        return agg;
      }, 0);
    },
  },
  methods: {
    numeral,
    closeDrawer() {
      this.visible = false;
    },
    submit() {
      this.visible = true;
    },
    removeFromCart(id) {
      let cart = this.cartItems.filter((itm) => itm.id !== id);
      this.$store.commit(mutationTypes.SAVE_VISITOR_CART, cart);
    },
    changeCount(direction, id) {
      let cart_ = this.cart.map((c) => {
        if (c.id === id) {
          let qty_requested =
            direction === "up"
              ? (c.qty_requested += 1)
              : c.qty_requested > 1
              ? (c.qty_requested -= 1)
              : 1;
          return {
            ...c,
            qty_requested,
          };
        } else {
          return c;
        }
      });
      this.$store.commit(mutationTypes.SAVE_VISITOR_CART, cart_);
    },
  },
  mounted() {
    EventBus.$on("closeDrawer", () => this.closeDrawer());
  },
};
</script>
<style lang="scss" scoped>
.store-cart {
  .inner {
    padding: 50px 100px;
  }
  .empty {
    width: 100%;
    padding-top: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    p {
      font-size: 16px;
      line-height: 20px;
      color: #8093ad;
      margin-top: 12px;
    }
    .main-btn {
      height: 50px;
      width: 200px;
    }
  }
  .heading {
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 0.05em;
    color: #8093ad;
  }
  .carts {
    border-right: 1px solid #e6e9ef;
    text-align: left;
    padding-right: 100px;
    .cart-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e6e9ef;
      padding: 25px 0;
      .info {
        display: flex;
        flex-direction: row;
        align-items: center;
        .image {
          width: 82px;
          height: 82px;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          margin-right: 15px;
        }
        .details {
          .name {
            font-size: 16px;
            line-height: 20px;
            color: #2b2b2b;
            margin-bottom: 5px;
          }
          .desc {
            font-size: 14px;
            line-height: 17px;
            color: #4d5868;
            margin-bottom: 15px;
          }
          .count {
            .grey {
              background: #f8f9fa;
              border-radius: 4px;
              padding: 7px 12px;
              display: inline-flex;
              justify-content: space-between;
              align-items: center;
              width: 120px;
              margin-left: 5px;
              span {
                font-size: 16px;
                line-height: 20px;
                text-align: center;
                color: #2b2b2b;
              }
            }
          }
        }
      }
    }
  }
  .form {
    padding: 0 100px;
    text-align: left;
    .fields {
      background: #f8f9fa;
      border-radius: 4px;
      padding: 24px;
      p {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-bottom: 1px solid #e6e9ef;
        padding-bottom: 12px;
        .info {
          font-size: 16px;
          line-height: 20px;
          color: #10102c;
        }
        .price {
          font-size: 16px;
          line-height: 20px;
          text-align: right;
          color: #4d5868;
        }
      }
      .main-btn {
        height: 50px;
        width: 100%;
      }
    }
  }
  @media (max-width: 767px) {
    .inner {
      padding: 30px !important;
    }
    .carts {
      padding-right: 0;
      border: 0;
    }
    .form {
      margin-top: 40px;
      padding: 0 0 100px;
    }
  }
}
</style>

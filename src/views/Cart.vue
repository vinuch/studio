<template>
  <div class="store-cart">
    <StoreNav
      :location="'cart'"
    />

    <div class="empty" v-if="!cart.length">
      <img src="../assets/discount.svg" alt="" />
      <p class="utm">
        You’ve not added any product to cart
      </p>
      <router-link :to="`/gallery`">
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
        <div class="cart-item" v-for="(item, i) in cart" :key="i">
          <div class="info">
            <div
              class="image"
              :style="{ backgroundImage: `url('${item.product_image}')` }"
            ></div>
            <div class="details">
              <p class="name utm">{{ item.product_name }}</p>
              <p class="unit_price">
                <span v-if="item.has_discount" class="item_price">
                  ₦{{ numeral(item.price - item.discountAmt).format("0,0")}}
                </span>
                <span
                  :class="item.has_discount
                  ? 'item_discount_price'
                  : 'item_price'"
                >
                  ₦{{ numeral(item.price).format("0,0") }}
                </span>
              </p>
              <div class="desc">
                <div v-if="item.first_variant_name">
                  {{ item.first_variant_name + ":" }}
                  {{ item.selected_option }}
                </div>
                <div v-if="item.second_variant_name">
                  {{ item.second_variant_name + ":" }}
                  {{ item.selected_option2 }}
                </div>
              </div>
              <p class="item_subtotal">
                <span v-if="item.has_discount">
                  ₦{{ numeral((item.price - item.discountAmt) * item.count).format("0,0")}}
                </span>
                <span v-else>
                  ₦{{ numeral(item.price * item.count).format("0,0") }}
                </span>
              </p>
              <div class="count">
                <img
                  @click="removeFromCart(i)"
                  style="cursor: pointer"
                  src="../assets/trash.svg"
                  alt=""
                />
                <div class="grey">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    @click="increaseInCart(i)"
                    style="cursor: pointer"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5 0C5.5523 0 6 0.44772 6 1V4H9C9.5523 4 10 4.44772 10 5C10 5.5523 9.5523 6 9 6H6V9C6 9.5523 5.5523 10 5 10C4.44771 10 4 9.5523 4 9V6H1C0.44772 6 0 5.5523 0 5C0 4.44771 0.44772 4 1 4H4V1C4 0.44772 4.44771 0 5 0Z"
                      fill="#8093AD"
                    />
                  </svg>

                  <span class="utb">{{ item.count }}</span>

                  <svg
                    width="14"
                    height="2"
                    viewBox="0 0 14 2"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    @click="reduceInCart(i)"
                    style="cursor: pointer"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0 1C0 0.44772 0.44772 0 1 0H13C13.5523 0 14 0.44772 14 1C14 1.5523 13.5523 2 13 2H1C0.44772 2 0 1.5523 0 1Z"
                      fill="#8093AD"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="coupon_prop">

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
    <Coupon @submit="setVisible" />
  </div>
</template>
<script>
import StoreNav from "@/components/StoreNav";
import AddressForm from "@/components/AddressForm";
import Coupon from "@/components/Coupon";
import { mapGetters } from "vuex";
import * as mutationTypes from "@/store/mutationTypes";
// import checkStock from "@/mixins/mixins";
import numeral from "numeral";
import { EventBus } from "@/services/eventBus";
export default {
  components: {
    StoreNav,
    Coupon,
    AddressForm
  },
  mixins: [
    // checkStock,
  ],
  data() {
    return {
      visible: false,
      coupon: "",
    };
  },
  methods: {
    numeral,
    closeDrawer() {
      this.visible = false;
    },
    backToStore() {
      this.$router.push({name: 'Gallery'})
    },
    checkStock(product) { // refactor - also in product
      if(product.combo_qty) {
        if (product.combo_qty > product.count) {
          return true
        }
      } else if(product.this_stock) {
        if (product.this_stock > product.count) {
          return true
        }
      } else {
        if(product.total_stock > product.count) {
          return true
        }
      }
      alert("All available stock is already in your cart.")
      return false
    },
    increaseInCart(index) {
    // Increases product count while viewing cart
      let product = this.cart[index]
      if (this.checkStock(product)) {
        product.count++
        product.subTotal = product.discountAmt
          ? (product.count * (product.price - product.discountAmt))
          : (product.count * product.price)
        this.$store.commit(mutationTypes.SAVE_CART, this.cart)
      }
    },
    reduceInCart(index) {
    // Reduces product count while viewing cart
      let product = this.cart[index]
      if (product.count > 0) {
        product.count--
        if (product.count == 0) {
          this.cart.splice(index, 1)
        }
      }
      product.subTotal = product.discountAmt // refactor this - used elsewhere
        ? (product.count * (product.price - product.discountAmt))
        : (product.count * product.price)
      this.$store.commit(mutationTypes.SAVE_CART, this.cart)
    },
    removeFromCart(i) {
      // Deletes all instances of a product while viewing cart
      this.cart.splice(i, 1)
      this.$store.commit(mutationTypes.SAVE_CART, this.cart);
    },
    setVisible() {
      this.visible = true;
    },
  },
  computed: {
    ...mapGetters({
      cart: "getCart",
      cart_meta: "getCartMeta",
      products: "getProducts",
      storeInfo: "getVisitedStoreInfo",
    }),
    drawerWidth() {
      return window.innerWidth > 640 ? 640 : window.innerWidth;
    },
  },
  watch: {
    cart: {
      handler() {
        let total = 0
        let cart_count = 0
        let curr = this.cart
        for (let i = 0; i < curr.length; i++) {
          total += curr[i].subTotal
          cart_count += curr[i].count
        }
        this.cart_meta.preShipTotal = total
        this.cart_meta.cartCount = cart_count
        this.$store.commit(mutationTypes.SAVE_CART_META, this.cart_meta)
      },
      deep: true,
    },
  },
  mounted() {
    EventBus.$on("closeDrawer", () => this.closeDrawer());
  },
};
</script>
<style lang="scss" scoped>

// *:focus {
//   outline: none;
// }
.store-cart {
  // .coupon_prop {
  //   height:160px;
  //   width: 100%;
  // }
  // .bottom_fixed {
  //   width: 100%;
  //   position: fixed;
  //   bottom: 0;
  //   background: #FFF;
  //   padding: 0 15px;
  // }
  // .sub_coupon {
  //   width: 100%;
  //   padding: 15px;
  //   color: #FFF;
  //   font-size: 16px;
  //   background: #1F2938;
  //   border-radius: 8px;
  // }
  // .subtotal, .coupon {
  //   display: flex;
  //   justify-content: space-between;
  // }
  // .subtotal {
  //   border-bottom: 1px solid rgba(255,255,255,.25);
  // }
  // .coupon {
  //   padding: 15px 0 10px;
  //   input {
  //     border: 1px solid #FFF;
  //     border-radius: 4px;
  //     background: transparent;
  //     text-transform: uppercase;
  //     padding: 7px 0 7px 10px;
  //     width: 45%;
  //   }
  //   button {
  //     width: 40%;
  //     border: none;
  //     border-radius: 4px;
  //     background: #3A50D5;
  //   }
  // }
  // .sub_coupon + p {
  //   margin-top: 5px;
  //   padding-right: 10px;
  //   text-align: right;
  //   font-size: 14px;
  //   font-weight: bold;
  //   cursor: pointer;
  // }
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
      position: relative;
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
              position: absolute;
              height: 60%;
              width: 20px;
              top: 50%;
              right: 0;
              transform: translate(0,-50%);
              background: #f8f9fa;
              border-radius: 4px;
              padding: 7px 12px;
              display: inline-flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: center;
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
  // .form {
  //   padding: 0 100px;
  //   text-align: left;
  //   .fields {
  //     background: #f8f9fa;
  //     border-radius: 4px;
  //     padding: 24px;
  //     p {
  //       display: flex;
  //       flex-direction: row;
  //       justify-content: space-between;
  //       border-bottom: 1px solid #e6e9ef;
  //       padding-bottom: 12px;
  //       .info {
  //         font-size: 16px;
  //         line-height: 20px;
  //         color: #10102c;
  //       }
  //       // .price {
  //       //   font-size: 16px;
  //       //   line-height: 20px;
  //       //   text-align: right;
  //       //   color: #4d5868;
  //       // }
  //     }
  //     .main-btn {
  //       height: 50px;
  //       width: 100%;
  //     }
  //   }
  // }
  .item_price {
    color: #3A50D5;
    font-weight: 600;
  }
  .item_discount_price {
    color: #919EAB;
    text-decoration: line-through;
  }
  @media (max-width: 767px) {
    .inner {
      padding: 15px !important;
    }
    .carts {
      padding-right: 0;
      border: 0;
    }
    .cart-item {
      padding: 15px 0;
    }
    .form {
      margin-top: 40px;
      padding: 0 0 100px;
    }
  }
}
</style>

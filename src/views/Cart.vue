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

          <div class="fascia">
            <div
              class="image"
              :style="{ backgroundImage: `url('${item.product_image}')` }">
            </div>
            <div>
              <p class="name utm">{{ item.product_name }}</p>
              <p class="price_group">
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
              <p class="item_subtotal">
                <span v-if="item.has_discount">
                  ₦{{ numeral((item.price - item.discountAmt) * item.count).format("0,0")}}
                </span>
                <span v-else>
                  ₦{{ numeral(item.price * item.count).format("0,0") }}
                </span>
              </p>
            </div>
          </div>
          <div class="info">
            <div v-if="item.first_variant_name" class="desc">
              <p>Options: </p>
              <p>
                <span v-if="item.first_variant_name">
                  {{ item.selected_option }}
                </span>
                <span v-if="item.second_variant_name">
                  {{", " + item.selected_option2 }}
                </span>
              </p>
            </div>
            <!-- <div class="details"> -->
            <div
              class="count"
              :style="!item.first_variant_name ? 'margin-top: 15px;' : '' "
            >
              <img
                @click="removeFromCart(i)"
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
                <span class="utb">{{ item.count }}</span>
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
              </div>
            </div>
            <!-- </div> -->
          </div>
        </div>
        <div class="cart_prop">
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
    <p v-if="cart.length" class="back" @click="backToStore">Back to store</p>
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
.store-cart {
  .cart_prop { // pushes up the bottom most item in cart
    height:160px;
    width: 100%;
  }
  .cart_summary {
    width: 100%;
    position: fixed;
    bottom: 40px;
    background: #FFF;
    padding: 0 15px;
  }
  .back {
    width: 100%;
    background: #FFF;
    position: fixed;
    bottom: 0;
    right: 0;
    margin-bottom: 0;
    padding: 10px;
    padding-right: 25px;
    text-align: right;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
  }
  .fascia {
    position: relative;
    display: flex;
    width: 100%;
    // background: pink;
    .image {
      width: 82px;
      height: 82px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      margin-right: 15px;
    }
    .name {
      font-size: 20px;
    }
    .price_group, .item_subtotal {
      font-size: 16px;
      font-weight: 600;
      position: absolute;
      bottom: 0;
    }
    p {
      margin: 0;
    }
    .item_price {
      color: #3A50D5;
    }
    .item_discount_price {
      color: #919EAB;
      text-decoration: line-through;
    }
    .item_subtotal {
      right: 0;
    }
  }
  .desc, .count {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    // border-top: 1px solid #E6E9EF;
    border-top: 1px solid #F8F9FA;
  }
  .desc {
    width: 100%;
    font-size: 16px;
    color: #4d5868;
    margin-top: 15px;
    p {
      margin: 0;
    }
  }
  .count {
    position: relative;
    // border-bottom: 1px solid #E6E9EF;
    img {
      margin: 5px auto 0;
      height: 20px;
    }
    .grey {
      position: absolute;
      width: 120px;
      right: 0;
      bottom: 7px;
      background: #f8f9fa;
      border-radius: 4px;
      padding: 5px 12px;
      display: inline-flex;
      // flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin-left: 5px;
      span {
        font-size: 18px;
        line-height: 20px;
        text-align: center;
        color: #2b2b2b;
      }
    }
  }



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
      // border: 1px solid #E6E9EF;
      background: #E6E9EF;
      // -moz-box-shadow: 0 0 5px #E6E9EF;
      // -webkit-box-shadow: 0 0 5px #E6E9EF;
      // box-shadow: 0 0 5px #E6E9EF;
      margin-bottom: 20px;
      border-radius: 8px;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 15px 15px 10px;
      .info {
        .details {
          .name {
            font-size: 16px;
            line-height: 20px;
            color: #2b2b2b;
            margin-bottom: 5px;
          }
        }
      }
    }
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

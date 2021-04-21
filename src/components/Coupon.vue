<template>
  <div v-if="cart.length > 0" class="bottom_fixed">
    <div class="sub_coupon">
      <div class="subtotal">
        <p>
          Subtotal ({{ this.cart_meta.cartCount }}
          item<span v-if="this.cart.length > 1">s</span>)
        </p>
        <p>₦{{ numeral(cart_meta.preShipTotal).format("0,0") }}</p>

        <p v-if="address">Delivery fee</p>
        <p v-if="address">₦{{ numeral(cart_meta.preShipTotal).format("0,0") }}</p>

        <p v-if="address">Total</p>
        <p v-if="address">₦{{ numeral(cart_meta.preShipTotal).format("0,0") }}</p>
      </div>
      <div v-if="address"  class="coupon">
        <button @click="submit">Pay</button>
      </div>
      <div v-else class="coupon">
        <input v-model="coupon" placeholder="COUPON CODE">
        <button @click="submit">Enter address</button>
      </div>
    </div>
    <p v-if="!address" @click="backToStore">Back to store</p>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import numeral from "numeral";
import { EventBus } from "../services/eventBus";
export default {
  props: [
    "address",
  ],
  data() {
    return {
      coupon: "",
    };
  },
  methods: {
    numeral,
    backToStore() {
      this.$router.push({name: 'Gallery'})
    },
    submit() {
      this.$emit('submit')
    },
  },
  computed: {
    ...mapGetters({
      cart: "getCart",
      cart_meta: "getCartMeta",
    }),
    drawerWidth() {
      return window.innerWidth > 640 ? 640 : window.innerWidth;
    },
  },
  mounted() {
    EventBus.$on("closeDrawer", () => this.closeDrawer());
  },
};
</script>
<style lang="scss" scoped>

*:focus {
  outline: none;
}
.store-cart {
  .coupon_prop {
    height:160px;
    width: 100%;
  }
  .bottom_fixed {
    width: 100%;
    position: fixed;
    bottom: 0;
    background: #FFF;
    padding: 0 15px;
  }
  .sub_coupon {
    width: 100%;
    padding: 15px;
    color: #FFF;
    font-size: 16px;
    background: #1F2938;
    border-radius: 8px;
  }
  .subtotal, .coupon {
    display: flex;
    justify-content: space-between;
  }
  .subtotal {
    border-bottom: 1px solid rgba(255,255,255,.25);
  }
  .coupon {
    padding: 15px 0 10px;
    input {
      border: 1px solid #FFF;
      border-radius: 4px;
      background: transparent;
      text-transform: uppercase;
      padding: 7px 0 7px 10px;
      width: 45%;
    }
    button {
      width: 40%;
      border: none;
      border-radius: 4px;
      background: #3A50D5;
    }
  }
  .sub_coupon + p {
    margin-top: 5px;
    padding-right: 10px;
    text-align: right;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
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
}
</style>

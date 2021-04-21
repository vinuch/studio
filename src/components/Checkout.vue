<template>
  <div v-if="cart.length > 0" class="cart_summary">
    <div class="sub_coupon">
      <div class="subtotal">
        <div class="subs">
          <p>
            Subtotal ({{ this.cart_meta.cartCount }}
            item<span v-if="this.cart.length > 1">s</span>)
          </p>
          <p>₦{{ numeral(cart_meta.preShipTotal).format("0,0") }}</p>
        </div>
        <div class="subs">
          <p v-if="address">Delivery fee</p>
          <p v-if="address">₦{{ numeral(shipping).format("0,0") }}</p>
        </div>
      </div>
      <div v-if="address"  class="address_coupon">
        <div class="subs">
          <p v-if="address">Total</p>
          <p v-if="address">₦{{
            numeral(parseFloat(cart_meta.preShipTotal) + parseFloat(shipping)).format("0,0")
          }}</p>
        </div>
        <button @click="submit">Place order</button>
      </div>
      <div v-else class="coupon">
        <input v-model="coupon" placeholder="COUPON CODE">
        <button @click="submit">Enter address</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import numeral from "numeral";
import { EventBus } from "../services/eventBus";
export default {
  props: {
    address: Boolean,
    shipping: [Number, String],
  },
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
.cart_summary {
  .sub_coupon {
    width: 100%;
    padding: 15px;
    color: #FFF;
    font-size: 16px;
    background: #1F2938;
    border-radius: 8px;
  }
  .subs, .coupon {
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
    }
  }
  .address_coupon {
    padding-bottom: 0;
    .subs p {
      margin-top: 10px;
      font-weight: bold;
    }
    button {
      width: 100%;
      padding: 10px;
    }
  }
  .address_coupon button, .coupon button {
    border: none;
    border-radius: 4px;
    background: #3A50D5;
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

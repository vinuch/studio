<template>
  <div class="item">
    <div
      class="image"
      @click="goToProduct()"
      :style="{ backgroundImage: `url('${product.product_image}')` }"
      title="click for more details"
    ></div>
    <div class="item-body">
      <div class="details">
        <p
          class="name utm"
          @click="goToProduct()"
          title="click for more details"
        >
          {{ product.product_name || "---" }}
        </p>
        <div class="price">
          <div class="crossed" v-if="product.has_discount">
            ₦{{ numeral(product.price).format("0,0") }}
          </div>
          <span
            >₦{{
              numeral(product.price - product.discountAmt).format("0,0")
            }}</span
          >
        </div>
        <button
          @click="pushToCart()"
          :class="addedToCart ? 'main-btn' : 'main-btn-bd'"
        >
          {{ addedToCart ? "Added to cart" : "Add to cart" }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import * as mutationTypes from "../store/mutationTypes";
import numeral from "numeral";
export default {
  props: ["product"],
  computed: {
    ...mapGetters({
      cart: "getVisitorCart",
    }),
    addedToCart() {
      return this.cart.find((c) => c.id === this.product.id);
    },
  },
  methods: {
    numeral,
    goToProduct() {
      this.$router.push(`/store-item/${this.product.id}`);
    },
    pushToCart() {
      if (this.product.has_variant) {
        this.goToProduct();
        return;
      }
      let cart;
      if (!this.cart.find((c) => c.id === this.product.id)) {
        cart = [...this.cart, { ...this.product, qty_requested: 1 }];
        this.$store.commit(mutationTypes.SAVE_VISITOR_CART, cart);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.item {
  border: 1px solid #e6e9ef;
  border-radius: 4px;
  margin-bottom: 40px;
  cursor: pointer;
  height: 300px;
  .image {
    width: 100%;
    height: 160px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .item-body {
    padding: 20px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    .details {
      display: flex;
      flex-direction: column;
      width: 100%;
      text-align: left;
      .name {
        font-size: 16px;
        line-height: 20px;
        color: #2b2b2b;
        margin-bottom: 5px;
        height: 25px;
        overflow: hidden;
      }
      .price {
        line-height: 150%;
        color: #4d5868;
        margin-bottom: 5px;
        margin-top: 5px;
      }
      .main-btn,
      .main-btn-bd {
        width: 130px;
        height: 32px;
      }
    }
  }
}
</style>

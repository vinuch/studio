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
        <div class="options" style="display: flex; justify-content: space-between">
          <div v-if="product.second_variant != ''">
            <select name="second-variant" v-model="selected_option2" style="min-width: 100px">
              <option v-for="item in secondVariants" :key="item.id">
                {{ item }}
              </option>
            </select>
          </div>

          <div v-if="product.first_variant != ''">
            <select name="first-variant" v-model="selected_option" style="min-width: 100px">
              <option v-for="item in firstVariants" :key="item.id">
                {{ item }}
              </option>
            </select>
          </div>
       
        </div>
        <div @click="takeToCart(product, i)" style="position: absolute; bottom: 1rem; width: 95%; left: .5rem">
          <AddToCartButton
            :product="product"
            :btn_index="i"
            :btn_state="btn_state"
            logo=""
            :count="cartItem ? cartItem.count : 0"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import * as mutationTypes from "../store/mutationTypes";
import numeral from "numeral";
import AddToCartButton from "./AddToCartButton";

export default {
  props: {
    product: Object,
    i: Number,
    logo: String,
  },
  components: { AddToCartButton },
  data() {
    return {
      btn_state: false,
      selected_option: "",
      selected_option2: "",
    };
  },
  computed: {
    ...mapGetters({
      cart: "getCart",
      cart_meta: "getCartMeta",
      getVariantInCartCount: "getVariantInCartCount",
    }),
    addedToCart() {
      return this.cart.find((c) => c.id === this.product.id);
    },
    cartItem() {
      return (
        this.cart.find(
          (item) =>
            item.id == this.product.id && ((item.selected_option == this.selected_option &&
              item.selected_option2 == this.selected_option2) ||
            (item.selected_option == this.selected_option &&
              item.selected_option2 == "")
        )) || null
      );
    },

    firstVariants() {
      return this.product.first_variant
        .split(",")
        .filter((item) => item !== "");
    },
    secondVariants() {
      return this.product.second_variant
        .split(",")
        .filter((item) => item !== "");
    },
  },
  methods: {
    numeral,
    addToCart(product) {
      let id = product.id;
      let option1 = this.selected_option;
      let option2 = this.selected_option2;

      this.product_meta = {
        id: id,
        option1: option1,
        option2: option2,
      };

      let itemInCart = this.cart.find(
        (item) =>
          item.id == product.id &&
          item.selected_option == option1 && item.selected_option2 == option2
      );
      // console.log(itemInCart)

      let checkStock = (product) => {
        // refactor (use mixin?)
        console.log(product);
        let variantOption =
          product.has_variant && product.variant_options !== ""
            ? product.variant_options.find(
                (item) =>
                  `${this.selected_option}/${this.selected_option2}` ==
                    item.name || `${this.selected_option}` == item.name
              )
            : null;

        //  console.log(product.variant_options, this.selected_option2, this.selected_option)
        if (variantOption) {
          if (variantOption.qty > product.count) {
            return true;
          }
        } else if (product.this_stock) {
          if (product.this_stock > product.count) {
            return true;
          }
        } else {
          if (product.total_stock > product.count) {
            return true;
          }
        }
        alert("All available stock is already in your cart or not available.");
        return false;
      };

      if (!itemInCart) {
        let cartItem = {
          ...this.product,
          selected_option: option1,
          selected_option2: option2,
          count: 0,
        };
        if (checkStock(cartItem)) {
          this.$store.commit(mutationTypes.SAVE_CART, [
            ...this.cart,
            {
              ...cartItem,
              count: 1,
            },
          ]);
        }
        return;
      }

      if (checkStock(itemInCart)) {
        let copyCart = [...this.cart];

        copyCart[copyCart.indexOf(itemInCart)].count++;
        this.$store.commit(mutationTypes.SAVE_CART, copyCart);
      }
    },
    checkStock(product) {
      // refactor (use mixin?)
      let variantOption =
        product.has_variant && product.variant_options !== ""
          ? product.variant_options.find(
              (item) =>
                `${this.selected_option2}/${this.selected_option}` == item.name
            )
          : null;
      // console.log(variantOption);
      if (variantOption && variantOption.qty) {
        if (variantOption.qty > product.count) {
          return true;
        }
      } else if (product.this_stock) {
        if (product.this_stock > product.count) {
          return true;
        }
      } else {
        if (product.total_stock > product.count) {
          return true;
        }
      }
      alert("All available stock is already in your cart or not available.");
      return false;
    },
    takeToCart(product, i) {
      console.log(product, this.cart, this.selected_option, this.selected_option2);
      this.btn_id = i;
      product.has_variant
        ? this.ensureVariantsSelected(product)
        : this.addToCart(product, "no_variant");
    },
    ensureVariantsSelected(product) {
      let check1Variant = (product) => {
        this.selected_option
          ? this.addToCart(product, "1variant")
          : alert("please select a " + product.first_variant_name);
      };

      let check2Variants = (product) => {
        check1of2Variants(product);
      };

      let check1of2Variants = (product) => {
        this.selected_option
          ? check2of2Variants(product)
          : alert("please select a " + product.first_variant_name);
      };

      let check2of2Variants = (product) => {
        this.selected_option2
          ? this.addToCart(product, "2variants")
          : alert("please select a " + product.second_variant_name);
      };

      !product.second_variant
        ? check1Variant(product)
        : check2Variants(product);
    },
    checkMatchQty(match_count, match, product, variant) {
      // console.log(match_count, match, product, variant)
      if (match_count > match.count) {
        // this.$store.commit(mutationTypes.SET_VARIANT_IN_CART_COUNT, this.cart_meta)
        match.count++;
        this.updateCount(product.id);
        this.subTotal();
      } else {
        this.outOfStock(product, variant);
      }
    },
    countItemsInCart() {
      let items_count = 0;
      for (let item of this.cart) {
        items_count += Number(item.count);
      }

      this.cart_meta.cartCount = items_count;
      this.$store.commit(mutationTypes.SAVE_CART_META, this.cart_meta);
      this.preShipTotal();
    },
    countProductsInCart() {
      // counts unique products in cart
      let in_cart = [];
      for (let item of this.cart) {
        in_cart.push(item.id);
      }

      this.cart_meta.productCount = [...new Set(in_cart)].length;
      this.$store.commit(mutationTypes.SAVE_CART_META, this.cart_meta);
    },
    goToProduct() {
      this.$router.push(`/store-item/${this.product.id}`);
    },
    outOfStock(product, option) {
      if (option == "no_variant") {
        alert("All available stock is already in your cart.");
      } else if (option == "1variant") {
        alert(
          "All available stock in " +
            product.selected_option +
            " are already in your cart."
        );
      } else if (option == "2variants") {
        alert(
          "All available stock in " +
            product.selected_option +
            " and " +
            product.selected_option2 +
            " are already in your cart or not available."
        );
      } else if (option == "combo_not_available") {
        alert(
          product.product_name +
            " in " +
            product.selected_option +
            " and " +
            product.selected_option2 +
            " is not available"
        );
      }
      return null;
    },
    newCartObject(product, button_state) {
      // product.count = 1;
      let entry = Object.assign(
        {},
        {
          ...product,
          selected_option: this.selected_option,
          selected_option2: this.selected_option2,
        }
      );
      this.cart.push(entry);
      this.updateCount(product.id);
      this.button_state = button_state;
    },
    subTotal() {
      // let id = this.product_meta.id;
      // let option1 = this.product_meta.option1;
      // let option2 = this.product_meta.option2;
      // Calculates the total price of multiple quantities of a product
      // let product = this.cart.find(
      //   (x) =>
      //     x.id == id &&
      //     x.selected_option == option1 &&
      //     x.selected_option2 == option2
      // );
      // product.subTotal = product.discountAmt
      //   ? product.count * (product.price - product.discountAmt)
      //   : product.count * product.price;
      // this.$store.commit(mutationTypes.SAVE_CART, this.cart);
      // this.countItemsInCart();
    },
    preShipTotal() {
      let total = 0;
      for (let i = 0; i < this.cart.length; i++) {
        total += this.cart[i].subTotal;
      }
      this.cart_meta.preShipTotal = total;
      this.$store.commit(mutationTypes.SAVE_CART_META, this.cart_meta);
    },
    updateCount(id) {
      let items = this.cart.filter((x) => x.id == id);
      let count = 0;
      for (let item of items) {
        count += item.count;
      }
      this.count = count;
    },
  },
};
</script>
<style lang="scss" scoped>
.item {
  position: relative;
  border: 1px solid #e6e9ef;
  border-radius: 4px;
  margin-bottom: 40px;
  cursor: pointer;
  height: 350px;
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

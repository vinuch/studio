<template>
  <div :id="'section_' + i" class="product_detail">
    <h1 class="product_name">{{ product.product_name }}</h1>
    <img :src="product.product_image" alt="Image">

    <!-- For multiple images -->
    <div class="product_image fade" :id="'section_' + i">
      <VueAgile v-if="product.product_images" :navButtons="false" ref="carousel" :mobileFirst="true">
        <div class="slide" v-for="(item, i) in testImages" :key="i">
          <img :src="item" alt="Image"  >
        </div>
      </VueAgile>
      <div v-if="product.product_images" class="carousel_ctrl">
        <button  @click="$refs.carousel[i].goToPrev()" class="carouselBtn_left">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d)">
            <circle r="12" transform="matrix(-1 0 0 1 22 19)" fill="white"/>
            </g>                  <path d="M23.421 15.0931C23.4872 15.031 23.5698 15 23.6608 15C23.7517 15 23.8344 15.031 23.9006 15.0931C24.0329 15.2172 24.0329 15.419 23.9006 15.5431L19.6838 19.5L23.9006 23.4569C24.0329 23.581 24.0329 23.7828 23.9006 23.9069C23.7683 24.031 23.5533 24.031 23.421 23.9069L18.9562 19.725C18.8239 19.6009 18.8239 19.3991 18.9562 19.275L23.421 15.0931Z" fill="#333333" stroke="#333333"/>
            <defs>
            <filter id="filter0_d" x="0" y="0" width="44" height="44" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
            <feOffset dy="3"/>
            <feGaussianBlur stdDeviation="5"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
            </filter>
            </defs>
          </svg>
        </button>
        <button  @click="$refs.carousel[i].goToNext()" class="carouselBtn_right">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d)">
            <circle cx="22" cy="19" r="12" fill="white"/>
            </g>
            <path d="M20.579 15.0931C20.5128 15.031 20.4302 15 20.3392 15C20.2483 15 20.1656 15.031 20.0994 15.0931C19.9671 15.2172 19.9671 15.419 20.0994 15.5431L24.3162 19.5L20.0994 23.4569C19.9671 23.581 19.9671 23.7828 20.0994 23.9069C20.2317 24.031 20.4467 24.031 20.579 23.9069L25.0438 19.725C25.1761 19.6009 25.1761 19.3991 25.0438 19.275L20.579 15.0931Z" fill="#333333" stroke="#333333"/>
            <defs>
            <filter id="filter0_d" x="0" y="0" width="44" height="44" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
            <feOffset dy="3"/>
            <feGaussianBlur stdDeviation="5"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
            </filter>
            </defs>
          </svg>
        </button>
      </div>
    </div>

    <div class="meta">
      <div class="price">
        <span v-if="product.has_discount" class="item_price">
          ₦{{ numeral(product.price - product.discountAmt).format("0,0")}}
        </span>
        <span :class="product.has_discount ? 'item_discount_price' : 'item_price'">
          ₦{{ numeral(product.price).format("0,0")}}
        </span>
      </div>

      <div v-if="product.description" class="about">
        <h4>About this item</h4>
        <div>
          {{ product.description }}
        </div>
      </div>

      <div class="options">
        <div v-if="product.second_variant != ''">
          <SelectOption
          :options="product.second_variant"
          :prodIndex="i"
          :name="product.second_variant_name"
          variant="variant2"
          />
          <!-- <div class="select_arrow"></div> -->
        </div>

        <div v-if="product.first_variant != ''">
          <SelectOption
          :options="product.first_variant"
          :prodIndex="i"
          :name="product.first_variant_name"
          variant="variant1"
          />
          <!-- <div class="select_arrow"></div> -->
        </div>
      </div>

      <div @click="takeToCart(product, i)">
        <AddToCartButton
        :product="product"
        :btn_index='i'
        :btn_state='btn_state'
        :logo="logo"
        :count="count"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import SelectOption from '@/components/SelectOption'
import AddToCartButton from "@/components/AddToCartButton";
import * as mutationTypes from "@/store/mutationTypes";
import numeral from "numeral";
// import * as mixins from "@/mixins/mixins";
export default {
  components: {
    AddToCartButton,
    SelectOption,
  },
  mixins: [
    // checkStock,
  ],
  props: {
    product: Object,
    i: Number,
    logo: String,
  },
  data() {
    return {
      btn_state: false,
      btn_id: null,
      count: 0,
      display: 'thumbnail', // or detail
      product_meta: {},
    }
  },
  computed: {
    ...mapGetters({
      cart: "getCart",
      cart_meta: "getCartMeta",
    }),
    addedToCart() {
      return this.cart.find((c) => c.id === this.product.id);
    },
  },
  methods: {
    numeral,

    addToCart(product, variant) {
      // Adds new product to cart or increases the count if it already exists from the mainGallery

      let id = product.id;
      let option1 = product.selected_option;
      let option2 = product.selected_option2;

      this.product_meta = {
        id: id,
        option1: option1,
        option2: option2,
      };

      let already_in_cart = this.cart.filter((x) => x.id == id)

      let no_v = this.cart.find((x) => x.id == id)

      let one_v = already_in_cart.find(
        (x) => {return x.selected_option == option1})

      let two_v = already_in_cart.find(
        (x) => {
        return (
          x.selected_option == option1 &&
          x.selected_option2 == option2
        )
      })

      let addProduct = () => {
        product.count = 0 // initialising count on product (in cart)
        if (!this.checkStock(product)) {return}
        this.newCartObject(product, false)
        this.subTotal()
      }

      let searchCart = () => {
        variant === "no_variant"
          ? no_v
              ? this.checkMatchQty(no_v.total_stock, no_v, product, variant)
              : addProduct()
          : ''

        variant === "1variant"
          ? one_v
              ? this.checkMatchQty(one_v.this_stock, one_v, product, variant)
              : addProduct()
          : ''

        variant === "2variants"
          ? two_v
              ? this.checkMatchQty(two_v.combo_qty, two_v, product, variant)
              : addProduct()
          : ''
      }

      this.cart.length > 0 ? searchCart() : addProduct()
    },
    checkStock(product) { // refactor (use mixin?)
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
      alert("All available stock is already in your cart or not available.")
      return false
    },
    takeToCart(product, i) {
      this.btn_id = i
      product.has_variant
        ? this.ensureVariantsSelected(product)
        : this.addToCart(product, "no_variant")
    },
    ensureVariantsSelected(product) {
      let check1Variant = (product) => {
        product.selected_option ? this.addToCart(product, "1variant") : alert("please select a " + product.first_variant_name)
      }

      let check2Variants = (product) => {
        check1of2Variants(product)
      }

      let check1of2Variants = (product) => {
        product.selected_option ? check2of2Variants(product) : alert("please select a " + product.first_variant_name)
      }

      let check2of2Variants = (product) => {
        product.selected_option2 ? this.addToCart(product, "2variants") : alert("please select a " + product.second_variant_name)
      }

      !product.second_variant ? check1Variant(product) : check2Variants(product)
    },
    checkMatchQty(match_count, match, product, variant) {
      if (match_count > match.count) {
        match.count++;
        this.updateCount(product.id)
        this.subTotal();
      } else {
        this.outOfStock(product, variant);
      }
    },
    countItemsInCart() {
      let items_count = 0
      for (let item of this.cart) {
        items_count += Number(item.count)
      }

      this.cart_meta.cartCount = items_count
      this.$store.commit(mutationTypes.SAVE_CART_META, this.cart_meta)
      this.preShipTotal();
    },
    countProductsInCart() { // counts unique products in cart
      let in_cart = []
      for (let item of this.cart) {
        in_cart.push(item.id)
      }

      this.cart_meta.productCount = [... new Set(in_cart)].length
      this.$store.commit(mutationTypes.SAVE_CART_META, this.cart_meta)
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
      product.count = 1;
      let entry = Object.assign({}, product);
      this.cart.push(entry);
      this.updateCount(product.id)
      this.button_state = button_state;
    },
    subTotal() {
      let id = this.product_meta.id
      let option1 = this.product_meta.option1
      let option2 = this.product_meta.option2

      // Calculates the total price of multiple quantities of a product
      let product = this.cart.find(x => x.id == id && x.selected_option == option1 && x.selected_option2 == option2)

      product.subTotal = product.discountAmt
        ? (product.count * (product.price - product.discountAmt))
        : (product.count * product.price)

      this.$store.commit(mutationTypes.SAVE_CART, this.cart);
      this.countItemsInCart();
    },
    preShipTotal() {
      let total = 0
      for (let i = 0; i < this.cart.length; i++) {
        total += this.cart[i].subTotal
      }
      this.cart_meta.preShipTotal = total
      this.$store.commit(mutationTypes.SAVE_CART_META, this.cart_meta)
    },
    updateCount(id) {
      let items = this.cart.filter((x) => x.id == id)
      let count = 0
      for (let item of items) {
        count += item.count
      }
      this.count = count
    }
  },
  mounted() {
    this.updateCount(this.product.id)
  },
  watch: {
    // cart: {
    //   handler() {
    //     document.getElementById("btn_" + this.i).innerHTML = Number(ele) + 1
    //     let ele = document.getElementById("btn_" + this.btn_id)
    //     ele.innerHTML = Number(ele.innerHTML) + 1
    //
    // //   this.$store.commit(mutationTypes.SAVE_CART, cart)
    // //   // this.$store.commit("saveCartInSession")
    //   },
    //   deep: true,
    // },
  },
};
</script>
<style lang="scss" scoped>
.product_detail {
  h1 {
    background-color: #FFF;
    text-transform: capitalize;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    padding: 15px 0;
    margin: 0;
  }
  img {
    width: 100%;
  }
}
.meta {
  padding: 15px;
  .price {
    text-align: left;
    font-size: 20px;
    .item_price {
      color: #634FDD;
      font-weight: 600;
    }
    .item_discount_price {
      color: #919EAB;
      text-decoration: line-through;
    }
  }
  .about {
    margin-top: 20px;
    border: 1px solid #E9E8EF;
    border-radius: 8px;
    h4 {
      padding: 10px;
      padding-bottom: 0;
      padding-bottom: 5px;
      margin-bottom: 0;
      font-weight: bold;
      text-align: left;
    }
    div {
      width: 100%;
      border-top: 1px solid #E9E8EF;
      padding: 10px;
      text-align: left;
    }
  }
  .options {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
}



.agile {
  // width: 90vw;
  //   max-width: 390px;
}
.carousel_ctrl {
  position: absolute;
  width: 100%;
      max-width: 420px;
      // width: 90vw;
      top: 50%;
    display: flex;
    justify-content: space-between;
}
.carouselBtn_right {
  background-color: #fff;
  box-shadow: -1px -4px 20px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  padding: 0;
  display: flex;
  align-items: center;
  font-size: 2rem;
      width: 2.5rem;
    height: 2.5rem;
}
.carouselBtn_left {
  background-color: #fff;
  box-shadow: -1px -4px 20px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  padding: 0;
  display: flex;
  align-items: center;
  font-size: 2rem;
  width: 2.5rem;
  height: 2.5rem;
}
</style>

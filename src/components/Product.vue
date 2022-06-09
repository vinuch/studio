<template>
  <div v-if="isMobile" :id="'section_' + i" class="product_detail">
    <h1 class="product_name">{{ product.product_name }}</h1>
    <img :src="product.product_image" alt="Image" />

    <!-- For multiple images -->
    <div class="product_image fade" :id="'section_' + i">
      <VueAgile
        v-if="product.product_images"
        :navButtons="false"
        ref="carousel"
        :mobileFirst="true"
      >
        <div class="slide" v-for="(item, i) in testImages" :key="i">
          <img :src="item" alt="Image" />
        </div>
      </VueAgile>
      <div v-if="product.product_images" class="carousel_ctrl">
        <button @click="$refs.carousel[i].goToPrev()" class="carouselBtn_left">
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d)">
              <circle r="12" transform="matrix(-1 0 0 1 22 19)" fill="white" />
            </g>
            <path
              d="M23.421 15.0931C23.4872 15.031 23.5698 15 23.6608 15C23.7517 15 23.8344 15.031 23.9006 15.0931C24.0329 15.2172 24.0329 15.419 23.9006 15.5431L19.6838 19.5L23.9006 23.4569C24.0329 23.581 24.0329 23.7828 23.9006 23.9069C23.7683 24.031 23.5533 24.031 23.421 23.9069L18.9562 19.725C18.8239 19.6009 18.8239 19.3991 18.9562 19.275L23.421 15.0931Z"
              fill="#333333"
              stroke="#333333"
            />
            <defs>
              <filter
                id="filter0_d"
                x="0"
                y="0"
                width="44"
                height="44"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dy="3" />
                <feGaussianBlur stdDeviation="5" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </button>
        <button @click="$refs.carousel[i].goToNext()" class="carouselBtn_right">
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d)">
              <circle cx="22" cy="19" r="12" fill="white" />
            </g>
            <path
              d="M20.579 15.0931C20.5128 15.031 20.4302 15 20.3392 15C20.2483 15 20.1656 15.031 20.0994 15.0931C19.9671 15.2172 19.9671 15.419 20.0994 15.5431L24.3162 19.5L20.0994 23.4569C19.9671 23.581 19.9671 23.7828 20.0994 23.9069C20.2317 24.031 20.4467 24.031 20.579 23.9069L25.0438 19.725C25.1761 19.6009 25.1761 19.3991 25.0438 19.275L20.579 15.0931Z"
              fill="#333333"
              stroke="#333333"
            />
            <defs>
              <filter
                id="filter0_d"
                x="0"
                y="0"
                width="44"
                height="44"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dy="3" />
                <feGaussianBlur stdDeviation="5" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </button>
      </div>
    </div>

    <div class="meta">
      <div class="price">
        <span v-if="product.has_discount" class="item_price">
          ₦{{ numeral(product.price - product.discountAmt).format("0,0") }}
        </span>
        <span
          :class="product.has_discount ? 'item_discount_price' : 'item_price'"
        >
          ₦{{ numeral(product.price).format("0,0") }}
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
          <SelectOption @change="v => selected_option2 = v" :variants="secondVariants" :name="product.second_variant_name" :selectedOption="selected_option2" />
          <!-- <select name="second-variant" v-model="selected_option2">
            <option v-for="item in secondVariants" :key="item.id">
              {{ item }}
            </option>
          </select> -->
        </div>

        <div v-if="product.first_variant != ''">
          <SelectOption @change="v => selected_option = v" :variants="firstVariants" :name="product.first_variant_name" :selectedOption="selected_option"/>

          <!-- <select name="first-variant" v-model="selected_option">
            <option v-for="item in firstVariants" :key="item.id">
              {{ item }}
            </option>
          </select> -->
        </div>
        <!-- <SelectOption
          :options="product.second_variant"
          :prodIndex="i"
          :name="product.second_variant_name"
          variant="variant2"
          /> -->
        <!-- <div class="select_arrow"></div> -->
      </div>

      <!-- <div v-if="product.first_variant != ''"> -->
      <!-- <div class="variant">
            <p>{{ product.first_variant_name }}</p> -->
      <!-- <select class="variant_select" v-model="optionIndex" @change="updateOption(optionIndex, prodIndex)">
      <option :value="null" disabled>Select</option>
      <option v-for="(option, index) in options" :value="index" :key="index">
        {{ option }}
      </option>
    </select> -->
      <!-- <div
              class="select_header"
              :class="open ? 'open' : null"
              @click="open = !open"
              v-on:clickout="open = false"
            >
              {{ selected }}
            </div>
            <transition name="fade">
              <ul v-if="open">
                <li
                  v-for="(option, i) in product.first_variant.split(',')"
                  :key="i"
                  @click="setOption(option, i)"
                >
                  {{ option }}
                </li>
              </ul>
            </transition>
          </div> -->
      <!-- <SelectOption
          :options="product.first_variant"
          :prodIndex="i"
          :name="product.first_variant_name"
          variant="variant1"
          /> -->
      <!-- <div class="select_arrow"></div> -->
      <div @click="takeToCart(product, i)">
        <AddToCartButton
          :product="product"
          :btn_index="i"
          :btn_state="btn_state"
          :logo="logo"
          :count="cartItem ? cartItem.count : 0"
        />
      </div>
    </div>
  </div>
  
    <div v-else class="item">
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
              numeral(product.price - (product.discountAmt || 0)).format("0,0")
            }}</span
          >
           <!-- {{product.total_stock}} {{product.discountAmt}} -->
        </div>
        <div class="options" style="display: flex; justify-content: space-between">
          <div v-if="product.second_variant != ''" style="width: 49%;">
            <!-- <select name="second-variant" v-model="selected_option2" style="min-width: 100px">
              <option v-for="item in secondVariants" :key="item.id">
                {{ item }}
              </option>
            </select> -->
          <SelectOption @change="v => selected_option2 = v" :variants="secondVariants" :name="product.second_variant_name" :selectedOption="selected_option2" />

          </div>

          <div v-if="product.first_variant != ''" style="width: 49%;">
          <SelectOption @change="v => selected_option = v" :variants="firstVariants" :name="product.first_variant_name" :selectedOption="selected_option"/>

            <!-- <select name="first-variant" v-model="selected_option" style="min-width: 100px">
              <option v-for="item in firstVariants" :key="item.id">
                {{ item }}
              </option>
            </select> -->
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
import SelectOption from "@/components/SelectOption";
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
      // selected: "Select",
      // open: false,
      // optionIndex: null,
      isMobile: false,
      selected_option: "",
      selected_option2: "",
      btn_state: false,
      btn_id: null,
      count: 0,
      display: "thumbnail", // or detail
      product_meta: {},
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
    // addToCart(product, variant) {
    //   console.log(this.selected_option2, this.selected_option);
    //   // Adds new product to cart or increases the count if it already exists from the mainGallery

    //   let id = product.id;
    //   let option1 = product.selected_option;
    //   let option2 = product.selected_option2;

    //   this.product_meta = {
    //     id: id,
    //     option1: option1,
    //     option2: option2,
    //   };

    //   let already_in_cart = this.cart.filter((x) => x.id == id);

    //   let no_v = this.cart.find((x) => x.id == id);

    //   let one_v = already_in_cart.find((x) => {
    //     return x.selected_option == option1;
    //   });

    //   let two_v = already_in_cart.find((x) => {
    //     return x.selected_option == option1 && x.selected_option2 == option2;
    //   });

    //   let addProduct = () => {
    //     // product.count = 0; // initialising count on product (in cart)
    //     if (!this.checkStock(product)) {
    //       return;
    //     }
    //     this.newCartObject(product, false);
    //     this.subTotal();
    //   };

    //   let searchCart = () => {
    //     variant === "no_variant"
    //       ? no_v
    //         ? this.checkMatchQty(no_v.total_stock, no_v, product, variant)
    //         : addProduct()
    //       : "";

    //     variant === "1variant"
    //       ? one_v
    //         ? this.checkMatchQty(one_v.this_stock, one_v, product, variant)
    //         : addProduct()
    //       : "";

    //     variant === "2variants"
    //       ? two_v
    //         ? this.checkMatchQty(two_v.combo_qty, two_v, product, variant)
    //         : addProduct()
    //       : "";
    //   };

    //   this.cart.length > 0 ? searchCart() : addProduct();
    // },
    checkStock(product) {
      // refactor (use mixin?)
      let variantOption =
        product.has_variant && product.variant_options !== ""
          ? product.variant_options.find(
              (item) =>
                `${this.selected_option2}/${this.selected_option}` == item.name
            )
          : null;
      console.log(variantOption);
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
      console.log(product, this.selected_option, this.selected_option2);
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
  mounted() {
    this.updateCount(this.product.id);

    this.selected_option = this.firstVariants[0];
    this.selected_option2 = this.secondVariants[0];
      if (window.innerWidth < 504) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    window.addEventListener("resize", () => {
      if (window.innerWidth < 504) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
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
    background-color: #fff;
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
      color: #634fdd;
      font-weight: 600;
    }
    .item_discount_price {
      color: #919eab;
      text-decoration: line-through;
    }
  }
  .about {
    margin-top: 20px;
    border: 1px solid #e9e8ef;
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
      border-top: 1px solid #e9e8ef;
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

.variant {
  // width: 160px;
  text-align: left;
  p {
    font-weight: bold;
    margin-left: 10px;
    margin-bottom: 0.5em;
  }
}
ul {
  list-style-type: none;
  margin: 0.5rem 0 0;
  padding: 0;
  border: 1px solid #e9e8ef;
  box-shadow: 0px 5px 10px #ebf0f7;
  border-radius: 8px;
  transition: all 5s ease;
  position: absolute;
  z-index: 1;
  background-color: #fff;
  width: 100%;

  li {
    padding: 0.5rem 0.5rem;
    cursor: pointer;

    &:hover {
      background-color: #ededed;
    }
  }
}
.select_header {
  cursor: pointer;
  border: 0.877907px solid #ededed;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 0.7rem;
  transition: all 0.5s ease;

  &.open {
    border: 0.877907px solid #634fdd;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.7s;
  // transform: translateY(-50%);
}
.fade-enter,
.fade-leave-to {
  transform: translateY(-20%);
  opacity: 0;
}


.item {
  position: relative;
  border: 1px solid #e6e9ef;
  border-radius: 4px;
  margin-bottom: 40px;
  // cursor: pointer;
  padding-bottom: 4rem;
  height: 400px;
  .image {
    width: 100%;
    height: 160px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    cursor: pointer;
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

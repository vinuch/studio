<template>
  <div class="view-product">
    <StoreNav />
    <div class="page-content">
      <router-link :to="`/`">
        <p class="back">
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style="margin-right: 5px"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.7071 0.29289C6.0976 0.68342 6.0976 1.31658 5.7071 1.70711L2.41421 5L5.7071 8.2929C6.0976 8.6834 6.0976 9.3166 5.7071 9.7071C5.3166 10.0976 4.6834 10.0976 4.2929 9.7071L0.29289 5.7071C-0.09763 5.3166 -0.09763 4.68342 0.29289 4.29289L4.2929 0.29289C4.6834 -0.09763 5.3166 -0.09763 5.7071 0.29289Z"
              fill="#8093AD"
            />
          </svg>
          Back to all products
        </p>
      </router-link>

      <a-row class="product-data" :gutter="40">
        <a-col :md="12" :sm="24">
          <div
            class="image"
            :style="{ backgroundImage: `url(${currentItem.product_image})` }"
          ></div>
        </a-col>
        <a-col :md="12" :sm="24">
          <div class="product-details">
            <p class="name utb">
              {{ currentItem.product_name }}
            </p>

            <div class="price">
              <div class="crossed" v-if="currentItem.has_discount">
                ₦{{ numeral(currentItem.price).format("0,0") }}
              </div>
              <span
                >₦{{
                  numeral(currentItem.price - currentItem.discount).format(
                    "0,0"
                  )
                }}</span
              >
            </div>
            <p class="desc">
              {{ currentItem.description }}
            </p>

            <div class="selects">
              <FloatingLabel
                v-for="(variant, i) in itemVariants(currentItem)"
                :key="'variant' + i"
                style="width: 200px; margin-right: 20px"
                :config="{
                  label: variant.key,
                  ...floatingConfig,
                }"
              >
                <select
                  name=""
                  id=""
                  style="width: 100%;
                    height: 100%;
                    border: 0;
                    background: transparent;
                    padding-top: 10px;"
                  v-model="currentItem.picked_variant_value[i]"
                >
                  <option
                    v-for="(option, i) in variant.values"
                    :key="'option' + i"
                    :value="option.value"
                    >{{ option.value }}</option
                  >
                </select>
              </FloatingLabel>
            </div>

            <button
              @click="pushToCart(currentItem)"
              :class="addedToCart(currentItem.id) ? 'main-btn' : 'main-btn-bd'"
            >
              {{
                addedToCart(currentItem.id) ? "Added to cart" : "Add to cart"
              }}
            </button>
          </div>
        </a-col>
      </a-row>

      <!-- <div v-if="otherItems.length">
        <p class="back" style="margin-top: 100px">
          MORE PRODUCTS
        </p>
        <a-row :gutter="40" style="margin-top: -20px">
          <a-col
            :sm="24"
            :md="12"
            v-for="(otherItem, i) in otherItems"
            :key="'items' + i"
          >
            <a-row class="product-data_" :gutter="20">
              <a-col :md="12" :sm="24">
                <div
                  class="image"
                  :style="{
                    backgroundImage: `url(${otherItem.product_image})`,
                  }"
                ></div>
              </a-col>
              <a-col :md="12" :sm="24">
                <div class="product-details">
                  <p class="name utb">
                    {{ otherItem.product_name }}
                  </p>
                  <p class="price utm">
                    ₦{{ numeral(otherItems[0].price).format("0,0") }}
                  </p>
                  <p class="desc_">
                    {{ otherItem.description }}
                  </p>

                  <div class="selects">
                    <FloatingLabel
                      v-for="(variant, j) in itemVariants(otherItem)"
                      :key="'variant' + j"
                      style="width: 120px; margin-right: 20px"
                      :config="{
                        label: variant.key,
                        ...floatingConfig,
                      }"
                    >
                      <select
                        name=""
                        id=""
                        style="width: 100%;
                        height: 100%;
                        border: 0;
                        background: transparent;
                        padding-top: 10px;"
                        v-model="otherItem.picked_variant_value[j]"
                      >
                        <option
                          v-for="(option, k) in variant.values"
                          :key="'option' + k"
                          :value="option.value"
                          >{{ option.value }}</option
                        >
                      </select>
                    </FloatingLabel>

                    <button
                      @click="pushToCart(otherItem)"
                      :class="
                        addedToCart(otherItem.id) ? 'main-btn' : 'main-btn-bd'
                      "
                    >
                      {{
                        addedToCart(otherItem.id)
                          ? "Added to cart"
                          : "Add to cart"
                      }}
                    </button>
                  </div>
                </div>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </div> -->
    </div>
  </div>
</template>
<script>
import FloatingLabel from "vue-simple-floating-labels";
import { mapGetters } from "vuex";
import StoreNav from "../components/StoreNav";
import { EventBus } from "../services/eventBus";
import * as mutationTypes from "../store/mutationTypes";
import numeral from "numeral";
export default {
  // props: ["addedToCart"],
  data() {
    return {
      floatingConfig: {
        hasClearButton: false,
        line: false,
        labelOffset: {
          left: 20,
          top: 10,
        },
        colors: {
          focusColor: "#3A50D5",
          errorColor: "#ff0000",
          lineColor: "#128CED",
          blurredColor: "#66768A",
        },
      },
      variants: [],
    };
  },
  components: {
    FloatingLabel,
    StoreNav,
  },
  computed: {
    ...mapGetters({
      inventory: "getVisitorStore",
      cart: "getVisitorCart",
      storeName: "getVisitedStoreName",
    }),
    currentItem() {
      return this.inventory.find((itm) => itm.id == this.$route.params.item_id);
    },
    otherItems() {
      return this.inventory
        .filter((itm) => itm.id != this.$route.params.item_id)
        .slice(0, 2);
    },
  },
  methods: {
    numeral,
    addedToCart(id) {
      let itm = this.cart.find((itm) => itm.id === id);
      return itm ? true : false;
    },
    pushToCart(product) {
      if (
        (product.has_variant &&
          product.second_variant_name &&
          product.picked_variant_value.length < 2) ||
        (product.has_variant &&
          product.first_variant_name &&
          !product.picked_variant_value.length)
      ) {
        EventBus.$emit(
          "open_alert",
          "error",
          "Please select a value for each variant"
        );
        return;
      }
      let cart;
      if (!this.cart.find((c) => c.id === product.id)) {
        cart = [...this.cart, { ...product, qty_requested: 1 }];
        this.$store.commit(mutationTypes.SAVE_VISITOR_CART, cart);
      }
    },
    itemVariants(item) {
      let variants = [];
      if (item.first_variant_name) {
        let obj = {
          key: item.first_variant_name,
          values: item.first_variant.split(",").map((val) => {
            return {
              value: val,
            };
          }),
        };
        variants.push(obj);
      }
      if (item.second_variant_name) {
        let obj = {
          key: item.second_variant_name,
          values: item.second_variant.split(",").map((val) => {
            return {
              value: val,
            };
          }),
        };
        variants.push(obj);
      }
      return variants;
    },
  },
  mounted() {
    if (!this.inventory.length) {
      this.$router.push(`/`);
    }
  },
};
</script>
<style lang="scss" scoped>
.view-product {
  .page-content {
    padding: 30px 100px;
    .back {
      font-size: 14px;
      line-height: 17px;
      color: #8093ad;
      text-align: left;
      margin: 10px 0 20px;
      cursor: pointer;
    }

    .product-data {
      .image {
        width: 100%;
        height: 380px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
      }
      .product-details {
        margin-top: 10px;
        text-align: left;
        .name {
          font-size: 28px;
          line-height: 35px;
          color: #2b2b2b;
          margin-bottom: 5px;
        }
        .price {
          font-size: 18px;
          line-height: 150%;
          color: #2b2b2b;
        }
        .desc {
          font-size: 16px;
          line-height: 150%;
          color: #4d5868;
        }
        .selects {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }
        button {
          height: 55px;
          padding: 0 30px;
          min-width: 200px;
        }
      }
    }

    .product-data_ {
      .image {
        width: 100%;
        height: 220px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        margin-top: 25px;
      }
      .product-details {
        text-align: left;
        margin-top: 10px;
        .name {
          font-size: 22px;
          line-height: 35px;
          color: #2b2b2b;
          margin-bottom: 5px;
        }
        .price {
          font-size: 16px;
          line-height: 150%;
          color: #2b2b2b;
        }
        .desc_ {
          font-size: 16px;
          line-height: 150%;
          color: #4d5868;

          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .selects {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }
        button {
          height: 55px;
          min-width: 200px;
          //   padding: 0 10px;
        }
      }
    }
  }

  @media (max-width: 767px) {
    .page-content {
      padding: 20px 20px 120px;
    }
  }
}
</style>

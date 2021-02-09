<template>
  <div class="add-product" :style="{ width: `${drawerWidth}px` }">
    <div
      class="upload-wrapper"
      :style="{ backgroundImage: `url('${product_image}')` }"
    >
      <input type="file" @change="uploadImage($event)" name="" id="" />
      <div class="placeholder" v-if="!product_image && !uploadingImage">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM9 5C9 4.44772 8.5523 4 8 4C7.44772 4 7 4.44772 7 5V7H5C4.44772 7 4 7.44771 4 8C4 8.5523 4.44772 9 5 9H7V11C7 11.5523 7.44772 12 8 12C8.5523 12 9 11.5523 9 11V9H11C11.5523 9 12 8.5523 12 8C12 7.44772 11.5523 7 11 7H9V5Z"
            fill="#8093AD"
          />
        </svg>
        <span class="utm">
          Upload photo
        </span>
      </div>
      <div class="placeholder" v-if="uploadingImage">
        <a-icon type="loading" style="font-size: 24px" />
      </div>
    </div>

    <FloatingLabel
      :class="currentItem ? 'input__container--content' : ''"
      :config="{
        label: 'Name of product',
        ...floatingConfig,
        hasContent: true,
      }"
    >
      <input @keyup="changeInp" v-model="product_name" name="Name of product" />
    </FloatingLabel>

    <FloatingLabel
      :class="currentItem ? 'input__container--content' : ''"
      :config="{
        label: 'Product description',
        ...floatingConfig,
        hasContent: true,
      }"
    >
      <input
        @keyup="changeInp"
        v-model="description"
        name="Product description"
      />
    </FloatingLabel>

    <div class="patch">
      <div class="top">
        <span>Include multiple variants</span>

        <a-switch v-model="has_variant" size="small" />
      </div>
      <div class="mid">
        You can add as many variants of this product as you have available like
        size, color & more.
      </div>
      <div class="bottom_" v-if="has_variant">
        <div v-for="(variant, i) in variants" :key="'variant' + i">
          <div class="variant-row">
            <input
              @keyup="changeInp"
              type="text"
              placeholder="Variant eg. color"
              v-model="variant.key"
            />
            <div class="options-input">
              <div class="options" v-if="variant.values.length">
                <div
                  class="option"
                  v-for="(option, j) in variant.values"
                  :key="'option' + j"
                  @click="deleteVariantValue(i, j)"
                >
                  <a-tooltip>
                    <template slot="title">
                      {{ `delete ${option.value}` }}
                    </template>
                    {{ option.value }}
                    <a-icon
                      type="close"
                      :style="{
                        fontSize: '12px',
                        marginLeft: 12,
                      }"
                    />
                  </a-tooltip>
                </div>
              </div>
              <input
                v-model="newVariantOption"
                @keyup="checkForComma($event, i)"
                @focus="setCurrentInput(i)"
                type="text"
                placeholder="Option eg. red "
                :style="{ color: currentInput === i ? '#000' : 'transparent' }"
              />
            </div>
            <!-- <img
              @click="deleteVariant(i)"
              title="delete variant"
              src="../assets/trash.svg"
              alt=""
              v-if="variants.length > 1"
            />
            <img
              @click="deleteVariantValue(i, j)"
              src="../assets/dash.svg"
              alt=""
              v-else
            /> -->
          </div>
        </div>

        <div
          class="add-another-variant utm"
          v-if="variants.length < 2"
          @click="addVariant()"
        >
          Add another variant
        </div>
      </div>
    </div>

    <div class="patch" v-if="has_variant">
      <div class="top">
        <span>Quantity per variant</span>
      </div>
      <div class="mid">
        Indicate the quantity you have available for each combination of
        variants added above.
      </div>
      <a-row class="var-qty" v-for="row in generatePairs" :key="row.text">
        <a-col :span="16">
          <span class="label utm">
            {{ row.text }}
          </span>
        </a-col>
        <a-col :span="8">
          <input
            @keyup="changeInp"
            v-model="row.qty"
            placeholder="Quantity"
            type="text"
          />
        </a-col>
      </a-row>
    </div>

    <a-row :gutter="20">
      <a-col :sm="24" :md="12">
        <FloatingLabel
          :class="currentItem ? 'input__container--content' : ''"
          :config="{
            label: 'Price',
            ...floatingConfig,
          }"
        >
          <input @keyup="changeInp" v-model="price" name="Price" />
          <span class="show utb">NGN</span>
        </FloatingLabel>
      </a-col>
      <a-col :sm="24" :md="12">
        <FloatingLabel
          :class="currentItem ? 'input__container--content' : ''"
          :config="{
            label: 'Quantity',
            ...floatingConfig,
            hasContent: true,
          }"
        >
          <input @keyup="changeInp" v-model="total_stock" name="Quantity" />
        </FloatingLabel>
      </a-col>
    </a-row>

    <div class="patch">
      <div class="top">
        <span>Add discount</span>
        <a-switch v-model="addDiscount" size="small" />
      </div>
      <div class="bottom" v-if="addDiscount">
        <a-row :gutter="20">
          <a-col :sm="24" :md="12">
            <FloatingLabel
              :class="currentItem ? 'input__container--content' : ''"
              :config="{
                label: 'Type of discount',
                ...floatingConfig,
                hasContent: true,
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
                v-model="discount_type"
              >
                <option
                  :value="index"
                  v-for="(discount_type, index) in discount_options"
                  :key="index"
                >
                  {{ discount_type }}
                </option>
              </select>
            </FloatingLabel>
          </a-col>
          <a-col :sm="24" :md="12">
            <FloatingLabel
              :config="{
                label: 'Enter amount',
                ...floatingConfig,
                hasContent: true,
              }"
            >
              <input
                @keyup="changeInp"
                v-model="discount"
                name="Enter amount"
                :disabled="!discount_type"
              />
            </FloatingLabel>
            <p
              style="color: red; font-size: 12px; margin-top: -15px;"
              v-if="hasDiscountError"
            >
              Discount must be less than the item price
            </p>
          </a-col>
        </a-row>
      </div>
    </div>

    <div class="patch">
      <div class="top">
        <span>Display product</span>
        <a-switch v-model="display" size="small" />
      </div>
    </div>

    <a-button
      :disabled="product_image === '' || hasDiscountError || disableEdittingBtn"
      class="main-btn"
      style="height: 56px; width: 180px"
      @click="finishCreation()"
      :loading="loading"
    >
      {{ currentItem ? "Update Product" : "Add product" }}
    </a-button>
  </div>
</template>
<script>
import FloatingLabel from "vue-simple-floating-labels";
import { mapGetters } from "vuex";
import {
  createProduct,
  fethcStoreInventory,
  updateProduct,
} from "../services/apiServices";
import { EventBus } from "../services/eventBus";
import * as mutationTypes from "../store/mutationTypes";

export default {
  data() {
    return {
      uploadingImage: false,
      loading: false,
      currentInput: 0,
      product_id: null,
      product_image: "",

      product_name: "",
      description: "",
      has_variant: false,
      price: "",
      total_stock: "",
      discount_type: "",
      discount: "",
      display: false,

      addDiscount: false,
      addVariants: false,
      newVariantOption: "",
      variants: [
        {
          key: "",
          values: [],
        },
      ],
      // variants: [{ key: "", values: [{ value: null }] }],
      uploaded: false,
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
      discount_options: {
        // The order is important. Do not change
        "0": "None",
        "1": "Percentage",
        "2": "Amount",
      },
    };
  },
  components: {
    FloatingLabel,
  },
  computed: {
    ...mapGetters({
      store: "getStore",
      currentItem: "getItemToBeEditted",
      formTouched: "getFormTouched",
    }),
    hasDiscountError() {
      if (this.discount_type === "1" && this.discount >= 100) {
        return true;
      } else if (this.discount_type === "2" && !this.price) {
        return true;
      } else if (
        this.discount_type === "2" &&
        parseFloat(this.discount) >= parseFloat(this.price)
      ) {
        return true;
      } else {
        return false;
      }
    },
    drawerWidth() {
      return window.innerWidth > 640 ? 590 : window.innerWidth - 50;
    },
    generatePairs() {
      let pairs = [];
      let variantObj = this.variants.reduce((cumm, curr) => {
        cumm[curr.key] =
          curr.key &&
          Object.keys(
            curr.values.reduce((full, sin) => {
              full[sin.value] = sin;
              return full;
            }, {})
          );
        return cumm;
      }, {});
      delete variantObj[""];

      let values = Object.values(variantObj).filter((v) => v[0] !== "null");

      pairs = values[0]
        ? values[0].map((val) => {
            if (values[1]) {
              return values[1].map((v) => {
                return `${val},${v}`;
              });
            } else {
              return val;
            }
          })
        : [];

      let pairs_;
      pairs_ = values.length === 1 ? pairs : pairs.flat();

      if (values[2]) {
        let pairFor3 = [];
        pairs_.map((pair) => {
          return values[2].forEach((v) => {
            pairFor3.push(`${pair},${v}`);
          });
        });

        pairs_ = pairFor3;
      }

      let quantities = [];
      if (this.currentItem) {
        pairs_.forEach((p) => {
          if (this.currentItem.variant_options) {
            let pairVal = this.currentItem.variant_options.split(p)[1];
            if (pairVal) {
              let qty = pairVal.split(",")[1];
              quantities.push(qty);
            }
          }
        });
      }

      return pairs_.map((p, i) => {
        return { text: p, qty: quantities.length ? quantities[i] : null };
      });
    },
    disableEdittingBtn() {
      if (this.currentItem && this.formTouched) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    changeInp() {
      this.formTouched = true;
      this.$store.commit(mutationTypes.FORM_TOUCHED, true);
    },
    setCurrentInput(i) {
      this.currentInput = i;
      this.newVariantOption = "";
    },
    checkForComma(e, i) {
      this.changeInp(e);
      if (
        e.code === "Comma" ||
        e.keyCode === 188 ||
        e.which === 188 ||
        e.keyCode === 13 ||
        e.which === 13 ||
        e.code === "Enter"
      ) {
        this.variants = this.variants.map((variant, j) => {
          if (i !== j) {
            return variant;
          } else {
            let finalValues = [
              ...variant.values,
              {
                value: this.newVariantOption.replace(",", ""),
              },
            ].filter((v) => v);
            return {
              ...variant,
              values: finalValues,
            };
          }
        });
        this.newVariantOption = "";
      }
    },
    deleteVariant(i) {
      this.variants = this.variants.filter((variant, j) => j !== i);
    },
    deleteVariantValue(i, j) {
      this.variants = this.variants.map((v, index) => {
        return i !== index
          ? {
              ...v,
            }
          : {
              ...v,
              values: v.values.filter((val, valIndex) => valIndex !== j),
            };
      });
    },
    addVariant() {
      this.variants = [
        ...this.variants,
        {
          key: "",
          values: [],
        },
      ];
    },
    uploadImage(e) {
      let form = new FormData();
      form.append("product_image", e.target.files[0]);
      this.uploadingImage = true;
      createProduct(form)
        .then((res) => {
          this.product_image = res.data.product_image;
          this.product_id = res.data.id;
        })
        .catch(() => {
          // console.log(err);
        })
        .finally(() => {
          this.uploadingImage = false;
        });
    },
    composePayload() {
      let data = {
        product_name: this.product_name,
        description: this.description,
        has_variant: this.has_variant,
        price: this.price,
        total_stock: this.total_stock,
        discount_type: this.discount_type,
        discount: this.discount,
        display: this.display,
        // variant_options: JSON.stringify(this.generatePairs),

        first_variant_name: this.variants[0] ? this.variants[0].key : "",
        first_variant: this.variants[0]
          ? this.variants[0].values.reduce(
              (cumm, curr) => (cumm += `${curr.value},`),
              ""
            )
          : "",
        second_variant_name: this.variants[1] ? this.variants[1].key : "",
        second_variant: this.variants[1]
          ? this.variants[1].values.reduce(
              (cumm, curr) => (cumm += `${curr},`),
              ""
            )
          : "",
      };
      return data;
    },
    finishCreation() {
      let data = this.composePayload();
      if (this.hasDiscountError) {
        return;
      }
      this.loading = true;
      updateProduct(data, this.product_id)
        .then(() => {
          // console.log(res);
          EventBus.$emit(
            "open_alert",
            "success",
            "Product created successfully"
          );
          EventBus.$emit("close_drawer");
          fethcStoreInventory(this.store.slug);
        })
        .catch(() => {
          // console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  watch: {
    currentItem(newValue) {
      if (newValue) {
        this.product_image = newValue.product_image;
        this.product_name = newValue.product_name;
        this.description = newValue.description;
        this.has_variant = newValue.has_variant;
        this.discount_type = newValue.discount_type;
        this.discount = newValue.discount;
        this.product_id = newValue.id;
        this.price = newValue.price;
        this.total_stock = newValue.total_stock;
        this.display = newValue.display;
        let variants = [];
        if (newValue.first_variant_name) {
          let obj = {
            key: newValue.first_variant_name,
            values: newValue.first_variant.split(",").map((val) => {
              return {
                value: val,
              };
            }),
          };
          variants.push(obj);
        }
        if (newValue.first_variant_name) {
          let obj = {
            key: newValue.second_variant_name,
            values: newValue.second_variant.split(",").map((val) => {
              return {
                value: val,
              };
            }),
          };
          variants.push(obj);
        }
        this.variants = variants;
      } else {
        this.product_image = "";
        this.product_name = "";
        this.description = "";
        this.has_variant = false;
        this.discount_type = "";
        this.discount = "";
        this.product_id = "";
        this.price = "";
        this.total_stock = "";
        this.display = false;
        this.variants = [
          {
            key: "",
            values: [{ value: "" }],
          },
        ];
      }
    },
  },

  created() {
    if (this.currentItem) {
      this.product_image = this.currentItem.product_image;
      this.product_name = this.currentItem.product_name;
      this.description = this.currentItem.description;
      this.has_variant = this.currentItem.has_variant;
      this.discount_type = this.currentItem.discount_type;
      this.discount = this.currentItem.discount;
      this.product_id = this.currentItem.id;
      this.price = this.currentItem.price;
      this.total_stock = this.currentItem.total_stock;
      this.display = this.currentItem.display;
      let variants = [];
      if (this.currentItem.first_variant_name) {
        let obj = {
          key: this.currentItem.first_variant_name,
          values: this.currentItem.first_variant.split(",").map((val) => {
            return {
              value: val,
            };
          }),
        };
        variants.push(obj);
      }
      if (this.currentItem.first_variant_name) {
        let obj = {
          key: this.currentItem.second_variant_name,
          values: this.currentItem.second_variant.split(",").map((val) => {
            return {
              value: val,
            };
          }),
        };
        variants.push(obj);
      }
      this.variants = variants;
    } else {
      this.product_image = "";
      this.product_name = "";
      this.description = "";
      this.has_variant = "";
      this.discount_type = "";
      this.discount = "";
      this.product_id = "";
      this.price = "";
      this.total_stock = "";
      this.display = false;
      this.variants = [
        {
          key: "",
          values: [{ value: "" }],
        },
      ];
    }
  },
};
</script>
<style lang="scss" scoped>
.add-product {
  height: calc(100vh - 100px);
  overflow: auto;
  padding-bottom: 20px;
  padding-right: calc(590px - 440px);
  position: relative;
  z-index: 101;
  .upload-wrapper {
    width: 180px;
    height: 180px;
    border: 1px dashed #e6e9ef;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    margin-bottom: 15px;
    cursor: pointer;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    input {
      width: 180px;
      height: 180px;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 5;
      opacity: 0;
    }
    .placeholder {
      width: 180px;
      height: 180px;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 4;
      flex-direction: column;
      span {
        font-size: 14px;
        line-height: 17px;
        text-align: center;
        color: #8093ad;
        margin-top: 5px;
      }
    }
  }
  .show {
    right: 0px;
    position: absolute;
    top: 35%;
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #8093ad;
  }

  .patch {
    background: #f8f9fa;
    border-radius: 4px;
    padding: 15px 20px;
    margin-bottom: 20px;
    .top {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 16px;
        line-height: 20px;
        color: #2b2b2b;
      }
    }
    .mid {
      font-size: 14px;
      line-height: 150%;
      color: #8093ad;
    }
    .var-qty {
      margin-top: 15px;
      border: 1px solid #e6e9ef;
      .label {
        font-size: 16px;
        line-height: 20px;
        color: #2b2b2b;
        margin: 12px;
        position: relative;
        top: 10px;
      }
      input {
        width: 100%;
        height: 40px;
        border: 0;
        border-left: 1px solid #e6e9ef;
        background-color: transparent;
        font-size: 16px;
        line-height: 20px;
        text-align: center;
        color: #2b2b2b;
        font-family: untitled-sans-medium;
        &::placeholder {
          font-size: 16px;
          line-height: 20px;
          font-family: untitled-sans-regular;
          text-align: center;
          color: #66768a;
        }
        &:focus {
          outline: none;
        }
      }
    }
    .bottom {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #e6e9ef;
    }
    .bottom_ {
      padding-top: 20px;
      .desc {
        font-size: 14px;
        line-height: 150%;
        color: #8093ad;
      }
      .variant-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 12px;
        padding-bottom: 12px;
        border-bottom: 1px solid #e6e9ef;
        input {
          width: 48%;
          border: 1px solid #e6e9ef;
          background-color: transparent;
          border-radius: 4px;
          height: 40px;
          padding-left: 12px;
          &:focus {
            outline: none;
            border: 1px solid #babcc0;
          }
        }
        .options-input {
          width: 48%;
          border: 1px solid #e6e9ef;
          background-color: transparent;
          border-radius: 4px;
          min-height: 40px;
          input {
            border: 0;
            width: 100%;
            height: 40px;
          }
          .options {
            border-top: 1px solid #e6e9ef;
            padding: 10px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            .option {
              color: #2b2b2b;
              padding: 5px 12px;
              background: rgba(43, 43, 43, 0.05);
              border-radius: 4px;
              margin: 0 5px 3px 0;
              transition: linear all 0.3s;
              cursor: pointer;
              &:hover {
                background-color: #ffeaea;
                color: red;
              }
            }
          }
        }
        img {
          cursor: pointer;
        }
      }
      .add-more {
        text-align: right;
        cursor: pointer;
        margin-top: 15px;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 1px solid #e6e9ef;
        span {
          margin-left: 5px;
          font-size: 14px;
          line-height: 150%;
          color: #8093ad;
        }
      }
      .add-another-variant {
        font-size: 14px;
        line-height: 17px;
        text-align: right;
        color: #3a50d5;
        cursor: pointer;
        padding: 20px 0;
        text-align: left;
      }
    }
  }

  @media (max-width: 767px) {
    padding-right: 0;
  }
}
</style>

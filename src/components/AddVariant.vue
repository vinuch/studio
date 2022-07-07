<template>
  <div>
    <!-- variant 1 -->
    <v-sheet
      elevation="0"
      rounded="lg"
      class="mt-2 mb-5"
 
    >
      <div>
        <v-card-text
          class="text-left pa-0 mb-1 describe capitalise text-caption"
          >Enter variant type <br />
          (E.g. Colour, Material, Size, etc)</v-card-text
        >
        <v-text-field
          class="mb-5"
          v-model="variant_1"
          hide-details="true"
          outlined
        ></v-text-field>
        <div v-if="variant_1">
          <v-card-text class="text-left pa-0 mb-1 describe text-caption">
            Options for
            <span class="capitalise bold">{{ variant_1 }}</span
            >:
            <span>Separate options with a comma or press enter.</span>
          </v-card-text>
          <div
            style="border: 1px solid lightgrey; border-radius: 8px; padding: 16px; text-align: left;"
          >
            <p
              v-for="(option, i) in options_1"
              :key="'opt_' + i"
              style="display: inline-flex; border: 0.3px solid #4CAF50; font-size: 12px; padding: 5px; margin: 0 5px 5px 0; border-radius: 8px;"
            >
              <span class="px-1">{{ option }}</span>
              <v-icon
                small
                style="color: #4CAF50; font-size: 15px; font-weight: bold"
                @click="deleteOption(i, 'options_1', option)"
                >mdi-close</v-icon
              >
            </p>
            <input
              v-model="option_1"
              @keyup="checkForComma($event, 'variant_1')"
              @focus="setCurrentInput()"
              type="text"
              style="border-bottom: 1px solid grey; width: 100%; margin-top: 10px; outline: none;"
            />
          </div>
        </div>
      </div>
    </v-sheet>

    <!-- variant 2 -->
    <div v-if="variant_count > 1">
      <v-divider class="mt-5 mb-5"></v-divider>
      <v-sheet
        elevation="0"
        rounded="lg"
        class="mt-2 mb-5"
      
      >
        <div>
          <v-card-text
            class="text-left pa-0 mb-1 describe capitalise text-caption"
            >Enter variant type</v-card-text
          >
          <v-text-field
            class="mb-5"
            v-model="variant_2"
            hide-details="true"
            outlined
          ></v-text-field>
          <div v-if="variant_2">
            <v-card-text class="text-left pa-0 mb-1 describe">
              Options for <span class="capitalise bold">{{ variant_2 }}</span
              >:
            </v-card-text>
            <div
              style="border: 1px solid lightgrey; border-radius: 8px; padding: 16px; text-align: left;"
            >
              <p
                v-for="(option, i) in options_2"
                :key="'opt_' + i"
                style="display: inline-flex; border: 0.3px solid #4CAF50; font-size: 12px; padding: 5px; margin: 0 5px 5px 0; border-radius: 8px;"
              >
                <span class="px-1">{{ option }}</span>

                <v-icon
                  small
                  style="color: #4CAF50; font-size: 15px; font-weight: bold"
                  @click="deleteOption(i, 'options_2', option)"
                  >mdi-close</v-icon
                >
              </p>
              <input
                v-model="option_2"
                @keyup="checkForComma($event, 'variant_2')"
                @focus="setCurrentInput()"
                type="text"
                style="border-bottom: 1px solid grey; width: 100%; margin-top: 10px; outline: none;"
              />
            </div>
          </div>
        </div>
      </v-sheet>
    </div>

    <!-- variant 3 -->
    <div v-if="variant_count > 2">
      <v-divider class="mt-5 mb-5"></v-divider>
      <v-sheet
        outlined
        elevation="0"
        rounded="lg"
        class="mt-2 mb-5"
   
      >
        <div>
          <v-card-text class="text-left pa-0 mb-1 describe capitalise"
            >Enter variant type</v-card-text
          >
          <v-text-field
            class="mb-5"
            v-model="variant_3"
            hide-details="true"
            outlined
          ></v-text-field>
          <div v-if="variant_3">
            <v-card-text class="text-left pa-0 mb-1 describe">
              Options for
              <span class="capitalise bold">{{ variant_3 }}</span
              >:
            </v-card-text>
            <div
              style="border: 1px solid lightgrey; border-radius: 8px; padding: 16px; text-align: left;"
            >
              <p
                v-for="(option, i) in options_3"
                :key="'opt_' + i"
                style="display: inline-block; border: 1px solid grey; padding: 5px; margin: 0 5px 5px 0; border-radius: 8px;"
              >
                {{ option }}
                <v-icon small @click="deleteOption(i, 'options_3', option)"
                  >mdi-delete-outline</v-icon
                >
              </p>
              <input
                v-model="option_3"
                @keyup="checkForComma($event, 'variant_3')"
                @focus="setCurrentInput()"
                type="text"
                style="border-bottom: 1px solid grey; width: 100%; margin-top: 10px; outline: none;"
              />
            </div>
          </div>
        </div>
      </v-sheet>
    </div>
    <p
      v-if="variant_count < 3"
      class="text-left mt-5 pl- text-color-primary pointer describe"
      @click="addVariant()"
    >
      + Add another variant
    </p>

    <!-- qty and pricing -->
    <v-sheet
      v-if="options_1 && options_1.length"
      elevation="0"
      rounded="lg"

      class="mt-5 pb-5"
    >
      <div>
        <p class="text-color-primaryDark" style="text-align: left;  font-weight: 600;">
         Add Quantity per variant
        </p>
        <p class="describe mb-4 text-caption">
          Enter the quantity and price for each combination of variants.
        </p>
      </div>
      <v-simple-table     style="border: 0.5px solid #E2E8F0;box-shadow: -2px 8px 16px rgba(181, 181, 181, 0.08);
border-radius: 8px;padding: .5rem">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Options
              </th>
              <th class="text-left pl-0">
                Qty
              </th>
              <th class="text-left pl-0">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="vars in variants" :key="vars.name">
              <td class="pr-0 text-left" style="max-width: 70px;word-break: break-all;">{{ vars.name }}</td>
              <td class="pl-0 pr-0">
                <input
                  placeholder="0"
                  v-model="vars.qty"
                  style="max-width: 70px;border: 1px solid #E5E9F2; border-radius: 8px"
                  class="px-2 py-1"
                  type="number"
                  @click="e => e.target.select()"
                />
              </td>
              <td class="pl-0 pr-0">
                <input
                  placeholder="0"
                  v-model="vars.price"
                   style="max-width: 70px;border: 1px solid #E5E9F2; border-radius: 8px"
                  class="px-2 py-1"
                  type="number"
                  @click="e => e.target.select()"
                />
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-sheet>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import EventBus from "@/services/eventBus"

export default {
  name: "AddVariants",
  props: [
    "send_variants",
    "variant_payload",
    "first_variant",
    "second_variant",
    "third_variant",
    "variant_options",
    "product"
  ],
  data: () => ({
    activeBorderColor: "#3A50D5",
    search: "",
    option_1: null,
    option_2: null,
    option_3: null,
    options_1: [],
    options_2: [],
    options_3: [],
    option: null,
    price: "",
    qty: 0,
    variants: {},
    variant_count: 1,
    variant_1: "",
    variant_2: "",
    variant_3: "",
  }),
  methods: {
    addVariant() {
      if (this.variant_count < 3) {
        this.variant_count++;
      }
    },
    changeInp() {
      // this.$store.commit(mutationTypes.UNSAVED_CHANGE, true);
    },
    setCurrentInput(i) {
      this.currentInput = i;
      this.option = "";
    },
    checkForComma(e, option) {
      var value;
      var option_1 = false;
      var option_2 = false;
      var option_3 = false;

      if (option == "variant_1" && this.option_1) {
        value = this.option_1;
        option_1 = true;
      } else if (option == "variant_2" && this.option_2) {
        value = this.option_2;
        option_2 = true;
      } else if (option == "variant_3" && this.option_3) {
        value = this.option_3;
        option_3 = true;
      } else {
        return;
      }
      // this.changeInp(e);
      if (
        e.code === "Comma" ||
        e.keyCode === 188 ||
        e.which === 188 ||
        e.keyCode === 13 ||
        e.which === 13 ||
        e.code === "Enter"
      ) {
        value.slice(-1) !== "," ? (value += ",") : "";
        value = value.replace(",", "");

        // prevent duplicate variant options - it causes an error
        option_1 ? this.options_1.push(this.capitalise(value)) : "";
        option_2 ? this.options_2.push(this.capitalise(value)) : "";
        option_3 ? this.options_3.push(this.capitalise(value)) : "";

        this.option_1 = "";
        this.option_2 = "";
        this.option_3 = "";

        this.setVarQtyAndPrice();
      }
    },
    capitalise(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    deleteOption(i, options, option) {
      // this.options = this.options.map((v, index) => {
      //   return i !== index
      //     ? {
      //         ...v,
      //       }
      //     : {
      //         ...v,
      //         values: v.values.filter((val, valIndex) => valIndex !== j),
      //       };
      // });
      Object.keys(this.variants)
        .filter((item) => item.includes(option))
        .forEach((item) => {
          delete this.variants[item];
          // let {item: _item, ...others} = this.variants
          // console.log(_item, item, others)
          this.variants = { ...this.variants };
        });
      // delete this.variants[item]);

      options == "options_1" ? this.options_1.splice(i, 1) : "";
      options == "options_2" ? this.options_2.splice(i, 1) : "";
      options == "options_3" ? this.options_3.splice(i, 1) : "";
      this.setVarQtyAndPrice();
      this.$forceUpdate();
    },
    setVarQtyAndPrice() {
      // this.variants = {};
      if (
        this.options_1?.length &&
        this.options_2?.length &&
        this.options_3?.length
      ) {
        // three variants
        for (let i = 0; i < this.options_1?.length; i++) {
          for (let j = 0; j < this.options_2?.length; j++) {
            for (let k = 0; k < this.options_3?.length; k++) {
              // let object = {
              //   name:
              //     this.options_1[i] +
              //     " / " +
              //     this.options_2[j] +
              //     " / " +
              //     this.options_3[k],
              // };
              // this.variants.push(object);
            }
          }
        }
      } else if (this.options_1?.length && this.options_2?.length) {
        // console.log(this.variants);
        let old = this.variants
        this.variants = {};

        // two variants
        for (let i = 0; i < this.options_1?.length; i++) {
          for (let j = 0; j < this.options_2?.length; j++) {
            if (!this.variants[`${this.options_1[i]}/${this.options_2[j]}`]) {
              this.variants = {
                ...this.variants,
                ...{
                  [`${this.options_1[i]}/${this.options_2[j]}`]: {
                    name: `${this.options_1[i]}/${this.options_2[j]}`,
                    qty: old[`${this.options_1[i]}/${this.options_2[j]}`]?.qty || 0,
                    price: old[`${this.options_1[i]}/${this.options_2[j]}`]?.price || this.product.price || 0,
                  },
                },
              };
              // console.log("2 variants", this.variants);
              // this.variants[this.options_1[i]] = { name: this.options_1[i] }
            }
            // let object = {
            //   name: this.options_1[i] + " / " + this.options_2[j],
            // };
            // this.variants.push(object);
          }
        }
      } else if (this.options_1?.length) {

        let old = this.variants

this.variants = {}
        for (let i = 0; i < this.options_1?.length; i++) {
          // this.variants.push({ name: this.options_1[i] });
          // console.log(this.variants,this.options_1[i])
          if (!this.variants[this.options_1[i]]) {
            this.variants = {
              ...this.variants,
              ...{
                [this.options_1[i]]: {
                  name: this.options_1[i],
                  qty: old[this.options_1[i]]?.qty || 0,
                  price: old[this.options_1[i]]?.price || this.product.price || 0,
                },
              },
            };
            // this.variants[this.options_1[i]] = { name: this.options_1[i] }
          }
          // this.variants[this.options_1[i]] = { name: this.options_1[i] }
          // console.log(this.variants)

          // this.variants = []
        }
      }

      // console.log(this.variants);
    },
    // setVarQtyAndPrice() {
    //   this.variants = {};
    //   if (
    //     this.options_1?.length &&
    //     this.options_2?.length &&
    //     this.options_3?.length
    //   ) {
    //     // three variants
    //     for (let i = 0; i < this.options_1?.length; i++) {
    //       for (let j = 0; j < this.options_2?.length; j++) {
    //         for (let k = 0; k < this.options_3?.length; k++) {
    //           let object = {
    //             name:
    //               this.options_1[i] +
    //               " / " +
    //               this.options_2[j] +
    //               " / " +
    //               this.options_3[k],
    //           };
    //           this.variants.push(object);
    //         }
    //       }
    //     }
    //   } else if (this.options_1?.length && this.options_2?.length) {
    //     // two variants
    //     for (let i = 0; i < this.options_1?.length; i++) {
    //       for (let j = 0; j < this.options_2?.length; j++) {
    //         let object = {
    //           name: this.options_1[i] + " / " + this.options_2[j],
    //         };
    //         this.variants.push(object);
    //       }
    //     }
    //   } else if (this.options_1?.length) {
    //     // one variant
    //     for (let i = 0; i < this.options_1?.length; i++) {
    //       this.variants.push({ name: this.options_1[i] });
    //       // this.variants = []
    //     }
    //   }

    //   console.log(this.variants);
    // },
  },
  computed: {
    ...mapGetters({
      store: "getStore",
      currentProduct: "getProductToBeEditted",
      unsavedChange: "getUnsavedChange",
    }),
    // drawerWidth() {
    //   return window.innerWidth > 640 ? 590 : window.innerWidth - 50;
    // },
  },
  watch: {
    send_variants() {
      // console.log(this.send_variants)
      if (this.send_variants == true) {
        // convert options to string
        // var variant_1_options = this.options_1.reduce((acc, curr) => {
        //   acc += `${curr},`
        //   return acc
        // })
        let variant_1_options = "";
        let variant_2_options = "";
        let variant_3_options = "";

        for (let option in this.options_1) {
          variant_1_options += `${this.options_1[option]},`;
        }

        try {
          for (let option in this.options_2) {
            variant_2_options += `${this.options_2[option]},`;
          }
        } catch {
          variant_2_options = "";
        }

        try {
          for (let option in this.options_3) {
            variant_3_options += `${this.options_3[option]},`;
          }
        } catch {
          variant_3_options = "";
        }

        let variant_options = "";
        // console.log(this.variants)

        for (const variant in this.variants) {
          variant_options += `${variant},${parseInt(
            this.variants[variant].qty
          )},${parseInt(this.variants[variant].price)};`;
        }
        // console.log(this.variants, variant_options);
        let total = 0;
        for (const key in this.variants) {
          total = total + parseInt(this.variants[key].qty);
        }
        let variants_data = {
          variant_1_options: variant_1_options,
          variant_2_options: variant_2_options,
          variant_3_options: variant_3_options,
          variant_name_1: this.variant_1,
          variant_name_2: this.variant_2,
          variant_name_3: this.variant_3,
          total_stock: total,
          // price: this.variants[Object.keys(this.variants)[0]]?.price,
          variant_options: variant_options,
        };

        this.$emit("sendVariants", variants_data);
      }
    },
    // currentItem(newValue) {
    //   if (newValue) {
    //     let options = [];
    //     if (newValue.first_variant_name) {
    //       let obj = {
    //         key: newValue.first_variant_name,
    //         values: newValue.first_variant
    //           .split(",")
    //           .filter((v) => v)
    //           .map((val) => {
    //             return {
    //               value: val,
    //             };
    //           }),
    //       };
    //       options.push(obj);
    //     }
    //     this.options = options;
    //   } else {
    //     this.options = [
    //       {
    //         key: "",
    //         values: [],
    //       },
    //     ];
    //   }
    // },
    // options: {
    //   handler() {
    //     this.$emit("setLocationPrice", this.options[0].key)
    //   },
    //   deep: true,
    // }
  },

  mounted() {
    // if (this.variant_payload) {
    // console.log("yes, there are variants")
    // this.options_1 = this.variant_payload.options_1
    // this.options_2 = this.variant_payload.options_2
    // this.options_3 = this.variant_payload.options_3
    // this.variants = this.variant_payload.variants
    // }
    // console.log("fvariant", this.first_variant);

    this.options_1 = this.first_variant
      ? this.first_variant?.split(",").filter((item) => item !== "")
      : [];
    this.options_2 = this.second_variant
      ? this.second_variant?.split(",").filter((item) => item !== "")
      : [];
    this.options_3 = this.third_variant
      ? this.third_variant?.split(",").filter((item) => item !== "")
      : [];

    // this.va;
    //  if (
    //     this.options_1?.length &&
    //     this.options_2?.length &&
    //     this.options_3?.length
    //   ) {
    //     // three variants
    //     for (let i = 0; i < this.options_1?.length; i++) {
    //       for (let j = 0; j < this.options_2?.length; j++) {
    //         for (let k = 0; k < this.options_3?.length; k++) {
    //           let object = {
    //             name:
    //               this.options_1[i] +
    //               " / " +
    //               this.options_2[j] +
    //               " / " +
    //               this.options_3[k],
    //           };
    //           // this.variants.push(object);
    //         }
    //       }
    //     }
    //   } else if (this.options_1?.length && this.options_2?.length) {
    //     // two variants
    //     for (let i = 0; i < this.options_1?.length; i++) {
    //       for (let j = 0; j < this.options_2?.length; j++) {
    //         let object = {
    //           name: this.options_1[i] + " / " + this.options_2[j],
    //         };
    //         // this.variants.push(object);
    //       }
    //     }
    //   } else if (this.options_1?.length) {
    //     // one variant
    //     for (let i = 0; i < this.options_1?.length; i++) {
    //       // this.variants.push({ name: this.options_1[i] });
    //       this.variants[this.options_1[i]] = {name: this.option_1[i], qty: }

    //       // this.variants = []
    //     }
    //   }

    this.setVarQtyAndPrice();
    let options = this.variant_options
      ?.split(";")
      .filter((item) => item !== "");
    // console.log(options);
    if (!options) {
      return;
    }
    options.forEach((item) => {
      // console.log(item);
      let option_values = item.split(",");
      // console.log('here ' , this.options_1, item[0]);
      this.variants[option_values[0]] = {
        name: option_values[0],
        qty: option_values[1],
        price: option_values[2],
      };
      if (this.options_1?.length) {
        // one variant
        // for (let i = 0; i < this.options_1?.length; i++) {
        // this.variants.push({ name: this.options_1[i] });
        // console.log(this.options_1[i])
        // this.variants = []
        // }
      }

      // this.variants[option_values[0]] ? this.variants[option_values[0]].qty = option_values[1] : null
      // this.variants[option_values[0]] ? this.variants[option_values[0]].price = option_values[2] : null
    });

    // this.variants = temp;

    if (this.currentProduct) {
      this.variant_1 = this.currentProduct.first_variant_name;

      if (this.currentProduct.second_variant_name) {
        this.variant_2 = this.currentProduct.second_variant_name;
        this.variant_count = 2;
      }

      if (this.currentProduct.third_variant_name) {
        this.variant_3 = this.currentProduct.third_variant_name;
        this.variant_count = 3;
      }
    }
  },
};
</script>

<style scoped>
.describe {
  font-size: 14px;
  text-align: left;
  color: #848b91;
  margin-bottom: 0;
}
.capitalise {
  text-transform: capitalize;
}
.bold {
  font-weight: bold;
}
</style>

<template>
<div>
  <!-- variant 1 -->
  <v-sheet
    outlined
    elevation="0"
    rounded="lg"
    class="mt-2 mb-5"
    color="bg_grey"
  >
    <div>
      <v-card-text
        class="text-left pa-0 mb-1 describe capitalise"
      >Enter variant type <br> (E.g. Colour, Material, Size, etc)</v-card-text>
      <v-text-field
        class="mb-5"
        v-model="variant_1"
        hide-details="true"
        outlined></v-text-field
      >
      <div v-if="variant_1">
        <v-card-text  class="text-left pa-0 mb-1 describe">
          Options for
          <span class="capitalise bold">{{variant_1}}</span>: 
          <span>Separate options with a comma or press enter.</span>
        </v-card-text>
        <div
          style="border: 1px solid lightgrey; border-radius: 8px; padding: 16px; text-align: left;"
        >
          <p
            v-for="(option, i) in options_1" :key="'loc_' + i"
            style="display: inline-block; border: 1px solid grey; padding: 5px; margin: 0 5px 5px 0; border-radius: 8px;"
          >
            {{option}} <v-icon small @click="deleteOption(i, 'options_1')">mdi-delete-outline</v-icon>
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
      outlined
      elevation="0"
      rounded="lg"
      class="mt-2 mb-5"
      color="bg_grey"
    >
      <div>
        <v-card-text
          class="text-left pa-0 mb-1 describe capitalise"
        >Enter variant type</v-card-text>
        <v-text-field
          class="mb-5"
          v-model="variant_2"
          hide-details="true"
          outlined></v-text-field
        >
        <div v-if="variant_2">
          <v-card-text  class="text-left pa-0 mb-1 describe">
            Options for <span class="capitalise bold">{{variant_2}}</span>: 
          </v-card-text>
          <div
            style="border: 1px solid lightgrey; border-radius: 8px; padding: 16px; text-align: left;"
          >
            <p
              v-for="(option, i) in options_2" :key="'loc_' + i"
              style="display: inline-block; border: 1px solid grey; padding: 5px; margin: 0 5px 5px 0; border-radius: 8px;"
            >
              {{option}} <v-icon small @click="deleteOption(i, 'options_2')">mdi-delete-outline</v-icon>
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
      color="bg_grey"
    >
      <div>
        <v-card-text
          class="text-left pa-0 mb-1 describe capitalise"
        >Enter variant type</v-card-text>
        <v-text-field
          class="mb-5"
          v-model="variant_3"
          hide-details="true"
          outlined></v-text-field
        >
        <div v-if="variant_3">
          <v-card-text  class="text-left pa-0 mb-1 describe">
            Options for
            <span class="capitalise bold">{{variant_3}}</span>:
          </v-card-text>
          <div
            style="border: 1px solid lightgrey; border-radius: 8px; padding: 16px; text-align: left;"
          >
            <p
              v-for="(option, i) in options_3" :key="'loc_' + i"
              style="display: inline-block; border: 1px solid grey; padding: 5px; margin: 0 5px 5px 0; border-radius: 8px;"
            >
              {{option}} <v-icon small @click="deleteOption(i, 'options_3')">mdi-delete-outline</v-icon>
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
    class="text-left mt-5 pl-5 blue_link pointer describe"
    style="color: blue"
    @click="addVariant()"
  >+ Add another variant</p>

  <!-- qty and pricing -->
  <!-- v-if="options_1.length" -->
  <v-sheet
    elevation="0"
    rounded="lg"
    color="bg_grey"
    class="mt-5 pb-5"
  >
    <div>
      <p
      style="text-align: left; color: #69747E; font-weight: 600;"
      >Add quantity and price
      </p>
      <p class="describe">Enter the quantity and price for each combination of variants.</p>
    </div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Name
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
          <tr
            v-for="vars in variants"
            :key="vars.name"
          >
            <td class="pr-0 text-left">{{ vars.name }}</td>
            <td class="pl-0">
              <input placeholder="0" v-model="vars.qty" style="max-width: 30px;" type="text">
            </td>
            <td class="pl-0 pr-0">
              <input placeholder="0" v-model="vars.price" style="max-width: 60px;" type="text">
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-sheet>

</div>
</template>

<script>

  export default {
    name: 'AddVariants',
    props: [
      "send_variants",
    ],
    data: () => ({
      activeBorderColor: '#3A50D5',
      variants: [],
      search: "",
      option_1: null,
      option_2: null,
      option_3: null,
      options_1: [],
      options_2: [],
      options_3: [],
      option: null,
      price: "",
      qty: "",
      variant_count: 1,
      variant_1: null,
      variant_2: null,
      variant_3: null,
    }),
    methods: {
      addVariant() {
        if (this.variant_count < 3) {
          this.variant_count ++
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
        var value
        var option_1 = false
        var option_2 = false
        var option_3 = false

        if (option == "variant_1" && this.option_1) {
          value = this.option_1
          option_1 = true
        } else if (option == "variant_2" && this.option_2) {
          value = this.option_2
          option_2 = true
        } else if (option == "variant_3" && this.option_3) {
          value = this.option_3
          option_3 = true
        } else {
          return
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
          value.slice(-1) !== "," ? value += "," : ''
          value = value.replace(",", "")

          option_1 ? this.options_1.push(this.capitalise(value)) : ""
          option_2 ? this.options_2.push(this.capitalise(value)) : ""
          option_3 ? this.options_3.push(this.capitalise(value)) : ""

          this.option_1 = ""
          this.option_2 = ""
          this.option_3 = ""

          this.prepVariantQty()
        }
      },
      capitalise(value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
      },
      deleteOption(i, options) {
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

        options == "options_1" ? this.options_1.splice(i, 1) : ""
        options == "options_2" ? this.options_2.splice(i, 1) : ""
        options == "options_3" ? this.options_3.splice(i, 1) : ""
        this.prepVariantQty()
      },
      prepVariantQty() {
        this.variants = []
        if (this.options_1.length && this.options_2.length && this.options_3.length) {
          for (let i=0; i<this.options_1.length; i++) {
            for (let j=0; j<this.options_2.length; j++) {
              for (let k=0; k<this.options_3.length; k++) {
                let object = {name: this.options_1[i] + " / " + this.options_2[j] +" / "+ this.options_3[k]}
                this.variants.push(object)
              }
            }
          }
        } else if (this.options_1.length && this.options_2.length) {
          for (let i=0; i<this.options_1.length; i++) {
            for (let j=0; j<this.options_2.length; j++) {
              let object = {name: this.options_1[i] + " / " + this.options_2[j]}
              this.variants.push(object)
            }
          }
        } else if (this.options_1.length) {
          for (let i=0; i < this.options_1.length; i++) {
            this.variants.push({name: this.options_1[i]})
          }
        }
      },
    },
    computed: {
      // ...mapGetters({
      //   store: "getStore",
      //   currentItem: "getItemToBeEditted",
      //   unsavedChange: "getUnsavedChange",
      // }),
      // drawerWidth() {
      //   return window.innerWidth > 640 ? 590 : window.innerWidth - 50;
      // },
    },
    watch: {
      send_variants() {
        this.send_variants ? this.$emit("getVariants", this.variants) : ""
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
    created() {
      // if (this.currentItem) {
      //   let options = [];
      //   if (this.currentItem.first_variant_name) {
      //     let obj = {
      //       key: this.currentItem.first_variant_name,
      //       values: this.currentItem.first_variant
      //         .split(",")
      //         .filter((v) => v)
      //         .map((val) => {
      //           return {
      //             value: val,
      //           };
      //         }),
      //     };
      //     options.push(obj);
      //   }
      //   this.options = options;
      // } else {
      //   this.options = [
      //     {
      //       key: "",
      //       values: [],
      //     },
      //   ];
      // }
    },
  }
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

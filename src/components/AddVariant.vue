<template>
<div>
  <v-sheet
    outlined
    elevation="0"
    rounded="lg"
    class="mt-2 mb-5"
    color="bg_grey"
  >
    <div>
      <v-card-text
        class="text-left pa-0 mb-1 describe"
      >Variant type <br> (e.g. Colour, Material, Size, etc)</v-card-text>
      <v-text-field
        class="mb-5"
        v-model="variant_name_1"
        hide-details="true"
        outlined></v-text-field
      >
      <div v-if="variant_name_1">
        <v-card-text 
          class="text-left pa-0 mb-1 describe">{{variant_name_1}} options: <span>Separate options with a comma or press enter.</span>
        </v-card-text>
        <div
          style="border: 1px solid blue; border-radius: 8px; padding: 16px; text-align: left;"
        >
          <p
            v-for="(option, i) in options" :key="'loc_' + i"
            style="display: inline-block; border: 1px solid grey; padding: 5px; margin: 0 5px 5px 0; border-radius: 8px;"
          >
            {{option}} <v-icon small>mdi-delete-outline</v-icon>
          </p>
          <input
            v-model="option"
            @keyup="checkForComma($event)"
            @focus="setCurrentInput()"
            type="text"
            style="border-bottom: 1px solid grey; width: 100%; margin-top: 10px; outline: none;"
          />
        </div>
      </div>
    </div>
  </v-sheet>
  <v-divider class="mt-5 mb-5"></v-divider>
</div>
</template>

<script>

  export default {
    name: 'SetShipping',
    components: {
    },
    prop: [
    ],
    data: () => ({
      activeBorderColor: '#3A50D5',
      variant_name_1: "",
      options: [],
      option: null,
    }),
    methods: {
      changeInp() {
      // this.$store.commit(mutationTypes.UNSAVED_CHANGE, true);
      },
      setCurrentInput(i) {
        this.currentInput = i;
        this.option = "";
      },
      checkForComma(e) {
        if (!this.option) {
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
          this.option.slice(-1) !== "," ? this.option += "," : ''
          this.capitalise(this.option)

          this.option = this.option.replace(",", ""),
          this.options.push(this.option)
          this.option = "";
        }
      },
      capitalise(option) {
        this.option = option.charAt(0).toUpperCase() + option.slice(1);
        return
      },
      deleteOption(i, j) {
        this.options = this.options.map((v, index) => {
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
</style>

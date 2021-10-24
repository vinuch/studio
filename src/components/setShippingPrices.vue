<template>
<div>
  <!-- <v-card-text class="text-left pa-0 pt-5 mt-5">Set delivery fees</v-card-text> -->
  <v-sheet
    outlined
    elevation="0"
    rounded="lg"
    class="mt-2 mb-5 pa-5"
    color="bg_grey"
  >
      <div>
      <v-card-text class="text-left pa-0 mb-1">Type the delivery price to a location</v-card-text>
      <v-text-field
        class="mb-5"
        v-model="shipping_price"
        hide-details="true"
        outlined prepend-inner-icon="mdi-cash"
        @blur="emitPrice()"></v-text-field
      >
      <div v-if="shipping_price != null">
        <v-card-text 
          class="text-left pa-0 mb-1">Type areas that cost <span style="font-weight: bold">{{shipping_price}}</span> to deliver to. Separate each area with a comma or press enter.
        </v-card-text>
        <div
          style="border: 1px solid blue; border-radius: 8px; padding: 16px; text-align: left;"
        >
          <p
            v-for="(location, i) in locations" :key="'loc_' + i"
            style="display: inline-block; border: 1px solid grey; padding: 5px; margin: 0 5px 5px 0; border-radius: 8px;"
          >
            {{location}} <v-icon small>mdi-delete-outline</v-icon>
          </p>
          <input
            v-model="newLocation"
            @keyup="checkForComma($event)"
            @focus="setCurrentInput()"
            type="text"
            style="border-bottom: 1px solid grey; width: 100%; margin-top: 10px; outline: none;"
          />
        </div>
      </div>
    </div>
  </v-sheet>
</div>
</template>

<script>

  export default {
    name: 'priceAndLocations',
    data: () => ({
      activeBorderColor: '#3A50D5',
      shipping_price: null,
      locations: [],
      newLocation: null,
    }),
    methods: {
      changeInp() {
      // this.$store.commit(mutationTypes.UNSAVED_CHANGE, true);
      },
      setCurrentInput(i) {
        this.currentInput = i;
        this.newLocation = "";
      },
      checkForComma(e) {
        if (!this.newLocation) {
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
          this.newLocation.slice(-1) !== "," ? this.newLocation += "," : ''
          this.capitaliseLocation(this.newLocation)

          this.newLocation = this.newLocation.replace(",", ""),
          this.locations.push(this.newLocation)
          this.$emit('aLocation', this.newLocation)
          this.newLocation = "";
        }
      },
      capitaliseLocation(location) {
        this.newLocation = location.charAt(0).toUpperCase() + location.slice(1);
        return
      },
      deleteLocation(i, j) {
        this.locations = this.locations.map((v, index) => {
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
      emitPrice() {
        this.$emit('price', this.shipping_price)
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
      //     let locations = [];
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
      //       locations.push(obj);
      //     }
      //     this.locations = locations;
      //   } else {
      //     this.locations = [
      //       {
      //         key: "",
      //         values: [],
      //       },
      //     ];
      //   }
      // },
      // locations: {
      //   handler() {
      //     let price_and_locations = {"price": this.shipping_price, "locations": this.locations}
      //     this.$emit('priceAndLocations', price_and_locations)
      //   },
      //   deep: true,
      // }
    },
    created() {
      // if (this.currentItem) {
      //   let locations = [];
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
      //     locations.push(obj);
      //   }
      //   this.locations = locations;
      // } else {
      //   this.locations = [
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

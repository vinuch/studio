<template>
  <!-- The price-location bands are hard coded due to complexity of using vue to make them dynamic. Tracking what bands are being edited on the DOM to make edits, etc make it hard -->
  <div>
    <!-- <v-card-text class="text-left pa-0 pt-5 mt-5">Set delivery fees</v-card-text> -->
    <v-sheet
      v-for="(item, idx) in band.filter((item) => !item.hide)"
      :key="idx"
      outlined
      elevation="0"
      rounded="lg"
      class="mt-2 mb-5 pa-5"
      color="#FDFDFD"
      style="border: 0.5px solid #F3F3F3;"
    >
      <div class="mb-5">
        <v-card-text class="text-left pa-0 mb-1"
          >Type the delivery price to a location</v-card-text
        >
        <v-text-field
          label="Price"
          type="number"
          class="my-5"
          v-model="item.price"
          id="price"
          hide-details="true"
          outlined
          prefix="₦"
        ></v-text-field>
        <div v-if="item.price > 0">
          <v-card-text class="text-left pa-0 mb-1"
            >Type areas that cost
            <span style="font-weight: bold">₦ {{ item.price }}</span> to deliver
            to. Separate each area with a comma or press enter.
          </v-card-text>
          <div class="locations">
            <p
              v-for="(location, i) in item.locations"
              :key="i"
              class="location"
            >
              {{ location }}
              <v-icon small @click="deleteLocation(i, idx)"
                >mdi-delete-outline</v-icon
              >
            </p>
            <input
              v-model="item.newLocation"
              @keyup="checkForComma($event, idx)"
              @focus="setCurrentInput()"
              type="text"
              class="location_input"
            />
          </div>
        </div>
      </div>

      <p class="text-caption text-left" style="color: #FF0000;">
        <button @click="deletePeriod(idx)">Remove</button>
      </p>
    </v-sheet>

    <p
      v-if="band_index <= 8 && band[0].locations.length > 0"
      class="text-left mt-5 pl-5 pointer describe"
      @click="addLocation()"
    >
      + add other areas
    </p>
  </div>
</template>

<script>
import { EventBus } from "@/services/eventBus";

export default {
  props: ["stringify", "defaultShipping"],
  name: "ShippingPrices",
  data: () => ({
    activeBorderColor: "#3A50D5",
    band: [
      { price: "", locations: [], newLocation: "" },
      { price: "", locations: [], newLocation: "", hide: true, isset: false },
      { price: "", locations: [], newLocation: "", hide: true, isset: false },
      { price: "", locations: [], newLocation: "", hide: true, isset: false },
      { price: "", locations: [], newLocation: "", hide: true, isset: false },
      { price: "", locations: [], newLocation: "", hide: true, isset: false },
      { price: "", locations: [], newLocation: "", hide: true, isset: false },
      { price: "", locations: [], newLocation: "", hide: true, isset: false },
      { price: "", locations: [], newLocation: "", hide: true, isset: false },
      { price: "", locations: [], newLocation: "", hide: true, isset: false },
    ],
    band_index: 0,
    locations: [],
  }),
  methods: {
    deletePeriod(idx) {
      this.band.splice(idx, 1);
      this.band.push({
        price: "",
        locations: [],
        newLocation: "",
        hide: true,
        isset: false,
      });
    },
    addLocation() {
      if (this.band[this.band_index].price > 0) {
        if (this.band[this.band_index].locations.length < 1) {
          EventBus.$emit("open_alert", "error", "Enter at least one location");
        } else {
          this.band[this.band_index].isset = true;
          this.band[this.band_index + 1].hide = false;
          this.band_index++;
        }
      } else {
        EventBus.$emit("open_alert", "error", "Enter a price");
      }
      console.log(this.band);
    },
    changeInp() {
      // this.$store.commit(mutationTypes.UNSAVED_CHANGE, true);
    },
    setCurrentInput() {
      this.band[this.band_index].newLocation = "";
    },
    checkForComma(e, i) {
      this.band_index = i;
      if (!this.band[i].newLocation) {
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
        this.band[i].newLocation.slice(-1) !== ","
          ? (this.band[i].newLocation += ",")
          : "";
        this.capitaliseLocation(this.band[i].newLocation);

        (this.band[i].newLocation = this.band[i].newLocation.replace(",", "")),
          this.band[i].locations.push(this.band[i].newLocation);
        this.band[i].newLocation = "";
      }
    },
    capitaliseLocation(location) {
      this.band[this.band_index].newLocation =
        location.charAt(0).toUpperCase() + location.slice(1);
      return;
    },
    deleteLocation(i, idx) {
      this.band[idx].locations.splice(i, 1);
    },
    stringifyLocations() {
      this.band[this.band_index].locations.length > 0
        ? (this.band[this.band_index].isset = true)
        : "";

      var stringified_locations = "";
      for (let i = 0; i < this.band.length; i++) {
        if (this.band[i].isset) {
          stringified_locations += this.band[i].price + ",";
          for (let j = 0; j < this.band[i].locations.length; j++) {
            stringified_locations += this.band[i].locations[j] + ",";
          }
          stringified_locations = stringified_locations.slice(0, -1);
          stringified_locations += ";";
        }
      }
      console.log(stringified_locations);
      this.$emit("getLocations", stringified_locations);
      this.$emit("resetStringify");
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
    stringify() {
      this.stringify ? this.stringifyLocations() : "";
    },
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
  mounted() {
    let bands = [];

    if (
      this.defaultShipping.split(";")[0] !== "pickup" 
      // ||
      // this.defaultShipping
      //   .split(",")[0]
      //   .split(" ")
      //   .join("")
      //   .toLowerCase() !== "pickup"
    ) {
   
      this.defaultShipping
        .split(";")
        .filter((item) => item !== "")
        .forEach((item) => {
          let itemSplit = item.split(",");

          let obj = {
            price: "",
            locations: [],
            newLocation: "",
            hide: true,
            isset: false,
          };
          obj.price = itemSplit.shift();
          obj.locations = itemSplit[0] != 0 ? itemSplit : [];
          obj.hide = false;
          obj.isset = true;

          bands.push(obj);
        });

      this.band_index = bands.length - 1;
      let remainder = 10 - bands.length;
      for (let index = 0; index < remainder; index++) {
        bands.push({
          price: "",
          locations: [],
          newLocation: "",
          hide: true,
          isset: false,
        });
      }

      this.band = bands;
    }
  },
 
};
</script>

<style scoped>
@import "../assets/styles/_variables.scss";

.locations {
  border: 1px solid var(--primary);
  border-radius: 8px;
  padding: 16px;
  text-align: left;
}
.location {
  display: inline-block;
  border: 1px solid var(--primary);
  padding: 5px;
  margin: 0 5px 5px 0;
  border-radius: 8px;
}
.location_input {
  border-bottom: 1px solid var(--primary);
  width: 100%;
  margin-top: 10px;
  outline: none;
}
.describe {
  font-size: 14px;
  text-align: left;
  color: var(--primary) !important;
  margin-bottom: 0;
}
</style>

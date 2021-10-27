<template>
<!-- The price-location bands are hard coded due to complexity of using vue to make them dynamic. Tracking what bands are being edited on the DOM to make edits, etc make it hard -->
<div>
  <!-- <v-card-text class="text-left pa-0 pt-5 mt-5">Set delivery fees</v-card-text> -->
  <v-sheet
    outlined
    elevation="0"
    rounded="lg"
    class="mt-2 mb-5 pa-5"
    color="bg_grey"
  >
    <div class="mb-5">
      <v-card-text class="text-left pa-0 mb-1">Type the delivery price to a location</v-card-text>
      <v-text-field class="mb-5" v-model="band[0].price" hide-details="true" outlined prepend-inner-icon="mdi-cash"></v-text-field>
      <div v-if="band[0].price > 0">
        <v-card-text 
          class="text-left pa-0 mb-1">Type areas that cost <span style="font-weight: bold">{{ band[0].price }}</span> to deliver to. Separate each area with a comma or press enter.
        </v-card-text>
        <div class="locations">
          <p v-for="(location, i) in band[0].locations" :key="i" class="location">
            {{location}} <v-icon small @click="deleteLocation(i)">mdi-delete-outline</v-icon>
          </p>
          <input v-model="band[0].newLocation" @keyup="checkForComma($event, 0)" @focus="setCurrentInput()" type="text" class="location_input" />
        </div>
      </div>
    </div>

    <div class="mb-5" v-if="band[1].hide==false">
      <v-divider class="mb-5"></v-divider>
      <v-text-field class="mb-5" v-model="band[1].price" placeholder="Price" hide-details="true" outlined></v-text-field>
      <div v-if="band[1].price > 0">
        <div class="locations">
          <p v-for="(location, i) in band[1].locations" :key="i" class="location">
            {{location}} <v-icon small @click="deleteLocation(i)">mdi-delete-outline</v-icon>
          </p>
          <input v-model="band[1].newLocation" @keyup="checkForComma($event, 1)" @focus="setCurrentInput()" type="text" class="location_input" />
        </div>
      </div>
    </div>

    <div class="mb-5" v-if="band[2].hide==false">
      <v-divider class="mb-5"></v-divider>
      <v-text-field class="mb-5" v-model="band[2].price" placeholder="Price" hide-details="true" outlined></v-text-field>
      <div v-if="band[2].price > 0">
        <div class="locations">
          <p v-for="(location, i) in band[2].locations" :key="i" class="location">
            {{location}} <v-icon small @click="deleteLocation(i)">mdi-delete-outline</v-icon>
          </p>
          <input v-model="band[2].newLocation" @keyup="checkForComma($event, 2)" @focus="setCurrentInput()" type="text" class="location_input" />
        </div>
      </div>
    </div>

    <div class="mb-5" v-if="band[3].hide==false">
      <v-divider class="mb-5"></v-divider>
      <v-text-field class="mb-5" v-model="band[3].price" placeholder="Price" hide-details="true" outlined></v-text-field>
      <div v-if="band[3].price > 0">
        <div class="locations">
          <p v-for="(location, i) in band[3].locations" :key="i" class="location">
            {{location}} <v-icon small @click="deleteLocation(i)">mdi-delete-outline</v-icon>
          </p>
          <input v-model="band[3].newLocation" @keyup="checkForComma($event, 3)" @focus="setCurrentInput()" type="text" class="location_input" />
        </div>
      </div>
    </div>

    <div class="mb-5" v-if="band[4].hide==false">
      <v-divider class="mb-5"></v-divider>
      <v-text-field class="mb-5" v-model="band[4].price" placeholder="Price" hide-details="true" outlined></v-text-field>
      <div v-if="band[4].price > 0">
        <div class="locations">
          <p v-for="(location, i) in band[4].locations" :key="i" class="location">
            {{location}} <v-icon small @click="deleteLocation(i)">mdi-delete-outline</v-icon>
          </p>
          <input v-model="band[4].newLocation" @keyup="checkForComma($event, 4)" @focus="setCurrentInput()" type="text" class="location_input" />
        </div>
      </div>
    </div>

    <div class="mb-5" v-if="band[5].hide==false">
      <v-divider class="mb-5"></v-divider>
      <v-text-field class="mb-5" v-model="band[5].price" placeholder="Price" hide-details="true" outlined></v-text-field>
      <div v-if="band[5].price > 0">
        <div class="locations">
          <p v-for="(location, i) in band[5].locations" :key="i" class="location">
            {{location}} <v-icon small @click="deleteLocation(i)">mdi-delete-outline</v-icon>
          </p>
          <input v-model="band[5].newLocation" @keyup="checkForComma($event, 5)" @focus="setCurrentInput()" type="text" class="location_input" />
        </div>
      </div>
    </div>

    <div class="mb-5" v-if="band[6].hide==false">
      <v-divider class="mb-5"></v-divider>
      <v-text-field class="mb-5" v-model="band[6].price" placeholder="Price" hide-details="true" outlined></v-text-field>
      <div v-if="band[6].price > 0">
        <div class="locations">
          <p v-for="(location, i) in band[6].locations" :key="i" class="location">
            {{location}} <v-icon small @click="deleteLocation(i)">mdi-delete-outline</v-icon>
          </p>
          <input v-model="band[6].newLocation" @keyup="checkForComma($event, 6)" @focus="setCurrentInput()" type="text" class="location_input" />
        </div>
      </div>
    </div>

    <div class="mb-5" v-if="band[7].hide==false">
      <v-divider class="mb-5"></v-divider>
      <v-text-field class="mb-5" v-model="band[7].price" placeholder="Price" hide-details="true" outlined></v-text-field>
      <div v-if="band[7].price > 0">
        <div class="locations">
          <p v-for="(location, i) in band[7].locations" :key="i" class="location">
            {{location}} <v-icon small @click="deleteLocation(i)">mdi-delete-outline</v-icon>
          </p>
          <input v-model="band[7].newLocation" @keyup="checkForComma($event, 7)" @focus="setCurrentInput()" type="text" class="location_input" />
        </div>
      </div>
    </div>

    <div class="mb-5" v-if="band[8].hide==false">
      <v-divider class="mb-5"></v-divider>
      <v-text-field class="mb-5" v-model="band[8].price" placeholder="Price" hide-details="true" outlined></v-text-field>
      <div v-if="band[8].price > 0">
        <div class="locations">
          <p v-for="(location, i) in band[8].locations" :key="i" class="location">
            {{location}} <v-icon small @click="deleteLocation(i)">mdi-delete-outline</v-icon>
          </p>
          <input v-model="band[8].newLocation" @keyup="checkForComma($event, 8)" @focus="setCurrentInput()" type="text" class="location_input" />
        </div>
      </div>
    </div>

    <div class="mb-5" v-if="band[9].hide==false">
      <v-divider class="mb-5"></v-divider>
      <v-text-field class="mb-5" v-model="band[9].price" placeholder="Price" hide-details="true" outlined></v-text-field>
      <div v-if="band[9].price > 0">
        <div class="locations">
          <p v-for="(location, i) in band[9].locations" :key="i" class="location">
            {{location}} <v-icon small @click="deleteLocation(i)">mdi-delete-outline</v-icon>
          </p>
          <input v-model="band[9].newLocation" @keyup="checkForComma($event, 9)" @focus="setCurrentInput()" type="text" class="location_input" />
        </div>
      </div>
    </div>
  </v-sheet>

  <p
    v-if="band_index <= 8"
    class="text-left mt-5 pl-5 blue_link pointer describe"
    style="color: blue"
    @click="addLocation()"
  >
    <span v-if="band[0].locations.length > 0">+ add other areas</span>
  </p>
</div>
</template>

<script>
import { EventBus } from '@/services/eventBus'

  export default {
    props: [
      "stringify",
    ],
    name: 'ShippingPrices',
    data: () => ({
      activeBorderColor: '#3A50D5',
      band: [
        {"price": "", "locations": [], newLocation: ""},
        {"price": "", "locations": [], newLocation: "", hide: true, isset: false},
        {"price": "", "locations": [], newLocation: "", hide: true, isset: false},
        {"price": "", "locations": [], newLocation: "", hide: true, isset: false},
        {"price": "", "locations": [], newLocation: "", hide: true, isset: false},
        {"price": "", "locations": [], newLocation: "", hide: true, isset: false},
        {"price": "", "locations": [], newLocation: "", hide: true, isset: false},
        {"price": "", "locations": [], newLocation: "", hide: true, isset: false},
        {"price": "", "locations": [], newLocation: "", hide: true, isset: false},
        {"price": "", "locations": [], newLocation: "", hide: true, isset: false},
      ],
      band_index: 0,
      locations: [],
    }),
    methods: {
      addLocation() {
        if (this.band[this.band_index].price > 0) {
          this.band[this.band_index].locations.length < 1 ?
            EventBus.$emit("open_alert", "error", "Enter at least one location") :
            this.band[this.band_index].isset = true
            this.band[this.band_index + 1].hide = false
            this.band_index ++ 
        } else {
          EventBus.$emit("open_alert", "error", "Enter a price") 
        }
      },
      changeInp() {
      // this.$store.commit(mutationTypes.UNSAVED_CHANGE, true);
      },
      setCurrentInput() {
        this.band[this.band_index].newLocation = "";
      },
      checkForComma(e, i) {
        this.band_index = i
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
          this.band[i].newLocation.slice(-1) !== "," ? this.band[i].newLocation += "," : ''
          this.capitaliseLocation(this.band[i].newLocation)

          this.band[i].newLocation = this.band[i].newLocation.replace(",", ""),
          this.band[i].locations.push(this.band[i].newLocation)
          this.band[i].newLocation = "";
        }
      },
      capitaliseLocation(location) {
        this.band[this.band_index].newLocation = location.charAt(0).toUpperCase() + location.slice(1);
        return
      },
      deleteLocation(i) {
        this.band[this.band_index].locations.splice(i, 1)
      },
      stringifyLocations() {
        this.band[this.band_index].locations.length > 0 ?
          this.band[this.band_index].isset = true : ""

        var stringified_locations = ""
        for (let i=0; i < this.band.length; i++) {
          if (this.band[i].isset) {
            stringified_locations += this.band[i].price + ","
            for (let j=0; j < this.band[i].locations.length; j++) {
              stringified_locations += this.band[i].locations[j] + ","
            }
            stringified_locations = stringified_locations.slice(0, -1)
            stringified_locations += ";"
          }
        }
        this.$emit("getLocations", stringified_locations)
        this.$emit("resetStringify")
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
        this.stringify ? this.stringifyLocations() : ""
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
  .locations {
    border: 1px solid blue;
    border-radius: 8px;
    padding: 16px;
    text-align: left;
  }
  .location {
    display: inline-block;
    border: 1px solid grey;
    padding: 5px;
    margin: 0 5px 5px 0;
    border-radius: 8px;
  }
  .location_input {
    border-bottom: 1px solid grey;
    width: 100%;
    margin-top: 10px;
    outline: none;
  }
  .describe {
    font-size: 14px;
    text-align: left;
    color: #848b91;
    margin-bottom: 0;
  }
</style>

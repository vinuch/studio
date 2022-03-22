<template>
  <div class="rounded-xl">
    <v-card class="elevation-0 overflow-hidden">
      <div style="padding: 16px;">
        <v-card-title class="title justify-center pb-2">
          Shipping
        </v-card-title>
        <v-card-text class="pa-0">
          Create your store fulfillment plan.
        </v-card-text>

        <v-card-text class="text-left pa-0 mt-5"
          >How will your customers get their products?</v-card-text
        >
        <!-- <v-sheet class="mb-4"> -->
        <ul class="del_ops">
          <li
            @click="setDeliveryOption('pickup')"
            :style="
              delivery_opt == 'pickup' ? { borderColor: activeBorderColor } : ''
            "
          >
            <!-- <v-icon class="">mdi-store-outline</v-icon> -->
            <img src="../assets/pickup.png" alt="" />
            <p>Pickup</p>
          </li>
          <li
            @click="setDeliveryOption('delivery')"
            :style="
              delivery_opt == 'delivery'
                ? { borderColor: activeBorderColor }
                : ''
            "
          >
            <!-- <v-icon class="">mdi-moped-outline</v-icon> -->
            <img src="../assets/delivery.png" alt="" />

            <p>Delivery</p>
          </li>
          <li
            @click="setDeliveryOption('both')"
            :style="
              delivery_opt == 'both' ? { borderColor: activeBorderColor } : ''
            "
            style="margin-right: 0; position: relative;"
          >
            <img src="../assets/bike.png" alt="" />

            <p>Both</p>
          </li>
        </ul>
        <!-- </v-sheet> -->

        <div v-if="delivery_opt == 'pickup' || delivery_opt == 'both'">
          <v-card-text class="text-left pa-0 pt-5 mt-5">
            Enter your pick-up address
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on"
                  >mdi-help-circle-outline
                </v-icon>
              </template>
              <span
                >What address should your customers go to pick up their
                products?</span
              >
            </v-tooltip>
          </v-card-text>

          <v-sheet
            elevation="0"
            rounded="lg"
            color="bg_grey"
            class="mt-2 mb-5 pa-5 "
          >
            <div
              class="my-5"
              v-for="location in locations"
              :key="location.state"
            >
              <v-card-text class="text-left pa-0 my-3">State</v-card-text>
              <v-select
                dense
                single-line
                hide-details="true"
                v-model="location.state"
                outlined
                item-text="type"
                :items="NaijaStates.states()"
                item-color="success"
                background-color="grey lighten-5"
                @change="changer"
              ></v-select>

              <template v-if="location.state">
                <v-card-text class="text-left pa-0 my-3"
                  >Area / Local Govt</v-card-text
                >
                <v-select
                  dense
                  
                  single-line
                  hide-details="true"
                  v-model="location.lga"
                  outlined
                  item-text="type"
                  :items="NaijaStates.lgas(location.state).lgas"
                  item-color="success"
                  background-color="grey lighten-5"
                ></v-select>
                <v-card-text class="text-left pa-0 my-3">Street</v-card-text>
                <v-text-field type="text" v-model="location.street" outlined>
                </v-text-field>
              </template>
              <!-- <p class="delete text-left my-3">
                <v-icon class="delete">
                  mdi-delete-outline
                </v-icon>
                Remove
              </p> -->
            </div>

            <!-- <p
              class="text-left text-primary my-5 pointer describe"
              style="c"
              @click="locations.push({ state: '', lga: '' })"
            >
              + Add more location
            </p> -->
          </v-sheet>
        </div>

        <div v-if="delivery_opt != 'pickup'">
          <v-card-text class="text-left pa-0 pt-5 mt-5"
            >What delivery service will you use?</v-card-text
          >
          <div
            class="my-4 pa-4"
            style="text-align: left; color: #69747E; font-weight: 600; display: flex; justify-content: space-between; align-items: flex-start;border: 0.5px solid #E5E9F2;border-radius: 8px;"
          >
            <div v-if="shipping_mode_in_house">
              In-house
              <p class="caption">I have a way of getting orders to customers</p>
            </div>
            <div v-else>
              Third-party
              <p class="caption">
                Use our delivery partners to get order to your customer
              </p>
            </div>
            <span class="switch">
              <v-switch
                class=" mt-0 pt-0"
                style="position: relative; right: -12px;"
                id="switch"
                v-model="shipping_mode_in_house"
                inset
              >
              </v-switch>
            </span>
            <!-- <div style="text-align: right;">
             Help me deliver
              <p class="caption">Let us handle shipping for you</p>
            </div> -->
          </div>
          <!-- <v-sheet
            :style="shipping_mode == 'in_house' ? {borderColor: activeBorderColor} : ''"
            outlined
            elevation="0"
            rounded="lg"
            class="mt-2 mb-5 pa-5 pt-0"
          >
            <v-checkbox
              v-model="shipping_mode"  
              label="In House"
              value="in_house"
            >
            </v-checkbox>
            <v-card-text class="describe hint pt-0 pb-0">I have a way of getting orders to customers</v-card-text>
          </v-sheet>
          <v-sheet
            :style="shipping_mode == 'third_party' ? {borderColor: activeBorderColor} : ''"
            outlined
            elevation="0"
            rounded="lg"
            class="mt-2 mb-5 pa-5 pt-0"
          >
            <v-checkbox
              v-model="shipping_mode"  
              label="Third party"
              value="third_party"
            >
            </v-checkbox>
            <v-card-text class="describe hint pt-0 pb-0">Use our shipping partners</v-card-text>
          </v-sheet> -->
        </div>

        <div v-if="shipping_mode_in_house && delivery_opt != 'pickup'">
          <v-card-text class="text-left pa-0 pt-5 mt-5"
            >Set delivery fees for different locations</v-card-text
          >
          <ShippingPrices
            @getLocations="saveLocations($event)"
            @resetStringify="resetStringify()"
            :stringify="stringify"
            :defaultShipping="store.default_shipping"
          />
        </div>
      </div>
      <setupFooter @saveSetUp="stringifyLocations()" :modal="modal">
        Save Shipping
      </setupFooter>
    </v-card>
  </div>
</template>

<script>
import NaijaStates from "naija-state-local-government";

import { updateStore } from "@/services/apiServices";
import * as mutationTypes from "@/store/mutationTypes";
import { mapGetters } from "vuex";
import { EventBus } from "@/services/eventBus";

import setupFooter from "@/components/setupFooter";
import ShippingPrices from "@/components/ShippingPrices";

export default {
  name: "Shipping",
  props: ["modal"],
  components: {
    setupFooter,
    ShippingPrices,
  },
  data: () => ({
    NaijaStates,
    activeBorderColor: "#3A50D5",
    delivery_opt: "delivery",
    shipping_mode: "in_house",
    stringify: false,
    shipping_mode_in_house: false,
    locations: [{ state: "", lga: "", street: "" }],
  }),
  methods: {
    changer() {
      // console.log(this.state);
    },
    resetStringify() {
      this.stringify = false;
    },
    saveLocations(locations) {
      let data = {
        default_shipping: locations,
      };
      updateStore(data, this.store.id)
        .then((res) => {
          let store = res.data;
          this.$store.commit(mutationTypes.SAVE_STORE, store);
          this.feedback = true;
          EventBus.$emit("open_alert", "success", "Shipping details updated");
          if (this.modal) {
            this.$router.go(0);
          }
        })
        .catch((err) => {
          EventBus.$emit(
            "settings_feedback",
            "error",
            "Error creating shipping locations" + err
          );
        })
        .finally(() => {});
      this.stringify = false;
    },
    setDeliveryOption(option) {
      this.delivery_opt = option;
    },
    stringifyLocations() {
      if (this.delivery_opt === "pickup") {
        let stringifiedLocations = "pickup;";
        this.locations.forEach((location) => {
          stringifiedLocations +=
            location.state + "," + location.lga + ";" + location.street + ";";
        });

        this.saveLocations(stringifiedLocations);
      } else {
        this.stringify = true;
      }
    },
  },
  computed: {
    ...mapGetters({
      store: "getStore",
    }),
  },
  mounted() {
    this.store.default_shipping
      ? (this.shipping_mode_in_house = true)
      : (this.shipping_mode_in_house = false);

    this.delivery_opt =
      this.store.default_shipping
        .split(",")[0]
        .split(" ")
        .join("")
        .toLowerCase() === "pickup"
        ? "pickup"
        : this.store.default_shipping.split(";")[0] === "pickup"
        ? "pickup"
        : "delivery";

    console.log(this.delivery_opt);

    if (this.store.default_shipping.split(",")[1] == "0") {
      return;
    }

    if (this.delivery_opt == "pickup") {
      let locations = this.store.default_shipping
        ?.split(";")
        .filter((item) => item !== "");

      if (locations) {
        console.log(locations);
        let computedLocations = [];
        let locationSplit = locations[1].split(",");
        let obj = {
          state: locationSplit[0],
          lga: locationSplit[1],
          street: locations[2],
        };
        computedLocations.push(obj);

        this.locations = computedLocations;
      }
    }
    // console.log(NaijaStates.lgas("lagos", "abia"));
  },
};
</script>

<style scoped>
.delete {
  color: red;
  cursor: pointer;
}
ul {
  /* margin: 0; */
  margin-top: 5px;
  padding: 0;
  height: 100%;
}
.del_ops {
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
}
.del_ops li {
  display: inline-block;
  list-style-type: none;
  text-align: left;
  font-size: 14px;
  color: #848b91;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  width: 85px;
  padding: 15px;
  /* height: 100%; */
  cursor: pointer;
}
.del_ops li p {
  margin-bottom: 0;
  line-height: normal;
  text-align: center;
}
.del_ops i {
  display: flex;
}
.describe {
  font-size: 14px;
  text-align: left;
  color: #848b91;
  margin-bottom: 0;
}
.hint {
  margin-top: -20px;
  padding-left: 32px;
}
.sel {
  /* background: orange;
    .v-sheet--outlined {
      border-color: blue;
    } */
}
</style>

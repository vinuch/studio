<template>
<div>
  <v-card class="rounded-xl">
    <div style="padding: 16px;">
      <v-card-title class="title justify-center pb-2">
      Shipping
      </v-card-title>
      <v-card-text class="pa-0">
        Create your store fulfillment plan.
      </v-card-text>

      <v-card-text class="text-left pa-0 mt-5">How will your customers get their products?</v-card-text>
      <v-sheet>
        <ul class="del_ops">
          <li
            @click="setDeliveryOption('pick_up')"
            :style="delivery_opt == 'pick_up' ? {borderColor: activeBorderColor} : ''"
          >
            <v-icon class="">mdi-store-outline</v-icon>
            <p>Pick up only</p>
          </li>
           <li
            @click="setDeliveryOption('delivery')"
            :style="delivery_opt == 'delivery' ? {borderColor: activeBorderColor} : ''"
          >
            <v-icon class="">mdi-truck-delivery-outline</v-icon>
            <p>Delivery only</p>
          </li>
          <li
            @click="setDeliveryOption('both')"
            :style="delivery_opt == 'both' ? {borderColor: activeBorderColor} : ''"
            style="margin-right: 0; position: relative; top: -23px"
          >
            <p style="padding-top: 17px;">Both</p>
          </li>
        </ul>
      </v-sheet>

      <div v-if="delivery_opt == 'pick_up'">
        <v-card-text class="text-left pa-0 pt-5 mt-5">
          Enter your pick-up address
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
              >mdi-help-circle-outline
              </v-icon>
            </template>
            <span>What address should your customers go to pick up their products?</span>
          </v-tooltip>
        </v-card-text>
        
        <v-sheet
          elevation="0"
          rounded="lg"
          color="bg_grey"
          class="mt-2 mb-5 pa-5 pb-0"
        >
          <div>
            <v-card-text class="text-left pa-0 mb-1">State</v-card-text>
            <v-text-field outlined prepend-inner-icon="mdi-map-marker-outline"></v-text-field>
            <v-card-text class="text-left pa-0 mb-1">Area / Local Govt</v-card-text>
            <v-text-field outlined prepend-inner-icon="mdi-map-marker-outline">
            </v-text-field>
          </div>
        </v-sheet>
      </div>

      <div v-if="delivery_opt != 'pick_up'">
        <v-card-text class="text-left pa-0 pt-5 mt-5">What delivery service will you use?</v-card-text>
        <v-sheet
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
        </v-sheet>
      </div>

      <div v-if="shipping_mode == 'in_house' && delivery_opt != 'pick_up'">
        <v-card-text class="text-left pa-0 pt-5 mt-5">Set delivery fees</v-card-text>
        <v-sheet
          :style="shipping_mode == 'in_house' ? {borderColor: activeBorderColor} : ''"
          outlined
          elevation="0"
          rounded="lg"
          class="mt-2 pa-5"
          color="bg_grey"
        >
          <div>
            <v-card-text class="text-left pa-0 mb-1">Price</v-card-text>
            <v-text-field
              class="mb-5"
              v-model="shipping_price"
              hide-details="true"
              outlined prepend-inner-icon="mdi-cash"></v-text-field
            >
            <v-card-text
              v-if="this.shipping_price == null"
              class="text-left pa-0 mb-1">Area / shipping destination
            </v-card-text>
            <v-card-text 
              v-else 
              class="text-left pa-0 mb-1">List areas that cost <span style="font-weight: bold">{{this.shipping_price}}</span> to deliver to. Separate each area with a comma or press enter.
            </v-card-text>
            <v-text-field
              outlined
              prepend-inner-icon="mdi-map-marker-outline"
              hide-details="true"
            >
            </v-text-field>
          </div>
        </v-sheet>
      </div>

    </div>
    <setupFooter />
  </v-card>
</div>
</template>

<script>
  import setupFooter from '@/components/setupFooter'

  export default {
    name: 'SetShipping',
    components: {
      setupFooter,
    },
    data: () => ({
      activeBorderColor: '#3A50D5',
      delivery_opt: "delivery",
      shipping_mode: null,
      shipping_price: null,
    }),
    methods: {
      setDeliveryOption(option) {
        this.delivery_opt = option
      },
    },
    computed: {
    }
  }
</script>

<style scoped>
  ul {
    /* margin: 0; */
    margin-top: 5px;
    padding: 0;
    height: 86px;
  }
  .del_ops li {
    display: inline-block;
    list-style-type: none;
    text-align: left;
    font-size: 14px;
    color: #848b91;
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    width: 85px;
    margin-right: 20px;
    padding: 15px;
    height: 100%;
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
    background: orange;
    .v-sheet--outlined {
      border-color: blue;
    }
  }
</style>

<template>
  <div class="address-form">
    <FloatingLabel
      :config="{
        label: 'Name',
        ...floatingConfig,
        hasContent: true,
      }"
    >
      <input v-model="delivery_details.full_name" name="Name" />
    </FloatingLabel>
    <FloatingLabel
      :config="{
        label: 'Email address',
        ...floatingConfig,
        hasContent: true,
      }"
    >
      <input v-model="delivery_details.email" name="email" />
    </FloatingLabel>
    <FloatingLabel
      :config="{
        label: 'Phone no.',
        ...floatingConfig,
        hasContent: true,
      }"
    >
      <input
        v-model.trim="delivery_details.phone"
        maxlength="11"
        pattern="[0-9]*"
        inputmode="numeric"
        name="phone"
        @keypress="numberOnly($event)"
      />
    </FloatingLabel>
    <FloatingLabel
      :config="{
        label: 'Delivery address',
        ...floatingConfig,
        hasContent: true,
      }"
    >
      <input v-model="delivery_details.address" name="address" />
    </FloatingLabel>

    <!-- {{zones}} -->
    <FloatingLabel
      :config="{
        label: 'Select shipping area',
        ...floatingConfig,
        hasContent: true,
      }"
    >
    <!-- {{zones}} -->
      <select
        style="width: 100%;
          height: 100%;
          border: 0;
          background: transparent;
          padding-top: 10px !important;"
        v-model="city"
        name="shipping"
      >

        <option v-for="zone in zones" :key="zone.zone" :value="zone">
          {{ zone.zone }}
        </option>
      </select>
    </FloatingLabel>
    <Checkout
      :address="true"
      :shipping="city.price"
      :city="city.zone"
      @submit="saveOrderHandler()"
    />
  </div>
</template>
<script>
import FloatingLabel from "vue-simple-floating-labels";
import numeral from "numeral";
import numberOnly from "@/mixins/mixins";
import Checkout from "@/components/Checkout";
import { mapGetters } from "vuex";
import { saveOrder, createOrder } from "@/services/apiServices";
import * as mutationTypes from "@/store/mutationTypes";
import { EventBus } from "@/services/eventBus";
export default {
  components: {
    FloatingLabel,
    Checkout,
  },
  mixins: [numberOnly],
  data() {
    return {
      loading: false,
      delivery_details: {
        full_name: "",
        email: "",
        phone: "",
        address: "",
      },
      plate: "yes",
      orderID: "",
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
      city: {
        zone: "",
        price: 0,
      },
    };
  },
  computed: {
    ...mapGetters({
      cart: "getCart",
      cart_meta: "getCartMeta",
      storeInfo: "getStoreInfo",
      settlement: "getStoreSettlement",
    }),
     preshipTotal() {
      // console.log(this.cart)
      return this.cart.reduce((prev, current) => prev +( current?.count * current?.price), 0)
    },
    zones() {
      // console.log(this.storeInfo.default_shipping)

      let zone = this.storeInfo.default_shipping
        .split(";")
        .filter((item) => item !== "");
      let zones = [];

      if (zone[0] == "pickup") {
        zones = [{ zone: zone.join(" "), price: 0 }];
      } else {
        for (let i = 0; i < zone.length; i++) {
          let splitZone = zone[i].split(",");
          let price = Number(splitZone[0]);
          let others = splitZone.slice(1);

          others.forEach((element) => {
            let object = {};

            object["zone"] = element;
            object["price"] = price;
            zones.push(object);
          });
        }
      }

      console.log("hi", zones, this.storeInfo.default_shipping);

      return zones;
    },
    cartItems() {
      return this.cart;
    },
    order() {
      return this.cartItems.map((item, i) => {
        var order_item = {};
        order_item.index = i + 1;
        order_item.order = this.orderID;
        order_item.product = item.id;
        order_item.selected_option1 = item.selected_option;
        order_item.selected_option2 = item.selected_option2;
        order_item.qty = item.count;
        order_item.productid = item.id;
        order_item.sub_total = this.numeral(item.price * item.count).format("0,0");
        order_item.image_url = item.product_image;
        return order_item;
      });
    },
  },
  methods: {
    numeral,
    createOrderID() {
      var ref_type = "1"; // '1' for purchase by merchnat's customer
      var rand_int = Math.floor(Math.random() * 9999) + 1000;
      const today = new Date();
      var year = today
        .getFullYear()
        .toString()
        .slice(-2);
      var store_id = this.storeInfo.id.toString(); // this allows for up to 9999 stores merchants
      // var customer_id = '0000' // 0 for anonymous
      var month = (today.getMonth() + 1).toString(); // cause month is 0 indexed
      var day = today.getDate().toString();
      var cart_count = this.cartItems.length.toString();
      var hour = today.getHours().toString();
      var minute = today.getMinutes().toString();
      var second = today.getSeconds().toString();
      if (hour.length == 1) {
        hour = "0" + hour;
      }
      if (minute.length == 1) {
        minute = "0" + minute;
      }
      if (second.length == 1) {
        second = "0" + second;
      }
      if (month.length == 1) {
        month = "0" + month;
      }
      if (day.length == 1) {
        day = "0" + day;
      }
      if (cart_count.length == 1) {
        cart_count = "0" + cart_count;
      }
      if (store_id.length == 1) {
        store_id = "000" + store_id;
      }
      if (store_id.length == 2) {
        store_id = "00" + store_id;
      }
      if (store_id.length == 3) {
        store_id = "0" + store_id;
      }
      // this.orderID = store_id + month + day + cart_count + hour + minute + customer_id + year
      this.orderID =
        ref_type + store_id + month + day + cart_count + year + rand_int;
    },
    saveOrderHandler() {
      this.createOrderID();
      let data = {
        address: this.delivery_details.address,
        email: this.delivery_details.email,
        full_name: this.delivery_details.full_name,
        items_count: this.cart.length,
        total_amount:
          this.numeral(this.preshipTotal + this.city.price).format("0,0"),
        unique_items: this.cart.length,
        order_ref: this.orderID,
        phone: this.delivery_details.phone,
        city: this.city.zone,
        products_total: this.numeral(this.preshipTotal).format("0,0"),
        shipping: this.numeral(this.city.price).format("0,0") || 0,
        store: this.storeInfo.id,
      };
      // console.log(this.cartItems)
      if (Object.values(data).includes("")) {
        EventBus.$emit("open_alert", "error", "Please fill in all fields");
        return;
      }
      this.loading = true;
      saveOrder(data)
        .then(() => {
          this.createOrderItems();
        })
        .catch(() => {
          this.loading = false;
          EventBus.$emit(
            "open_alert",
            "error",
            "An error occured. Please try again"
          );
        });
    },
    createOrderItems() {
      // console.log(this.cart_meta.preShipTotal , this.city , 100)
      createOrder(this.order)
        .then(() => {
          this.payWithPaystack();
        })
        .catch((err) => {
          console.log(err);
          EventBus.$emit(
            "open_alert",
            "error",
            "Error @ Paystack or CreateOrder"
          );
        })
        .finally(() => (this.loading = false));
    },
    /* eslint-disable */
    payWithPaystack() {
      var handler = PaystackPop.setup({
        key: this.settlement.paystack_public_key,
        email: this.delivery_details.email,
        amount:
          (parseFloat(this.preshipTotal) +
            (parseFloat(this.city.price) || 0)) *
          100,
        currency: "NGN",
        ref: this.orderID,
        metadata: {
          custom_fields: [
            {
              store: this.storeInfo.id, // This is important for payment verification
            },
          ],
        },
        subaccount: this.settlement.subaccount,
        callback: (response) => {
          this.$store.commit(mutationTypes.SAVE_CART, []);
          this.$store.commit(mutationTypes.COMPLETED_ORDER_INFO, {
            email: this.delivery_details.email,
            orderID: this.orderID,
          });
          this.orderID = "";
          // EventBus.$emit("closeDrawer");
          this.$router.push("/confirmation");
        },
        onClose: function() {
          // The items in your store are saved for when you come back. Please refresh to ensure they are still available.
          // Check just before payment that items are available so people don't pay for out-of-stock things.
          // push update to any store that something becomes out of stock
        },
      });
      handler.openIframe();
    },
  },
};
</script>
<style lang="scss" scoped>
.address-form {
  .cart_summary {
    margin-bottom: 25px;
    // width: 100%;
    // padding: 0 15px;
  }

  @media (max-width: 767px) {
    // padding: 15px;
  }
}
</style>

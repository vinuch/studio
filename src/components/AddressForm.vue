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
      <input v-model="delivery_details.phone" name="phone" />
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
    <FloatingLabel
      :config="{
        label: 'Select shipping area',
        ...floatingConfig,
        hasContent: true,
      }"
    >
      <select
        style="width: 100%;
                height: 100%;
                border: 0;
                background: transparent;
                padding-top: 10px !important;"
        v-model="city"
        name="shipping"
      >
        <option v-for="zone in zones" :key="zone.zone" :value="zone">{{
          zone.zone
        }}</option>
      </select>
    </FloatingLabel>
    <div class="grey-fields">
      <p>
        <span class="info"> Sub total ({{ this.cart.length }} items) </span>
        <span class="price utm"> ₦{{ numeral(total).format("0,0") }} </span>
      </p>
      <p>
        <span class="info">
          Delivery fee
        </span>
        <span class="price utm">
          ₦{{ numeral(city.price).format("0,0") }}
        </span>
      </p>
      <p
        style="border: 0;
              padding: 0;
              margin: 0;"
      >
        <span class="info utm" style="color: #10102C;">
          Total
        </span>
        <span class="price utm" style="color: #10102C;">
          ₦{{
            numeral(parseFloat(total) + parseFloat(city.price)).format("0,0")
          }}
        </span>
      </p>
    </div>
    <a-button
      class="main-btn"
      style="margin-top: 20px; width: 100%; height: 50px"
      @click="saveOrderHandler()"
      :loading="loading"
    >
      Place order
    </a-button>
  </div>
</template>
<script>
import FloatingLabel from "vue-simple-floating-labels";
import numeral from "numeral";
import { mapGetters } from "vuex";
import { saveOrder, createOrder } from "../services/apiServices";
import * as mutationTypes from "../store/mutationTypes";
import { EventBus } from "../services/eventBus";
export default {
  data() {
    return {
      loading: false,
      delivery_details: {
        full_name: "",
        email: "",
        phone: "",
        address: "",
      },
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
  components: {
    FloatingLabel,
  },
  computed: {
    ...mapGetters({
      cart: "getVisitorCart",
      storeItems: "getVisitorStore",
      storeInfo: "getVisitedStoreInfo",
    }),
    zones() {
      let zones = this.storeInfo.default_shipping
        ? this.storeInfo.default_shipping.split(",")
        : [];
      let zones_ = zones
        .map((zone, i) => {
          let obj = {};
          if (i % 2 === 0) {
            obj = {
              zone,
              price: zones[i + 1],
            };
            return obj;
          } else {
            return null;
          }
        })
        .filter((zone) => zone);
      return zones_;
    },
    cartItems() {
      return this.cart;
    },
    total() {
      return this.cartItems.reduce((agg, curr) => {
        agg += curr.qty_requested * curr.price;
        return agg;
      }, 0);
    },
    order() {
      return this.cartItems.map((item, i) => {
        var order_item = {};
        order_item.index = i + 1;
        order_item.order = this.orderID;
        order_item.product = item.id;
        order_item.selected_option1 = item.picked_variant_value[0];
        order_item.selected_option2 = item.picked_variant_value[1];
        order_item.qty = item.qty_requested;
        order_item.productid = item.id;
        order_item.sub_total = this.numeral(
          parseFloat(item.price) * parseFloat(item.qty_requested)
        ).format("0,0");
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
    // createOrder() {},
    saveOrderHandler() {
      this.createOrderID();
      let data = {
        address: this.delivery_details.address,
        email: this.delivery_details.email,
        full_name: this.delivery_details.full_name,
        items_count: this.cartItems.reduce((agg, curr) => {
          agg += curr.qty_requested;
          return agg;
        }, 0),
        total_amount: parseFloat(this.total) * 100,
        unique_items: this.cartItems.length,
        order_ref: this.orderID,
        phone: this.delivery_details.phone,

        city: this.city.zone,
        products_total: this.numeral(this.total).format("0,0"),
        shipping: this.numeral(this.city.price).format("0,0"),
        store: this.storeInfo.id,
      };
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
      createOrder(this.order)
        .then(() => {
          this.payWithPaystack();
        })
        .catch(() => {
          EventBus.$emit(
            "open_alert",
            "error",
            "An error occured. Please try again"
          );
        })
        .finally(() => (this.loading = false));
    },
    /* eslint-disable */
    payWithPaystack() {
      var handler = PaystackPop.setup({
        key: this.storeInfo.paystack_public_key,
        email: this.delivery_details.email,
        amount: (parseFloat(this.total) + parseFloat(this.city.price)) * 100,
        currency: "NGN",
        ref: this.orderID,
        metadata: {
          custom_fields: [
            {
              store: this.storeInfo.id, // This is important for payment verification
            },
          ],
        },
        callback: (response) => {
          this.$store.commit(mutationTypes.SAVE_VISITOR_CART, []);
          this.$store.commit(mutationTypes.COMPLETED_ORDER_INFO, {
            email: this.delivery_details.email,
            orderID: this.orderID,
          });
          this.orderID = "";
          EventBus.$emit("closeDrawer");
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
  padding: 15px 80px;

  @media (max-width: 767px) {
    padding: 15px;
  }
}
</style>

<template>
  <v-card rounded="lg" outlined class="pa-5 pb-0 mb-4" style="width: 100%">
    <v-sheet elevation="0" class="pb-3" rounded="lg">
      <v-row @click="openCollapse(true)">
        <v-col cols="8" class="pt-0">
          <p class="text-left text-subtitle-1 font-weight-bold mb-0">
            {{ order.full_name }}
            <span
            @click.stop="handleCall(order)"
              class="ml-2"
              style="
                border-radius: 42px;
                padding: 4px 16px;
                background: #e7f7e7;
                color: #069306;
                font-weight: normal;
                font-size: 16px;
              "
              >Call</span
            >
          </p>
          <p class="text-left text-body-2 mb-1">
            <span> </span>
          </p>
          <div
            class="text-left text-primary_dark text-body-2 mb-1"
            style="
              width: 90%;
              color: #445b54;
              
            "
          >
            <p class="caption" style="width: 5rem; whiteSpace: nowrap;">
              # {{ order.order_ref }}
            </p>

            <p class="" style="margin: 0.5rem 0">
              <span>{{ order_date }}</span
              ><sup>{{ ordinal_suffix }}</sup>
              <span> {{ parseInt(order.created.substring(0, 4)) }}</span>
            </p>
          </div>
        </v-col>
        <v-col cols="4" class="pt-0">
          <p class="text-right text-subtitle-1 font-weight-bold mb-0">
            &#8358;{{ order.products_total }}
          </p>
          <p class="text-right text-body-2 mb-0">
            {{ order.fulfilled }}/{{ order.items_count }}
          </p>
        </v-col>
      </v-row>
      <p v-if="orderItems.length" class="text-left text-caption mb-0" style="color: #445b54">
        {{orderItems[0].product_name}}({{orderItems[0].qty}}) {{orderItems.length > 1 ? `& ${orderItems.length - 1} 0ther items` : ''}}
      </p>
    </v-sheet>

    <v-card
      v-if="open"
      class="pa-3 pt-5 pb-3"
      rounded="lg"
      color="#fbfbfb"
      flat
      style="position: relative"
    >
      <v-row>
        <v-col>
          <p class="text-body-2 text-left" style="margin: 0">Products</p>
        </v-col>
        <v-col>
          <p class="text-body-2 text-right" style="color: #4caf50; margin: 0">
            Mark all
          </p>
        </v-col>
      </v-row>
      <v-row
        class=""
        v-for="(orderItem, j) in orderItems"
        :class="j === orderItems.length - 1 ? 'last' : ''"
        :key="'orderItem' + j"
        @click="markAsCompleted(orderItem)"
      >
        <v-col cols="3">
          <v-img
            :src="orderItem.product_image"
            lazy-src="https://picsum.photos/id/11/100/60"
            height="80"
            width="80"
            class="rounded"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
        <v-col cols="6" class="pl-0">
          <p class="text-left text-body-2 mb-2">
            {{ orderItem.product_name }}
          </p>
          <p class="text-left text-body-2 mb-0">
            <span v-if="orderItem.selected_option1">
              Qty: {{ orderItem.qty }}
            </span>
            <!-- {{ orderItem.selected_option1 }} -->

            <span v-if="orderItem.selected_option2">
              {{ orderItem.selected_option2 }})
            </span>
          </p>
        </v-col>
        <v-col cols="3" class="pl-0" style="position: relative">
          <p class="text-right text-body-2 mb-2">
            &#8358;{{ orderItem.sub_total }}
          </p>
          <p v-if="!orderItem.status" style="display: flex; justify-content: end; align-items: center;">
            <span class="caption" style="color: #4caf50; margin-right: 2px"
              >Delivered</span
            >
            <v-checkbox
              class="check_box ma-0 pa-0 veri_check"
              dense
              color="success"
              hide-details=""
            >
            </v-checkbox>
          </p>

          <p
            v-else
            style="display: flex; justify-content: end; align-items: center;"
          >
            <span class="caption" style="color: #4caf50; margin-right: 2px"
              >Delivered</span
            >

            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3333 2H4.66667C3.19391 2 2 3.19391 2 4.66667V11.3333C2 12.8061 3.19391 14 4.66667 14H11.3333C12.8061 14 14 12.8061 14 11.3333V4.66667C14 3.19391 12.8061 2 11.3333 2Z"
                stroke="#67CE67"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6 7.99935L7.5 9.33268L10 6.66602"
                stroke="#67CE67"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </p>
        </v-col>
      </v-row>
      <v-divider class="ma-5 ml-0 mr-0"></v-divider>
      <v-row class="ma-0 mb-0">
        <v-sheet class="pa-3" rounded="lg" color="FFF" width="100%">
          <h5 class="mb-3 text-left">Customer</h5>
          <ul
            class="text-left pl-0 text-body-2"
            style="list-style-type: none; display: block"
          >
            <li class="pb-3">
              <v-icon size="16">$vuetify.icons.profile</v-icon>
              <span class="ml-3">{{ order.full_name }}</span>
              <v-icon style="float: right; font-size: 18px"
                >mdi-content-copy</v-icon
              >
            </li>
            <li class="pb-3">
              <v-icon size="16">$vuetify.icons.message</v-icon>
              <span class="ml-3">{{ order.email }}</span>
              <v-icon style="float: right; font-size: 18px"
                >mdi-content-copy</v-icon
              >
            </li>
            <li class="pb-3">
              <v-icon size="16">$vuetify.icons.phone</v-icon>
              <span class="ml-3">{{ order.phone }}</span>
              <v-icon style="float: right; font-size: 18px"
                >mdi-content-copy</v-icon
              >
            </li>
            <li>
              <v-icon size="16">$vuetify.icons.marker</v-icon>
              <p style=" margin-left: 12px;  display: inline">
                {{ order.address }}
              </p>
              <v-icon style="float: right; font-size: 18px"
                >mdi-content-copy</v-icon
              >
            </li>
          </ul>

          <Button
            :block="true"
            label="Share order info"
            size="default"
            :containerStyle="{ margin: '1.5rem 0' }"
            :primaryLight="true"
          />
        </v-sheet>
      </v-row>
    </v-card>
    <div v-if="open" class="pb-5"></div>
    <!-- serves as spacer -->
  </v-card>
</template>

<script>
import {
  updateOrderStatus,
  fetchOrders,
  fetchOrderItems,
} from "@/services/apiServices";
import Button from "@/components/Button";
import { EventBus } from "@/services/eventBus";
import * as mutationTypes from "@/store/mutationTypes";

export default {
  components: { Button },
  data() {
    return {
      check_all: false,
      fulfilled: false,
      loading: false,
      mark_all: false,
      open: false,
      orderItems: [],
      // orderItems: [
      //   {
      //     product_name: "Unisex shoe",
      //     sub_total: 2000,
      //     qty: 2,
      //     selected_option1: 2,
      //   },
      //   {
      //     product_name: "Unisex shoe",
      //     sub_total: 2000,
      //     qty: 2,
      //     selected_option1: 2,
      //   },
      // ],
    };
  },
  props: ["order"],
  methods: {
    handleCall(order) {
      console.log(order)
      this.openDialog('call_customer', order.phone);
    },
        openDialog(setup, phone) {
      this.$store.commit(mutationTypes.SET_SETTINGS_STATE, false);
      EventBus.$emit("dialog", "open", setup, phone);
    },
    openCollapse() {
      if (this.open) {
        this.open = false;
        return;
      } else if (!this.open && this.orderItems.length) {
        this.open = true;
      } else {
        this.loading = true;
        this.open = true;

        fetchOrderItems(this.order.order_ref)
          .then((res) => {
            this.orderItems = res.data;
          })
          .catch(() => {
            // console.log({ err });
            this.orderItems = [];
          })
          .finally(() => (this.loading = false));
      }
    },
    markAsCompleted(item) {
      if (!item.status) {
        let confirmed = confirm(
          "Confirm that you want to mark the product/item as delivered."
        );
        if (confirmed) {
          updateOrderStatus(item.id, 1)
            .then(() => {
              fetchOrders();
              this.openCollapse(false);
            })
            .catch(() => {
              // console.log(err);
            });
        }
      }
    },
    markAll(items) {
      items.forEach((item) => {
        this.markAsCompleted(item);
      });
    },
  },
  computed: {
    order_date() {
      const ms_per_day = 1000 * 60 * 60 * 24;
      let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const ty = ["Today", "Yesterday"];
      let order_year = parseInt(this.order.created.substring(0, 4));
      let order_month = parseInt(this.order.created.substring(5, 7)) - 1;
      let order_date = parseInt(this.order.created.substring(8, 10));
      const today = new Date();
      const this_day = today.getDay(); // position in week
      const utc1 = Date.UTC(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      const utc2 = Date.UTC(order_year, order_month, order_date);
      let difference = Math.floor((utc1 - utc2) / ms_per_day);
      if (difference > 6) {
        return months[order_month] + " " + order_date;
      } else if (difference > 1) {
        if (this_day - difference < 0) {
          return days[7 + this_day - difference] + " - " + order_date;
        }
        return days[this_day - difference] + " - " + order_date;
      } else {
        return ty[difference] + " - " + order_date;
      }
    },
    ordinal_suffix() {
      let order_date = parseInt(this.order.created.substring(8, 10));
      var j = order_date % 10,
        k = order_date % 100;
      if (j == 1 && k != 11) {
        return "st";
      }
      if (j == 2 && k != 12) {
        return "nd";
      }
      if (j == 3 && k != 13) {
        return "rd";
      }
      return "th";
    },
  },
};
</script>

<style lang="scss" scoped></style>

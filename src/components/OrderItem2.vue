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
            <p
              class="caption"
              style="width: 5rem; whiteSpace: nowrap; margin: 0"
            >
              # {{ order.order_ref }}
            </p>

            <p class="caption" style="margin: 0.5rem 0">
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
          <p class="text-right" v-if="orderItems.length">
            {{ orderItems[0].status ? "fulfilled" : "Pending" }}
          </p>
        </v-col>
      </v-row>
      <p
        v-if="orderItems.length"
        class="text-left caption mb-0"
        style="color: #445b54"
      >
        {{ orderItems[0].product_name }}({{ orderItems[0].qty }})
        {{
          orderItems.length > 1 ? `& ${orderItems.length - 1} 0ther items` : ""
        }}
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
          <p
            class="text-body-2 text-right"
            style="color: #4caf50; margin: 0"
            @click="markAll"
          >
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
          <!-- {{orderItem}} -->
          <v-img
            :src="orderItem.image_url"
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
          <p
            v-if="!orderItem.status"
            style="display: flex; justify-content: end; align-items: center;"
          >
            <span class="caption" style="color: #4caf50; margin-right: 2px"
              >Fulfilled</span
            >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.3333 1H3.66667C2.19391 1 1 2.19391 1 3.66667V10.3333C1 11.8061 2.19391 13 3.66667 13H10.3333C11.8061 13 13 11.8061 13 10.3333V3.66667C13 2.19391 11.8061 1 10.3333 1Z"
                stroke="#CBD5E1"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </p>

          <p
            v-else
            style="display: flex; justify-content: end; align-items: center;"
          >
            <span class="caption" style="color: #4caf50; margin-right: 2px"
              >Fulfilled</span
            >

            <svg
              width="25"
              height="25"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6.0013L5.5 7.33464L8 4.66797"
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
              <!-- <v-btn elevation="0" style="float: right" icon>
                <v-icon style="font-size: 18px; color:  #757575; "
                  >mdi-content-copy</v-icon
                >
              </v-btn> -->
              <v-icon
                style="float: right; font-size: 18px"
                @click="copyToClipBoard(order.full_name)"
                >mdi-content-copy</v-icon
              >
            </li>
            <li class="pb-3">
              <v-icon size="16">$vuetify.icons.message</v-icon>
              <span class="ml-3">{{ order.email }}</span>
              <v-icon
                style="float: right; font-size: 18px"
                @click="copyToClipBoard(order.email)"
                >mdi-content-copy</v-icon
              >
            </li>
            <li class="pb-3">
              <v-icon size="16">$vuetify.icons.phone</v-icon>
              <span class="ml-3">{{ order.phone }}</span>
              <v-icon
                style="float: right; font-size: 18px"
                @click="copyToClipBoard(order.phone)"
                >mdi-content-copy</v-icon
              >
            </li>
            <li>
              <v-icon size="16">$vuetify.icons.marker</v-icon>
              <p style=" margin-left: 12px;  display: inline">
                {{ order.address }}
              </p>
              <v-icon
                style="float: right; font-size: 18px"
                @click="copyToClipBoard(order.address)"
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
            @onClick="shareOrder(order)"
          />
        </v-sheet>
      </v-row>
    </v-card>
    <div v-if="open" class="pb-5"></div>
    <v-row v-if="showConfirm" justify="center">
      <v-dialog v-model="showConfirm" persistent @click:outside="closeDialog">
        <div class="white rounded-xl" style="position: relative">
          <v-btn
            @click="closeDialog"
            fab
            depressed
            x-small
            color="white"
            absolute
            style="top: 0.5rem; right: 1rem"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM15 13.59L13.59 15L10 11.41L6.41 15L5 13.59L8.59 10L5 6.41L6.41 5L10 8.59L13.59 5L15 6.41L11.41 10L15 13.59Z"
                fill="#94A3B8"
              />
            </svg>
          </v-btn>

          <ConfirmDelivery
            :all="all"
            v-if="showConfirm"
            @close="showConfirm = false"
            @confirm="handleDeliveryConfirmed"
          />
        </div>
      </v-dialog>
    </v-row>
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
import ConfirmDelivery from "./ConfirmDelivery.vue";

export default {
  components: { Button, ConfirmDelivery },
  data() {
    return {
      all: false,
      dialog: false,
      showConfirm: false,
      check_all: false,
      fulfilled: false,
      loading: false,
      mark_all: false,
      open: false,
      orderItems: [],
      activeItem: null,
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
    shareOrder(order) {
      let shareData = {
        title: "MDN",
        text: `Name: ${order.full_name} \nEmail: ${order.email} \nPhone: ${order.phone}  \nAddress: ${order.address}`,
      };

      // const btn = document.querySelector("button");
      // const resultPara = document.querySelector(".result");
      if (navigator.share) {
        navigator
          .share(shareData)
          .then(() => console.log("MDN shared successfully"))
          .catch((e) => "Error: " + e);
      } else {
        navigator.clipboard.writeText(`Name: ${order.full_name} \nEmail: ${order.email} \nPhone: ${order.phone}  \nAddress: ${order.address}`);
      this.$toast.open("Order info copied successfully ");

      }
    },
    copyToClipBoard(text) {
      /* Get the text field */
      // var copyText = document.getElementById("myInput");

      // /* Select the text field */
      // copyText.select();
      // copyText.setSelectionRange(0, 99999); /* For mobile devices */

      /* Copy the text inside the text field */
      navigator.clipboard.writeText(text);
      // toas

      /* Alert the copied text */
      // alert("Copied the text: " + text);
      this.$toast.open("Copied successfully ");
    },
    handleDeliveryConfirmed() {
      this.complete();
    },
    closeDialog() {
      this.showConfirm = false;
    },
    handleCall(order) {
      this.openDialog("call_customer", order.phone, order.full_name);
    },
    openDialog(setup, phone, name) {
      this.$store.commit(mutationTypes.SET_SETTINGS_STATE, false);
      EventBus.$emit("dialog", "open", setup, phone, name);
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
      this.all = false;
      this.showConfirm = true;
      this.activeItem = item;
      // if (!item.status) {
      // let confirmed = confirm(
      //   "Confirm that you want to mark the product/item as delivered."
      // );
      // if (confirmed) {

      // }
      // }
    },
    complete() {
      if (this.all) {
        this.orderItems.forEach((item) => {
          updateOrderStatus(item.id, item.status ? 0 : 1)
            .then(() => {
              fetchOrders();
              fetchOrderItems(this.order.order_ref)
                .then((res) => {
                  this.orderItems = res.data;
                })
                .catch(() => {
                  // console.log({ err });
                  this.orderItems = [];
                })
                .finally(() => (this.loading = false));
              this.showConfirm = false;
            })
            .catch(() => {});
        });
      } else {
        updateOrderStatus(this.activeItem.id, this.activeItem.status ? 0 : 1)
          .then(() => {
            fetchOrders();
            fetchOrderItems(this.order.order_ref)
              .then((res) => {
                this.orderItems = res.data;
              })
              .catch(() => {
                // console.log({ err });
                this.orderItems = [];
              })
              .finally(() => (this.loading = false));
            this.showConfirm = false;
          })
          .catch(() => {});
      }
    },
    markAll() {
      this.all = true;
      this.showConfirm = true;
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
          //  months[order_month] +  " - " +
          return months[order_month] + " " + order_date;
        }
        return (
          months[order_month] + days[this_day - difference] + " - " + order_date
        );
      } else {
        return months[order_month] + ty[difference] + " - " + order_date;
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

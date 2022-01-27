<template>

		<v-card
			rounded="lg"
			outlined
			class="pa-5 pb-0 mb-4"
			style="width: 100%"
		>
			<v-sheet
				elevation="0"
				class="pb-3"
				rounded="lg"
			>
				<v-row @click="openCollapse(true)">
					<v-col cols=8 class="pt-0">
						<p class="text-left text-subtitle-1 font-weight-bold mb-0">
							{{ order.full_name }}
							<v-icon
								style="font-size: 20px; margin-top: -3px"
							>mdi-phone-outline</v-icon>
						</p>
						<p
							class="text-left text-body-2 mb-1"
						>
							{{ order_date }}<span><sup>{{ ordinal_suffix }}</sup>
							</span>
						</p>
						<p class="text-left text-body-2 mb-1"><span># {{ order.order_ref }}</span></p>
							
							
					</v-col>
					<v-col cols=4 class="pt-0">
						<p
							class="text-right text-subtitle-1 font-weight-bold mb-0"
						>&#8358;{{ order.products_total }}</p>
						<p class="text-right text-body-2 mb-0">
							{{ order.fulfilled }}/{{ order.items_count }}
						</p>
						<p style="color: #4CAF50;" class="text-right mb-0">Delivered</p>
					</v-col>
				</v-row>
			</v-sheet>

			<v-card
				v-if="open"
				class="pa-3 pt-5 pb-3"
				rounded="lg"
				color="#E9ECF0"
				flat
				style="position: relative"
			>
				<div style="height: 7px" class="mb-5 mt-0">
					<v-btn
						rounded
						depressed
						small
						color="success"
						absolute
						right
						style="margin: -8px -5px 0"
					>
						Check all
					</v-btn>
				</div>
				<v-row
					class=""
					v-for="(orderItem, j) in orderItems"
					:class="j === orderItems.length - 1 ? 'last' : ''"
					:key="'orderItem' + j"
					@click="markAsCompleted(orderItem)"
				>
					<v-col cols=3>
						<v-img
							:src="orderItem.image_url"
							lazy-src="https://picsum.photos/id/11/100/60"
							height="51"
							width="51"
							class="pa-0 rounded"
						>
							<template v-slot:placeholder>
								<v-row
									class="fill-height ma-0"
									align="center"
									justify="center"
								>
									<v-progress-circular
										indeterminate
										color="grey lighten-5"
									></v-progress-circular>
								</v-row>
							</template>
						</v-img>
					</v-col>
					<v-col cols=6 class="pl-0">
						<p class="text-left text-body-2 font-weight-bold mb-2">
							{{ orderItem.product_name }}
						</p>
						<p class="text-left text-body-2 mb-0">
							<span v-if="orderItem.selected_option1">
								Qty: {{ orderItem.qty }}; {{ orderItem.selected_option1 }}
							</span>
							<span v-if="orderItem.selected_option2">
								, {{ orderItem.selected_option2 }})
							</span>
						</p>
					</v-col>
					<v-col cols=3 class="pl-0" style="position: relative;">
						<p class="text-right text-body-2 mb-2">
							&#8358;{{ orderItem.sub_total }}
						</p>
						<v-checkbox
							v-model="fulfilled"
							class="check_box ma-0 pa-0 veri_check"
							dense 
							color="success"
							hide-details=""
							style="position: absolute; right: 0; bottom: 15px;"
						>
						</v-checkbox>
					</v-col>
				</v-row>
				<v-divider class="ma-5 ml-0 mr-0"></v-divider>
				<v-row
					class=" ma-0 mb-0"
				>
					<v-sheet
						class="pa-3"
						rounded="lg"
						color="FFF"
						width="100%"
					>
						<h5 class="mb-3 text-left">Customer</h5>
						<ul class="text-left pl-0 text-body-2" style="list-style-type: none; display: block">
							<li class="pb-3">
								<v-icon>mdi-account</v-icon>
								<span class="ml-3">{{ order.full_name }}</span>
								<v-icon style="float: right; font-size: 18px">mdi-content-copy</v-icon>
							</li>
							<li class="pb-3">
								<v-icon>mdi-phone-outline</v-icon>
								<span class="ml-3">{{ order.phone }}</span>
								<v-icon style="float: right; font-size: 18px">mdi-content-copy</v-icon>
							</li>
							<li class="pb-3">
								<v-icon>mdi-map-marker-outline</v-icon>
								<span class="ml-3">{{ order.address }}</span>
								<v-icon style="float: right; font-size: 18px">mdi-content-copy</v-icon>
							</li>
							<li>
								<v-icon>mdi-email-outline</v-icon>
								<span class="ml-3">{{ order.email }}</span>
								<v-icon style="float: right; font-size: 18px">mdi-content-copy</v-icon>
							</li>
						</ul>
						<v-btn
							class="mt-5"
							depressed
							width="100%"
							color="primary"
						>
							<v-icon>mdi-share-variant-outline</v-icon>
							Share
						</v-btn>
					</v-sheet>
				</v-row>
			</v-card>
			<div v-if="open" class="pb-5"></div> <!-- serves as spacer -->
		</v-card>
</template>

<script>
import {
  updateOrderStatus,
  fetchOrders,
//   fetchOrderItems,
} from "@/services/apiServices";
export default {
  data() {
    return {
			check_all: false,
			fulfilled: false,
      loading: false,
			mark_all: false,
      open: false,
      orderItems:  [{product_name: 'Unisex shoe(1) & 2 0ther items'}],
    };
  },
  props: ["order"],
  methods: {
    openCollapse() {
            this.open = !this.open;

    //   if (this.open && toggle) {
    //     this.open = false;
    //     return;
    //   } else if (!this.open && this.orderItems.length) {
    //     this.open = true;
    //   } else {
    //     this.loading = true;
    //     fetchOrderItems(this.order.order_ref)
    //       .then((res) => {
    //         this.orderItems = res.data;
    //         this.open = true;
    //       })
    //       .catch(() => {
    //         // console.log({ err });
    //         this.orderItems = [];
    //       })
    //       .finally(() => (this.loading = false));
    //   }
    },
    markAsCompleted(item) {
      updateOrderStatus(item.id, item.status ? 0 : 1)
        .then(() => {
          fetchOrders();
          this.openCollapse(false);
        })
        .catch(() => {
          // console.log(err);
        });
    },
    markAll(items) {
      items.forEach((item) => {
        this.markAsCompleted(item);
      });
    },
  },
  computed: {
    // order_date () {
    //   const ms_per_day = 1000 * 60 * 60 * 24
    //   let months = [
    //     'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    //   ]
    //   const days = [
    //     'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
    //   ]
    //   const ty = ['Today', 'Yesterday']

    //   let order_year = parseInt(this.order.created.substring(0,4))
    //   let order_month = parseInt(this.order.created.substring(5,7)) - 1
    //   let order_date = parseInt(this.order.created.substring(8,10))
    //   const today = new Date()
    //   const this_day = today.getDay() // position in week

    //   const utc1 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
    //   const utc2 = Date.UTC(order_year, order_month, order_date)

    //   let difference = Math.floor((utc1 - utc2) / ms_per_day)

    //   if (difference > 6) {
    //     return months[order_month] + " " + order_date
    //   } else if (difference > 1) {
    //     if (this_day - difference < 0) {
    //       return days[7 + this_day - difference] + " - " + order_date
    //     }
    //     return days[this_day - difference] + " - " + order_date
    //   } else {
    //     return ty[difference] + " - " + order_date
    //   }
    // },
    // ordinal_suffix() {
    //   let order_date = parseInt(this.order.created.substring(8,10))
    //   var j = order_date % 10,
    //       k = order_date % 100;
    //   if (j == 1 && k != 11) {
    //       return "st";
    //   }
    //   if (j == 2 && k != 12) {
    //       return "nd";
    //   }
    //   if (j == 3 && k != 13) {
    //       return "rd";
    //   }
    //   return "th";
    // },
  }
};
</script>

<style lang="scss" scoped>
</style>

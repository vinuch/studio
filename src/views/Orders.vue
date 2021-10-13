<template>
  <div class="pa-5">
    <topNav>Orders</topNav>
		<v-container v-if="!orders.length">
			<p>You have no orders yet</p>
		</v-container>

		<v-container
			v-else
			fluid
			class="pa-0"
		>
			<v-row class="pa-0">
        <v-col cols=9>
          <v-text-field
            outlined
            prepend-inner-icon="mdi-magnify"
            placeholder="Name search"
            background-color="grey lighten-5"
          >
          </v-text-field>
        </v-col>
        <v-col cols=3 class="">
          <v-btn
            color="primary"
            height="55"
            depressed
            @click="product_drawer=true"
          ><v-icon>mdi-filter-outline</v-icon></v-btn>
        </v-col>
      </v-row>
			
			<v-row class="pa-5">
				<OrderItem 
					v-for="(order, i) in orders"
					:key="'order' + i"
					:order="order"
				/>
			</v-row>
    </v-container>
  </div>
</template>

<script>
	import { mapGetters } from "vuex";
	// import {
	//   fetchOrderItems,
	//   updateOrderStatus,
	//   fetchOrders,
	// } from "@/services/apiServices";
	import topNav from "@/components/TopNav"
	import OrderItem from "@/components/OrderItem";

	export default {
		components: {
			topNav,
			OrderItem,
		},
		data: () => {
			return {
				pageWidth: true,
				activeKey: null,
				orderItems: [],
				expandIconPosition: "right",
				loading: false,
				loadingIndex: null,
			}
		},
		methods: {
			// openCollapse(i) {
			//   if (this.activeKey === i) {
			//     this.activeKey = null;
			//     return;
			//   }
			//   this.activeKey = null;
			//   this.loading = true;
			//   this.loadingIndex = i;
			//   this.orderItems = [];
			//   fetchOrderItems(this.orders[i].order_ref)
			//     .then((res) => {
			//       this.orderItems = res.data;
			//       this.activeKey = i;
			//     })
			//     .catch(() => {
			//       // console.log({ err });
			//       this.orderItems = [];
			//     })
			//     .finally(() => (this.loading = false));
			// },
			// markAsCompleted(id, i) {
			//   updateOrderStatus(id)
			//     .then(() => {
			//       fetchOrders();
			//       this.openCollapse(i);
			//     })
			//     .catch(() => {
			//       // console.log(err);
			//     });
			// },
			// markAll(items, i) {
			//   items.forEach((item) => {
			//     this.markAsCompleted(item.id, i);
			//   });
			// },
		},
		computed: {
			...mapGetters({
				orders: "getOrders",
			}),
		},
		watch: {
			// pageWidth_() {
			//   this.pageWidth_ > 767
			//     ? (this.pageWidth = true)
			//     : (this.pageWidth_ = false);
			// },
		},
		mounted() {
			// console.log(this.orders);
			// this.pageWidth = window.innerWidth > 767;
		},
	};
</script>
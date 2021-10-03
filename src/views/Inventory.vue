<template>
  <div class="pa-5">
    <topNav>Inventory</topNav>
		<v-container v-if="!inventory">
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
          ><v-icon>mdi-plus</v-icon></v-btn>
        </v-col>
      </v-row>
      

			<v-row
        v-for="(item, i) in inventory"
        :key="i"
        class="ma-0 mb-5"
      >
        <v-card
          rounded="lg"
          class="pa-5"
          outlined
          style="width: 100%"
        >
          <v-row>
            <v-col class="pa-0" cols="3">
              <v-img
                src="https://bad.src/not/valid"
                lazy-src="https://picsum.photos/id/11/100/60"
                height="80"
                class="rounded"
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
            <v-col
              cols=6
              class="pa-0 pl-2"
              style="position: relative"
            >
              <p style="text-align: left" class="ma-0 pr-5">{{item.name}}</p>
              <v-chip
                small
                color="success"
                class="ml-2"
                outlined
                style="position: absolute; bottom: 0; left: 0"
              >
                Stock: {{item.qty}}
              </v-chip>
            </v-col>
            <v-col
              cols=3
              class="pa-0"
              style="font-size: 16px;"
            >
              <p style="text-align: left" class="ma-0">
                &#8358; {{item.price}}
              </p>
            </v-col>
          </v-row>
        </v-card>
			</v-row>
    </v-container>
    <v-navigation-drawer
      app
      right
      :width="400"
      v-model="product_drawer"
    >
      <AddProduct @close="close()" />
    </v-navigation-drawer>
  </div>
</template>

<script>
  import topNav from "@/components/TopNav"
  import AddProduct from "@/components/AddProduct"

  export default {
    name: 'Inventory',
    components: {
      topNav,
      AddProduct,
    },
    data: () => {
			return {
				inventory: [
          {name: "Unisex (for male and female)", price: "86,000", qty: 12, image: ""},
          {name: "Gown", price: 8000, qty: 6, image: ""},
          {name: "Shorts", price: 9000, qty: 2, image: ""},
        ],
        product_drawer: null,
        // inventory: false,
      }
    },
    methods: {
      close() {
        this.product_drawer = false
      }
    }
  }
</script>

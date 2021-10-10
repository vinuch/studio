<template>
  <div>
    <h2 class="text-left text-h6 ma-5">Add a new product</h2>
    <v-icon
      class="mr-5" 
      style="float: right; top: -47px;"
      @click="close"
      >mdi-close-thick</v-icon>
    <v-divider></v-divider>
    <div class="pa-5">
      <v-container
        fluid
        class="pa-0"
      >
        <v-card-text class="text-left text-body-2 pb-2 mt-5 ">Upload up to five product images</v-card-text>
        <v-card
          class="pa-5"
          flat
          outlined
          rounded="lg"
        >
          <v-sheet>
            <v-file-input
              accept="image/*"
              multiple
              chips
            ></v-file-input>
          </v-sheet>
        </v-card>

        <v-card-text class="text-left text-body-2 pb-0 mt-5 ">Product name</v-card-text>
        <v-text-field
          outlined
          hide-details
          class="mt-2 mb-0"
        ></v-text-field>
        <v-card-text class="text-left text-body-2 pt-0 mt-1 mb-5 describe">Give your product a short and clear name.</v-card-text>

        <v-card-text class="text-left pb-0 mt-5 describe">Description</v-card-text>
        <v-text-field
          outlined
          hide-details
          class="mt-2 mb-0"
        ></v-text-field>
        <v-card-text class="text-left pt-0 mt-1 mb-5 describe">Provide a clear description for your customers.</v-card-text>

        <v-sheet
          id="variants"
          elevation="0"
          rounded="lg"
          color="bg_grey"
          class="mb-0 pa-5"
        >
          <div>
            <p
            style="text-align: left; color: #69747E; font-weight: 600;"
            >Add product variants? 
              <span class="switch">
                <v-switch
                class="float-right mt-0 pt-0"
                color="success"
                style="position: relative; right: -12px;"
                id="switch"
                v-model="variants"
                inset
              >
              </v-switch>
              </span>
            </p>
          </div>
          <p v-if="variants==false" class="describe ">This product comes in variants e.g. different sizes, colours, materials, etc.</p>
          <div
            v-for="i in variant_index"
            :key="i"
          >
            <AddVariant v-if="variants" :variant_count=variant_count />
          </div>
          <p
            v-if="variants==true && variant_index == 1"
            class="text-left mt-5 blue_link pointer describe"
            style="color: blue"
            @click="addVariant()"
          >
            + add another variant.
          </p>
        </v-sheet>

        <v-sheet
          id="carousel"
          elevation="0"
          rounded="lg"
          color="bg_grey"
          class="mt-5 pa-5"
        >
          <div>
            <p
            style="text-align: left; color: #69747E; font-weight: 600;"
            >Add quantity and price
            </p>
            <p class="describe">Enter the quantity and price for each combination of variants.</p>
          </div>
          <!-- <v-carousel
            height="auto"
            style="position: relative;"
            :show-arrows="false"
            hide-delimiter-background
          >
            <v-carousel-item
              v-for="(combo, i) in combos"
              :key="i"
              eager
            > -->
              <v-sheet>
                  <v-row
                    align="center"
                    justify="center"
                    class="mt-5"
                  >
                    <v-col cols=6 class="pt-0">
                      <v-text-field
                        outlined
                        dense
                        placeholder="Colour"
                        background-color="grey lighten-5"
                        hide-details="true"
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols=6 class="pt-0">
                      <v-text-field
                        outlined
                        dense
                        placeholder="Size"
                        background-color="grey lighten-5"
                        hide-details="true"
                        disabled
                        ></v-text-field>
                    </v-col>
                    
                    <v-col cols=6 class="pt-0">
                      <v-text-field
                        outlined
                        dense
                        placeholder="Price"
                        background-color="grey lighten-5"
                        hide-details="true"
                      ></v-text-field>
                    </v-col>
                    <v-col cols=6 class="pt-0">
                      <v-text-field
                        outlined
                        dense
                        placeholder="Qty"
                        background-color="grey lighten-5"
                        hide-details="true"
                        ></v-text-field>
                    </v-col>
                  </v-row>
              </v-sheet>
            <!-- </v-carousel-item>
          </v-carousel> -->
        </v-sheet>

        <v-sheet
          id="discount"
          elevation="0"
          rounded="lg"
          color="bg_grey"
          class="mt-5 pa-5"
        >
          <div>
            <p
            style="text-align: left; color: #69747E; font-weight: 600;"
            >Add discount 
              <span class="switch">
                <v-switch
                class="float-right mt-0 pt-0"
                color="success"
                style="position: relative; right: -12px;"
                id="switch"
                v-model="discount"
                inset
              >
              </v-switch>
              </span>
            </p>
          </div>
          <!-- <v-slide-y-transition> -->
            <v-row
              class="mt-5"
            >
              <v-col cols=6 class="pa-0 mb-4">
                <v-text-field
                  outlined
                  dense
                  placeholder="Type"
                  background-color="grey lighten-5"
                  hide-details="true"
                ></v-text-field>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols=6 class="pa-0 mb-4">
                <v-text-field
                  outlined
                  dense
                  placeholder="Amount"
                  background-color="grey lighten-5"
                  hide-details="true"
                  ></v-text-field>
              </v-col>
            </v-row>
          <!-- </v-slide-y-transition> -->
        </v-sheet>
        
        <v-sheet
          id="variants"
          elevation="0"
          rounded="lg"
          color="bg_grey"
          class="mb-0 mt-5 pa-5"
        >
          <div>
            <p
            style="text-align: left; color: #69747E; font-weight: 600;"
            >Display in gallery 
              <span class="switch">
                <v-switch
                class="float-right mt-0 pt-0"
                color="success"
                style="position: relative; right: -12px;"
                id="switch"
                v-model="display"
                inset
              >
                </v-switch>
              </span>
            </p>
            <p class="describe ">Make product available for purchase</p>
          </div>
        </v-sheet>

        <v-card-actions 
        class="mt-5 justify-center light_grey rounded-lg"
        >
          <v-btn 
            class="main_blue ma-3 ml-5"
            depressed
            @click="save()"
          >
            Add product
          </v-btn>
        </v-card-actions>
      </v-container>
    </div>
  </div>
</template>

<script>
  import AddVariant from "@/components/AddVariant"
  // import setupFooter from "@/components/setupFooter"

  export default {
    name: 'AddProduct',
    components: {
      AddVariant,
      // setupFooter
    },
    data: () => {
			return {
        discount: true,
        display: true, // display product in gallery
        variants: true,
        variant_index: 1, // not zero indexed
        combos: 25, // should be an array
      }
    },
    methods: {
      addVariant() {
        this.variant_index += 1
      },
      close() {
        this.$emit("close")
      } 
    }
  }
</script>

<style scoped>
  .describe {
    font-size: 14px;
    text-align: left;
    color: #69747E;
    margin-bottom: 0;
  }
</style>
<template>
  <div class="variant">
    <p>{{ name }}</p>
    <!-- <select class="variant_select" v-model="optionIndex" @change="updateOption(optionIndex, prodIndex)">
      <option :value="null" disabled>Select</option>
      <option v-for="(option, index) in options" :value="index" :key="index">
        {{ option }}
      </option>
    </select> -->
    <div
      class="select_header"
      :class="open ? 'open' : null"
      @click="open = !open"
      v-on:clickout="open = false"
    >
      {{ selected }}
    </div>
    <transition name="fade">
      <ul v-if="open">
        <li
          v-for="(option, i) in variants"
          :key="i"
          @click="selected = option; open = false; setOption(i)"
        >
          {{ option }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
require('clickout-event');
import { mapGetters } from "vuex"
export default {
  // name: 'HelloWorld',
  props: {
    "variant": String,
    "name": String,
    "options": [Array, String],
    "prodIndex": Number,
  },
  data(){
    return {
      selected: 'Select',
      open: false,
      optionIndex: null,
    }
  },
  methods: {
    checkIfAvailable(prodIndex) {
      let option1 = this.inventory[prodIndex].selected_option;
      let option2 = this.inventory[prodIndex].selected_option2;

      if (this.inventory[prodIndex].multiple_variants == true) {
        if (
          option1 != "" &&
          typeof option1 != "undefined" &&
          option2 != "" && typeof option2 != "undefined"
        ) {
          let variant_options = this.inventory[prodIndex].variant_options;
          for (let i = 0; i < variant_options.length; i++) {
            if (
              variant_options[i].variant1 == option1 &&
              variant_options[i].variant2 == option2
            ) {
              // search for combination
              if (variant_options[i].quantity == 0) {
                this.inventory[prodIndex].combo_stock = 0;
              } else {
                this.inventory[prodIndex].combo_stock =
                  variant_options[i].quantity;
              }
            }
          }
        }
      }
    },
    setOption(i) {
      let option = this.variants[i]
      let prod = this.prodIndex
      if (this.variant == "variant1") {
        this.inventory[prod].selected_option = option;
        try {
          this.inventory[prod].this_stock = this.inventory[prod].all_stock_count[i];
        } catch {
          /* multiple variants */
        }
        this.checkIfAvailable(prod);
      } else {
        this.inventory[prod].selected_option2 = option;
        this.checkIfAvailable(prod);
      }
    },
  },
  computed: {
    ...mapGetters({
      inventory: "getProducts",
    }),
    variants() {
      if (Array.isArray(this.options)) {
        return
      } else {
        return this.options.split(",")
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.variant {
  width: 160px;
  text-align: left;
  p {
    font-weight: bold;
    margin-left: 10px;
    margin-bottom: 0.5em;
  }
}
  ul {
    list-style-type: none;
    margin: .5rem 0 0;
    padding: 0;
    border: 1px solid #E9E8EF;
    box-shadow: 0px 5px 10px #EBF0F7;
    border-radius: 8px;
    transition: all 5s ease;
    position: absolute;
    z-index: 1;
    background-color: #fff;
    width: 100%;

    li {
      padding: .5rem .5rem;
      cursor: pointer;

      &:hover {
        background-color: #EDEDED;
      }
    }
  }
  .select_header{
    cursor: pointer;
    border: 0.877907px solid #EDEDED;
    box-sizing: border-box;
    border-radius: 8px;
    padding: .7rem;
    transition: all 0.5s ease;

    &.open {
      border: 0.877907px solid #634FDD;
    }
  }
  .fade-enter-active, .fade-leave-active {
      transition: all .7s;
      // transform: translateY(-50%);
    }
  .fade-enter, .fade-leave-to {
    transform: translateY(-20%);
    opacity: 0;
}
</style>

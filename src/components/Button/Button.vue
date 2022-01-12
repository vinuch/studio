<template>
  <!-- <button type="button" :class="classes" @click="onClick" :style="style"></button> -->
   <v-btn 
              depressed 
              block
              v-bind="getSize"
               :class="classes"
              @click="onClick"
              :disabled="disabled"
            >
              {{ label }} 
            </v-btn>
</template>

<script>
import './button.css';

export default {
  name: 'my-button',

  props: {
    label: {
      type: String,
      required: true,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'default',
      validator: function (value) {
        return ['small','default', 'large'].indexOf(value) !== -1;
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classes() {
      return {
        'button': true,
        'button--primary': this.primary,
        'button--secondary': !this.primary,
        [`button--${this.size}`]: true,
      };
    },
    style() {
      return {
        backgroundColor: this.backgroundColor,
      };
    },
    getSize() {
      return { [this.size]: true }
    }
  },

  methods: {
    onClick() {
      this.$emit('onClick');
    },
  },
};
</script>

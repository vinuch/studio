<template>
  <!-- <button type="button" :class="classes" @click="onClick" :style="style"></button> -->
  <div :style="containerStyle">
    <v-btn
      depressed
      :block="block"
      v-bind="getSize"
      :class="classes"
      @click="onClick"
      :disabled="disabled"
    >
      {{ label }}
      <slot name="child"></slot>
    </v-btn>
  </div>
</template>

<script>
import "./button.css";

export default {
  name: "my-button",

  props: {
    label: {
      type: String,
    },
    containerStyle: {
      type: Object,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    primaryLight: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "default",
      validator: function (value) {
        return ["small", "default", "large"].indexOf(value) !== -1;
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
        button: true,
        "button--primary": this.primary,
        "button--primary-light": this.primaryLight,
        "button--secondary": !this.primary,
        [`button--${this.size}`]: true,
      };
    },

    getSize() {
      return { [this.size]: true };
    },
  },

  methods: {
    onClick() {
      this.$emit("onClick");
    },
  },
};
</script>

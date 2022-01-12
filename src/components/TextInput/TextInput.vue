<template>
  <!-- <button type="button" :class="classes" @click="onClick" :style="style"></button> -->
  <v-text-field
    :rules="[catchValidations()]"
    :type="type"
    :label="label"
    v-model="form[name]"
    @blur="v$.form[name].$touch"
    outlined
    @keyup="handleChange"
  >
    <template v-slot:prepend-inner>
      <slot name="prepend-inner"></slot>
    </template>
    <template v-slot:append>
      <slot name="append"></slot>
    </template>
  </v-text-field>
</template>

<script>
import "./TextInput.css";
import useVuelidate from "@vuelidate/core";

export default {
  name: "text-input",
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
        form: {
        ...{ [this.name]: this.validations || {} },
      },
    };
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      required: true,
    },

    validations: {
      type: Object,
    },
  },

  data() {
    return {
      form: {
        ...{ [this.name]: '' },
      },
    };
  },

  methods: {
    handleChange() {
      this.$emit("update", this.form[this.name]);
    },
    catchValidations() {
      if (this.validations) {
        return this.v$.form[this.name]?.$dirty
          ? !this.v$.form[this.name]?.$error
            ? true
            : this.v$.form[this.name]?.$errors[0]?.$message
          : false;
      }
      return true;
    },
  },
  computed: {
    classes() {
      return {
        button: true,
        "button--primary": this.primary,
        "button--secondary": !this.primary,
        [`button--${this.size}`]: true,
      };
    },
    style() {
      return {
        backgroundColor: this.backgroundColor,
      };
    },
  },
};
</script>

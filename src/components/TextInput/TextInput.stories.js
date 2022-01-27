import TextInput from "./TextInput.vue";
import { required, email } from "@vuelidate/validators";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Components/TextInput",
  component: TextInput,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    label: {
      name: "label",
    },
    name: "email",
    validations: { required, email },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TextInput },
  template: `<TextInput v-bind="$props"
  >
  
     </TextInput>`,
});

export const Default = Template.bind({});

Default.args = {
  label: "Email",
  name: "email",
};


export const validated = Template.bind({});

validated.args = {
  label: "Email",
  name: "email",
  validations: {required, email }
};

// More on args: https://storybook.js.org/docs/vue/writing-stories/args

<template>
  <div>
    <v-card-actions class="justify-center mb-2">
      <Button
        label="Cancel"
        :containerStyle="{margin: '0 1rem'}"
        buttonStyle="color: #445B54 !important;"
        @onClick="closeDialog()"
      />

      <Button :containerStyle="{margin: '0 1rem'}" label="Save" :primary="true" @onClick="save()" />
    </v-card-actions>
  </div>
</template>

<script>
import { EventBus } from "@/services/eventBus";
import * as mutationTypes from "@/store/mutationTypes";
import Button from "@/components/Button";
export default {
  name: "setupFooter",
  components: { Button },
  data: () => ({}),
  methods: {
    closeDialog() {
      this.$store.commit(mutationTypes.SET_SETTINGS_STATE, true);
      EventBus.$emit("dialog", "close", "");
    },
    save() {
      this.$emit("saveSetUp");
    },
  },
};
</script>

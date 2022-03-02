<template>
  <div>
    <v-card-actions class="justify-center mb-2">
      <!-- <Button
      transparent
        label="Cancel"
        :containerStyle="{margin: '0 1rem'}"
        buttonStyle="color: #445B54 !important;"
        
      /> -->
      <span v-if="modal" style="color: #445B54; font-weight: 600;margin: 0 1rem" @click="closeDialog()" >Cancel</span>

      <Button :containerStyle="{margin: '0 1rem', width:'100%'}" label="Save" :primary="true" :block="!modal ? true : false" @onClick="save()" />
    </v-card-actions>
  </div>
</template>

<script>
import { EventBus } from "@/services/eventBus";
import * as mutationTypes from "@/store/mutationTypes";
import Button from "@/components/Button";
export default {
  name: "setupFooter",
  props: ['modal'],
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

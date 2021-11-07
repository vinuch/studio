<template>
  <div>
    <v-card-actions 
      class="justify-center light_grey rounded-b-xl"
    >
      <v-btn
        color="primary"
        text
        style="font-weight: bold; letter-spacing: 0"
        depressed
        @click="closeDialog()"
      >Cancel</v-btn>
      <v-btn 
        class="main_blue ma-3 ml-5"
        depressed
        @click="save()"
      >
        <slot>Save</slot>  
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
  import { EventBus } from "@/services/eventBus"
  import * as mutationTypes from "@/store/mutationTypes"

  export default {
    name: 'setupFooter',
    data: () => ({
    }),
    methods: {
      closeDialog() {
        this.$store.commit(mutationTypes.SET_MANAGE_STATE, true)
        EventBus.$emit( "dialog", "close", "")
      },
      save() {
        this.$emit('saveSetUp')
      }
    },
  }
</script>

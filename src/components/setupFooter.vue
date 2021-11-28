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
  import * as mutationTypes from "@/store/mutationTypes"

  export default {
    name: 'setupFooter',
    data: () => ({
    }),
    methods: {
      closeDialog() {
        this.$store.commit(mutationTypes.SET_SETTINGS_STATE, true)
        this.$router.go(0) // going this route so dashboard refreshes
      },
      save() {
        this.$emit('saveSetUp')
      }
    },
  }
</script>

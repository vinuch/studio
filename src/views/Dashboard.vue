<template>
<div class="pa-5">
  <Snackbar />
  <Menu />
  <Dialog
    v-if="dialog == true" 
    :modal="modal" 
    @closeDialog = closeDialog()
    />
    
  <div style="width: 100%; height: 6em">
    <h2 class="title" style="margin-top: 3em">Hello Abdul &#128526;</h2>
    <p>Things to get you started.</p>
  </div>

  <v-container 
    class="rounded-xl" 
    style="border: 1px solid #E2E8F0; overflow: hidden" 
    fluid 
    fill-height
    pa-0
  >
    <div>
      <p class="text-left pa-5 ma-0">Setup progress <span>0/4</span></p>

      <v-row class="ma-0">
        <v-col v-for="dash in dashboard" :key="dash.title" cols=12 class="pa-0">
          <v-card
            class="text-left pa-3 pb-5 pl-5" 
            tile 
            flat 
            outlined
            style="background: #F6F8FA; border: none; border-top: 1px solid #E2E8F0"
          >
            <v-checkbox 
              class="ma-0" 
              dense 
              disabled 
              hide-details=""
            >
            </v-checkbox>
            <v-card-title class="pa-0" style="font-size: 1.2rem">{{dash.title}}</v-card-title>
            <v-card-text class="pa-0 pb-3">{{dash.text}}</v-card-text>
            <v-btn
              depressed
              class="main_blue"
              @click="openDialog(dash.modal)"
            >
              {{dash.btn_title}}
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</div>
</template>

<script>
  import Menu from '@/components/Menu'
  import Snackbar from '@/components/Snackbar'
  import Dialog from '@/components/Dialog'

  export default {
    name: 'Dashboard',
    components: {
      Menu,
      Snackbar,
      Dialog,
    },
    data: () => ({
      dashboard: [
        {status: 0, title: "Payments", text: "Get paid by customers", btn_title: "Setup payment account", modal: "set_bank"},
        {status: 0, title: "Store details", text: "Store contacts, etc", btn_title: "Add store details", modal: "store_details"},
        {status: 0, title: "Business hours", text: "Opening & closing hours", btn_title: "Set hours", modal: "business_hours"},
        {status: 0, title: "Shipping", text: "Delivery & pick-up arrangements", btn_title: "Set shipping", modal: "shipping"}
      ],
      dialog: false,
      // dialog: false, default is false
      modal: null,
    }),
    methods: {
      openDialog(setup) {
        this.dialog=true
        this.modal=setup
      },
      closeDialog() {
        this.dialog=false
      }
    },
  }
</script>

<style scoped>

</style>
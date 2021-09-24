<template>
<div>
  <v-card class="rounded-xl">
    <div style="padding: 16px;">
      <v-card-title class="title justify-center">
      Store Details
      </v-card-title>
      <v-card-text class="pa-0">
        Enter your store details so your customers can know more about you.
      </v-card-text>

      <v-card-text class="text-left pa-0 mt-5">Share your store</v-card-text>
      <v-sheet
        elevation="0"
        rounded="lg"
        color="bg_grey"
        class="mt-2 mb-5 pa-5"
      >
        <div>
          <v-text-field outlined></v-text-field>
        </div>
        <p class="describe">Share your store link with your customers.</p>
      </v-sheet>

      <v-card-text class="text-left pa-0">Store front image (max size: 1mb)</v-card-text>
      <v-text-field outlined class="mt-2"></v-text-field>

      <v-btn width=100% depressed color="primary" @click="refs.inputUpload.$el.click()">Upload</v-btn>
      <input v-show="false" ref="inputUpload" type="file" @change="yourFunction" >

      <v-card-text class="text-left pa-0 mt-5">About your store</v-card-text>
      <v-sheet
        elevation="0"
        rounded="lg"
        class="mt-2"
      >
        <v-textarea outlined></v-textarea>
      </v-sheet>

      <v-card-text class="text-left pa-0">Support store email</v-card-text>
      <v-text-field outlined class="mt-2"></v-text-field>
      
      <v-card-text class="text-left pa-0">Phone number</v-card-text>
      <v-text-field outlined type="number" class="mt-2"></v-text-field>
      
      <v-card-text class="text-left pa-0">Alternate phone number (optional)</v-card-text>
      <v-text-field outlined type="number" class="mt-2"></v-text-field>
      
      <v-card-text class="text-left pa-0">Address (if public)</v-card-text>
      <v-text-field outlined type="number" class="mt-2"></v-text-field>

      <v-card-text class="text-left pa-0 mt-5">Social media handles</v-card-text>
      <v-sheet
        elevation="0"
        rounded="lg"
        color="bg_grey"
        class="mt-2 mb-5 pa-5"
      >
        <ul>
          <li
            v-for="(platform, i) in platforms"
            :key="i"
          >{{platform.logo}} {{platform.name}} <v-text-field class="ma-0"></v-text-field> </li>
        </ul>
      </v-sheet>
    </div>
    <setupFooter
      @saveSetUp="saveSetUp()"
      @closeDialog="closeDialog()"
    >
      Save StoreDetails
    </setupFooter>
  </v-card>
</div>
</template>

<script>
  import setupFooter from '@/components/setupFooter'

  export default {
    name: 'StoreDetails',
    components: {
      setupFooter,
    },
    data: () => ({
      platforms: [
        {logo: "", name: "Instagram", handle: ""},
        {logo: "", name: "Twitter", handle: ""},
        {logo: "", name: "Facebook", handle: ""},
      ],
    }),
    methods: {
      closeDialog() {
        this.$emit('closeDialog')
      },
    }
  }
</script>

<style scoped>
  ul {
    /* max-width: 300px; */
    margin: 0;
    padding: 0;
    color: #69747E;
  }
  li {
    list-style-type: none;
    text-align: left;
    font-size: 14px;
    color: #848b91;
  }
  .describe {
    font-size: 14px;
    text-align: left;
    color: #848b91;
    margin-bottom: 0;
  }
</style>

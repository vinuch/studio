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
          <v-text-field
            outlined hide-details=""
            class="mb-2"
            :value="store.slug + '.leyyow.com'"
            ref="merchant_url"
            readonly
          >
            <template slot="append-outer">
              <!-- <div style="border: 1px solid blue; padding: 5px;" class="mr-3 ml-3"> -->
                <v-icon class="mr-2 ml-1 cursor" @click="copyUrl()">mdi-content-copy</v-icon>
              <!-- </div> -->
              <!-- <div style="border: 1px solid blue; height: 100%" class=""> -->
                <v-icon class="cursor" @click="openTab()">mdi-open-in-new</v-icon>
              <!-- </div> -->
            </template>
          </v-text-field>
        </div>
        <p class="describe">Share your store link with your customers.</p>
      </v-sheet>

      <v-card-text class="text-left pa-0">Store front image (max size: 1mb)</v-card-text>
      <!-- <v-text-field
        type="file"
        v-model="bck_img"
        @change="uploadImage($event)"
        outlined class="mt-2"
      ></v-text-field> -->

      <!-- <v-btn width=100% depressed color="primary" @click="refs.inputUpload.$el.click()">Upload</v-btn> -->
      <input type="file" accept="image/*" @change="uploadImage($event)" name="Store front photo" />

      <v-card-text class="text-left pa-0 mt-5">About your store</v-card-text>
      <v-sheet
        elevation="0"
        rounded="lg"
        class="mt-2"
      >
        <v-textarea outlined v-model="about"></v-textarea>
      </v-sheet>

      <v-card-text class="text-left pa-0">Support store email</v-card-text>
      <v-text-field outlined class="mt-2" v-model="email"></v-text-field>
      
      <v-card-text class="text-left pa-0">Phone number</v-card-text>
      <v-text-field outlined type="number" class="mt-2" v-model="phone1"></v-text-field>
      
      <v-card-text class="text-left pa-0">Alternate phone number (optional)</v-card-text>
      <v-text-field outlined type="number" class="mt-2" v-model="phone2"></v-text-field>
      
      <v-card-text class="text-left pa-0">Address (if public)</v-card-text>
      <v-text-field outlined class="mt-2" v-model="address"></v-text-field>

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
          >{{platform.logo}} {{platform.name}} <v-text-field class="ma-0" v-model="platforms[i].handle"></v-text-field> </li>
        </ul>
      </v-sheet>
    </div>
    <setupFooter
      @saveSetUp="save()"
    >
      Save StoreDetails
    </setupFooter>
  </v-card>
</div>
</template>

<script>
  import { EventBus } from "@/services/eventBus"
  import { mapGetters } from "vuex";
  import {
    updateStore,
  } from "@/services/apiServices";
  import * as mutationTypes from "@/store/mutationTypes";

  import setupFooter from '@/components/setupFooter'

  export default {
    name: 'StoreDetails',
    components: {
      setupFooter,
    },
    data: () => ({
      about: "",
      bck_img: null,
      email: "",
      phone1: "",
      phone2: "",
      address: "",
      platforms: [
        {logo: "", name: "Instagram", handle: ""},
        {logo: "", name: "Twitter", handle: ""},
        {logo: "", name: "Facebook", handle: ""},
      ],
    }),
    methods: {
      copyUrl() {
        let url = this.$refs.merchant_url.$el.querySelector("input")
        url.select()
        document.execCommand("copy")
        EventBus.$emit("open_alert", "info", "store url copied");
      },
      openTab() {
        window.open("https://" + this.store.slug + ".leyyow.com", "_blank")
      },
      uploadImage(e) {
        let form = new FormData();
        form.append("background", e.target.files[0])
        // this.uploadingImage = true;
        updateStore(form, this.store.id)
          .then(res => {
            let store = res.data
            this.$store.commit(mutationTypes.SAVE_STORE, store)
          })
          .catch((err) => {
            EventBus.$emit("open_alert", "error", "error uploading store image " + err)
          })
          .finally(() => {
            EventBus.$emit("open_alert", "success", "Store image saved")
          //   this.uploadingImage = false;
          })
      },
      save() {
        let data = {
          about: this.store.about,
          email: this.store.email,
          phone1: this.store.phone1,
          phone2: this.store.phone2,
          address: this.store.address,
          instagram: this.store.instagram,
          twitter: this.store.twitter,
          facebook: this.store.facebook,
        }
        console.log(data)
        updateStore(data, this.store.id)
          .then(res => {
            let store = res.data
            this.$store.commit(mutationTypes.SAVE_STORE, store);
          })
          .catch(err => EventBus.$emit("open_alert", "error", "there was an error saving" + err))
          .finally(() => {
            EventBus.$emit("open_alert", "success", "Store info updated")
          })
      },
    },
    computed: {
      ...mapGetters({
        store: "getStore",
      }),
    },
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

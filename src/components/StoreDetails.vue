<template>
  <div class="rounded-xl ">
    <v-card class="elevation-0 overflow-hidden pa-5">
      <div>
        <v-card-title v-if="!settings" class="title justify-center">
          Store Details
        </v-card-title>
        <v-sheet
          elevation="0"
          rounded="lg"
          color="bg_grey"
          class="mt-2 mb-5 pa-5"
        >
          <div>
            <v-text-field
              outlined
              hide-details=""
              class="mb-2"
              :value="merchant_url"
              ref="merchant_url"
              readonly
            >
              <template slot="append-outer">
                <v-icon class="cursor" @click="openTab()"
                  >mdi-open-in-new</v-icon
                >
                <v-icon class="mr-2 ml-1 cursor" @click="copyUrl()"
                  >mdi-content-copy</v-icon
                >
              </template>
            </v-text-field>
          </div>
          <p class="describe">Your store link</p>
        </v-sheet>

        <v-card-text class="text-left pa-0"
          >Store front image (max size: 1mb)</v-card-text
        >
        <div style="display: flex">
          <img
            :src="background"
            alt=""
            width="100%"
            height="250"
            @click="$refs.backgroundInput.click()"
            style="border: 0.5px solid #E5E9F2;; border-radius: 8px; margin: 0 auto; object-fit: cover; object-position: top"
          />
        </div>
  <v-card-text class="text-left pa-0 my-3"
          >Click image to change</v-card-text
        >
        <input
          ref="backgroundInput"
          type="file"
          accept="image/*"
          @change="uploadImage($event)"
          name="Store front photo"
          style="display: none"
        />

        <v-card-text class="text-left pa-0 "
          >Store logo (max size: 1mb)</v-card-text
        >
        <div style="display: flex">
          <img
            :src="logo"
            alt=""
            width="100%"
            height="250"
            @click="$refs.logoInput.click()"
            style="border: 0.5px solid #E5E9F2;; border-radius: 8px; margin: 0 auto; object-fit: cover; object-position: top"
          />
        </div>
         <v-card-text class="text-left pa-0 my-3"
          >Click image to change</v-card-text
        >
        <input
          ref="logoInput"
          type="file"
          accept="image/*"
          @change="uploadLogo($event)"
          name="Store logo"
          style="display: none"
        />

        <v-card-text class="text-left pa-0 mt-5">About your store</v-card-text>
        <v-sheet elevation="0" rounded="lg" class="mt-2">
          <v-textarea
            outlined
            v-model="inputFields.about"
            :placeholder="store.about"
          ></v-textarea>
        </v-sheet>

        <v-card-text class="text-left pa-0">Support store email</v-card-text>
        <v-text-field
          outlined
          class="mt-2"
          v-model="inputFields.email"
          :placeholder="store.email"
        ></v-text-field>

        <v-card-text class="text-left pa-0">Phone number</v-card-text>
        <v-text-field
          outlined
          type="number"
          class="mt-2"
          v-model="inputFields.phone1"
          :placeholder="store.phone1"
        ></v-text-field>

        <v-card-text class="text-left pa-0"
          >Alternate phone number (optional)</v-card-text
        >
        <v-text-field
          outlined
          type="number"
          class="mt-2"
          v-model="inputFields.phone2"
          :placeholder="store.phone2"
        ></v-text-field>

        <v-card-text class="text-left pa-0">Address (if public)</v-card-text>
        <v-text-field
          outlined
          class="mt-2"
          v-model="inputFields.address"
          :placeholder="store.address"
        ></v-text-field>

        <v-card-text class="text-left pa-0 mt-5"
          >Social media handles</v-card-text
        >
        <v-sheet
          elevation="0"
          rounded="lg"
          color="bg_grey"
          class="mt-2 mb-5 pa-5"
        >
          <ul>
            <li v-for="(platform, i) in inputFields.latforms" :key="i">
              {{ platform.logo }} {{ platform.name }}
              <v-text-field
                class="ma-0"
                v-model="inputFields.platforms[i].handle"
                placeholder=""
              ></v-text-field>
            </li>
          </ul>
        </v-sheet>
      </div>
      <setupFooter @saveSetUp="save()">
        Save StoreDetails
      </setupFooter>
    </v-card>
  </div>
</template>

<script>
import { EventBus } from "@/services/eventBus";
import { mapGetters } from "vuex";
import { updateStore } from "@/services/apiServices";
import * as mutationTypes from "@/store/mutationTypes";

import setupFooter from "@/components/setupFooter";

export default {
  name: "StoreDetails",
  components: {
    setupFooter,
  },
  data: () => ({
    logo: "",
    background: "",
    inputFields: {
      about: "",
      email: "",
      phone1: "",
      phone2: "",
      address: "",
      platforms: [
        { logo: "", name: "Instagram", handle: "" },
        { logo: "", name: "Twitter", handle: "" },
        { logo: "", name: "Facebook", handle: "" },
      ],
    },
    bck_img: null,
  }),
  methods: {
    copyUrl() {
      let url = this.$refs.merchant_url.$el.querySelector("input");
      url.select();
      document.execCommand("copy");
      EventBus.$emit("open_alert", "info", "store url copied");
    },
    openTab() {
      window.open("https://" + this.storeSlug + ".leyyow.com", "_blank");
    },
    uploadImage(e) {
      let form = new FormData();
      form.append("background", e.target.files[0]);
      // this.uploadingImage = true;
      updateStore(form, this.store.id)
        .then((res) => {
          let store = res.data;
          this.$store.commit(mutationTypes.SAVE_STORE, store);
        })
        .catch((err) => {
          EventBus.$emit(
            "open_alert",
            "error",
            "error uploading store image " + err
          );
        })
        .finally(() => {
          EventBus.$emit("open_alert", "success", "Store image saved");
          //   this.uploadingImage = false;
        });
    },
    uploadLogo(e) {
      let form = new FormData();
      var file = e.target.files[0];
      var reader = new FileReader();
      reader.onloadend = function() {
        if (reader.result) {
          switch (e.target.name) {
            case "Store front photo":
              this.background = String(reader.result);
              break;
            case "Store logo":
              this.logo = String(reader.result);
              break;

            default:
              break;
          }
        }
      };
      reader.readAsDataURL(file);

      form.append("logo", e.target.files[0]);
      // this.uploadingImage = true;
      updateStore(form, this.store.id)
        .then((res) => {
          let store = res.data;
          this.$store.commit(mutationTypes.SAVE_STORE, store);
        })
        .catch((err) => {
          EventBus.$emit(
            "open_alert",
            "error",
            "error uploading store image " + err
          );
        })
        .finally(() => {
          EventBus.$emit("open_alert", "success", "Store image saved");
          //   this.uploadingImage = false;
        });
    },
    save() {
      // let payload = {}

      // for (const key in data) {
      //   if(data[key]){
      //     payload[key] = data[key]
      //   }
      //   }

      // console.log(payload)
      // const data = {...this.store, ...{about, email, phone1, phone2, address, platforms}}

      console.log(this.inputFields);
      // this.about.trim() != this.store.about.trim() ? data.about = this.about : ""
      // this.email.trim() != this.store.email.trim() ? data.email = this.email : ""
      // this.phone1.trim() != this.store.phone1.trim() ? data.phone1 = this.phone1 : ""
      // this.phone2.trim() != this.store.phone2.trim() ? data.phone2 = this.phone2 : ""
      // this.address.trim() != this.store.address.trim() ? data.address = this.address : ""
      // this.platforms[0].handle.trim() != this.store.instagram.trim() ? data.instagram = this.platforms[0].handle : ""
      // this.platforms[1].handle.trim() != this.store.twitter.trim() ? data.twitter = this.platforms[1].handle : ""
      // this.platforms[2].handle.trim() != this.store.facebook.trim() ? data.facebook = this.platforms[2].handle : ""
      let data = this.inputFields;
      delete data.logo;
      delete data.background;
      updateStore(data, this.store.id)
        .then((res) => {
          let store = res.data;
          this.$store.commit(mutationTypes.SAVE_STORE, store);
          EventBus.$emit("open_alert", "success", "Store info updated");
          this.$router.go(0);
        })
        .catch((err) =>
          EventBus.$emit(
            "open_alert",
            "error",
            "there was an error updating store" + err
          )
        )
        .finally(() => {});
    },
  },
  computed: {
    ...mapGetters({
      store: "getStore",
      storeSlug: "getStoreSlug",
      settings: "getSettingsState",
    }),
    merchant_url() {
      console.log(this.store);
      return this.storeSlug + ".leyyow.com";
    },
  },
  mounted() {
    this.inputFields = this.store;
    this.logo = this.store.logo;
    this.background = this.store.background;
  },
};
</script>

<style scoped>
ul {
  /* max-width: 300px; */
  margin: 0;
  padding: 0;
  color: #69747e;
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

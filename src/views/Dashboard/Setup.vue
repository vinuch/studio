<template>
  <div class="setup">
    <div class="body">
      <p class="utb title">
        Setup your store
      </p>
      <p class="sub-title">
        Enter your store details to continue
      </p>

      <div class="fields">
        <FloatingLabel
          :config="{
            label: 'Store name',
            ...floatingConfig,
          }"
        >
          <input
            v-model="store_details.store_name"
            name="store name"
            type="text"
          />
        </FloatingLabel>

        <FloatingLabel
          :config="{
            label: 'Store link',
            ...floatingConfig,
          }"
        >
          <input :value="`iamcart.io/${slug}`" name="store link" />
        </FloatingLabel>

        <FloatingLabel
          :config="{
            label: 'Support email',
            ...floatingConfig,
          }"
        >
          <input v-model="store_details.email" name="Support email" />
        </FloatingLabel>

        <FloatingLabel
          :config="{
            label: 'Support phone no. (optional)',
            ...floatingConfig,
          }"
        >
          <input
            v-model="store_details.phone1"
            name="Support phone no. (optional)"
          />
        </FloatingLabel>

        <a-button :loading="loading" class="main-btn" @click="submit">
          Create store
        </a-button>
      </div>
    </div>
  </div>
</template>
<script>
import FloatingLabel from "vue-simple-floating-labels";
import { updateStore } from "../../services/apiServices";
import { EventBus } from "../../services/eventBus";
export default {
  data() {
    return {
      store_details: {
        store_name: "",
        email: "",
        phone1: "",
      },

      loading: false,
      toggleType: false,
      floatingConfig: {
        hasClearButton: false,
        line: false,
        labelOffset: {
          left: 20,
          top: 10,
        },
        colors: {
          focusColor: "#3A50D5",
          errorColor: "#ff0000",
          lineColor: "#128CED",
          blurredColor: "#66768A",
        },
      },
    };
  },
  components: {
    FloatingLabel,
  },
  computed: {
    slug() {
      return this.store_details.store_name.replace(/ /g, "-");
    },
  },
  methods: {
    alat() {
      EventBus.$emit(
        "open_alert",
        "info",
        "welcome home to a word filler with things that will make you go wow!!!!"
      );
    },
    submit() {
      let data = {
        ...this.store_details,
        slug: this.slug,
        address: "",
        // logo
        instagram: "",
        twitter: "",
        facebook: "",
        about: "",
        // open_hours: this.store.open_hours,
        plan: "0",
        default_shipping: "Pick up,0", // shipping fee
        // cac_reg
        // background
        store_type: "",
        paystack_public_key: "",
        paystack_secret_key: "",
        moratorium: 7,
        plan_status: "0",
      };
      this.loading = true;
      // console.log(data);
      updateStore(data)
        .then(() => {
          // console.log(res);
          // this.$router.push("/dashboard/report");
        })
        .catch(() => {
          // console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.setup {
  .nav {
    width: 100%;
    height: 72px;
    background-color: #fff;
    border-bottom: 1px solid #e6e9ef;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 60px;
  }
  .body {
    width: 100%;
    min-height: calc(100vh - 72px);
    display: flex;
    padding-top: 80px;
    align-items: center;
    flex-direction: column;
    position: relative;
    padding-bottom: 50px;
    .title {
      font-size: 28px;
      line-height: 35px;
      text-align: center;
      color: #2b2b2b;
      margin-bottom: 10px;
    }
    .sub-title {
      font-size: 16px;
      line-height: 20px;
      text-align: center;
      color: #4d5868;
    }
  }

  .fields {
    width: 400px;
    .show {
      right: 0px;
      position: absolute;
      top: 35%;
      cursor: pointer;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      color: #8093ad;
    }
    .warning {
      font-size: 14px;
      line-height: 17px;
      color: #8093ad;
      text-align: left;
      margin-top: -10px;
    }
    .label_ {
      font-size: 12px;
      line-height: 15px;
      letter-spacing: 0.05em;
      color: #8093ad;
      text-align: left;
      margin-top: 20px;
      margin-bottom: 8px;
      font-family: untitled-sans-medium;
    }
    .business_type {
      border-width: 2px;
      border-style: solid;
      border-radius: 4px;
      padding: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 125px;
      cursor: pointer;
      border-color: #e6e9ef;
      p {
        font-weight: 500;
        text-align: center;
        margin-top: 7px;
        color: #4d5868;
        font-size: 16px;
        line-height: 20px;
        text-align: center;
      }
      &.active {
        border-color: #3a50d5;
        p {
          font-weight: 500;
          font-size: 16px;
          line-height: 20px;
          text-align: center;
          color: #2b2b2b;
          font-family: untitled-sans-medium;
        }
      }
    }
    .main-btn {
      width: 100%;
      height: 56px;
      margin-top: 10px;
      margin-bottom: 25px;
    }
    .footer-text {
      font-size: 16px;
      line-height: 20px;
      text-align: center;
      color: #4d5868;
      .blue__text {
        font-family: untitled-sans-medium;
      }
    }
  }
  .progress-wrap {
    width: 100%;
    height: 8px;
    background: #e6e9ef;
    position: fixed;
    bottom: 0;
    .progress {
      background-color: #09ad5f;
      height: 8px;
      transition: linear all 0.3s;
    }
  }

  @media (max-width: 767px) {
    .nav {
      padding: 0 20px;
    }
    .body {
      .sub-title {
        width: 90%;
      }
    }
    .fields {
      width: 100%;
      padding: 0 20px;
    }
  }
}
</style>

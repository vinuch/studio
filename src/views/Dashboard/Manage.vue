<template>
  <div class="manage">
    <div class="contents">
      <p class="title utb">
        Manage
      </p>
      <p class="utm sub-title">
        SHARE YOUR STORE
      </p>
      <div class="grey">
        <div class="address">
          <div class="address-text utm">iamcart.io/{{ store.slug }}</div>
          <div class="squares">
            <div class="copy">
              <img src="../../assets/copy.svg" alt="" />
            </div>
            <div class="share">
              <img src="../../assets/link.svg" alt="" />
            </div>
          </div>
        </div>

        <p class="desc">
          Share your store link with customers so they can do business with you
          easily online.
        </p>

        <div class="images">
          <img src="../../assets/whatsapp.svg" alt="" />
          <img src="../../assets/facebook.svg" alt="" />
          <img src="../../assets/twitter.svg" alt="" />
          <img src="../../assets/sms.svg" alt="" />
          <img src="../../assets/blackmail.svg" alt="" />
        </div>
      </div>

      <div class="fields">
        <FloatingLabel
          class="input__container--content"
          :config="{
            label: 'Store name',
            ...floatingConfig,
          }"
        >
          <input
            autofocus
            v-model="store.store_name"
            name="store name"
            type="text"
          />
        </FloatingLabel>

        <FloatingLabel
          class="input__container--content"
          :config="{
            label: 'Store link',
            ...floatingConfig,
          }"
        >
          <input v-model="store.slug" name="store link" />
        </FloatingLabel>

        <FloatingLabel
          class="input__container--content"
          :config="{
            label: 'Support email',
            ...floatingConfig,
          }"
        >
          <input v-model="store.email" name="Support email" />
        </FloatingLabel>

        <FloatingLabel
          class="input__container--content"
          :config="{
            label: 'Support phone no. (optional)',
            ...floatingConfig,
          }"
        >
          <input v-model="store.phone1" name="Support phone no. (optional)" />
        </FloatingLabel>

        <a-button class="main-btn" @click="submit">
          Save changes
        </a-button>
      </div>
    </div>
  </div>
</template>
<script>
import FloatingLabel from "vue-simple-floating-labels";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      store_: {},
      floatingConfig: {
        hasContent: true,
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
    ...mapGetters({
      store: "getStore",
    }),
  },
  mounted() {},
  methods: {
    submit() {},
  },
};
</script>
<style lang="scss" scoped>
.manage {
  .contents {
    width: 400px;
    margin: 30px auto;
    text-align: left;
    .title {
      font-size: 28px;
      line-height: 35px;
      color: #2b2b2b;
    }
    .sub-title {
      font-size: 12px;
      line-height: 15px;
      letter-spacing: 0.05em;
      color: #8093ad;
    }
    .grey {
      background: #f8f9fa;
      border-radius: 4px;
      padding: 15px;
      margin-bottom: 12px;
      .address {
        border: 1px solid #e6e9ef;
        box-sizing: border-box;
        border-radius: 4px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 44px;
        .address-text {
          font-weight: 500;
          font-size: 16px;
          line-height: 20px;
          color: #2b2b2b;
          padding: 0 12px;
        }
        .squares {
          display: flex;
          flex-direction: row;
          .copy {
            width: 44px;
            height: 44px;
            border-right: 1px solid #e6e9ef;
            border-left: 1px solid #e6e9ef;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .share {
            width: 44px;
            height: 44px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
      .desc {
        font-size: 14px;
        line-height: 150%;
        color: #4d5868;
        margin-top: 10px;
      }
      .images {
        cursor: pointer;
        img {
          margin: 0 15px 0 0;
        }
      }
    }
    .fields {
      .main-btn {
        width: 100%;
        height: 56px;
      }
    }
  }
  @media (max-width: 767px) {
    .contents {
      width: 100%;
      padding: 50px 20px 120px;
    }
  }
}
</style>

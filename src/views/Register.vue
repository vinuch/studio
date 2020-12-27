<template>
  <div class="register">
    <div class="nav">
      <img src="../assets/logo.svg" alt="" v-if="step === 1" />
      <a-icon
        type="left"
        @click="step = step - 1"
        v-else
        :style="{ fontSize: '16px', color: '#8093AD' }"
      />
      <a-icon type="close" :style="{ fontSize: '16px', color: '#8093AD' }" />
    </div>
    <div class="body">
      <p class="utb title">
        Create your account
      </p>
      <p class="sub-title">
        Type your email and password to get started
      </p>

      <div class="fields" v-if="step === 2">
        <FloatingLabel
          :config="{
            label: 'Email address',
            ...floatingConfig,
          }"
        >
          <input name="email" type="text" />
        </FloatingLabel>

        <FloatingLabel
          :config="{
            label: 'Password',
            ...floatingConfig,
          }"
        >
          <input name="Password" :type="toggleType ? 'text' : 'password'" />
          <span class="show" @click="toggleType = !toggleType">Show</span>
        </FloatingLabel>
        <p class="warning">
          At least 6 characters including number & uppercase
        </p>

        <a-button class="main-btn" @click="signin()">
          Take me to my store
        </a-button>

        <p class="footer-text blue__text">
          By creating an account, you agree to our
          <span class="blue__text">Terms of Use</span> and
          <span class="blue__text">Privacy Policy</span>
        </p>
        <p class="footer-text blue__text">
          Not your first time?
          <router-link to="/signin"
            ><span class="blue__text">Log in</span></router-link
          >
        </p>
      </div>

      <div class="fields" v-if="step === 1">
        <FloatingLabel
          :config="{
            label: 'Store name',
            ...floatingConfig,
          }"
        >
          <input name="store name" type="text" />
        </FloatingLabel>
        <FloatingLabel
          :config="{
            label: 'Store URL',
            ...floatingConfig,
          }"
        >
          <input name="store url" type="text" />
        </FloatingLabel>

        <a-select
          dropdownClassName="input__container"
          style="width: 100%; height: 56px"
          placeholder="Type of store"
        ></a-select>

        <a-button class="main-btn" @click="step = 2">
          Continue
        </a-button>
      </div>

      <div class="progress-wrap">
        <div class="progress" :style="{ width: `${50 * step}%` }"></div>
      </div>
    </div>
  </div>
</template>
<script>
import FloatingLabel from "vue-simple-floating-labels";
export default {
  data() {
    return {
      step: 1,
      toggleType: false,
      business_type: 1,
      store_type: 1,
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
  methods: {
    signin() {
      this.$router.push("/dashboard/setup");
    },
  },
};
</script>
<style lang="scss" scoped>
.register {
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

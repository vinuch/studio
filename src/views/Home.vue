<template>
  <div class="home">
    <div class="hero">
      <div class="nav">
        <router-link :to="isLoggedIn ? '/dashbaord/orders' : '/'">
          <!-- <img src="../assets/leyyow_logo.svg" width="100px" alt="" /> -->
        </router-link>

        <div class="links" :class="navOpen ? 'open' : ''">
          <a @click="toLogin()">
            Log in
          </a>
          <button class="home-btn" @click="toSignup()">
            Get Started
          </button>
        </div>
        <img
          @click="navOpen = true"
          src="@/assets/menu-dark_old.svg"
          class="menu"
          width="40px"
          alt=""
        />
      </div>
      <div @click="navOpen = false">
        <h1>
          Thrive: (verb) to progress toward a goal despite circumstances.
        </h1>
        <p class="about">
          Leyyow gives you much more than an online store-front. Our mission is to help you thrive by providing software, support, training, and access you need to grow.
        </p>
      </div>
      <div class="maillist">
        <input
          v-model="email"
          type="text"
          placeholder="Enter your email address"
          :class="hasError ? 'has-error' : ''"
        />
        <button :loading="loading" class="home-btn" @click="toRegister()">
          Get started
        </button>
      </div>
      <footer>
        <span class="left utm">
          © 2021. Leyyow
        </span>

        <span class="mail utm">
          👋🏻 <a href="mailto:hello@leyyow.com">hello@leyyow.com</a>
        </span>
      </footer>
      <div class="shadow red top-left"></div>
      <div class="shadow blue bottom-right"></div>
      <div class="shadow green bottom-center hard"></div>
    </div>
  </div>
</template>

<script>
// import { joinWaitlist } from "../services/apiServices";
import { EventBus } from "../services/eventBus";
import * as mutationTypes from "../store/mutationTypes";
export default {
  data() {
    return {
      navOpen: false, email: "", loading: false, hasError: false };
  },
  computed: {
    isLoggedIn() {
      let token = window.sessionStorage.getItem("leyyow_token");
      return token ? true : false;
    },
  },
  methods: {
    toLogin() {
      this.$router.push("/login");
      this.navOpen = false
    },
    toSignup() {
      this.$router.push("/register");
      this.navOpen = false
    },
    toRegister() {
      if (!this.email) {
        this.hasError = true;
        return;
      }
      let email = this.email
      EventBus.$emit(
        "getting_started",
        "'" + this.email + "'",
      );
      this.$store.commit(mutationTypes.SAVE_EMAIL, email);
      this.$router.push("/register");

      // below for joining waitlist
      // this.loading = true;
      // joinWaitlist({ email: this.email })
      //   .then(() => {
      //     // console.log(res);
          // EventBus.$emit(
      //       "open_alert",
      //       "success",
      //       "Your request to join was sent successfully"
      //     );
      //   })
      //   .catch(() => {
      //     // console.log(err);
      //     EventBus.$emit(
      //       "open_alert",
      //       "error",
      //       "An error occured. Please try again"
      //     );
      //   })
      //   .finally(() => {
      //     this.loading = false;
      //   });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  // position: relative;
}
.shadow {
  position: absolute;
  width: 2px;
  height: 2px;
  border-radius: 1px;
}
.green {
  background: rgba(26, 246, 22, 0.5);
  box-shadow: 0 0 200px 200px rgba(26, 246, 22, 0.5);
}
.blue {
  background: rgba(58, 80, 213, 0.4);
  box-shadow: 0 0 270px 270px rgba(58, 80, 213, 0.4);
}
.dark-blue {
  background: rgba(0, 27, 56, 0.5);
  box-shadow: 0 0 270px 270px rgba(0, 27, 56, 0.5);
}
.red {
  background: rgba(240, 22, 153, 0.3);
  box-shadow: 0 0 350px 350px rgba(240, 22, 153, 0.3);
}
.orange {
  background: rgba(255, 122, 0, 0.5);
  box-shadow: 0 0 350px 350px rgba(255, 122, 0, 0.5);
}
.top-left {
  top: 450px;
  left: 50px;
}
.bottom-right {
  bottom: 150px;
  right: 150px;
}
.bottom-center {
  bottom: 0;
  left: 40%;
}
.home-btn {
  padding: 14px;
  color: #FFF;
  background: #001B38;
  border: 0;
}
.home-btn, .links a {
  font-weight: bold;
  font-size: 16px;
}
h1 {
  width: 80%;
  margin: 70px auto 50px;
  padding: 0 20px;
  font-family: Comfortaa, Helvetica, Arial, sans-serif;
  font-size: 70px;
  font-weight: bold;
  line-height: 120%;
  letter-spacing: 0.01em;
  color: #001B38;
}
.about {
  width: 100%;
  max-width: 700px;
  margin: 0 auto 60px;
  font-size: 22px;
  line-height: 144%;
  font-weight: 400;
}
.maillist {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  input {
    float: left;
    width: 65%;
    padding: 12px 0 12px 33px;
    font-size: 16px;
    border: 2px solid #001B38;
    border-right: 0;
    border-radius: 33px 0 0 33px;
  }
  input:focus {
    outline: none;
  }
  .home-btn {
    float: right;
    width: 35%;
    border-radius: 0 33px 33px 0;
  }
}
.home {
  .hero {
    height: 100vh;
    width: 100%;
    // background: #10102C;
    .nav {
      padding: 0 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      height: 72px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .links {
        span {
          margin: 0 10px;
          font-size: 16px;
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
        }
        .close {
          display: none;
        }
      }
      .links, img {
        margin-top: 20px;
      }
      .menu {
        display: none;
      }
      .home-btn {
        padding: 12px 20px;
        margin-left: 30px;
        border-radius: 31px;
      }
    }
  }
  footer {
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 72px;
    width: 100%;
    padding: 0 130px;
    .left {
      font-size: 16px;
      line-height: 20px;
      color: #8093ad;
    }
    .mail {
      font-size: 16px;
      line-height: 20px;
      text-align: right;
      color: #3a50d5;
    }
  }

  @media (max-width: 1100px) {
    h1 {
      width: 100%;
    }
    .hero {
      height: 750px;
      .nav {
        width: 100%;
        // position: fixed;
        top: 0;
        left: 0;
        z-index: 12;
        .links {
          height: 0;
          overflow: hidden;
          transition: linear all 0.2s;
          &.open {
            display: block;
            width: 100%;
            position: fixed;
            top: -20px;
            left: 0;
            background-color: #10102c;
            height: auto;
            padding: 20px 0;
            z-index: 1120;
            span {
              display: block;
              margin: 15px 0;
            }
            .close {
              display: block;
            }
          }
        }
        .menu {
          display: block;
          cursor: pointer;
        }
      }
      footer {
        padding: 0 20px;
      }
    }
  }
  @media (max-width: 990px) {
    h1 {
      margin: 120px auto 30px;
      font-size: 49px;
    }
    .about {
      padding: 0 30px;
      font-size: 18px;
    }
  }
  @media (max-width: 800px) {
    .top-left {
      top: 450px;
      left: 0;
    }
    .bottom-right {
      bottom: 100px;
      right: 100px;
    }
    .bottom-center {
      bottom: 0;
      left: 30%;
    }
  }
  @media (max-width: 620px) {
    h1 {
      margin: 60px auto 30px;
      font-size: 38px;
    }
    .maillist {
      input {
        width: 100%;
        padding: 12px 33px;
        margin-bottom: 20px;
        border: 2px solid #001B38;
        border-radius: 33px;
      }
      .home-btn {
        width: 100%;
        border-radius: 33px;
      }
    }
    .green {
      display: none
    }
    .yellow {
      background: rgba(255, 239, 99, 0.5);
      box-shadow: 0 0 80px 80px rgba(255, 239, 99, 0.5);
    }
    .blue {
      // background: rgba(58, 80, 213, 0.4);
      // box-shadow: 0 0 170px 170px rgba(58, 80, 213, 0.4);
      background: rgba(26, 246, 22, 0.5); // this is green
      box-shadow: 0 0 120px 120px rgba(26, 246, 22, 0.5);
    }
    .red {
      // background: rgba(240, 22, 153, 0.3);
      // box-shadow: 0 0 200px 200px rgba(240, 22, 153, 0.3);
      background: rgba(255, 239, 99, 0.5); // this is yellow
      box-shadow: 0 0 120px 120px rgba(255, 239, 99, 0.5);
    }
    .top-left {
      top: 250px;
      left: 0
    }
    .bottom-right {
      bottom: 350px;
      right: 0;
    }
  }

  @media (max-width: 550px) {
    .maillist {
      padding: 0 20px;
    }
  }
}
</style>

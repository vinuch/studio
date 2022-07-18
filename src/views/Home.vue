<template>
  <div class="home">
    <div class="hero">
      <div class="nav">
        <img
          src="@/assets/logo-1.png"
          style="width: 85px; height: 40px; margin: 0"
          alt=""
        />
        <p style="margin: 0;">
          
          <span style="color: #F96167; font-weight: 500" @click="toLogin()"
            >Login</span
          >
        </p>
      </div>
      <div @click="navOpen = false">
        <h1>
          <svg
            style="position: absolute"
            width="245"
            height="68"
            viewBox="0 0 245 68"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M243.715 16.7762C243.977 18.6057 243.451 20.542 242.137 22.5733C240.821 24.6082 238.73 26.7128 235.913 28.8513C230.281 33.1282 221.834 37.4784 211.18 41.6469C189.881 49.9809 159.866 57.5476 126.189 62.3616C92.5113 67.1756 61.5788 68.3209 38.7975 66.288C27.4028 65.2711 18.0756 63.4615 11.4705 60.934C8.16778 59.6701 5.57016 58.2359 3.73669 56.6511C1.90651 55.0692 0.859608 53.3578 0.598081 51.5282C0.336554 49.6986 0.862045 47.7624 2.17573 45.7311C3.49179 43.6961 5.58357 41.5916 8.39993 39.453C14.0324 35.1762 22.4791 30.8259 33.1326 26.6574C54.432 18.3235 84.4466 10.7567 118.124 5.94274C151.802 1.12874 182.734 -0.0165086 205.516 2.01639C216.91 3.03321 226.237 4.84281 232.843 7.37039C236.145 8.63423 238.743 10.0685 240.576 11.6532C242.407 13.2351 243.453 14.9466 243.715 16.7762Z"
              stroke="url(#paint0_linear_5223_31020)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_5223_31020"
                x1="118.053"
                y1="5.44777"
                x2="126"
                y2="30.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#F96167" />
                <stop offset="1" stop-color="#FFC350" stop-opacity="0" />
                <stop offset="1" stop-color="transparent" />
              </linearGradient>
            </defs>
          </svg>
          Thrive: (verb) to progress toward a goal despite circumstances.
        </h1>
        <p class="about">
          Leyyow gives you much more than an online store-front. Our mission is
          to help you thrive by providing software, support, training, and
          access you need to grow.
        </p>
      </div>

      <form>
        <div class="maillist">
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email address"
            :class="hasError ? 'has-error' : ''"
            style=""
          />
          <button
          :disabled="!email"
            type="submit"
            :loading="loading"
            class="home-btn"
            @click="
              (e) => {
                e.preventDefault();
                toRegister();
              }
            "
            :style="!email ? 'opacity: 50%;' : ''"
          >
            Join waitlist
          </button>
        </div>
      </form>

      <footer>
        <span class="left utm" style="color: #001b38;">
          © 2021. Leyyow
        </span>

        <span class="mail utm">
          👋🏻
          <a href="mailto:hello@leyyow.com" style="color: #001b38;"
            >hello@leyyow.com</a
          >
        </span>
      </footer>
      <div class="blur"></div>
      <!-- <div class="shadow red top-left"></div>
      <div class="shadow blue bottom-right"></div>
      <div class="shadow green bottom-center hard"></div> -->
    </div>
  </div>
</template>

<script>
import { joinWaitlist } from "../services/apiServices";
import { EventBus } from "../services/eventBus";
import * as mutationTypes from "../store/mutationTypes";
export default {
  data() {
    return {
      navOpen: false,
      email: "",
      loading: false,
      hasError: false,
    };
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
      this.navOpen = false;
    },
    toSignup() {
      this.$router.push("/register");
      this.navOpen = false;
    },
    toRegister() {
      if (!this.email) {
        this.hasError = true;
        return;
      }
      let email = this.email;
      EventBus.$emit("getting_started", "'" + this.email + "'");
      this.$store.commit(mutationTypes.SAVE_EMAIL, email);
      // this.$router.push("/register");

      // below for joining waitlist
      this.loading = true;
      joinWaitlist({ email: this.email })
        .then(() => {
          // console.log(res);
          this.email = ''
          EventBus.$emit(
            "open_alert",
            "success",
            "Your request to join was sent successfully"
          );
        })
        .catch((err) => {
          if (err.response.data.email) {
            EventBus.$emit("open_alert", "error", err.response.data.email[0]);
          } else {
            EventBus.$emit(
              "open_alert",
              "error",
              "An error occured. Please try again"
            );
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.blur {
  position: absolute;
  bottom: -12rem;
  width: 100%;
  height: 10rem;
  background: #f96167;
  filter: blur(1000px);
  transform: rotate(-180deg);
}
.home {
  overflow-y: hidden;
  position: relative;
  height: 100vh;
  background: #f0f7ff;
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
  color: #fff;
  background: #001b38;
  border: 0;
}
.home-btn,
.links a {
  font-weight: bold;
  font-size: 16px;
}
h1 {
  position: relative;
  width: 70%;
  margin: 70px auto 50px;
  padding: 0 20px;
  font-family: Comfortaa, Helvetica, Arial, sans-serif;
  font-size: 65px;
  font-weight: 500;
  line-height: 120%;
  letter-spacing: 0.01em;
  color: #001b38;
}
.about {
  width: 35%;
  max-width: 700px;
  margin: 0 auto 60px;
  font-size: 18px;
  line-height: 144%;
  font-weight: 400;
}
.maillist {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  input {
    width: 25%;
    margin-right: 2rem;
    padding: 16px 18px;
    border: 1px solid #c5d6e8;
    border-radius: 8px;
  }

  button {
    border-radius: 8px;
    padding: 16px 32px;
  }
}
.home {
  .hero {
    height: 100%;
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
      .links,
      img {
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
      height: 100vh;

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
      width: 100%;
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
      font-size: 47px;
    }
    .maillist {
      input {
        width: 100%;
        margin: 0 0 1rem;
      }
      button {
        width: 100%;
      }
    }
    .green {
      display: none;
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
      left: 0;
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

<template>
  <div class="home">
    <div class="hero">
      <div class="nav">
        <img src="../assets/white-logo.svg" alt="" />

        <div class="links" :class="navOpen ? 'open' : ''">
          <button class="main-btn" @click="toLogin()">
            Log in
          </button>
        </div>
        <img
          @click="navOpen = true"
          src="../assets/menu.svg"
          class="menu"
          alt=""
        />
      </div>

      <div class="hero-data">
        <div class="hero-text">
          <p class="big utb">
            Grow your business
          </p>
          <p class="sm">
            Much more than a store front.
          </p>
          <p class="sm">
            Our mission is to be the backbone of small and medium-sized
            businesses by providing software, support, training, and access they
            need to thrive.
          </p>
        </div>
      </div>
    </div>

    <section class="why">
      <div class="unlock">
        <p class="unlock-title utb">
          Unlock growth
        </p>
        <p class="unlock-sub-title">
          Leyyow powers growth in your business. Join the waiting list and be
          among the first to experience our platform.
        </p>

        <input v-model="email" type="text" placeholder="your email address" />
        <a-button :loading="loading" class="main-btn" @click="toRegister()">
          Join waitlist
        </a-button>
      </div>
    </section>
    <footer>
      <span class="left utm">
        © 2020. Leyyow
      </span>

      <span class="mail utm">
        👋🏻 hello@leyyow.com
      </span>
    </footer>
  </div>
</template>

<script>
import { joinWaitlist } from "../services/apiServices";
export default {
  data() {
    return { navOpen: false, email: "", loading: false };
  },
  methods: {
    toLogin() {
      this.$router.push("/signin");
    },
    toRegister() {
      this.loading = true;
      joinWaitlist({ email: this.email })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  .hero {
    height: 480px;
    width: 100%;
    background: #10102c;
    .nav {
      padding: 0 130px;
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
      .menu {
        display: none;
      }
      .main-btn {
        height: 40px;
        padding: 0 12px;
      }
    }
    .hero-data {
      display: flex;
      flex-direction: row;
      .hero-text {
        padding: 120px 60px 50px 130px;
        width: 100%;
        text-align: center;
        .big {
          font-size: 48px;
          line-height: 120%;
          color: #ffffff;
          margin-bottom: 12px;
          margin-bottom: 30px;
        }
        .sm {
          font-size: 18px;
          line-height: 160%;
          color: rgba(255, 255, 255, 0.8);
          width: 50%;
          margin-left: 25%;
          margin-bottom: 0;
        }
        .line-btn {
          background: rgba(248, 232, 182, 0.1);
          border: 2px solid #f8e8b6;
          border-radius: 4px;
          color: #f8e8b6;
        }
        button {
          height: 45px;
          padding: 0 40px;
          margin-right: 10px;
        }
      }
      .hero-img {
        width: 50%;
        img {
          width: 450px;
          margin-top: 100px;
        }
      }
    }
  }

  .why {
    padding: 90px 130px;
    .why-title {
      font-size: 40px;
      line-height: 120%;
      color: #2b2b2b;
      text-align: left;
      margin-bottom: 60px;
    }
    .why-col {
      border-top: 3px solid #f8e8b6;
      border-radius: 2px;
      text-align: left;
      .bg {
        font-size: 32px;
        line-height: 120%;
        color: #2b2b2b;
        margin-bottom: 20px;
        text-align: left;
        margin-top: 20px;
        width: 80%;
      }
      .sm {
        font-size: 16px;
        line-height: 160%;
        color: #4d5868;
        text-align: left;
      }
      img {
        height: 150px;
        margin-left: -20px;
      }
    }

    .unlock {
      background: #f8e8b6;
      border-radius: 25px;
      width: 50%;
      height: 300px;
      padding: 40px;
      margin: 70px 25% 0;
      .unlock-title {
        font-size: 40px;
        line-height: 120%;
        text-align: center;
        color: #10102c;
        margin-bottom: 0px;
      }
      .unlock-sub-title {
        font-size: 16px;
        line-height: 160%;
        text-align: center;
        color: #10102c;
        width: 500px;
        margin: 20px auto;
      }

      input {
        width: 300px;
        height: 45px;
        border: 1px solid #10102c;
        border-radius: 4px;
        background-color: transparent;
        margin-right: 10px;
        padding-left: 15px;
        &:focus {
          outline: none;
        }
      }
      .main-btn {
        height: 45px;
        padding: 0 30px;
      }
    }
  }

  footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 72px;
    width: 100%;
    padding: 0 130px;
    border-top: 1px solid #e6e9ef;
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

  @media (max-width: 767px) {
    .hero {
      height: 750px;
      .nav {
        padding: 0 20px;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 12;
        background-color: #10102c;
        .links {
          height: 0;
          overflow: hidden;
          transition: linear all 0.2s;
          &.open {
            display: block;
            width: 100%;
            position: fixed;
            top: 0;
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
        }
      }
      .hero-data {
        margin-top: 72px;
        flex-direction: column;
        .hero-text {
          width: 100%;
          padding: 30px;
          .big {
            font-size: 32px;
          }
        }
        .hero-img {
          width: 100%;
          padding: 30px;
          img {
            width: 100%;
            margin-top: 0px;
          }
        }
      }
    }
    .why {
      margin-top: 120px;
      padding: 30px;
      .why-col {
        margin-bottom: 40px;
      }
      .unlock {
        height: auto;
        .unlock-sub-title {
          width: 90%;
        }
        input {
          width: 100%;
          margin: 12px 0;
        }
        .main-btn {
          width: 100%;
        }
      }
    }
    footer {
      padding: 0 30px;
    }
  }
  @media (max-width: 767px) {
    .hero {
      height: auto;
      min-height: 375px;
      .hero-data .hero-text {
        .sm {
          padding: 30px 50px 0;
          width: 100%;
          margin: 0 0 -20px;
        }
      }
    }
    .why {
      margin-top: 20px;
      .unlock {
        width: 100%;
        margin: 0;
      }
    }
  }
}
</style>

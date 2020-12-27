<template>
  <div class="home">
    <div class="hero">
      <div class="nav">
        <img src="../assets/white-logo.svg" alt="" />

        <div class="links" :class="navOpen ? 'open' : ''">
          <span class="close">
            <img @click="navOpen = false" src="../assets/cancel.svg" alt="" />
          </span>
          <span>
            Why Leyyow?
          </span>
          <span>
            View a merchant
          </span>
          <span @click="toLogin()">
            Log in
          </span>

          <button class="main-btn" @click="toRegister()">
            Join waitlist
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
            Start selling online in minutes.
          </p>
          <p class="sm">
            Give your business permission to grow! With Leyyow, you can create
            your online store as quickly as you can create an Instagram post.
          </p>

          <button class="main-btn" @click="toRegister()">
            Join waitlist
          </button>
          <button class="line-btn" @click="toLogin()">
            Log in
          </button>
        </div>
        <div class="hero-img">
          <img src="../assets/Image.png" alt="" />
        </div>
      </div>
    </div>

    <section class="why">
      <p class="why-title utb">
        Why Leyyow?
      </p>
      <a-row :gutter="30">
        <a-col :sm="24" :md="8">
          <div class="why-col">
            <p class="bg utb">
              Scale up your business.
            </p>
            <p class="sm">
              Make sales while you sleep! No back and forth in DMs and no time
              wasters. Leyyow helps you automate sales and manage your orders,
              allowing your business to grow.
            </p>
            <img src="../assets/grow.svg" alt="" />
          </div>
        </a-col>
        <a-col :sm="24" :md="8">
          <div class="why-col">
            <p class="bg utb">
              Enjoy integrated shipping.
            </p>
            <p class="sm">
              Our integrated courier services take the headache out of
              deliveries. You can say goodbye to sleepless nights wondering if
              customers will get their orders delivered.
            </p>
            <img src="../assets/discount2.svg" alt="" />
          </div>
        </a-col>
        <a-col :sm="24" :md="8">
          <div class="why-col">
            <p class="bg utb">
              Experience peace of mind.
            </p>
            <p class="sm">
              Staying on top of orders and after-sales issues such as returns
              and exchanges helps you maintain sanity and create trust with your
              customers.
            </p>
            <img src="../assets/save.svg" alt="" />
          </div>
        </a-col>
      </a-row>

      <div class="unlock">
        <p class="unlock-title utb">
          Unlock growth
        </p>
        <p class="unlock-sub-title">
          Leyyow powers growth in your business. Join the waiting list and be
          among the first to experience our platform.
        </p>

        <input type="text" />
        <button class="main-btn" @click="toRegister()">
          Join waitlist
        </button>
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
export default {
  data() {
    return { navOpen: false };
  },
  methods: {
    toLogin() {
      this.$router.push("/signin");
    },
    toRegister() {
      this.$router.push("/signup");
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  .hero {
    height: 680px;
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
        width: 50%;
        text-align: left;
        .big {
          font-size: 48px;
          line-height: 120%;
          color: #ffffff;
          margin-bottom: 12px;
        }
        .sm {
          font-size: 18px;
          line-height: 160%;
          color: rgba(255, 255, 255, 0.8);
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
      width: 100%;
      height: 300px;
      padding: 40px;
      margin-top: 70px;
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
}
</style>

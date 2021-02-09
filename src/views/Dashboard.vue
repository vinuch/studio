<template>
  <div class="dashboard">
    <div class="nav">
      <div class="left">
        <div class="inside">
          <div class="storename">
            {{ store.store_name }}
          </div>
          <div
            @click="jumpTo(i)"
            class="link"
            :class="currentRoute !== `/dashboard${link.to}` && 'blur'"
            v-for="(link, i) in links"
            :key="`link${i}`"
          >
            <span v-html="getImg(link.icon)"></span>
            {{ link.text }}
          </div>
        </div>
      </div>
      <div class="right">
        <a-dropdown>
          <div style="cursor: pointer">
            <img src="../assets/profile.svg" alt="" />
            <svg
              style="margin-left: 10px"
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.29289 0.29289C0.68342 -0.09763 1.31658 -0.09763 1.70711 0.29289L5 3.5858L8.2929 0.29289C8.6834 -0.09763 9.3166 -0.09763 9.7071 0.29289C10.0976 0.68342 10.0976 1.31658 9.7071 1.70711L5.7071 5.7071C5.3166 6.0976 4.68342 6.0976 4.29289 5.7071L0.29289 1.70711C-0.09763 1.31658 -0.09763 0.68342 0.29289 0.29289Z"
                fill="white"
                fill-opacity="0.25"
              />
            </svg>
          </div>
          <a-menu slot="overlay" class="my-menu">
            <!-- <a-menu-item class="menu-item-wrap">
              <div class="menu-item no-b">
                <img
                  src="../assets/user.svg"
                  style="margin-right: 10px"
                  alt=""
                />
                <span
                  style="font-weight: 500;
                font-size: 14px;
                padding: 5px;
                color: rgba(255, 255, 255, 0.7);"
                >
                  Account</span
                >
              </div>
            </a-menu-item> -->
            <!-- <a-menu-item class="menu-item-wrap">
              <div class="menu-item">
                <img
                  src="../assets/annotation.svg"
                  style="margin-right: 10px"
                  alt=""
                />
                <span
                  style="font-weight: 500;
                font-size: 14px;
                padding: 5px;
                color: rgba(255, 255, 255, 0.7);"
                >
                  Support</span
                >
              </div>
            </a-menu-item> -->
            <!-- <a-menu-item class="menu-item-wrap">
              <div class="menu-item">
                <img
                  src="../assets/grad.svg"
                  style="margin-right: 10px"
                  alt=""
                />
                <span
                  style="font-weight: 500;
                font-size: 14px;
                padding: 5px;
                color: rgba(255, 255, 255, 0.7);"
                >
                  Help center</span
                >
              </div>
            </a-menu-item> -->
            <a-menu-item class="menu-item-wrap">
              <div class="menu-item" @click="logout()">
                <img
                  src="../assets/logout.svg"
                  style="margin-right: 10px"
                  alt=""
                />
                <span
                  style="font-weight: 500;
                font-size: 14px;
                padding: 5px;
                color: rgba(255, 255, 255, 0.7);"
                >
                  Logout</span
                >
              </div>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
    <div class="contents">
      <router-view />
    </div>

    <div class="mobile-nav" v-if="currentRoute !== '/dashboard/setup'">
      <div
        @click="jumpTo(i)"
        class="link"
        :class="currentRoute !== `/dashboard${link.to}` && 'blur'"
        v-for="(link, i) in links"
        :key="`link${i}`"
      >
        <span v-html="getImg(link.icon)"></span>
        <span class="txt">
          {{ link.text }}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { fetchOrders } from "../services/apiServices";
export default {
  data() {
    return {
      links: [
        {
          icon: "chart",
          text: "Report",
          to: "/report",
        },
        {
          icon: "order",
          text: "Orders",
          to: "/orders",
        },
        {
          icon: "tag",
          text: "Inventory",
          to: "/inventory",
        },
        {
          icon: "cog",
          text: "Manage",
          to: "/manage",
        },
      ],
      sideMenu: [
        {
          text: "Account",
          img: "user",
        },
        {
          text: "Support",
          img: "annotation",
        },
        {
          text: "Help centre",
          img: "grad",
        },
        {
          text: "Log out",
          img: "logout",
        },
      ],
      currentLink: 0,
    };
  },
  computed: {
    ...mapGetters({
      store: "getStore",
    }),
    currentRoute() {
      return this.$route.path;
    },
  },
  methods: {
    jumpTo(i) {
      this.currentLink = i;
      this.$router.push(`/dashboard${this.links[i].to}`);
    },
    getImg(name) {
      //   return require(`../assets/${name}.svg`);
      let img = "";
      switch (name) {
        case "chart":
          img = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 10C2 5.58172 5.58172 2 10 2V10H18C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z" fill="white" />
            <path d="M12 2.25195C14.8113 2.97552 17.0245 5.18877 17.748 8.00004H12V2.25195Z" fill="white"/>
            </svg>
            `;
          break;
        case "order":
          img = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z" fill="white"/>
            </svg>
            `;
          break;
        case "tag":
          img = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.7071 9.29289C18.0976 9.68342 18.0976 10.3166 17.7071 10.7071L10.7071 17.7071C10.3166 18.0976 9.68342 18.0976 9.29289 17.7071L2.29289 10.7071C2.0976 10.5118 1.99997 10.2558 2 9.99988V5C2 3.34315 3.34315 2 5 2H10.0003C10.2561 2.00007 10.5119 2.0977 10.7071 2.29289L17.7071 9.29289ZM5 6C5.55228 6 6 5.55228 6 5C6 4.44772 5.55228 4 5 4C4.44772 4 4 4.44772 4 5C4 5.55228 4.44772 6 5 6Z" fill="white"/>
            </svg>
            `;
          break;
        case "cog":
          img = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.4892 3.17094C11.1102 1.60969 8.8898 1.60969 8.51078 3.17094C8.26594 4.17949 7.11045 4.65811 6.22416 4.11809C4.85218 3.28212 3.28212 4.85218 4.11809 6.22416C4.65811 7.11045 4.17949 8.26593 3.17094 8.51078C1.60969 8.8898 1.60969 11.1102 3.17094 11.4892C4.17949 11.7341 4.65811 12.8896 4.11809 13.7758C3.28212 15.1478 4.85218 16.7179 6.22417 15.8819C7.11045 15.3419 8.26594 15.8205 8.51078 16.8291C8.8898 18.3903 11.1102 18.3903 11.4892 16.8291C11.7341 15.8205 12.8896 15.3419 13.7758 15.8819C15.1478 16.7179 16.7179 15.1478 15.8819 13.7758C15.3419 12.8896 15.8205 11.7341 16.8291 11.4892C18.3903 11.1102 18.3903 8.8898 16.8291 8.51078C15.8205 8.26593 15.3419 7.11045 15.8819 6.22416C16.7179 4.85218 15.1478 3.28212 13.7758 4.11809C12.8896 4.65811 11.7341 4.17949 11.4892 3.17094ZM10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z" fill="white"/>
                </svg>
            `;
          break;
        default:
          break;
      }
      return img;
    },
    logout() {
      sessionStorage.clear();
      localStorage.clear();
      this.$router.push("/signin");
    },
  },
  mounted() {
    fetchOrders();
  },
};
</script>
<style lang="scss">
.dashboard {
  padding-top: 72px;
  .nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #10102c;
    height: 72px;
    padding: 0 60px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    .left .inside {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 72px;
      .storename {
        color: #fff;
        margin-right: 20px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 4px;
        padding: 10px 20px;
      }
      .link {
        color: #fff;
        padding: 5px 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 72px;
        cursor: pointer;
        font-weight: 500;
        font-size: 14px;
        font-family: untitled-sans-medium;
        border-top: 4px solid #3a50d5;
        &.blur {
          opacity: 0.5;
          border-top: 4px solid #10102c;
        }
        // &:hover {
        //   background: rgba(255, 255, 255, 0.05);
        // }
        span {
          margin-right: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
  .mobile-nav {
    display: none;
  }

  .page-title {
    font-size: 22px;
    line-height: 27px;
    color: #2b2b2b;
    margin-top: 40px;
    margin-bottom: 35px;
  }
  @media (max-width: 767px) {
    .nav {
      padding: 0 20px;
      .left {
        .inside {
          .link {
            display: none;
          }
        }
      }
    }
    .mobile-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      display: flex;
      flex-direction: row;
      background: #10102c;
      width: 100%;
      .link {
        color: #fff;
        padding: 5px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60px;
        cursor: pointer;
        font-weight: 500;
        font-size: 12px;
        font-family: untitled-sans-medium;
        border-bottom: 4px solid #3a50d5;
        width: 25%;
        display: flex;
        flex-direction: column;
        &.blur {
          opacity: 0.5;
          border-bottom: 4px solid #10102c;
        }
        .txt {
          display: block;
          margin-top: -5px;
        }
      }
    }

    .page-title {
      margin-bottom: 15px;
      span {
        display: block;
      }
    }
  }
}

.my-menu {
  background: #10102c;
  border: 2px solid rgba(255, 255, 255, 0.05);
  box-sizing: border-box;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  width: 180px;
}
.menu-item-wrap {
  background: #10102c;
  &:hover {
    background: #1c1c41;
  }
}
.menu-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.02);
  &:hover {
    background: #1c1c41;
  }
}
</style>

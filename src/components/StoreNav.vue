<template>
  <div class="nav">
    <div class="logo-wrap">
      <div class="circle"></div>
      <div class="info">
        <p class="name utm">{{ store_name }}</p>
        <p class="view utm" @click="visible = true">
          View store info
          <svg
            width="6"
            height="8"
            viewBox="0 0 6 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.834318 7.76569C0.521902 7.45326 0.521902 6.94674 0.834318 6.63431L3.46865 4L0.834318 1.36568C0.521902 1.05328 0.521902 0.546721 0.834318 0.234321C1.14674 -0.0780792 1.65327 -0.0780792 1.96569 0.234321L5.16569 3.43432C5.47809 3.74672 5.47809 4.25326 5.16569 4.56569L1.96569 7.76569C1.65327 8.0781 1.14674 8.0781 0.834318 7.76569Z"
              fill="#F8E8B6"
            />
          </svg>
        </p>
      </div>
    </div>

    <div class="links">
      <div
        @click="jumpTo(i)"
        class="link"
        v-for="(link, i) in links"
        :class="currentRoute !== `${link.to}` && 'blur'"
        :key="`link${i}`"
      >
        <div class="badge" v-if="link.text === 'Cart' && cart.length">
          {{ cart.length }}
        </div>
        <span
          :class="currentRoute !== `${link.to}` && 'blur'"
          v-html="getImg(link.icon)"
        ></span>
        <span :class="currentRoute !== `${link.to}` && 'blur'">{{
          link.text
        }}</span>
      </div>
    </div>

    <a-drawer
      placement="right"
      :closable="false"
      :visible="visible"
      :width="drawerWidth"
      :maskStyle="{
        backgroundColor: 'rgba(16, 16, 44, 0.25);',
      }"
    >
      <div class="drawer-title" slot="title">
        <span class="utb">Store details</span>
        <img
          @click="visible = false"
          src="../assets/close.svg"
          alt=""
          style="cursor: pointer"
        />
      </div>

      <div class="circle_"></div>
      <p class="store-name utb">
        {{ store_name }}
      </p>

      <div class="contact utm">
        <span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 1C0 0.44772 0.44772 0 1 0H3.15287C3.64171 0 4.0589 0.35341 4.13927 0.8356L4.87858 5.27147C4.95075 5.70451 4.73206 6.13397 4.3394 6.3303L2.79126 7.10437C3.90756 9.8783 6.12168 12.0924 8.8956 13.2087L9.6697 11.6606C9.866 11.2679 10.2955 11.0492 10.7285 11.1214L15.1644 11.8607C15.6466 11.9411 16 12.3583 16 12.8471V15C16 15.5523 15.5523 16 15 16H13C5.8203 16 0 10.1797 0 3V1Z"
              fill="#3A50D5"
            />
          </svg>
          {{ storeInfo.phone1 }}
        </span>

        <a href="mailto:">
          <span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.00333 5.88355L9.99995 9.88186L17.9967 5.8835C17.9363 4.83315 17.0655 4 16 4H4C2.93452 4 2.06363 4.83318 2.00333 5.88355Z"
                fill="#3A50D5"
              />
              <path
                d="M18 8.11816L9.99995 12.1182L2 8.11822V14.0003C2 15.1049 2.89543 16.0003 4 16.0003H16C17.1046 16.0003 18 15.1049 18 14.0003V8.11816Z"
                fill="#3A50D5"
              />
            </svg>
            {{ storeInfo.email }}
          </span>
        </a>
      </div>
    </a-drawer>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    ...mapGetters({
      cart: "getVisitorCart",
      store_name: "getVisitedStoreName",
      storeInfo: "getVisitedStoreInfo",
    }),
    drawerWidth() {
      return window.innerWidth > 640 ? 640 : window.innerWidth;
    },
    currentRoute() {
      return this.$route.path;
    },
    links() {
      return [
        {
          icon: "tag",
          text: "Store",
          to: `/${this.store_name}`,
        },
        {
          icon: "cart",
          text: "Cart",
          to: `/${this.store_name}/cart`,
        },
      ];
    },
  },
  methods: {
    jumpTo(i) {
      this.currentLink = i;
      this.$router.push(`${this.links[i].to}`);
    },
    getImg(name) {
      let img = "";
      switch (name) {
        case "tag":
          img = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.7071 9.29289C18.0976 9.68342 18.0976 10.3166 17.7071 10.7071L10.7071 17.7071C10.3166 18.0976 9.68342 18.0976 9.29289 17.7071L2.29289 10.7071C2.0976 10.5118 1.99997 10.2558 2 9.99988V5C2 3.34315 3.34315 2 5 2H10.0003C10.2561 2.00007 10.5119 2.0977 10.7071 2.29289L17.7071 9.29289ZM5 6C5.55228 6 6 5.55228 6 5C6 4.44772 5.55228 4 5 4C4.44772 4 4 4.44772 4 5C4 5.55228 4.44772 6 5 6Z" fill="white"/>
            </svg>
            `;
          break;
        case "cart":
          img = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 1C2.44772 1 2 1.44772 2 2C2 2.55228 2.44772 3 3 3H4.21922L4.52478 4.22224C4.52799 4.23637 4.5315 4.25039 4.5353 4.26429L5.89253 9.69321L4.99995 10.5858C3.74002 11.8457 4.63235 14 6.41416 14H15C15.5522 14 16 13.5523 16 13C16 12.4477 15.5522 12 15 12H6.41417L7.41416 11H14C14.3788 11 14.725 10.786 14.8944 10.4472L17.8944 4.44721C18.0494 4.13723 18.0329 3.76909 17.8507 3.47427C17.6684 3.17945 17.3466 3 17 3H6.28078L5.97014 1.75746C5.85885 1.3123 5.45887 1 5 1H3Z" fill="white"/>
            <path d="M16 16.5C16 17.3284 15.3284 18 14.5 18C13.6716 18 13 17.3284 13 16.5C13 15.6716 13.6716 15 14.5 15C15.3284 15 16 15.6716 16 16.5Z" fill="white"/>
            <path d="M6.5 18C7.32843 18 8 17.3284 8 16.5C8 15.6716 7.32843 15 6.5 15C5.67157 15 5 15.6716 5 16.5C5 17.3284 5.67157 18 6.5 18Z" fill="white"/>
            </svg>
            `;
          break;
        default:
          break;
      }
      return img;
    },
  },
};
</script>
<style lang="scss" scoped>
.nav {
  width: 100%;
  height: 72px;
  background: #10102c;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 100px;
  .logo-wrap {
    display: flex;
    flex-direction: row;
    height: 72px;
    align-items: center;
    .circle {
      width: 48px;
      height: 48px;
      border-radius: 48px;
      margin-right: 6px;
      background: rgba(255, 255, 255, 0.05);
      border: 2px solid rgba(255, 255, 255, 0.02);
    }
    .info {
      display: flex;
      // align-items: center;
      flex-direction: column;
      text-align: left;
      .name {
        font-size: 16px;
        line-height: 20px;
        color: #ffffff;
        margin-bottom: 3px;
        margin-top: 15px;
      }
      .view {
        font-size: 14px;
        line-height: 17px;
        color: #f8e8b6;
        cursor: pointer;
      }
    }
  }
  .links {
    display: flex;
    flex-direction: row;
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
      position: relative;
      &.blur {
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
        &.blur {
          opacity: 0.5;
        }
      }
      .badge {
        position: absolute;
        left: 10px;
        top: 15px;
        width: 15px;
        height: 15px;
        font-size: 10px;
        border-radius: 5px;
        background-color: red;
        color: #fff;
        opacity: 1 !important;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  @media (max-width: 767px) {
    padding: 0 20px;
    .links {
      position: fixed;
      bottom: 0;
      left: 0;
      display: flex;
      flex-direction: row;
      width: 100%;
      background: #10102c;
      z-index: 100;
      height: 72px;
      .link {
        color: #fff;
        padding: 5px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 72px;
        cursor: pointer;
        font-weight: 500;
        font-size: 12px;
        font-family: untitled-sans-medium;
        border-bottom: 4px solid #3a50d5;
        width: 50%;
        display: flex;
        flex-direction: column;
        border-top: 4px solid #10102c;
        &.blur {
          opacity: 0.5;
          border-bottom: 4px solid #10102c;
        }
        .badge {
          top: 8px;
          left: 105px;
        }
        .txt {
          display: block;
          margin-top: -5px;
        }
      }
    }
  }
}
.drawer-title {
  height: 72px;
  border-bottom: 1px solid #e6e9ef;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  span {
    font-size: 18px;
    line-height: 22px;
    color: #2b2b2b;
  }
}
.circle_ {
  width: 80px;
  height: 80px;
  border-radius: 48px;
  background: rgba(16, 16, 44, 0.05);
  border: 2px solid rgba(16, 16, 44, 0.02);
  margin: 10px auto;
}
.store-name {
  font-weight: bold;
  font-size: 28px;
  line-height: 35px;
  text-align: center;
  color: #2b2b2b;
}
.contact {
  font-size: 16px;
  line-height: 150%;
  color: #3a50d5;
  text-align: center;
  a {
    color: #3a50d5;
  }
  span {
    padding: 0 16px;
    display: inline-flex;
    align-items: center;

    svg {
      margin-right: 5px;
    }
  }
}
</style>

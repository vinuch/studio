<template>
  <div class="header">
    <!-- This serves same purpose as StoreNav - try to merge -->
    <div>
      <img class="logo" :src="visitedStoreInfo.logo" alt="">
      <h2 v-if="visitedStoreInfo.store_name">{{ visitedStoreInfo.store_name.toLowerCase() }}</h2>
      <div>
        <svg @click="showSearch = !showSearch" class="search-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M22.1743 22.9675C21.1077 23.8701 19.7402 24.4034 18.2359 24.4034C14.8444 24.4034 12.0684 21.641 12.0684 18.2359C12.0684 14.8444 14.8444 12.0684 18.2359 12.0684C21.641 12.0684 24.4034 14.8308 24.4034 18.2359C24.4034 19.7265 23.8564 21.1077 22.9675 22.1743L27.7538 26.9607C27.9726 27.1795 27.9726 27.535 27.7538 27.7538C27.6444 27.8632 27.5077 27.9179 27.3572 27.9179C27.2068 27.9179 27.0701 27.8632 26.9607 27.7538L22.1743 22.9675ZM23.282 18.2359C23.282 15.4598 21.0256 13.1897 18.2359 13.1897C15.4598 13.1897 13.1897 15.4598 13.1897 18.2359C13.1897 21.0119 15.4461 23.282 18.2359 23.282C21.0256 23.282 23.282 21.0256 23.282 18.2359Z" fill="#212B36"/>
        </svg>

        <svg @click="showGrid" v-if="galleryView === 'zoom'" class="layout" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 2H5.5C3.84315 2 2.5 3.34315 2.5 5V19C2.5 20.6569 3.84315 22 5.5 22H19.5C21.1569 22 22.5 20.6569 22.5 19V5C22.5 3.34315 21.1569 2 19.5 2ZM4.5 13H11.5V20H5.5C4.94772 20 4.5 19.5523 4.5 19V13ZM20.5 19V13H13.5V20H19.5C20.0523 20 20.5 19.5523 20.5 19ZM20.5 5V11H13.5V4H19.5C20.0523 4 20.5 4.44772 20.5 5ZM11.5 11V4H5.5C4.94772 4 4.5 4.44772 4.5 5V11H11.5Z" fill="#212B36"/>
        </svg>
        <svg @click="showZoom" v-else width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 2H4.5V22H6.5V2ZM11.5 8H13.5V22H11.5V8ZM18.5 14H20.5V22H18.5V14Z" fill="#212B36"/>
        </svg>
      </div>
    </div>

    <div v-if="showSearch" class="search_box">
      <input type="text" name="Search" placeholder="Search"/>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['visitedStoreInfo', 'galleryView'],
    data() {
      return {
        showSearch: false,
      }
    },
    methods: {
      showGrid () {
        this.$emit('showGrid')
      },
      showZoom () {
        this.$emit('showZoom', 'section_' + 1, 1)
      },
    }
  }
</script>

<style lang="scss" scoped>
  .header {
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: .5rem .6rem;

      .logo {
        width: 7rem;
      }

      h2 {
        text-transform: capitalize;
        font-size: 20px;
        text-align: center;
        width: 100%;
      }

      .search-icon {
        width: 4rem;
      }
      .layout {
        width: 1.8rem
      }
    }

    .search_box {
      display: flex;
      justify-content: center;
      margin-bottom: 1rem;

      input {
        border: none;
        border-bottom: 2px solid #634FDD;
        text-align: center;
        color: #634FDD;
        font-weight: bold;
        font-size: 1.5rem;
      }
    }
  }
</style>

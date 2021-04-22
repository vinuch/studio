<template>
  <div class="conf">
    <div class="empty">
      <img src="../assets/hand.svg" alt="" />
      <p class="utm">
        Thank you!
      </p>
      <p class="text">
        Your order has been placed and a confirmation email sent to
        <br>{{ completedOrderInfo.email }}.
      </p>
      <router-link :to="{name: 'Home'}">
        <button class="main-btn">
          Back to store
        </button>
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      storeName: "getStoreName",
      completedOrderInfo: "getCompletedOrderInfo",
    }),
  },
};
</script>
<style lang="scss" scoped>
.empty {
  width: 100%;
  padding-top: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .utm {
    font-size: 22px;
    line-height: 27px;
    text-align: center;
    color: #10102c;
  }
  .text {
    font-size: 16px;
    line-height: 150%;
    text-align: center;
    color: #4d5868;
    max-width: 350px;
  }
  .main-btn {
    height: 50px;
    width: 200px;
  }
}
</style>

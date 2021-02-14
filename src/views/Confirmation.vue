<template>
  <div class="conf">
    <StoreNav />
    <div class="empty">
      <img src="../assets/hand.svg" alt="" />
      <p class="utm">
        Order placed successfully
      </p>
      <p class="text">
        Your order has been placed successfully. We’ve sent a confirmation email
        to <b>{{ completedOrderInfo.email }}</b
        >.
      </p>
      <router-link :to="`/${storeName}`">
        <button class="main-btn">
          Back to store
        </button>
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import StoreNav from "../components/StoreNav";
export default {
  components: { StoreNav },
  computed: {
    ...mapGetters({
      storeName: "getVisitedStoreName",
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

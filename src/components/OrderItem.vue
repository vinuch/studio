<template>
  <div class="item">
    <div
      class="image"
      :style="{ backgroundImage: `url('${product.product_image}')` }"
    ></div>
    <div class="item-body">
      <div class="details">
        <p class="name utm">
          {{ product.product_name }}
        </p>
        <p class="price">N{{ product.price }}</p>
        <p class="qty utm">{{ product.total_stock }} available</p>
      </div>
      <svg
        width="6"
        height="10"
        viewBox="0 0 6 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.29289 9.7071C-0.09763 9.3166 -0.09763 8.6834 0.29289 8.2929L3.5858 5L0.29289 1.70711C-0.09763 1.31658 -0.09763 0.68342 0.29289 0.29289C0.68342 -0.09763 1.31658 -0.09763 1.70711 0.29289L5.7071 4.29289C6.0976 4.68342 6.0976 5.3166 5.7071 5.7071L1.70711 9.7071C1.31658 10.0976 0.68342 10.0976 0.29289 9.7071Z"
          fill="#8093AD"
        />
      </svg>
    </div>
  </div>
</template>
<script>
export default {
  props: ["product"],
};
</script>
<style lang="scss" scoped>
.item {
  border: 1px solid #e6e9ef;
  border-radius: 4px;
  margin-bottom: 40px;
  .image {
    width: 100%;
    height: 160px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .item-body {
    padding: 12px 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .details {
      display: flex;
      flex-direction: column;
      width: 90%;
      .name {
        font-size: 16px;
        line-height: 20px;
        color: #2b2b2b;
        margin-bottom: 5px;
      }
      .price {
        line-height: 150%;
        color: #4d5868;
        margin-bottom: 5px;
      }
      .qty {
        font-size: 12px;
        line-height: 150%;
        color: #8093ad;
        margin-bottom: 0;
      }
    }
  }
}
</style>

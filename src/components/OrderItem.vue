<template>
  <div class="item">
    <div
      class="image"
      :style="{ backgroundImage: `url('${product.product_image}')` }"
    ></div>
    <div class="item-body">
      <div class="details">
        <p class="name utm">
          {{ product.product_name || "---" }}
        </p>
        <p class="price">N{{ product.price }}</p>
        <p class="qty utm">{{ product.total_stock }} available</p>
      </div>
      <img src="../assets/caret.svg" alt="" />
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
  cursor: pointer;
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
        font-size: 15px;
        line-height: 20px;
        color: #2b2b2b;
        margin-bottom: 5px;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
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

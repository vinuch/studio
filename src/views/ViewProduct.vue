<template>
  <div class="view-product">
    <StoreNav />
    <div class="page-content">
      <router-link to="/store">
        <p class="back">
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style="margin-right: 5px"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.7071 0.29289C6.0976 0.68342 6.0976 1.31658 5.7071 1.70711L2.41421 5L5.7071 8.2929C6.0976 8.6834 6.0976 9.3166 5.7071 9.7071C5.3166 10.0976 4.6834 10.0976 4.2929 9.7071L0.29289 5.7071C-0.09763 5.3166 -0.09763 4.68342 0.29289 4.29289L4.2929 0.29289C4.6834 -0.09763 5.3166 -0.09763 5.7071 0.29289Z"
              fill="#8093AD"
            />
          </svg>
          Back to all products
        </p>
      </router-link>

      <a-row class="product-data" :gutter="20">
        <a-col :md="12" :sm="24">
          <div
            class="image"
            style="background-image: url('https://images.unsplash.com/photo-1605546960353-838f65ae5823?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60')"
          ></div>
        </a-col>
        <a-col :md="12" :sm="24">
          <div class="product-details">
            <p class="name utb">
              Fjallraven Hiking Bag
            </p>
            <p class="price">
              N25,999.99
            </p>
            <p class="desc">
              Here’s where the description of the product goes if its been added
              at product creation. As she said these words her foot slipped, and
              in another moment, splash she was up to her chin in salt water.
              Her first idea was that she had somehow fallen into the sea.
            </p>

            <div class="selects">
              <FloatingLabel
                style="width: 200px; margin-right: 20px"
                :config="{
                  label: 'Variant',
                  ...floatingConfig,
                }"
              >
                <select
                  name=""
                  id=""
                  style="width: 100%;
                height: 100%;
                border: 0;
                background: transparent;
                padding-top: 10px;"
                >
                  <option value="Amount">Amount</option>
                </select>
              </FloatingLabel>
              <FloatingLabel
                style="width: 200px"
                :config="{
                  label: 'Variant',
                  ...floatingConfig,
                }"
              >
                <select
                  name=""
                  id=""
                  style="width: 100%;
                height: 100%;
                border: 0;
                background: transparent;
                padding-top: 10px;"
                >
                  <option value="Amount">Amount</option>
                </select>
              </FloatingLabel>
            </div>

            <button :class="addedToCart ? 'main-btn' : 'main-btn-bd'">
              {{ addedToCart ? "Added to cart" : "Add to cart" }}
            </button>
          </div>
        </a-col>
      </a-row>

      <p class="back" style="margin-top: 100px">
        MORE PRODUCTS
      </p>
      <a-row :gutter="30">
        <a-col :sm="24" :md="12">
          <a-row class="product-data_" :gutter="20">
            <a-col :md="12" :sm="24">
              <div
                class="image"
                style="background-image: url('https://images.unsplash.com/photo-1605898643907-844c2bfc764e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1OXx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=60')"
              ></div>
            </a-col>
            <a-col :md="12" :sm="24">
              <div class="product-details">
                <p class="name utb">
                  Fjallraven Hiking Bag
                </p>
                <p class="price">
                  N25,999.99
                </p>
                <p class="desc_">
                  Here’s where the description of the product goes if its been
                  added
                </p>

                <div class="selects">
                  <FloatingLabel
                    style="width: 160px; margin-right: 20px; height: 55px"
                    :config="{
                      label: 'Variant',
                      ...floatingConfig,
                    }"
                  >
                    <select
                      name=""
                      id=""
                      style="width: 100%;
                height: 100%;
                border: 0;
                background: transparent;
                padding-top: 15px !important;
                    margin-left: -10px;"
                    >
                      <option value="Amount">Amount</option>
                    </select>
                  </FloatingLabel>

                  <button :class="addedToCart ? 'main-btn' : 'main-btn-bd'">
                    {{ addedToCart ? "Added to cart" : "Add to cart" }}
                  </button>
                </div>
              </div>
            </a-col>
          </a-row>
        </a-col>
        <a-col :sm="24" :md="12">
          <a-row class="product-data_" :gutter="20">
            <a-col :md="12" :sm="24">
              <div
                class="image"
                style="background-image: url('https://images.unsplash.com/photo-1605957551463-57d015501960?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzM3x8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=60')"
              ></div>
            </a-col>
            <a-col :md="12" :sm="24">
              <div class="product-details">
                <p class="name utb">
                  Fjallraven Hiking Bag
                </p>
                <p class="price">
                  N25,999.99
                </p>
                <p class="desc_">
                  Here’s where the description of the product goes if its been
                  added
                </p>

                <div class="selects">
                  <FloatingLabel
                    style="width: 160px; margin-right: 20px; height: 55px;"
                    :config="{
                      label: 'Variant',
                      ...floatingConfig,
                    }"
                  >
                    <select
                      name=""
                      id=""
                      style="width: 100%;
                height: 100%;
                border: 0;
                background: transparent;
                padding-top: 15px !important;
                    margin-left: -10px;"
                    >
                      <option value="Amount">Amount</option>
                    </select>
                  </FloatingLabel>

                  <button :class="addedToCart ? 'main-btn' : 'main-btn-bd'">
                    {{ addedToCart ? "Added to cart" : "Add to cart" }}
                  </button>
                </div>
              </div>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
import FloatingLabel from "vue-simple-floating-labels";
import StoreNav from "../components/StoreNav";
export default {
  props: ["addedToCart"],
  components: {
    FloatingLabel,
    StoreNav,
  },
};
</script>
<style lang="scss" scoped>
.view-product {
  .page-content {
    padding: 30px 100px;
    .back {
      font-size: 14px;
      line-height: 17px;
      color: #8093ad;
      text-align: left;
      margin-bottom: 20px;
    }

    .product-data {
      .image {
        width: 100%;
        height: 380px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
      }
      .product-details {
        margin-top: 10px;
        text-align: left;
        .name {
          font-size: 28px;
          line-height: 35px;
          color: #2b2b2b;
          margin-bottom: 5px;
        }
        .price {
          font-size: 18px;
          line-height: 150%;
          color: #2b2b2b;
        }
        .desc {
          font-size: 16px;
          line-height: 150%;
          color: #4d5868;
        }
        .selects {
          display: flex;
          flex-direction: row;
        }
        button {
          height: 55px;
          padding: 0 30px;
        }
      }
    }

    .product-data_ {
      .image {
        width: 100%;
        height: 220px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        margin-top: 25px;
      }
      .product-details {
        text-align: left;
        margin-top: 10px;
        .name {
          font-size: 22px;
          line-height: 35px;
          color: #2b2b2b;
          margin-bottom: 5px;
        }
        .price {
          font-size: 16px;
          line-height: 150%;
          color: #2b2b2b;
        }
        .desc {
          font-size: 16px;
          line-height: 150%;
          color: #4d5868;
        }
        .selects {
          display: flex;
          flex-direction: row;
        }
        button {
          height: 55px;
          //   padding: 0 10px;
        }
      }
    }
  }

  @media (max-width: 767px) {
    .page-content {
      padding: 20px 20px 120px;
    }
  }
}
</style>

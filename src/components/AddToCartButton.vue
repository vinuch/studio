<template>
  <div
  class="add_to_cart">
    <button>
      <img v-if="logo" class="store_logo" :src="logo">
      <p>Add to cart</p>
      <div>
        <span class="btn_item_count" :id="'btn_' + btn_index">{{ count }}</span>
        <svg width="35" height="38" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C8.736 0 6.064 2.6448 6 5.8976V6V6.99999H1.008C0.736 6.99999 0.48 7.1056 0.288 7.29279C0.112 7.47999 0 7.73439 0 7.99999V14V19C0 20.9968 0 22.5088 0.128 23.7312C0.272 24.952 0.56 25.9664 1.296 26.7008C2.032 27.4368 3.056 27.7296 4.272 27.8672C5.44802 28.0003 6.90839 28.0001 8.8123 28H8.81233L9.008 28H15.008L15.1403 28H15.1403C17.0598 28.0001 18.5392 28.0001 19.728 27.8656C20.96 27.728 21.968 27.4336 22.704 26.6976C23.44 25.9616 23.728 24.9472 23.872 23.7264C24 22.5056 24 20.9936 24 19V14V7.99999C24 7.73439 23.888 7.47999 23.712 7.29279C23.52 7.1056 23.264 6.99999 23.008 6.99999H18V6V5.8864C17.936 2.6384 15.264 0 12 0ZM12.0008 1.99976C14.2248 1.99976 16.0008 3.78055 16.0008 5.99975V6.99975H8.00079V5.99975C8.00079 3.78055 9.77679 1.99976 12.0008 1.99976ZM6.00032 8.99976H2.00032V13.9998V18.9998C2.00032 20.9949 2.00032 22.4781 2.12832 23.5053C2.24032 24.5325 2.44832 25.0205 2.72032 25.2861C2.97632 25.5533 3.47232 25.7629 4.49632 25.8781C5.52032 25.9933 7.00832 25.9997 8.99232 25.9997H14.9923C16.9923 25.9997 18.4803 25.9949 19.5043 25.8781C20.5283 25.7629 21.0243 25.5517 21.2803 25.2845C21.5523 25.0173 21.7603 24.5309 21.8723 23.5037C22.0003 22.4765 22.0003 20.9933 22.0003 18.9998V13.9998V8.99976H18.0003V10.9998C18.0003 11.1326 17.9843 11.2638 17.9203 11.387C17.8723 11.5102 17.8083 11.6222 17.7123 11.7166C17.6163 11.811 17.5043 11.8846 17.3923 11.9358C17.2643 11.987 17.1363 12.0142 16.9923 12.0142C16.8643 12.0142 16.7363 11.987 16.6083 11.9358C16.4963 11.8846 16.3843 11.811 16.2883 11.7166C16.1923 11.6222 16.1283 11.5102 16.0643 11.387C16.0163 11.2638 16.0003 11.1326 16.0003 10.9998V8.99976H8.00032V10.9998C8.00032 11.1326 7.98432 11.2638 7.92032 11.387C7.87232 11.5102 7.80832 11.6222 7.71232 11.7166C7.61632 11.811 7.50432 11.8846 7.39232 11.9358C7.26432 11.987 7.13632 12.0142 6.99232 12.0142C6.86432 12.0142 6.73632 11.987 6.60832 11.9358C6.49632 11.8846 6.38432 11.811 6.28832 11.7166C6.19232 11.6222 6.12832 11.5102 6.06432 11.387C6.01632 11.2638 6.00032 11.1326 6.00032 10.9998V8.99976Z" fill="url(#paint0_linear)" fill-opacity="0.76"/>
          <defs>
            <linearGradient id="paint0_linear" x1="12" y1="0" x2="12" y2="28" gradientUnits="userSpaceOnUse">
              <stop stop-color="white"/>
              <stop offset="1" stop-color="white" stop-opacity="0.78"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </button>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    // name: 'AddToCartButton',
    props: {
      'btn_index': Number,
      'btn_state': Boolean,
      'product': Object,
      'logo': String,
      'count': Number,
    },


    data(){
      return {
        isAdded: false,
        count_in_cart: 0,
      }
    },
    methods: {
    },
    watch: {
      btn_state: function(){
        this.isAdded = this.btn_state
      },
    },
    computed: {
      ...mapGetters({
        cart: "getCart",
      }),
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  button {
    width: 100%;
    display: flex;
    color: #fff;
    background: #634FDD;
    box-shadow: 0px 8.31697px 16.6339px rgba(170, 178, 183, 0.04);
    justify-content: space-between;
    transition: all 0.5s ease;
    font-size: 20px;
    font-weight: 600;
    margin-top: 1rem;
    padding: 10px;
    border: none;
    border-radius: 8px;
    &:hover {
      transform: translateY(-3px);
      box-shadow: -1px -4px 20px rgba(0, 0, 0, 0.25);
    }
    .store_logo {
      // filter: grayscale(100%);
      filter: brightness(0) invert(1);
      height: 20px;
      margin-top: 5px;
    }
    p {
      margin-bottom: 0;
    }
    div {
      // float: right;
      background-color: rgba(255, 255, 255, 0.06);
      margin: -15px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 3.3rem;
      width: 4rem;
    }
    .btn_item_count {
      position: absolute;
      background: #fff;
      padding: .1rem .4rem;
      margin-top: 10px;
      font-size: 12px;
      border-radius: 50%;
      color: #919EAB;
    }
  }
</style>

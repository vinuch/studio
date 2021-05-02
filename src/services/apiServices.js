import axios from "axios";
import * as urls from "./urls";

import * as mutationTypes from "../store/mutationTypes";
import store from "../store/index";

export const joinWaitlist = (data) => {
  return axios({
    method: "post",
    url: urls.joinWaitListUrl,
    data,
  });
};

export const fetchStoreInfo = async (slug) => {
  try {
    let res = await axios({
      method: "get",
      url: `${urls.storeInfoUrl}${slug}`,
    });
    store.commit(mutationTypes.SAVE_STORE_INFO, res.data);
  } catch (error) {
    store.commit(mutationTypes.SAVE_STORE_INFO, {});
  }
};

export const fetchStoreSettlement = async (slug) => {
  try {
    let res = await axios({
      method: "get",
      url: `${urls.storeSettlementUrl}${slug}`,
    });
    let settlement = {
      "paystack_public_key": res.data[0].keys.paystack_public_key,
      "subaccount": res.data[0].subaccount,
    }
    store.commit(mutationTypes.SAVE_SETTLEMENT, settlement);
  } catch (error) {
    store.commit(mutationTypes.SAVE_SETTLEMENT, {});
  }
};

export const fethcProducts = async (slug) => {
  axios({
    method: "get",
    url: `${urls.inventoryUrl}${slug}/`,
  })
  .then((res) => {
    for (let i = 0; i < res.data.length; i++) {

      let itm = res.data[i]
      let localVariants = []
      let localCount = []
      let split_options = itm.variant_options.split(",")

      let getCount = () => {
        itm.second_variant ? countBothVariants() : countVariant1()
        itm.variant_options = localVariants;
      }

      let countVariant1 = () => {
        for (let j = 0; j < split_options.length; j += 2) {
          let object = {};
          object[split_options[j]] = split_options[j + 1];
          localVariants.push(object);
          localCount.push(split_options[j + 1]);
        }
        itm.multiple_variants = false;
        itm.all_stock_count = localCount;
      }

      let countBothVariants = () => {
        for (let j = 0; j < split_options.length; j += 3) {
          let object = {
            variant1: split_options[j],
            variant2: split_options[j + 1],
            quantity: split_options[j + 2],
          };
            localVariants.push(object)
        }
        itm.multiple_variants = true;
      }

      itm.has_variant ? getCount() : ''

      itm.has_discount ?
        itm.discount_type === "1"
          ? itm.discountAmt = (itm.discount * itm.price) / 100
          : itm.discountAmt = itm.discount
          : ''

      itm.picked_variant_value = []
    }
    store.commit(mutationTypes.SAVE_PRODUCTS, res.data);
  })
};

// export const fethcProducts = async (slug, n) => {
//   let res = await axios({
//     method: "get",
//     url: `${urls.inventoryUrl}${slug}/`,
//   });
//   n
//     ? store.commit(
//         mutationTypes.SAVE_PRODUCTS,
//         res.data.map((itm) => {
//           return {
//             ...itm,
//             discountAmt:
//               itm.discount_type === "1"
//                 ? (itm.discount * itm.price) / 100
//                 : itm.discount_type === "2"
//                 ? itm.discount
//                 : 0,
//             picked_variant_value: [],
//           };
//         })
//       )
    // : store.commit(mutationTypes.SAVE_PRODUCTS, res.data);
//   return res;
// };

export const saveOrder = (data) => {
  return axios({
    method: "post",
    url: urls.saveOrderUrl,
    data,
  });
};

export const createOrder = (data) => {
  return axios({
    method: "post",
    url: urls.createOrderUrl,
    data,
  });
};

export const fetchOrderItems = (id) => {
  return axios({
    method: "get",
    url: `${urls.orderItemUrl}${id}/`,
  });
};

export const updateOrderStatus = (id) => {
  return axios({
    method: "patch",
    url: `${urls.updateOrderStatus}${id}/`,
    data: {
      status: 1,
    },
  });
};

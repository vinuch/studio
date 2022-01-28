import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import ArrowDown from '@/components/Icons/ArrowDown.vue'
import CurvedGraph from '@/components/Icons/CurvedGraph.vue'
import Filter from '@/components/Icons/Filter.vue'
import Profile from '@/components/Icons/Profile.vue'
import Message from '@/components/Icons/Message.vue'
import Phone from '@/components/Icons/Phone.vue'
import Marker from '@/components/Icons/Marker.vue'
import Sale from '@/components/Icons/Sale.vue'
import Transaction from '@/components/Icons/Transaction.vue'


Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        error2: '#ED6555',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        primary_dark: '#445B54',

        main_blue: '#3A50D5',
        text_pink: '#620426',
        bg_grey: '#F6F8FA',
        grey_border: '#E2E8F0',
        text_grey: '#69747E',

        primary: '#4CAF50'
      }
    }
  },
  icons: {
    values: {
      arrowDown: { // name of our custom icon
        component: ArrowDown, // our custom component
      },
      curvedGraph: { // name of our custom icon
        component: CurvedGraph, // our custom component
      },
      filter: { // name of our custom icon
        component: Filter, // our custom component
      },
      profile: { // name of our custom icon
        component: Profile, // our custom component
      },
      message: { // name of our custom icon
        component: Message, // our custom component
      },
      phone: { // name of our custom icon
        component: Phone, // our custom component
      },
      marker: { // name of our custom icon
        component: Marker, // our custom component
      },
      sale: { // name of our custom icon
        component: Sale, // our custom component
      },
      transaction: { // name of our custom icon
        component: Transaction, // our custom component
      },
    },
  },
});
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import moment from 'moment';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faEye, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ZoomModal from "@/components/ZoomModal";

library.add(faSearch);
library.add(faEye);
library.add(faTimesCircle);

Vue.config.productionTip = false;
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

Vue.filter('formatDate', function(value) {
  if (value) {
    var date  = new Date(value*1000);
    return moment(String(date.toISOString())).format('MMM DD, YYYY . h:mm a')
  }
});
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

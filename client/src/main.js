import Vue from 'vue';
import App from './App.vue';
import router from './router';
import moment from 'moment';

Vue.config.productionTip = false;


Vue.filter('formatDate', function(value) {
  if (value) {
    var date  = new Date(value*1000);
    return date.toString('MM dd');
  }
});
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

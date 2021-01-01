<template>
  <div class="timeline">
    <search class="search"></search>
    <div v-for="(month) in getActivitiesMonths()" :key="month">
      <div class="month-container-label">
        {{month}}
      </div>
      <div class="vl"></div>
      <time-line-item
        v-for="item in getMonthActivitiesItems(month)"
        @openModal="openModal"
        v-bind:key="item.id"
        v-bind:item="item">
      </time-line-item>
      <zoom-modal v-if="showModal" v-bind:item="zoomItem" @closeModal="closeModal"></zoom-modal>
    </div>
  </div>
</template>

<script>
import TimeLineItem from "@/components/TimeLineItem";
import ZoomModal from "@/components/ZoomModal";
import Search from "@/components/Search";
import activitiesService from "@/activitiesService";

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

export default {
  name: 'TimeLine',
  components: {Search, TimeLineItem, ZoomModal},

  data() {
    return {
      showModal: false,
      activity: {},
      activities: [],
      zoomItem: {},
      activitiesByMonth: {}
    };
  },
  created() {
    this.getActivitiesData();
  },
  methods: {
    openModal(item) {
      this.zoomItem = item;
      console.log(this.zoomItem);
      this.showModal = true;
    },
    closeModal(arg) {
      this.showModal = false;
    },
    getActivitiesMonths() {
      const arr = Object.keys(this.activitiesByMonth).sort(function(a, b){
        return monthNames.indexOf(a)
          - monthNames.indexOf(b);
      });
      return arr.reverse();
    },
    getMonthActivitiesItems(month) {
      return this.activitiesByMonth[month].sort(function(a, b){
        return new Date(a.d_created*1000) -
          new Date(b.d_created*1000);
      }).reverse();
    },
    async getActivitiesData() {
      activitiesService.getActivitiesV1()
        .then(
          (activities => {
            this.$set(this, "activities", activities);



            var map_result = activities.map(function (item) {
              var d =  new Date(Number(item.d_created) * 1000);
              var month = monthNames[d.getMonth()];
              return {
                "Month": month,
                "Item": item
              };
            });

            this.activitiesByMonth = map_result.reduce(function (memo, item) {
              if (memo[item.Month] === undefined) {
                memo[item.Month] = [item.Item];
              }else{
                memo[item.Month].push(item.Item);
              }
              return memo;
            },{});
            console.log(this.activitiesByMonth);
          }).bind(this)
        );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
  font-family: sans-serif !important;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.timeline {
  background: #ffffff;
}

.search {
  margin: 20px;
}

.month-container-label {
  background-color: #fcf7e1;
  border-radius: 30px;
  height: 30px;
  width: 140px;
  text-align: center;
  line-height: 30px;
}
.vl {
  border-left: 2px solid #c5c5c5;
  height: 30px;
  margin-left: 70px;
}

</style>

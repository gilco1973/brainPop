<template>
  <div class="timeline">
    <search class="search"></search>
    <time-line-item
      v-for="item in activities"
      v-bind:key="item.id"
      v-bind:item="item">
    </time-line-item>
  </div>
</template>

<script>
// import './public/style.scss'
import TimeLineItem from "@/components/TimeLineItem";
import Search from "@/components/Search";
import activitiesService from "@/activitiesService";

export default {
  name: 'TimeLine',
  components: {Search, TimeLineItem},

  data() {
    return {
      activity: {},
      activities: []
    };
  },
  created() {
    this.getActivitiesData();
  },
  methods: {
    async getActivitiesData() {
      activitiesService.getActivitiesV1()
        .then(
          (activities => {
            this.$set(this, "activities", activities);
            console.log(activities);
          }).bind(this)
        );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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


</style>

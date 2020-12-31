<template>
  <div class="timeline">
    <search class="search"></search>
    <time-line-item
      v-for="item in activities"
      @openModal="openModal"
      v-bind:key="item.id"
      v-bind:item="item">
    </time-line-item>
    <zoom-modal v-if="showModal"></zoom-modal>
  </div>
</template>

<script>
import TimeLineItem from "@/components/TimeLineItem";
import ZoomModal from "@/components/ZoomModal";
import Search from "@/components/Search";
import activitiesService from "@/activitiesService";

export default {
  name: 'TimeLine',
  components: {Search, TimeLineItem, ZoomModal},

  data() {
    return {
      showModal: false,
      activity: {},
      activities: []
    };
  },
  created() {
    this.getActivitiesData();
  },
  methods: {
    openModal(item) {
      console.log(item);
      this.showModal = true;
    },
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


</style>

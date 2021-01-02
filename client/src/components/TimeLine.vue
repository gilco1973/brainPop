<template>
  <div class="timeline">
    <search class="search"></search>
    <div class="filter-header">Filter By:</div>
    <div class="filters-container">
      <activity-filter
        v-for="(filter) in filters"
        v-bind:key="filter.id"
        @clicked="filterClicked"
        v-bind:filter="filter">
      </activity-filter>
    </div>
    <div v-for="(month) in sortedActivitiesMonths" :key="month">
      <div v-if="getMonthActivitiesItems(month).length > 0">
        <div class="month-container-label">
          {{ month }}
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
  </div>
</template>

<script>
import TimeLineItem from "@/components/TimeLineItem";
import ZoomModal from "@/components/ZoomModal";
import Search from "@/components/Search";
import activitiesService from "@/activitiesService";
import ActivityFilter from "@/components/ActivityFilter";

function uppercase(str) {
  var array1 = str.split(' ');
  var newarray1 = [];

  for (var x = 0; x < array1.length; x++) {
    newarray1.push(array1[x].charAt(0).toUpperCase() + array1[x].slice(1));
  }
  return newarray1.join(' ');
}

function formatFilter(item) {
  return {
    id: item.id,
    resource_type: item.resource_type,
    name: uppercase(item.resource_type.split('_').join(' ')),
    selected: false
  };
}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

export default {
  name: 'TimeLine',
  components: {ActivityFilter, Search, TimeLineItem, ZoomModal},

  data() {
    return {
      showModal: false,
      activity: {},
      activities: [],
      zoomItem: {},
      activitiesByMonth: {},
      filters: [],
      sortedActivitiesMonths: []
    };
  },
  created() {
    this.getActivitiesData();
  },
  methods: {
    openModal(item) {
      this.zoomItem = item;
      this.showModal = true;
    },
    filterClicked(id) {
      this.setFiltersSelection(id);
    },
    closeModal(arg) {
      this.showModal = false;
    },
    getMonthActivitiesItems(month) {
      const allItemsFilter = this.filters.find((filter) => filter.id === -1);
      const selectedResources = this.filters.filter((filter) => filter.selected).map((filter) => filter.resource_type);
      return allItemsFilter.selected ? this.activitiesByMonth[month] : this.activitiesByMonth[month].filter((activity) => selectedResources.includes(activity.resource_type));
    },
    async getActivitiesData() {
      activitiesService.getActivitiesV1()
        .then(
          (activities => {
            this.$set(this, "activities", activities);
            this.filters = activities.map((item) => formatFilter(item));
            this.filters = [{
              id: -1,
              name: 'All Work',
              selected: true
            }, ...this.filters.filter(function (item, pos, arr) {
              return !pos || item.name !== arr[pos - 1].name;
            })];
            const map_result = activities.map(function (item) {
              const d = new Date(Number(item.d_created) * 1000);
              const month = monthNames[d.getMonth()];
              return {
                "Month": month,
                "Item": item
              };
            });

            this.activitiesByMonth = map_result.reduce(function (container, item) {
              if (container[item.Month] === undefined) {
                container[item.Month] = [item.Item];
              } else {
                container[item.Month].push(item.Item);
                container[item.Month] = container[item.Month].sort(function (a, b) {
                  return new Date(a.d_created * 1000) -
                    new Date(b.d_created * 1000);
                }).reverse();
              }
              return container;
            }, {});
            this.sortedActivitiesMonths = Object.keys(this.activitiesByMonth).sort(function (a, b) {
              return monthNames.indexOf(a)
                - monthNames.indexOf(b);
            }).reverse();
          }).bind(this)
        );
    },
    setFiltersSelection(id) {
      const allItemsFilter = this.filters.find((filter) => filter.id === -1);
      if (id === allItemsFilter.id) {
        this.filters.find((filter) => filter.selected = false);
        allItemsFilter.selected = true;
        return;
      }
      const filter = this.filters.find((filter) => filter.id === id);
      filter.selected = !filter.selected;

      const selectedFiltersCount = this.filters.filter((filter) => filter.id !== -1 && filter.selected);
      allItemsFilter.selected = selectedFiltersCount.length === 0;
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
  font-family: sans-serif !important;
  margin: 15px;
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

.filters-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 80px;
}

.filter-header {
  padding: 10px 20px;
  font-size: 18px;
}
</style>

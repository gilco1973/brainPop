<template>
  <div class="timeline">
    <div style="display: flex; flex-flow: row-reverse;">
      <span class="version" v-on:click="changeAPIVersion(1)"
            v-bind:class="{ 'version-selected': apiVersion === 1 }">V1</span>
      <span class="version" v-on:click="changeAPIVersion(2)"
            v-bind:class="{ 'version-selected': apiVersion === 2 }">V2</span>
    </div>
    <search class="search" @search="searchFilter"></search>
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
          @remove="addToRemovedItems(item)"
          v-bind:key="item.id"
          v-bind:item="item">
        </time-line-item>
        <zoom-modal v-if="showModal" v-bind:item="zoomItem" @closeModal="closeModal"></zoom-modal>
      </div>
    </div>
    <div v-if="loadMoreResults" v-on:click="showMoreResults" class="load-more-container">
      <font-awesome-icon style="margin-right: 5px;" icon="chevron-down" />
      <span class="load-more">Load more</span>
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
      sortedActivitiesMonths: [],
      searchTerm: '',
      removedItems: [],
      apiVersion: 1,
      loadMoreResults: true,
      additionalActivities: []
    };
  },
  created() {
    this.getActivitiesData();
  },
  methods: {
    searchFilter(searchTerm) {
      this.resetFilters();
      this.searchTerm = searchTerm;

    },
    showMoreResults(){
      this.loadMoreResults = false;
      this.getActivitiesData();
    },
    addToRemovedItems(item) {
      this.removedItems.push(item.id);
    },
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
    changeAPIVersion(newVersion){
      this.apiVersion = newVersion;
      this.getActivitiesData();
    },
    getMonthActivitiesItems(month) {
      if (this.searchTerm && this.searchTerm.length > 0) {
        return this.activitiesByMonth[month].filter((activity) => activity.resource_type.includes(this.searchTerm) && !this.removedItems.includes(activity.id));
      }
      const allItemsFilter = this.filters.find((filter) => filter.id === -1);
      const selectedResources = this.filters.filter((filter) => filter.selected).map((filter) => filter.resource_type);
      return allItemsFilter.selected ? this.activitiesByMonth[month].filter(activity => !this.removedItems.includes(activity.id)) : this.activitiesByMonth[month].filter((activity) => selectedResources.includes(activity.resource_type) && !this.removedItems.includes(activity.id));
    },
    async getActivitiesData() {
      if (this.apiVersion === 1) {
        activitiesService.getActivitiesV1()
          .then(
            (activities => {
              this.$set(this, "activities", activities);
              this.buildResults();

            }).bind(this)
          );
      } else {
        activitiesService.getActivitiesV2()
          .then(
            (activities => {
              let results = [];
              activities.forEach((activityResult) => {
                activityResult.activities.forEach((activity) => {
                  results.push({
                    ...activity,
                    resource_type: activityResult.resource_type
                  })
                })
              })
              this.$set(this, "activities", results);
              this.buildResults();

            }).bind(this)
          );
      }
    },
    setFiltersSelection(id) {
      this.searchTerm = '';
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
    resetFilters() {
      this.filters.forEach((filter) => filter.selected = false);
      const allItemsFilter = this.filters.find((filter) => filter.id === -1);
      allItemsFilter.selected = true;
    },
    buildResults() {
      this.filters = this.activities.map((item) => formatFilter(item));
      this.filters = [{
        id: -1,
        name: 'All Work',
        selected: true
      }, ...this.filters.filter(function (item, pos, arr) {
        return !pos || item.name !== arr[pos - 1].name;
      })];
      if (this.loadMoreResults) {
        this.additionalActivities = this.activities.splice(this.activities.length - 10, this.activities.length - 10);
      }
      console.log(this.additionalActivities);
      console.log('Activities',this.activities);
      const map_result = this.activities.map(function (item) {
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
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../style.scss';
</style>

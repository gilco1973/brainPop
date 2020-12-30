<template>
  <div>
    <div class="timeline_item">
      <div class="timeline_item_details">
        <div class="time-line-item_icon_container">
          <img class="timeline_item_icon" :src="getImageURL(item.topic_data.icon_path)">
        </div>
        <div class="timeline_item_labels">
          <div class="timeline_item_labels_header">{{ formatItemName(item) }}</div>
          <div class="timeline_item_labels_subHeader">{{ item.d_created | formatDate }}</div>
        </div>
      </div>
      <div class="timeline_item_actions">
        <div v-if="item.score" class="timeline_item_actions_score">
          <span style="margin-right: 5px;">Score</span>
          <span><b>{{ item.score }}/{{ item.possible_score }}</b></span>
        </div>
        <div class="timeline_item_actions_view">
          <span>View work</span>
        </div>
      </div>
    </div>
    <div class="vl"></div>
  </div>
</template>

<script>
export default {
  name: "TimeLineItem",
  props: ['item'],
  data () {
    return {
      image: require('@/assets/topics/cells.png')
    }
  },
  methods: {
    formatItemName(item) {
      return this.uppercase([item.topic_data.name, item.resource_type.split('_').join(' ')].join(' '));
    },
    getImageURL(path) {
      return require('../assets' + path.replace('assets/', ''))
    },
    uppercase(str) {
      var array1 = str.split(' ');
      var newarray1 = [];

      for (var x = 0; x < array1.length; x++) {
        newarray1.push(array1[x].charAt(0).toUpperCase() + array1[x].slice(1));
      }
      return newarray1.join(' ');
    }
  }
}
</script>

<style scoped>
.timeline_item {
  height: 90px;
  width: 95%;
  border-radius: 8px;
  border: 3px solid #c5c5c5;
  display: flex;
  padding: 25px;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  line-height: 20px;
}

.timeline_item_icon {
  width: 48px;
  height: auto;
}

.time-line-item_icon_container {
  background-color: #02c6c5;
  margin-right: 20px;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
}

.timeline_item_labels {
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: center;
}

.timeline_item_labels_header {
  font-weight: bold;
  font-size: 18px;
}

.timeline_item_labels_subHeader {
  font-size: 14px;
}

.timeline_item_details {
  display: flex;
}

.timeline_item_actions {
  display: flex;
  color: #007473;
  align-items: center;
}

.timeline_item_actions_view {
  display: flex;
  font-weight: bold;
}

.timeline_item_actions_score {
  font-size: 16px;
  margin: 20px;
}

.vl {
  border-left: 3px solid #c5c5c5;
  height: 26px;
  margin-left: 75px;
}
</style>

<template>
  <div class="modal" id="zoomModal">
    <font-awesome-icon icon="times" class="closeIcon" v-on:click="closeModal()"/>
    <div class="top-container">
      <div class="time-line-item_icon_container">
        <img class="timeline_item_icon" :src="getImageURL(item.topic_data.icon_path)">
      </div>
      <div class="timeline_item_labels">
        <div class="timeline_item_labels_header">{{ formatItemName(item) }}</div>
        <div class="timeline_item_labels_subHeader">{{ item.d_created | formatDate }}</div>
      </div>
    </div>
    <div class="bottom-container">
      <div>
        <h1>{{item.comment}}!</h1>
      </div>
      <div v-if="item.score" class="timeline_item_actions_score">
        <span style="margin-right: 5px;">Score</span>
        <span><b>{{ item.score }}/{{ item.possible_score }}</b></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ZoomModal",
  props: ['item', 'showModal'],
  methods: {
    closeModal() {
      this.$emit('closeModal', true)
    },
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
.modal {
  width: 1000px;
  height: 550px;
  border-radius: 30px;
  border: 5px solid gray;
  padding: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -325px;
  margin-left: -500px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
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
  margin-top: 30px;
  flex-direction: column;
  text-align: left;
  justify-content: center;
}

.timeline_item_labels_header {
  font-weight: bold;
  font-size: 40px;
}

.timeline_item_labels_subHeader {
  font-size: 20px;
  margin-top: 30px;
  text-align: center;
}
.closeIcon{
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  border-radius: 50%;
  border: 5px solid gray;
  padding:5px;
  color: gray;
  font-weight: bold;
  width: 20px;
  height: 20px;
}
.timeline_item_actions_score {
  font-size: 25px;
  margin-top: 45px;
  color: #007473;
}
.top-container{
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.bottom-container{
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>

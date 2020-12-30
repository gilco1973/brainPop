<template>
  <div class="timeline_item">
    <img class="timeline_item_icon" v-bind:src="item.topic_data.icon_path">
    <div class="timeline_item_labels">
      <div class="timeline_item_labels_header">{{item.topic_data.name}}</div>
      <div class="timeline_item_labels_subHeader">{{item.d_created | formatDate}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimeLineItem",
  props: ['item']
}
</script>

<style scoped>
.timeline_item {
  height: 90px;
  width: 100%;
  border-radius: 8px;
  border: 3px solid #c5c5c5;
  display: flex;
  padding: 25px;
  text-align: center;
  align-items: center;
  justify-content: space-between;
}

.timeline_item_icon {
  width: 16px;
  height: auto;
  margin-left: 20px;
  margin-right: 20px;
}
.timeline_item_labels{
  display: flex;
  flex-direction: column;
}
.timeline_item_labels_header{
  font-weight: bold;
  font-size: 14px;
}
.timeline_item_labels_subHeader{
  font-size: 12px;
}

</style>

<template>
  <div>
    <div class="timeline_item">
      <font-awesome-icon icon="times" class="closeIcon" v-on:click="remove"/>
      <div class="timeline_item_details">
        <div class="timeline_item_icon_container" v-bind:class="{ junior: isJunior }">
          <img class="timeline_item_icon" :src="getImageURL(item.topic_data.icon_path)">
          <div v-if="isJunior" class="junior_text">Jr.</div>
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
        <div class="timeline_item_actions_view" v-on:click="openModal()">
          <font-awesome-icon style="margin-right: 5px;" icon="eye"/>
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
  data() {
    return {
      isJunior: this.item.product === 'bpjr'
    }
  },
  methods: {
    openModal() {
      this.$emit('openModal', this.item)
    },
    remove() {
      this.$emit('remove', '');
    },
    formatItemName(item) {
      return this.uppercase([item.topic_data.name, item.resource_type.split('_').join(' ')].join(' '));
    },
    getImageURL(path) {
      return require('../assets' + path.replace('assets/', ''))
    },
    uppercase(str) {
      const array1 = str.split(' ');
      const newarray1 = [];

      for (let x = 0; x < array1.length; x++) {
        newarray1.push(array1[x].charAt(0).toUpperCase() + array1[x].slice(1));
      }
      return newarray1.join(' ');
    }
  },
}
</script>

<style lang="scss">
  @import '../style.scss';
</style>

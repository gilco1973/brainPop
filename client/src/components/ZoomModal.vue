<template>
  <div class="modal" id="zoomModal">
    <font-awesome-icon icon="search" class="closeIcon" v-on:click="closeModal()"/>
  </div>
</template>

<script>
export default {
  name: "ZoomModal",
  props: ['item', 'showModal'],
  methods: {
    closeModal() {
      this.showModal = false
    }
  }
}
</script>

<style scoped>
.modal {
  width: 1000px;
  height: 650px;
  border-radius: 8px;
  border: 3px solid #c5c5c5;
  padding: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -325px;
  margin-left: -500px;
  background-color: #ffffff;
}
.closeIcon{
  position: absolute;
  right: 20px;
  top: 20px;
}
</style>

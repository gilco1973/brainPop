<template>
<div class="frame" v-bind:class="{ 'frame-selected': selected }">

</div>
</template>

<script>
export default {
name: "ActivityFilter",
  data() {
    return {
      selected: false
    }
  }
}
</script>

<style scoped>
.frame{
  color: #017575;
  font-weight: bold;
  height: 52px;
  padding: 3px;
  line-height: 52px;
  border: 2px solid #017575;
  background-color: #ffffff;
}
.frame-selected{
  background-color: #eafcfc;
}
</style>

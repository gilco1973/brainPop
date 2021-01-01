<template>
<div class="frame" v-bind:class="{ selected: selected }" >
<span v-if="selected" ><font-awesome-icon style="margin-right: 5px;" icon="check" /></span>
{{name}}
</div>
</template>

<script>
export default {
name: "ActivityFilter",
  props: ['name', 'selected'],
}
</script>

<style scoped>
.frame{
  cursor: pointer;
  align-items: center;
  color: #017575;
  font-weight: bold;
  height: 20px;
  padding: 10px;
  display: flex;
  border-radius: 5px;
  margin: 5px;
  border: 2px solid #017575;
  background-color: #ffffff;
}
.selected{
  background-color: #eafcfc;
}
</style>

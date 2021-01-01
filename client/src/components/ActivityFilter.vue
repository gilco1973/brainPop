<template>
  <div  v-if="filter" class="frame" v-bind:class="{ selected: filter.selected }" v-on:click="clicked">
    <span v-if="filter.selected" class="checkbox"><font-awesome-icon style="margin-right: 5px;" icon="check"/></span>
    {{ filter.name }}
  </div>
</template>

<script>
export default {
  name: "ActivityFilter",
  props: ['filter'],
  methods:{
    clicked (){
      this.$emit("clicked",this.filter.id)
    }
  }
}
</script>

<style scoped>
.frame {
  cursor: pointer;
  align-items: center;
  color: #017575;
  font-weight: bold;
  height: 20px;
  padding: 10px 20px;
  display: flex;
  border-radius: 5px;
  margin: 5px;
  border: 2px solid #017575;
  background-color: #ffffff;
}

.selected {
  background-color: #eafcfc;
}

.checkbox {
  border-radius: 50%;
  color: #ffffff;
  background-color: #007473;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  margin: 5px;
  justify-content: center;
  padding-left: 4px;
  padding-top: 1px;
}
</style>

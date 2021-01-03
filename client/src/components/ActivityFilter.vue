<template>
  <div  v-if="filter" class="frame" v-bind:class="{ frame_selected: filter.selected }" v-on:click="clicked">
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

<style lang="scss">

</style>

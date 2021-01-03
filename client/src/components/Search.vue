<template>
  <div>
  <span style="margin-right: -5px; margin-left: -15px;">
    <input class="searchbox" type="text" placeholder="Search Timeline" v-model="searchTerm" @keyup="search">
  </span>
    <span class="icon-container" v-on:click=search>
    <font-awesome-icon icon="search" style="width: 24px; height: 24px"/>
  </span>
  </div>
</template>

<script>
export default {
  name: "Search",
  data: function () {
    return {
      searchTerm: ''
    };
  },
  methods: {
    search() {
      this.$emit('search', this.searchTerm)
    }
  }
}
</script>

<style scoped>
.searchbox {
  height: 25px;
  padding: 5px;
  width: 330px;
  border-radius: 5px;
  border: 2px solid #c5c5c5;
  font-weight: bold;
  font-family: sans-serif !important;
}

.icon-container {
  background-color: #017575;
  color: white;
  padding: 5px;
  border-radius: 0 4px 4px 0;
  width: 30px;
  height: 29px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

img {
  width: 32px;
  height: 32px;
}
</style>

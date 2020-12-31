<template>
<div>
  <span class="searchbox">
    <input type="text" placeholder="Search Timeline">
  </span>
  <span class="icon-container">
    <font-awesome-icon icon="search" />
  </span>
</div>
</template>

<script>
export default {
  name: "Search"
}
</script>

<style scoped>
.searchbox{
  width: 200px;
}
.icon-container{
  background-color: #02c6c5;
  color: white;
  padding: 5px;
  border-radius: 0 4px 4px 0;
}
img {
  width: 16px;
  height: auto;
}
</style>

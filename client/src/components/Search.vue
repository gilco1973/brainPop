<template>
<div>
  <span class="searchbox">
    <input type="text" placeholder="Search Timeline">
  </span>
  <span>
    <img src="../assets/magnifier.png"/>
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
img {
  width: 16px;
  height: auto;
}
</style>

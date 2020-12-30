<template>
  <div class="home">
    <h1>Timeline</h1>
    <time-line />
  </div>
</template>

<script>
// @ is an alias to /src
import TimeLine from "@/components/TimeLine";

export default {
  name: 'activities',
  components: {
    TimeLine
  }
}
</script>

<template>
  <div class="header">
    <div class="header-title">Well List</div>
  </div>
</template>
<script>
export default {
  setup() {},
};
</script>
<style lang="less">
.header {
  /* min-width: 100vw; */
  height: 60px;
  background: #070510;
  display: flex;
  padding: 0 20px;
  &-title {
    // background: #151515;
    color: white;
    font-weight: bold;
    font-size: 18px;
    display: flex;
    align-items: center;
  }
}
</style>

<template>
  <div class="add">
    <h1>{{title}}</h1>
    <div class="add-photo">

    </div>
    <div class="add-name">
      <input type="text">
    </div>
    <div class="add-des">
      <input type="text">
    </div>
    <div class="add-country">
      <input type="text">
    </div>
  </div>
</template>
<script>
  export default {
    name: 'add',
    data () {
      return {
        title: '添加素材'
      }
    }
  }
</script>

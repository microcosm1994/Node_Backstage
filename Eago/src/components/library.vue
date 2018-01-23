<template>
  <div calss="library">
    <h1>{{title}}</h1>
    <div class="library-container">
        <div class="source" v-for="item in source">
          <div class="source-photo">
            <img v-bind:src="item.titlepage.url" alt="">
          </div>
          <h3>{{item.sourceName}}</h3>
          <p>{{item.des}}</p>
          <p>{{item.country}}</p>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'library',
    data () {
      return {
        title: '素材库',
        source: ''
      }
    },
    mounted () {
      this.getAll()
    },
    methods: {
      getAll: function () {
        this.$http.get('/api/resources/all').then((response) => {
          let data = response.data
          if (data.status === 0) {
            this.source = data.data
            console.log(this.source)
          }
        })
      }
    }
  }
</script>
<style>
  .library{
    padding-top: 200px;
  }
  .library-container{
    width: 100%;
    min-width: 1000px;
    padding: 20px;
  }
  .source{
    width: 200px;
    border-radius:5px;
    display: inline-block;
    vertical-align: top;
    margin-left: 20px;
  }
  .source-photo{
    width: 200px;
    height: 200px;
    border-radius:50%;
    overflow: hidden;
    cursor: pointer;
  }
  .source-photo img{
    width: 100%;
    height: 100%;
  }
</style>

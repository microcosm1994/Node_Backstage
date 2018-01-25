<template>
  <div class="result">
    <h1>{{title}}</h1>
    <div v-for="item in this.myValue">
      <div>
        <img :src="item.titlepage.url" alt="">
      </div>
      <p>{{item.sourceName}}</p>
      <p>{{item.country}}</p>
      <p>{{item.des}}</p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'search_result',
    data () {
      return {
        title: '搜索结果',
        dess: this.myValue
      }
    },
    mounted () {
      this.getresult()
    },
    methods: {
      getresult: function () {
        this.dess = this.myValue
        console.log(this.myValue)
      }
    },
    computed: {
      myValue () {
        return this.$store.state.search.result
      }
    }
  }
</script>

<template>
  <div calss="library">
    <h1>{{title}}</h1>
    <div class="library-container">

    </div>
  </div>
</template>

<script>
  export default {
    name: 'library',
    data () {
      return {
        title: '素材库'
      }
    },
    mounted () {
      this.getAll()
    },
    methods: {
      getAll: function () {
        this.$http.get('/api/resources/all').then((response) => {
          console.log(response.body)
          let data = response.body
          if (data.status === 0) {
            console.log(data)
          }
        })
      }
    }
  }
</script>

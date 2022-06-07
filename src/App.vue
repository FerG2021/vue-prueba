<template>
  <div>
    <Producto />
  </div>
</template>

<script>
  import Producto from './components/producto/index.vue'
  
  export default {
    components:{
      Producto,
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>


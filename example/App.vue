<template> 
  <div id="app">
    <h1>当前定位城市：{{city}}</h1>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      city: ''
    }
  },
  plusReady: function() {
    console.log(this.os.plus)
    console.log('plusReady')
    this.$geolocation.getCurrentPosition().then(function(position){
      this.city = position.address.city
      this.$nativeUI.toast(JSON.stringify(position))
    }.bind(this))
  }
}
</script>

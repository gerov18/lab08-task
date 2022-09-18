<template>
  <router-view/>
</template>

<style lang="scss">
  @import '/public/style';

#app {
  font-family: 'Comfortaa', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $standartText;
}

body{
  margin: 0;
  background: $standartBackground;
  @include flexPosition(center, initial);
}

@media screen and (max-width: 788px){
  #app{
    overflow-x: scroll;
    padding: 0 10px;
  }
}

</style>

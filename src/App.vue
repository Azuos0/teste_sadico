<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.emoticon-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-content: center;
}

.big-emoticon {
  font-size: 100px;
}

.title {
  font-size: 50px;
}

.subtitle {
  font-size: 24px;
}

.msg {
  margin-top: 10px;
}
</style>

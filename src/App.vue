<template>
  <v-app id="app">
  

    <v-main>
      <router-view/>
    </v-main>

  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
#app {
  // font-family: untitled-sans-regular;
  font-family: "Comfortaa", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.v-btn {
  text-transform: none !important;
  color: #FFF !important;
}
.auth h1 {
  font-size: 32px;
  color: #19212C;
}
.note {
  font-size: 18px;
  color: #868B90;
}
.footnote {
  font-size: 12px;
}
.auth .logo {
  margin-top: 50px;
  margin-bottom: 50px;
  margin-left: 0;
}
.auth .container {
  width: 550px;
  padding: 0;
}
.auth .form_lg {
  background: #FFF;
  margin-top: 20px;
  padding: 90px;
  padding-top: 30px;
  border-radius: 40px 40px 0 0;
}
.auth .label {
  color: #868B90;
  margin-bottom: 5px;
}
.auth .form_lg .v-btn {
  margin-bottom: 20px;
}
// vuetify input and button radius
.auth .form_lg .v-text-field--outlined,
.v-btn:not(.v-btn--round).v-size--default {
  border-radius: 8px;
}
.auth .form_lg .v-text-field--outlined fieldset {
  border: 2px solid #E5E5E5;
}
/* COLOURS */
.light_grey {
  background: #ECF0F4;
}
.blue_link {
  color: #3A50D5;
}
</style>
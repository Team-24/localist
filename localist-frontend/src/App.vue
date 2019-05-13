<template>
    <div id="app">
        <Navigation id="navBar"></Navigation>
        <router-view id="routerId"></router-view>
        <Footer id="footer"></Footer>
    </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";

export default {
    name: "App",
    components: { Navigation, Footer }
};
</script>

<style>
html,
body {
    height: 100%;
}

#routerId {
    padding-bottom: 10%;
}

#app {
    min-height: 100%;
    position: relative;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}

#navBar {
    padding-bottom: 65px;
}

#footer {
    margin-top: 5%;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 10px; /* Height of the footer */
}
</style>

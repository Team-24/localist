<template>
    <div id="app">
        <v-app>
            <Navigation id="navBar"></Navigation>
            <transition name="fade" mode="out-in">
                <router-view id="routerId"></router-view>
            </transition>
            <Footer id="footer"></Footer>
        </v-app>
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
        position: static;
        bottom: 0;
        width: 100%;
        height: 10px; /* Height of the footer */
    }
    .fade-enter-active,
    .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
    }

    .fade-enter,
    .fade-leave-active {
    opacity: 0
    }
</style>

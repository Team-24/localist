<template>
    <div class="cont">
        <div class="container" id="container" ref="container">
            <div class="form-container sign-up-container">
                <form v-on:submit.prevent="signUp">
                    <h1>Sign Up</h1>
                    <br>
                    <div>
                        <input type="email" placeholder="Email" v-model="email">
                        <input type="password" placeholder="Password" v-model="password">
                        <input type="password" placeholder="Confirm Password" v-model="confirm">
                        <!--   <div>
                            <input
                                type="checkbox"
                                value=" "
                                @click="administration = !administration"
                                class="form-check-input"
                                id="administration"
                            >
                        </div>
                        <label class="form-check-label" for="administration">make me admin</label>-->
                    </div>
                    <br>
                    <button pt-2 class="cyan darken-2 white--text" type="submit">Sign Up</button>
                </form>
            </div>
            <div class="form-container sign-in-container">
                <form v-on:submit.prevent="signIn">
                    <h1>Sign In</h1>
                    <br>
                    <input type="email" placeholder="Email" v-model="email">
                    <input type="password" placeholder="Password" v-model="password">
                    <a href="#">Forgot your password?</a>
                    <button class="cyan darken-2 white--text" type="submit">Sign In</button>
                </form>
            </div>
            <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-panel overlay-left">
                        <h1 class="white-shadow">Welcome Back!</h1>
                        <p
                            class="white-shadow"
                        >To keep connected with us please login with your personal info</p>
                        <button
                            class="ghost cyan darken-2 white--text"
                            @click="signInButton"
                            id="signIn"
                        >Sign In</button>
                    </div>
                    <div class="overlay-panel overlay-right">
                        <h1 class="white-shadow">Hello, Friend!</h1>
                        <p class="white-shadow">Sign up NOW!</p>
                        <button
                            class="ghost cyan darken-2 white--text"
                            @click="signUpButton"
                            id="signUp"
                        >Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import router from "../router";

export default {
    name: "Signin",
    data: () => ({
        email: "",
        password: ""
    }),
    props: {
        msg: String
    },
    methods: {
        signUp() {
            var r = this;
            const formData = {
                email: this.email,
                password: this.password
            };
            this.$http
                .post("/user/signup", formData)
                .then(function(response) {
                    if (response.data.error) {
                        alert(response.data.error.message);
                    } else {
                        r.$store.commit("setCurrentUser", response.data.user);
                        r.$store.commit("setUserKey", response.data.key);

                        router.push("/profile");
                    }
                })
                .catch(function(error) {
                    this.console.log(error);
                });
        },
        signIn() {
            var r = this;
            const formData = {
                email: this.email,
                password: this.password
            };
            this.$http
                .post("/user/signin", formData)
                .then(function(response) {
                    if (response.data.error) {
                        alert(response.data.error.message);
                    } else {
                        r.$store.commit(
                            "setUsername",
                            response.data.user.user.email
                        );
                        r.$store.commit("setCurrentUser", response.data.user);
                        r.$store.commit("setCurrentToken", response.data.token);
                        r.$store.commit("setUserKey", response.data.key);

                        router.push("/");
                    }
                })
                .catch(function(error) {
                    this.console.log(error);
                });
        },
        signUpButton() {
            const container = this.$refs.container;
            container.classList.add("right-panel-active");
        },
        signInButton() {
            const container = this.$refs.container;
            container.classList.remove("right-panel-active");
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cont {
    padding-top: 65px;


    background-image: url("https://images.unsplash.com/photo-1473186578172-c141e6798cf4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1866&q=80");
    background-size: 100%;
    background-position: 100% 25%;
}

@media screen and (max-width: 400px) {
}

body {
    max-width: 800px;
    margin: auto;
}

h1 {
    font-weight: bold;
    font-size: 40px;
    margin: 0;
}

p {
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
}

span {
    font-size: 12px;
}

a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
}

button {
    border-radius: 20px;
    border: 1px solid #fded2a;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
}

button:active {
    transform: scale(0.95);
}

button:focus {
    outline: none;
}

button.ghost {
    background-color: transparent;
    border-color: #343009;
}

form {
    background-color: #e2ecf0;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
}

input {
    background-color: white;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
}

.social-container {
    margin: 20px 0;
}

.social-container a {
    border: 1px solid #343009;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
}

.container {
    padding-top: 10%;

    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 1), 0 10px 10px rgba(0, 0, 0, 0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;

    min-height: 480px;
    z-index: 5;
    /*min-height: 480px;*/
}

.form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
}

.sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
}

.sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
}

.container.right-panel-active .sign-in-container {
    transform: translateX(100%);
}

.container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
}

@keyframes show {
    0%,
    49.99% {
        opacity: 0;
        z-index: 1;
    }

    50%,
    100% {
        opacity: 1;
        z-index: 5;
    }
}

.overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
}

.container.right-panel-active .overlay-container {
    transform: translateX(-100%);
}

.overlay {
    /*background: #1e9600;*/
    /* fallback for old browsers */
    /*background: -webkit-linear-gradient(to right, #ff0000, #fff200, #1e9600);*/
    /* Chrome 10-25, Safari 5.1-6 */
    /*background: linear-gradient(to right, #ff0000, #fff200, #1e9600);*/
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    /*color: #343009;*/
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
    transform: translateX(50%);
}

.overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.overlay-left {
    transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
    transform: translateX(0);
}

.overlay-right {
    right: 0;
    transform: translateX(0);
}

.container.right-panel-active .overlay-right {
    transform: translateX(20%);
}

.white-shadow {
    text-shadow: 1px 1px 2px white;
}
</style>

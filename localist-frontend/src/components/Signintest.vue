<template>
	<v-layout row justify-center>

	<v-btn 
		class="cyan darken-2 white--text" 
		@click="dsignin = true"
	>
		Sign In
	</v-btn>

	<v-btn 
		class="cyan darken-2 white--text" 
		@click="dsignup = true"
	>
		Sign Up
	</v-btn>

	<v-dialog v-model="dsignin" max-width="600px">
		<v-card>
		<form v-on:submit.prevent="signIn">
			<v-card-title>
			<span class="font-weight-black font-italic headline cyan--text text--darken-2 text-xs-center ">Signin</span>
			</v-card-title>
			<v-card-text>
			<v-container grid-list-md>
				<v-layout wrap align-center justify-center fill-height>
				<v-flex xs8>
					<v-text-field 
					v-model="email"
						:rules="emailRules"
						label="Email *" 
						required>	
					</v-text-field>
				</v-flex>
				<v-flex xs8>
					<v-text-field 
					v-model="password"
					label="Password *" 
					type="password" 
					required>
					</v-text-field>
				</v-flex>
				</v-layout>
			</v-container>
			</v-card-text>
			<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn flat mr-5
				class="cyan darken-2 white--text" 
				type="submit"
				@click="dsignin = false"
			>
				Sign In
			</v-btn>

			<v-btn color="primary" dark @click="dsignup = !dsignup">Sign Up</v-btn>

			<v-spacer></v-spacer>
			</v-card-actions>
		</form>
		</v-card>
	</v-dialog>

	<v-dialog v-model="dsignup" max-width="600px">
		<v-card>
		<form v-on:submit.prevent="signUp">
			<v-card-title>
			<span class="font-weight-black font-italic headline cyan--text text--darken-2 text-xs-center">SignUp</span>
			</v-card-title>
			<v-card-text>
			<v-container grid-list-md>
				<v-layout wrap align-center justify-center fill-height>
				<v-flex xs8>
					<v-text-field 
					v-model="email"
						:rules="emailRules"
						label="Email *" 
						required>	
					</v-text-field>
				</v-flex>
				<v-flex xs8>
					<v-text-field 
					v-model="password"
					label="Password *" 
					type="password" 
					required>
					</v-text-field>
				</v-flex>
				</v-layout>
			</v-container>
			</v-card-text>
			<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn flat mr-5
				class="cyan darken-2 white--text" 
				type="submit"
				@click="dsignup = false"
			>
				Sign Up
			</v-btn>

			<v-btn color="primary" dark @click="dsignin = !dsignin">Sign In</v-btn>
			<v-spacer></v-spacer>
			</v-card-actions>
		</form>
		</v-card>
	</v-dialog>

	</v-layout>
</template>


<script>

	import router from "../router";

export default {
	name: 'Signintest',

	data: () => ({
	dsignin: false,

	dsignup: false,
	
	valid: false,

	email: "",

	password: "",

	emailRules: [
		v => !!v || 'E-mail is required',
		v => /.+@.+/.test(v) || 'E-mail must be valid'
	]
	}),

	methods: {
	signUp() {
		var r = this;
		const formData = {
		email: this.email,
		password: this.password,
		};

		this.console.log(formData);

		this.$http
		.post("/user/signup", formData)
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
			r.$store.commit("setUserId", response.data.uid);

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
			r.$store.commit("setUserId", response.data.uid);
			
			router.push("/");
			}
		})
		.catch(function(error) {
			this.console.log(error);
		});
	}
	}
}

</script>

<style>
	
</style>
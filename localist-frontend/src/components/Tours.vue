<template>
	<div class="bg-icons">
		<v-layout wrap pt-5 justify-center>
			<v-flex
			xs8
			class="cyan--text text--darken-2 display-2 font-weight-black font-italic"
			>All Tours</v-flex>
		</v-layout>

		<!-- 
				*************************
				** Searching Criterias **
				*************************
		-->
		<v-layout pt-5 row wrap justify-center>
			<v-flex xs12 md3>
			<v-text-field type="text" v-model="asearchTitle" label="Search tours" v-on:change="searchResult"></v-text-field>
			</v-flex>
			<v-flex xs6 md3 mx-3>
				<v-menu
                      v-model="menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px">
                      <template v-slot:activator="{ on }">
                        <v-text-field hide-details v-model="date" readonly v-on="on" label="Date" clearable></v-text-field>
                      </template>
					  <v-date-picker v-model="date" @input="menu = false" no-title></v-date-picker>
				</v-menu>
			</v-flex>
			<v-flex xs6 md3>
                    <v-select
                      :items="guestNo"
                      label="Guests"
                      clearable
                    ></v-select>
			</v-flex>
		</v-layout>

		<!-- 
				************************
				** Searching Results  **
				************************
		-->
		<v-container>
			<v-layout row wrap justify-space-between>
			<v-flex class="tourCard" v-for="tour in filteredTours" :key="tour.key" xs12 sm6 md4 xl3 px-1 my-4>
				<v-card :to="'/tours/single/' + tour.key">
						<v-img
								:src="tour.main_image"
								height="300px"
								width="100%"
								gradient="rgba(0, 0, 0, .32), rgba(0, 0, 0, .22)"
						>
							<v-layout fill-height wrap text-xs-right ma-0>
								<v-flex class="black-shadow" xs12>
									<v-chip
										label
										class="mb-2 text-uppercase"
										color="cyan darken-2"
										text-color="white"
										large
										@click.stop
									>{{ tour.category }}</v-chip>
									<div class="white--text title font-weight-bold mb-2">{{tour.title}}</div>
									<div class="white--text subheading">
									${{tour.price.low}} (per guest)
									<br>
									<img height="18" src="../assets/img/location_white.png">
									{{tour.location.city}}, {{tour.location.country}}
									<br>
									<img height="15" src="../assets/img/clock_white.png">
									{{tour.duration.short}} - {{tour.duration.long}} hours
									</div>
								</v-flex>
						<!-- 
										** Rating preview  **
						-->
								<v-flex row align-end justify-end>
									<v-rating
										size="20px"
										color="yellow"
										class="black-shadow ratings"
										half-increments
										:value="tour.rating.average"
										readonly
									></v-rating>
									<div class="ratings">({{tour.rating.count}})</div>
									<v-spacer></v-spacer>
									<v-btn :to="'/tours/single/' + tour.key" class="explore-btn" small>EXPLORE</v-btn>
								</v-flex>

							</v-layout>
						</v-img>
				</v-card>
			</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
export default {
	data: () => ({
		tours: [],
		search: "",
		asearchTitle: "",
		asearchDate: "",
		asearchGuest: "",
		guestNo: [1,2,3,4,5,6,7,8,9,10],
		menu: false,
		date: ""
	}),
	methods:{
		searchResult(){
			this.$store.commit("setSearchTitle", this.asearchTitle)
		}
	},
	computed: {
	filteredTours: function() {
		return this.tours.filter(tour => {
		try {
			if (tour.title.toLowerCase().match(this.asearchTitle.toLowerCase())) {
			return true;
			} else if (
			tour.location.city
				.toLowerCase()
				.match(this.asearchTitle.toLowerCase())
			) {
			return true;
			} else if (
			tour.category.toLowerCase().match(this.asearchTitle.toLowerCase())
			) {
			return true;
			} else {
			return false;
			}
		} catch (error) {
			alert("failed to load tours")
		}
		});
	}
	},
	mounted() {
	this.$http
		.get("/tour/all")
		.then(response => (this.tours = response.data))
		.catch(error => alert(error))
		.finally(() => (this.loading = false));
	this.asearchTitle = this.$store.getters.getSearchTitle;
	this.asearchDate = this.$store.getters.getSearchDate;
	this.asearchGuest = this.$store.getters.getSearchGuest;
	}
};
</script>


<style>
.ratings {
	color: white;
	font-size: 20px;
	text-align: right;
	text-shadow: 1px 1px 2px black;
	padding-bottom: 10px;
}

.black-shadow {
	text-shadow: 1px 1px 2px black;
}

.black-shadow.ratings {
	padding-left: 30px;
}

.explore-btn {
	color: white;
	margin-bottom: 20px;
}
</style>

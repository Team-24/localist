<template>
  <div>
    <v-layout wrap pt-5 justify-center>
      <v-flex xs8 class="cyan--text text--darken-2 display-2 font-weight-black font-italic bgc-b">
        Booking
      </v-flex>
    </v-layout>

    <v-layout wrap justify-center>
      
      <v-flex 
        xs12 md4
				py-3
        pt-5
        light 
        class="bgc-b"
      >
        <!-- 
          *************************
          ** Check Availability **
          *************************
        -->
        <v-layout row wrap justify-space-around>
					<v-flex xs6 >
            <div class="title" style="text-align: left;"> Guide's Availability </div>
            <v-divider></v-divider>

            <div>
              <v-layout 
                row wrap  
                v-for="(availability, i) in info.data && info.data.availability" 
                :key="i"
              >
                <v-flex xs3>
                  <input type="checkbox" id="i">
                </v-flex>
                <v-flex xs3>
                  <label class="subheading" for="i"> {{availability.date}}, {{availability.time}}</label>
                </v-flex>
              </v-layout>
            </div>
            <!-- <v-radio-group v-model="radioGroup">
              <v-radio 
                v-for="(availability, i) in info.data && info.data.availability"
                :key="i"
                :value="i"
                :src="availability"
                label="availability.date"
                class="subheading" 
                style="text-align: left;"
              > 

              </v-radio>
            </v-radio-group> -->
					</v-flex>
        </v-layout>

        <!-- 
          *************************
          ** Guests Information **
          *************************
        -->
				<v-layout pt-3 row wrap justify-space-around fill-height>
					<v-flex xs6>
						<form>
							<div class="title" style="text-align: left;"> Traveller Infomation </div>
							<v-divider></v-divider>
              <!-- 
                ** Guests 1 default to be the account owner **
              -->
              <div class="subheading" style="text-align: left;"> Guest 1 </div>
							<v-text-field
								v-model="first_name"
								label="First Name"
                :placeholder="first_name"
								disabled
							></v-text-field>
              <v-text-field
								v-model="last_name"
								label="Last Name"
                :placeholder="last_name"
                disabled
							></v-text-field>

              <v-btn small> Add More Guest</v-btn>

						</form>
					</v-flex>
				</v-layout>
      </v-flex>

        <!-- 
          *****************************
          ** Confirm Number of Guest **
          *****************************
        -->
        <!-- <v-layout row wrap justify-space-around fill-height>
					<v-flex xs6>
						<v-flex 
							xs6 
						>
							Adult 
							<br>
							(19+ years old)</v-flex>
						<v-flex xs6>
							<v-select :items="numbers" v-model="numOfAdult"></v-select>
						</v-flex>
					</v-flex>

					<v-flex xs3>
						<v-flex 
							xs6 
						>
							# Of Youth 
							<br>
							(13-18 years old)</v-flex>
						<v-flex xs6>
							<v-select :items="numbers" v-model="numOfYouth"></v-select>
						</v-flex>
					</v-flex>

					<v-flex xs3>
						<v-flex 
							xs6 
						>
							# Of Chrild 
							<br>
							(8-12 years old)</v-flex>
						<v-flex xs6>
							<v-select :items="numbers" v-model="numOfChild"></v-select>
						</v-flex>
					</v-flex>
				</v-layout> -->
      

      <!-- 
        *****************
        ** Tour Review **
        *****************
      -->
      <v-flex
        xs12 md4
        py-3
        pt-5
        light
        class="bgc-b"
      >
        <v-layout row wrap justify-space-around fill-height>

					<v-flex xs6>
            <!-- 
              ** Basic Information about the tour **
            -->
            <v-flex class="title align-left"> Tour Review </v-flex>
            <v-divider></v-divider>
            <v-flex 
              xs12
              class="subheading font-weight-bold mb-2 align-left"
            >
              {{info.data && info.data.title}}
            </v-flex>
            <v-flex py-3 xs12>
              <v-carousel dark height="250">
                <v-carousel-item
                  v-for="(image, i) in info.data && info.data.images"
                  :key="i"
                  :src="info.data.images[i]"
                ></v-carousel-item>
              </v-carousel>
            </v-flex>
            <v-flex 
              xs12
              class="subheading mb-2 align-left"
            >
              {{info.data && info.data.tour_description}}
            </v-flex>

            <!-- 
              ** Payment Information **
            -->
            <v-flex pt-3 class="title align-left"> Payment Information </v-flex>
            <v-divider></v-divider>
            <v-flex class="subheading font-weight-bold align-left"> 
              <v-layout>
                <v-flex>Total Amount: </v-flex>
                <v-spacer></v-spacer>
                <v-flex>${{info.data && info.data.price.low}}.00 </v-flex>
              </v-layout>
            </v-flex>
					</v-flex>
        </v-layout>
      </v-flex>

      <!-- 
        ** Payment Information **
      -->
      <v-flex xs8 class="bgc-b">
        <v-checkbox
          v-model="checkbox"
          label="I agree the Refund Policy, the Guest Waiver, and the Cancellation Policy."
          required
        ></v-checkbox>
      </v-flex>
      <v-flex xs8 class="bgc-b">
        <v-btn 
          @click="submit"
          dark
          class="cyan darken-2 mt-5"
          :to="'/tours/single/' + this.$route.params.id + '/booking/payment'"
          >
          Continue
        </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>

  export default {
    name: "Booking",

    data: () => ({
      info: "",
      first_name: "",
      last_name: "",
      checkbox: false,
			numOfAdult: "",
			numOfChild: "",
			numbers: ["0", "1", "2", "3", "4"],
    }),

    computed: {
      // checkboxErrors () {
      //   const errors = []
      //   if (!this.$v.checkbox.$dirty) return errors
      //   !this.$v.checkbox.checked && errors.push('You must agree to continue!')
      //   return errors
      // }
    },

    mounted() {
      var instance = this;
      this.$http
        .get("/tour/find/" + this.$route.params.id + "/true")
        .then(function(response) {
          instance.info = response;
          if (response.data.reviews) {
            instance.reviews = true;
          }
        })
        .catch(error => alert(error))
        .finally(() => (this.loading = false));

      var guestOne = this;
      this.$http
        .get("/user/find/" + this.$store.getters.getUserKey)
        .then(function(response) {
          response = response.data;
          if (response.name){
            guestOne.first_name = response.name.first;
            guestOne.last_name = response.name.last;
          }
        })
    },

    methods: {
      submit () {
        
      },
    }
  }
</script>

<style>
  .bgc-w{
    background-color: #FFFFFF;
  }

  .bgc-b{
    background-color: #ebe9e7;
  }

  .align-left{
    text-align: left;
  }

  .align-right{
    text-align: right;
  }

  .align-center{
    text-align: center;
  }
</style>
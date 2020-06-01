<template>
  <div class="bg-icons">
    <v-content>
      <section>
        <v-parallax :src="require('@/assets/background-1.jpeg')"
          gradient="rgba(0, 0, 0, .22), rgba(0, 0, 0, .22)"
          height="550">
          <v-layout column align-center class="white--text">
            <v-flex xs12 mt-5>
              <h1
                class="white--text display-3 font-weight-black text-xs-center black-shadow"
              >Localist</h1>
              <div class="white--text subheading text-xs-center black-shadow">by TEAM 24</div>
            </v-flex>
            <v-flex xs12 mt-5>
              <v-toolbar color="grey lighten-3" floating height="60" class="rounded-border" v-on:keyup.enter="addSearch">
                <v-layout>
                  <v-flex xs7>
                    <v-text-field hide-details label="Activities, interests..." v-model="search"></v-text-field>
                  </v-flex>

                  <v-flex mx-3 xs3>
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

                  <v-flex xs3>
                    <v-select
                      :items="guestNo"
                      label="Guests"
                      clearable
                    ></v-select>
                  </v-flex>

                  <v-flex ml-3>
                    <v-toolbar-items>
                      <v-btn @click="addSearch" icon large >
                        <v-icon hide-details>search</v-icon>
                      </v-btn>
                    </v-toolbar-items>
                  </v-flex>
                </v-layout>
              </v-toolbar>
            </v-flex>

            <v-flex xs12 align-self-center>
              <p class="subheading black-shadow">The BEST way to experience local culture.</p>
            </v-flex>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <FeaturedTours></FeaturedTours>
      </section>

      <section>
        <v-parallax :src="require('@/assets/background-3.jpeg')" height="380">
          <v-layout column align-center justify-center>
            <div class="headline white--text font-weight-black mb-3 text-xs-center">
              <span class="black-shadow">Customized local tours that can't be found anywhere else.</span>
            </div>
            <v-btn class="cyan darken-2 mt-5 font-weight-black" dark large href="#">Get Started</v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-layout column wrap align-center>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex align-self-start xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="cyan--text text--darken-2">color_lens</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Customizable</div>
                    </v-card-title>
                    <v-card-text class="justify-spacing">
                      We are huge believers in customized tours, and bringing unique memories home with you, wherever you go.
                      You needs and interests aren't the same as anyone elses, so why look for the same tours?
                      We support guide-to-tourist communication, so that everyone involved can be certain of what is going to work best for them.
                    </v-card-text>
                  </v-card>
                </v-flex>

                <v-flex align-self-start xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="cyan--text text--darken-2">tag_faces</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Fun</div>
                    </v-card-title>
                    <v-card-text class="justify-spacing">
                      There's no point in travelling if you aren't going to have some fun, right?
                      Find independent, local experts in your travel destination. There's no doubt
                      that the people who are passionate about their home will want to share all
                      the fun that is to be had there with you! Find the people that share your niche with you!
                    </v-card-text>
                  </v-card>
                </v-flex>

                <v-flex align-self-start xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="cyan--text text--darken-2">verified_user</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Secured</div>
                    </v-card-title>
                    <v-card-text class="justify-spacing">
                      We stand behind our guides 100%. We believe in care-free travelling, so the only thing that should concern you
                      is showing up on time and having fun, or seeing what you came to see! Our secure payment
                      process is risk-free, quick, and allows you to worry about what's important; having a great experience.
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <v-parallax :src="require('@/assets/community.jpeg')" height="380">
          <v-layout column align-center justify-center>
            <div
              class="display-2 font-weight-bold align-left white--text text-capitalize black-shadow"
            >Join the community</div>

            <v-divider></v-divider>

            <div
              class="title align-left white--text linehi-med black-shadow"
            >Your experiences and expertise are an asset. Sell them!</div>
            <v-btn
              class="cyan darken-2 mt-5 font-weight-black"
              dark
              to="/tours/createtour"
            >Host Your Own Tour</v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <!-- 
          ************************
          ** Work on your terms **
          ************************
      -->
      <section>
        <v-layout mt-5 mx-5 justify-center>
          <v-flex md5 mx-5>
            <v-layout wrap justify-center column>
              <v-flex mt-5 xs10 class="subheading font-weight-thin align-left">Be your own boss</v-flex>
              <v-flex mt-2 xs10 class="display-1 font-weight-bold align-left">Work when you want to</v-flex>

              <v-divider width="15%" color="teal"></v-divider>

              <v-flex class="subheading font-weight-regular align-left linehi-med justify-spacing">
                Localist lets you set your own days and hours. There are no bosses here to ask when you clocked 
                in and clocked out.  Making income on Localist as a guide is great, but it's important that our 
                guides have passion for their cities.  Whether you are into bird-sighting or bike-riding, you 
                do it because you want to, not because you have to.
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex md5 mx-5 align-self-center>
            <v-img 
              :src="require('@/assets/schedule.jpeg')"
              max-height="320"
            ></v-img>
          </v-flex>
        </v-layout>
      </section>

      <!-- 
            *****************************
            ** Meet Interesting People **
            *****************************
      -->
      <section>
        <v-layout mt-5 mx-5 justify-center>
          <v-flex md5 mx-5 align-self-center>
            <v-img 
            :src="require('@/assets/people.jpeg')"
            max-height="320"
          ></v-img>
          </v-flex>

          <v-flex md5 mx-5>
            <v-layout wrap justify-center column>
              <v-flex
                mt-5
                xs10
                class="subheading font-weight-thin align-left"
              >Learn different culture</v-flex>
              <v-flex
                mt-2
                xs10
                class="display-1 font-weight-bold align-left"
              >Meet Interesting People</v-flex>

              <v-divider width="15%" color="teal"></v-divider>

              <v-flex
                xs10
                class="subheading font-weight-regular align-left linehi-med justify-spacing"
              >
                As a specialist in your city, you've seen and experienced all your favourite things, that's what makes you the expert!
                But you've probably never experienced your favourite parts of the city while showing them off!  You have the opportunity 
                to become the connection between travellers and your city.  You get to meet awesome, foreign travellers, and make lifetime
                connections!
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </section>

      <!-- 
            **************************************
            ** Make use of your local knowledge **
            **************************************
      -->
      <section>
        <v-layout my-5 mx-5 justify-center>
          <v-flex md5 mx-5>
            <v-layout wrap justify-center column>
              <v-flex
                mt-5
                xs10
                class="subheading font-weight-thin align-left"
              >Tailor your passions into unique experiences</v-flex>
              <v-flex
                mt-2
                xs10
                class="display-1 font-weight-bold align-left"
              >Make use of your local knowledge</v-flex>

              <v-divider width="15%" color="teal"></v-divider>

              <v-flex
                xs10
                class="subheading font-weight-regular align-left linehi-med justify-spacing"
              >
                Everybody has a unique set of skills, experiences, and interests.  At Localist, we believe that there are no cookie-
                cutter experiences, and that every guide will create something different and exciting for the tourist if given the 
                freedom to do so.  
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex md5 mx-5 align-self-center>
            <v-img
              :src="require('@/assets/city.jpeg')"
              max-height="320"
            ></v-img>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <div>
          <v-parallax :src="require('@/assets/background-camp.jpeg')" height="600">
            <v-layout column align-center justify-center>
              <div
                class="display-2 font-weight-bold align-left white--text text-capitalize"
              >Become a guide</div>

              <v-divider></v-divider>

              <div
                class="title align-left white--text linehi-med text-capitalize"
              >share your passion. create memorable stories.</div>
              <v-btn
                class="cyan darken-2 mt-5 font-weight-bold"
                dark
                to="/tours/createtour"
              >Host Your Own Tour</v-btn>
            </v-layout>
          </v-parallax>
        </div>
      </section>

      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center>
            <v-flex xs12 sm5>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Our Story</div>
                </v-card-title>
                <v-card-text class="subheading justify-spacing">
                  Team24 is a company made of 4 developers and travelers,
                  all with a common goal: to make tours cheaper, more enjoyable,
                  and more available for everyone. Localist is the product child
                  of a vision where the tourism industry is given back to the person
                  that has all the local knowledge: you, the localist.
                </v-card-text>
              </v-card>
            </v-flex>

            <v-flex xs12 sm5 offset-sm1>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Contact us</div>
                </v-card-title>
                <v-list class="transparent">
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">place</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Vancouver, Canada</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">email</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title
                        href="&#109;ailt&#111;&#58;%6&#67;%6&#70;&#99;a&#108;&#105;s&#116;&#64;&#37;6C&#37;6Fc&#97;&#108;i&#37;73%74%2E&#99;o&#109;"
                      >loc&#97;list&#64;loc&#97;lis&#116;&#46;com</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>
    </v-content>
  </div>
</template>

<script>
import router from "../router";
import FeaturedTours from "./FeaturedTours.vue";
export default {
  data: () => ({
    date: "",
    search: "",
    guest: "",
    menu: false,
    modal: false,

    loading: false,
    items: ["Biking", "Hiking", "Wine"],
    select: null,

    guestNo: [1,2,3,4,5,6,7,8,9,10]
  }),
  methods: {
    addSearch() {
      this.search
        ? this.$store.commit("setSearchTitle", this.search)
        : (this.search = "");
      // this.$store.commit("setSearchTitle", this.search);
      this.$store.commit("setSearchDate", this.date);
      this.$store.commit("setSearchGuest", this.guest);
      router.push("/tours");
    }
  },
  components: { FeaturedTours }
};
</script>

<style>
.black-shadow {
  text-shadow: 1px 1px 2px black;
}

.rounded-border {
  border-radius: 5px;
}

.none-dec {
  text-decoration: none;
}

.justify-spacing {
  text-align: justify;
  text-justify: inter-word;
}

.bg-icons {
  background-image: url('https://developer.salesforce.com/resources2/certification-site/images/icons-background.png');
  background-repeat: repeat;
  background-position: center;
  background-size: auto auto;
  z-index: 0;
  position: relative;
}


</style>

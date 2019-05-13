<template>
    <div>
        <v-content>
          <section>
            <v-parallax 
              :src="require('@/assets/background-1.jpeg')" 
              height="650">
              <v-layout
                column
                align-center
                justify-center
                class="white--text"
              >
                <h1 class="cyan--text text--darken-2 mb-2 mt-5 display-3 font-weight-black font-italic text-xs-center">Localist</h1>
                <div class="cyan--text text--darken-2 subheading mb-5 text-xs-center">by TEAM 24</div>
                
            <v-layout row wrap justify-space-around >
                <v-flex xs12 md4>
                  <v-text-field
                      background-color="white"
                      v-model="search"
                      label="Search"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md3>
                  <v-menu
                      v-model="menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model="date"
                            readonly
                            v-on="on"
                            background-color="white"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" @input="menu = false" no-title></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 md3>
                    <v-text-field
                            v-model="guest"
                            type="number"
                        label="#. of guest"
                        background-color="white"
                    ></v-text-field>
                </v-flex>
                <v-flex md12 ma-0>
                    <v-btn @click="addSearch" large class="cyan darken-2 white--text"> Search </v-btn>
                </v-flex>
            </v-layout>

              </v-layout>
            </v-parallax>
          </section>

          <section>
            <v-layout
              column
              wrap
              class="my-5"
              align-center
            >
              <v-flex xs12 sm4 
                class="my-3"
              >
                <div class="text-xs-center">
                  <h2 class="headline">
                    The BEST way to experience local culture.
                  </h2>
                </div>
              </v-flex>
              <v-flex xs12>
                <v-container grid-list-xl>
                  <v-layout row wrap align-center>
                    <v-flex xs12 md4>
                      <v-card class="elevation-0 transparent">
                        <v-card-text class="text-xs-center">
                          <v-icon x-large 
                            class="cyan--text text--darken-2">color_lens
                          </v-icon>
                        </v-card-text>
                        <v-card-title primary-title class="layout justify-center">
                          <div class="headline text-xs-center">Customizable</div>
                        </v-card-title>
                        <v-card-text>
                          We are huge believers in customized experiences, and bringing unique memories home with you, wherever you go.  You needs and interests aren't the same as anyone elses, so why look for the same experiences? We support guide-to-tourist communication, so that everyone involved can be certain of what is going to work best for them.
                        </v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 md4>
                      <v-card class="elevation-0 transparent">
                        <v-card-text class="text-xs-center">
                          <v-icon x-large class="cyan--text text--darken-2">flash_on</v-icon>
                        </v-card-text>
                        <v-card-title primary-title class="layout justify-center">
                          <div class="headline">Fun</div>
                        </v-card-title>
                        <v-card-text>
                            There's no point in travelling if you aren't going to have some fun, right?  Find independent, local experts in your travel destination.  There's no doubt that the people who are passionate about their home will want to share all the fun that is to be had there with you!  Find your the people that share your niche with you!
                        </v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 md4>
                      <v-card class="elevation-0 transparent">
                        <v-card-text class="text-xs-center">
                          <v-icon x-large class="cyan--text text--darken-2">shield</v-icon>
                        </v-card-text>
                        <v-card-title primary-title class="layout justify-center">
                          <div class="headline text-xs-center">Secured</div>
                        </v-card-title>
                        <v-card-text>
                          We stand behind our guides 100%.  We believe in care-free travelling, that should concern you is showing up on time and having fun, or seeing what you came to see!  Our secure payment process is risk-free, quick, and allows you to worry about what's important; having a great experience.
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-flex>
            </v-layout>
          </section>

          <section>
            <v-parallax 
              :src="require('@/assets/background-2.jpeg')" 
              height="380"
            >
              <v-layout column align-center justify-center>
                <div class="headline white--text font-weight-black mb-3 text-xs-center">
                    <span class="black-shadow">
                        Custom local experiences that can't be found anywhere else.
                    </span>
                </div>
                <v-btn
                  class="cyan darken-2 mt-5 font-weight-black"
                  dark
                  large
                  href="#"
                >
                  Get Started
                </v-btn>
              </v-layout>
            </v-parallax>
          </section>

          <section>
            <v-container grid-list-xl>
              <v-layout row wrap justify-center class="my-5">
                <v-flex xs12 sm4>
                  <v-card class="elevation-0 transparent">
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Our Story</div>
                    </v-card-title>
                    <v-card-text>
                      Team24 is a company made of 4 developers and travelers, all with a common goal: to make experiences cheaper, more enjoyable, and more available for everyone.  Localist is the product child of a vision where the tourism industry is given back to the person that has all the local knowledge: you, the localist.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 sm4 offset-sm1>
                  <v-card class="elevation-0 transparent">
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Contact us</div>
                    </v-card-title>
                    <v-card-text>
                    </v-card-text>
<!--
                    <v-list class="transparent">
                      <v-list-tile>
                        <v-list-tile-action>
                          <v-icon class="blue--text text--lighten-2">phone</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                          <v-list-tile-title>604-123-4567</v-list-tile-title>
                        </v-list-tile-content>
-->
                      <!-- </v-list-tile> -->
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
                          <v-list-tile-title href='&#109;ailt&#111;&#58;%6&#67;%6&#70;&#99;a&#108;&#105;s&#116;&#64;&#37;6C&#37;6Fc&#97;&#108;i&#37;73%74%2E&#99;o&#109;'>loc&#97;list&#64;loc&#97;lis&#116;&#46;com</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    <!-- </v-list> -->
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
  export default {

    data: () => ({

        date: new Date().toISOString().substr(0, 10),
        search: '',
        guest: '',
        menu: false,
        modal: false,
        searchInput:[
          { searchTitle:'',
            searchDate:'',
            searchGuest:''}
        ]
    }),
    methods:{
      addSearch(){

        this.$store.commit("setSearchTitle", this.search);
        this.$store.commit("setSearchDate", this.date);
        this.$store.commit("setSearchGuest", this.guest);
        this.console.log(this.search);
        this.console.log(this.date);
        this.console.log(this.guest);
        router.push("/tours");
      }
    }
  };
</script>

<style>
    .black-shadow{
        text-shadow: 1px 1px 2px black; 
    }
</style>



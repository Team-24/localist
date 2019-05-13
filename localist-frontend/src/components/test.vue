<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <v-content>
            <section>
                <v-parallax
                    src="https://images.unsplash.com/photo-1501547188-6a8b7cdcce6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1348&q=80"
                    min-height="450px"
                    max-height="950px"
                >
                    <v-container id="search" grid-list-md text-xs-center>
                        <v-layout row wrap align-center justify-center>
                            <v-flex md4>
                                <v-text-field
                                    background-color="white"
                                    placeholder="What is your dream experience"
                                ></v-text-field>
                            </v-flex>
                            <v-flex md4>
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
                            <v-flex md4>
                                <v-text-field
                                    input
                                    type="number"
                                    background-color="white"
                                    placeholder="# of guests"
                                ></v-text-field>
                            </v-flex>
                            <v-flex md12 ma-0>
                                <v-btn color="blue">Search</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-parallax>
            </section>
            <section>
                <v-container fluid grid-list-sm>
                    <v-layout row wrap>
                        <v-flex d-flex md8>
                            <v-card color="white" flat>
                                <v-card-text>Work on your terms</v-card-text>
                                <v-card-text>Host as many experiences as you want</v-card-text>
                                <v-card-text>Choose your own price and group size</v-card-text>
                                <v-card-text>Do what works best for you</v-card-text>
                            </v-card>
                        </v-flex>
                        <v-flex md4>
                            <v-card color="white" flat>
                                <v-img

                                    :src="'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80'"
                                    :aspect-ratio="1"
                                    height="350"
                                ></v-img>
                            </v-card>
                        </v-flex>
                        <v-flex d-flex md12>
                            <v-card color="white" flat>
                                <v-img
                                        :src ="'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'"
                                        :aspect-ratio="16/9"
                                        height="30%"
                                >
                                    <p class="image_title">Sell your unique experience</p>
                                    <p class="image_title">Become a local guide</p>
                                </v-img>

                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </section>
        </v-content>
    </div>
</template>
<script>
export default {
    data: () => ({
        date: new Date().toISOString().substr(0, 10),
        menu: false,
        modal: false
    })
};
</script>
<style scoped>

    #background{
        height: 75%;
    }
    #search{
        margin-top: 10%;
    }
    .image_title{
        margin-right: 10%;
        margin-top: 10%;
        color: white;
        font-weight: bold;
        float: right;
    }

</style>
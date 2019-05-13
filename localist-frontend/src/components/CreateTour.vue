<template>
    <div >

        <form v-on:submit.prevent="createTour">
            <v-divider></v-divider>
            <v-layout mx-5 row justify-center>
                <v-flex md3>
                    <v-text-field
                            xs4
                            background-color="white"
                            label="Title"
                            v-model="title"
                      ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout mx-5 row justify-center>
                <v-flex mx-5 md3>
                    <v-text-field 
                            xs4
                            background-color="white"
                            label="Description"
                            v-model="tour_description"
                      ></v-text-field>
                </v-flex>

                <v-flex mx-5 md3>
                    <v-text-field
                            xs4
                            background-color="white"
                            label="Category"
                            v-model="category"
                      ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout mx-5 row justify-center>
                <v-flex mx-5 md3>
                    <v-text-field
                            xs4
                            background-color="white"
                            label="Country"
                            v-model="location.country"
                      ></v-text-field>
                </v-flex>

                <v-flex mx-5 md3>
                    <v-text-field
                            xs4
                            background-color="white"
                            label="City"
                            v-model="location.city"
                      ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout mx-5 row justify-center>
                <v-flex mx-5 md3>
                    <v-text-field
                            xs4
                            background-color="white"
                            label="Max Duration"
                            v-model="duration.long"
                      ></v-text-field>
                </v-flex>

                <v-flex mx-5 md3>
                    <v-text-field
                            xs4
                            background-color="white"
                            label="Min Duration"
                            v-model="duration.short"
                      ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout mx-5 row justify-center>
                <v-flex mx-5 md3>
                    <v-text-field
                            xs4
                            background-color="white"
                            label="Max Price"
                            v-model="price.high"
                      ></v-text-field>
                </v-flex>

                <v-flex mx-5 md3>
                    <v-text-field
                            xs4
                            background-color="white"
                            label="Min Price"
                            v-model="price.low"
                      ></v-text-field>
                </v-flex>
            </v-layout>

            <v-btn large class="cyan darken-2 white--text" type="submit">Create Tour</v-btn>
        </form>
    </div>
</template>
<script>
import router from "../router";
export default {
    name: "createTour",
    data: () => ({
        title: "",
        tour_description: "",
        category:"",
        location: {
            country: "",
            city: ""
        },
        duration: {
            long: "",
            short: ""
        },
        price: {
            high: "",
            low: ""
        },
        user_key: "-LeIrh-Z8PYSfp9CTZsk"
    }),
    methods: {
        createTour() {
            const formData = {
                title: this.title,
                tour_description: this.tour_description,
                category: this.category,
                location: {
                    country: this.location.country,
                    city: this.location.city                    
                },
                duration: {
                    long: this.duration.long,
                    short: this.duration.short
                },
                price: {
                    high: this.price.high,
                    low: this.price.low
                },
                user_key: this.user_key
            };
            console.log(formData);
            this.$http
                .post("/tour/add", formData)
                .then(function(response) {
                    router.push("/tours");
                })
                .catch(function(error) {
                    alert(error);
                });
        } 
    }
};
</script>
<style scoped>
</style>
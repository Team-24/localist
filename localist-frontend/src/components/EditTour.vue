<template>
    <div>
        <v-layout wrap pt-3 justify-center>
            <v-flex
                xs8
                class="cyan--text text--darken-2 display-2 font-weight-black font-italic"
            >Edit Tour</v-flex>
        </v-layout>

        <v-divider></v-divider>

        <form v-on:submit.prevent="editTour">
            <v-layout pt-4 row justify-center>
                <v-flex md5>
                    <v-text-field
                        label="Title *"
                        placeholder="Title of Tour"
                        v-model="formData.title"
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row justify-center>
                <v-flex mx-2 md5>
                    <v-textarea
                        auto-grow
                        label="Description *"
                        v-model="formData.tour_description"
                        placeholder="Description of Tour"
                    ></v-textarea>
                </v-flex>
            </v-layout>

            <v-layout row justify-center>
                <v-flex mx-2 md5>
                    <v-text-field
                        label="Additional Comment "
                        v-model="formData.additional_comments"
                        placeholder="Additional Comments about the Tour"
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row justify-center>
                <v-flex mx-2 md5>
                    <v-text-field
                        label="Category *"
                        v-model="formData.category"
                        placeholder="Category"
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row justify-center>
                <v-flex mx-2 md3>
                    <v-text-field
                        label="Country *"
                        v-model="formData.location.country"
                        placeholder="Country"
                    ></v-text-field>
                </v-flex>

                <v-flex mx-2 md3>
                    <v-text-field
                        label="City *"
                        v-model="formData.location.city"
                        placeholder="City"
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row justify-center>
                <v-flex mx-2 md3>
                    <v-text-field
                        label="Min Duration *"
                        v-model="formData.duration.short"
                        placeholder="Minimum duration of tour"
                    ></v-text-field>
                </v-flex>

                <v-flex mx-2 md3>
                    <v-text-field
                        label="Max Duration *"
                        v-model="formData.duration.long"
                        placeholder="Maximum duration of tour"
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row justify-center>
                <v-flex mx-2 md3>
                    <v-text-field
                        xs4
                        label="Min Price *"
                        v-model="formData.price.low"
                        placeholder="Price low"
                    ></v-text-field>
                </v-flex>

                <v-flex mx-2 md3>
                    <v-text-field
                        xs4
                        label="Max Price *"
                        v-model="formData.price.high"
                        placeholder="Price high"
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row justify-center>
                <v-flex mx-2 md3>
                    <v-text-field
                        xs4
                        label="Min Guest *"
                        v-model="formData.guests.low"
                        placeholder="Amount of guests low"
                    ></v-text-field>
                </v-flex>

                <v-flex mx-2 md3>
                    <v-text-field
                        xs4
                        label="Max Guest *"
                        v-model="formData.guests.high"
                        placeholder="Amount of guests high"
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout pb-5 row justify-center>
                <v-btn dark large Submit pb-5 class="cyan darken-2" v-on:click="editTour()">Submit</v-btn>
            </v-layout>
        </form>
    </div>
</template> 


<script>
import router from "../router";

export default {
    name: "editTour",

    data: () => ({
        formData: {
            title: "",
            tour_description: "",
            category: "",
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
            guests: {
                high: "",
                low: ""
            },
            additional_comments: "",
            availability: "",
            user_key: ""
        }
    }),

    methods: {
        editTour() {
            this.$http
                .patch("/tour/update/" + this.$route.params.id, this.formData)
                .then(function(response) {
                    router.push("/tours");
                })
                .catch(function(error) {
                    alert(error);
                });
        }
    },

    mounted() {
        this.$http
            .get("/tour/find/" + this.$route.params.id + "/true")
            .then(response => (this.formData = response.data))
            .catch(error => alert(error))
            .finally(() => (this.loading = false));
    }
};
</script>
<style scoped>
</style>
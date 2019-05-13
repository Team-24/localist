<template>
    <div id="tourList">
        <h1
            class="cyan--text text--darken-2 mb-2 display-3 font-weight-black font-italic text-xs-center"
        >Tours</h1>

        <v-btn 
            large 
            class="white" 
            to="tours/createtour"
        >
            Create Tour
        </v-btn>
        <v-text-field
                type="text"
                v-model="asearchTitle"
                label="Search tours"
                clearable
        ></v-text-field>
        <v-text-field
                type="text"
                v-model="asearchDate"
                label="Date"
                clearable
        ></v-text-field>
        <v-text-field
                type="number"
                v-model="asearchGuest"
                label="# of guests"
                clearable
        ></v-text-field>
        <v-container>
            <v-layout wrap justify-space-around>
                <v-flex
                    v-for="tour in filteredTours"
                    :key="tour.key"
                    xs3
                    sm3
                    mx-4
                    my-3
                    class="tour-card"
                >
                    <base-card height="350px" color="grey lighten-1" dark href="#!">
                        <v-img
                            :src="tour.main_image"
                            height="100%"
                            gradient="rgba(0, 0, 0, .32), rgba(0, 0, 0, .32)"
                        >
                            <v-layout fill-height wrap text-xs-right ma-0>
                                <v-flex xs12>
                                    <v-chip
                                        label
                                        class="mb-2 text-uppercase"
                                        color="cyan darken-2"
                                        text-color="white"
                                        small
                                        @click.stop
                                    >{{ tour.category }}</v-chip>
                                    <h3
                                        class="white--text title font-weight-bold mb-2"
                                    >{{ tour.title }}</h3>
                                    <div class="white--text caption">
                                        ${{tour.price.low}} - ${{tour.price.high}}
                                        <br>
                                        {{tour.location.city}}
                                    </div>
                                </v-flex>

                                <v-flex align-self-end>
                                    <v-btn
                                        :to="'/tours/single/' + tour.key"
                                        class="white text-uppercase"
                                        small
                                    >Explore</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-img>
                    </base-card>
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
        asearchGuest: ""
    }),
    computed: {

        filteredTours: function () {
            return this.tours.filter((tour) => {
                if (tour.title.toLowerCase().match(this.asearchTitle.toLowerCase())) {
                    return true;
                } else if (tour.location.city.toLowerCase().match(this.asearchTitle.toLowerCase())) {
                    return true;
                } else if (tour.category.toLowerCase().match(this.asearchTitle.toLowerCase())) {

                    return true;
                } else {
                    return false;
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

<style scoped>
</style>

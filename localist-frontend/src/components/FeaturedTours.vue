<template>
    <div>
        <section>
            <v-layout row wrap class="my-5 mx-5" align-center justify-space-around>
                <v-flex mb-4 xs12>
                    <h1 class="display-1 font-weight-medium">Featured Tours</h1>
                </v-flex>

                <v-hover v-for="tour in tours" :key="tour.key">
                    <v-flex
                        xs12
                        sm4
                        lg2
                        mx-1
                        my-2
                        slot-scope="{ hover }"
                        :class="`elevation-${hover ? 12 : 2}`"
                    >
                        <v-card height="10%" color="white" dark :to="'/tours/single/' + tour.tour_key">
                            <v-img
                                class="black-shadow"
                                :src="tour.main_image"
                                height="300"
                                gradient="rgba(0, 0, 0, .32), rgba(0, 0, 0, .32)"
                            >
                                <!-- <v-expand-transition>
                                    <div
                                        v-if="hover"
                                        class="title"
                                        style="height: 100%; text-decoration: none;"
                                        :to="'/tours/single/' + tour.key"
                                    >{{tour.tour_description}}</div>
                                </v-expand-transition> -->

                                <v-layout fill-height wrap text-xs-right ma-0>
                                    <v-flex xs12>
                                        <v-chip
                                            label
                                            class="mb-2 text-uppercase none-dec"
                                            color="cyan darken-2"
                                            text-color="white"
                                            small
                                            @click.stop
                                        >{{tour.category}}</v-chip>
                                        <h3
                                            class="white--text title font-weight-bold mb-2"
                                        >{{tour.title}}</h3>
                                        <div class="white--text caption">
                                            ${{tour.price.low}} (per guest)
                                            <br>
                                            {{tour.location.city}}, {{tour.location.country}}
                                        </div>
                                    </v-flex>
                                    <v-flex row align-end justify-end>
                                        <v-rating
                                            size="20px"
                                            color="yellow"
                                            half-increments
                                            :value="tour.rating.average"
                                            readonly
                                        ></v-rating>
                                        <div class="ratings">({{tour.rating.count}})</div>
                                    </v-flex>
                                </v-layout>
                            </v-img>
                            <v-card-actions align-self-end>
                                <v-layout row warp justify-space-around>
                                    <v-flex sm12>
                                        <v-btn
                                            width="100%"
                                            color="cyan darken-2"
                                            :to="'/tours/single/' + tour.tour_key"
                                            flat
                                        >Explore</v-btn>
                                    </v-flex>
                                    
                                    <v-flex sm12>
                                        <v-btn
                                            width="100%"
                                            :to="'/tours/single/' + tour.tour_key + '/booking'"
                                            color="cyan darken-2"
                                            flat
                                        >Book Now</v-btn>
                                    </v-flex>
                                    
                                </v-layout>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-hover>
            </v-layout>
        </section>
    </div>
</template>

<script>
export default {
    name: "FeaturedTours",
    data: () => ({
        tours: []
    }),
    methods: {},
    mounted() {
        this.$http
            .get("/tour/featured")
            .then(response => (this.tours = response.data))
            .catch(error => alert(error));
        // .finally(() => (this.loading = false));
    }
};
</script>

<style scoped>
.ratings {
    color: white;
    font-size: 20px;
}

.additional-data {
    font-size: 20px;
}

.card-title {
    font-size: 30px;
}

.black-shadow {
    text-shadow: 1px 1px 2px black;
}
</style>



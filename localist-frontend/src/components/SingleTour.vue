<template>
    <div id="tourList">
        <v-container fluid grid-list-md>
            <v-layout column wrap>
                <v-flex d-flex xs12 sm6 md6>
                    <v-card tile flat color="white">
                        <v-card-text>
                            <img
                                    src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80"
                                    id="tour-img"
                            >
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex>
                    <v-card flat color="white">
                        <v-card-title primary class="title">{{ info.data && info.data.title }}</v-card-title>
                        <v-card-text><img height="40px" src="../assets/img/location.png"/> {{info.data && info.data.location.city}}, {{info.data && info.data.location.country}}</v-card-text>
                        <v-card-text>{{info.data && info.data.duration.short}} - {{info.data && info.data.duration.long}} hours</v-card-text>
                        <v-card-text>{{info.data && info.data.tour_description}}</v-card-text>
                        <v-card-text>Additional Comments: <br>{{info.data && info.data.additional_comments}}</v-card-text>
                    </v-card>
                </v-flex>
                <v-flex d-flex xs12 sm6 md5>
                    <v-layout row wrap>
                        <v-flex d-flex>
                        </v-flex>
                        <v-flex d-flex>
                            <v-layout row wrap>
                                <v-flex d-flex xs12>
                                    <v-card color="red lighten-2" dark>
                                        <v-card-text>
                                            $ {{info.data && info.data.price.low}} -
                                            {{info.data && info.data.price.high}}
                                        </v-card-text>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex d-flex xs12 sm6 md3>
                    <v-card color="blue lighten-2" dark>
                        <v-card-text>
                            {{ info.data && info.data.duration.short }} -
                            {{ info.data && info.data.duration.long }}
                            hours
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
            <router-link :to="'/tours/edit/' + this.$route.params.id">Edit</router-link>
        </v-container>

        <br>
        <br>
        <br>
        <br>
    </div>
</template>


<script>
export default {
    name: "Signin",
    data: () => ({
        info: ""
    }),
    computed:{
        // iconUrl () {
            // return require('./assets/img/background.jpg')
            // The path could be '../assets/img.png', etc., which depends on where your vue file is
        // }
    },
    mounted() {
        this.$http
            .get("/tour/find/" + this.$route.params.id + "/true")
            .then(response => (this.info = response))
            .catch(error => alert(error))
            .finally(() => (this.loading = false));
    }
};

</script>

<style scoped>
#tour-img {
    width: 500px;
}
</style>

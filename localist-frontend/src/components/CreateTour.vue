<template>
    <div>
        <form v-on:submit.prevent="createTour">
            <v-container fluid grid-list-md>
                <v-layout row wrap>
                    <v-layout column wrap>
                        <h2>Main Image</h2>
                        <v-flex d-flex xs7 sm7 md7 lg7>
                            <v-carousel dark>
                                <v-carousel-item v-for="(file, i) in file" :key="i">
                                    <img v-if="url" :src="url" class="preview">
                                </v-carousel-item>
                            </v-carousel>
                        </v-flex>
                        <v-flex d-flex xs7 sm7 md7 lg7 justify-center>
                            <input
                                type="file"
                                id="file"
                                accept="image/*"
                                ref="file"
                                v-on:change="onFileChange"
                            >
                        </v-flex>
                        <v-divider></v-divider>
                        <h2>Additional Images</h2>
                        <v-flex d-flex xs7 sm7 md7 lg7>
                            <v-carousel dark>
                                <v-carousel-item v-for="(file, i) in files" :key="i">
                                    {{ file.name }}
                                    <img class="preview" :ref="i">
                                </v-carousel-item>
                            </v-carousel>
                        </v-flex>
                        <v-flex d-flex xs7 sm7 md7 lg7 justify-center>
                            <input
                                multiple
                                type="file"
                                id="files"
                                accept="image/*"
                                ref="files"
                                v-on:change="onAdditionalFileChange"
                            >
                        </v-flex>
                    </v-layout>
                    <v-flex d-flex lg5>
                        <v-card id="info" flat color="white">
                            <v-select
                                v-model="category"
                                :items="categories"
                                label="Category"
                                outline
                            ></v-select>
                            <v-card-text id="title">
                                <v-text-field xs4 label="Title *" v-model="title"></v-text-field>
                            </v-card-text>
                            <v-card-text class="extras">
                                <img height="30px" src="../assets/img/location_black.png">
                                <v-text-field xs4 label="City *" v-model="location.city"></v-text-field>,
                                <v-text-field xs4 label="Country *" v-model="location.country"></v-text-field>
                            </v-card-text>
                            <v-card-text class="extras">
                                <img height="30px" src="../assets/img/clock_black.png">
                                <v-text-field xs4 label="Min Duration *" v-model="duration.short"></v-text-field>-
                                <v-text-field xs4 label="Max Duration *" v-model="duration.long"></v-text-field>hours
                            </v-card-text>
                            <v-card-text>
                                <v-text-field xs4 label="Description *" v-model="tour_description"></v-text-field>
                            </v-card-text>
                            <v-card-text>
                                Additional Comments:
                                <br>
                                <v-text-field
                                    xs4
                                    label="Additional Comments"
                                    v-model="additional_comments"
                                ></v-text-field>
                            </v-card-text>
                            <v-card-text>
                                $
                                <v-text-field xs4 label="Min Price *" v-model="price.low"></v-text-field>-
                                <v-text-field xs4 label="Max Price *" v-model="price.high"></v-text-field>
                            </v-card-text>
                            <v-card-text>
                                $
                                <v-text-field xs4 label="Min Guests" v-model="guests.low"></v-text-field>-
                                <v-text-field xs4 label="Max Guests" v-model="guests.high"></v-text-field>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout>
                    <v-flex mx-5 md3>
                        <v-date-picker v-model="dateInput"></v-date-picker>
                    </v-flex>
                    <v-flex mx-5 md3>
                        <v-time-picker v-model="timeInput" format="24hr"></v-time-picker>
                    </v-flex>
                    <v-flex mx-5 md3>
                        <v-btn
                            @click="addAvailability"
                            large
                            class="cyan darken-2 white--text"
                        >Add Availability</v-btn>
                        <v-list subheader>
                            <v-subheader>Availability</v-subheader>
                            <v-list-tile
                                v-for="timeSlot in availability"
                                :key="timeSlot.date"
                                avatar
                            >
                                <v-list-tile-avatar>
                                    <img src="../assets/img/clock_black.png">
                                </v-list-tile-avatar>

                                <v-list-tile-content>
                                    <v-list-tile-title>{{timeSlot.date}}</v-list-tile-title>
                                    <v-list-tile-content>{{timeSlot.time}}</v-list-tile-content>
                                </v-list-tile-content>

                                <v-btn @click="deleteTimeSlot(i)" flat>
                                    <v-icon>remove_circle</v-icon>
                                </v-btn>
                            </v-list-tile>
                        </v-list>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-btn large class="cyan darken-2 white--text" type="submit">Create Tour</v-btn>
            </v-container>
        </form>
    </div>
</template>

<script>
import router from "../router";
export default {
    name: "createTour",

    data: () => ({
        categories: [],
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
        availability: [],
        user_key: "",
        dateInput: "",
        timeInput: "",
        pickAvailability: {
            date: new Date().toISOString().substr(0, 10),
            time: ""
        },
        file: [],
        files: [],
        url: "",
        imgURL: "",
        additionalUrl: []
    }),
    created() {
        var instance = this;
        this.$http.get("/category").then(function(response) {
            response.data.forEach(function(cat) {
                instance.categories.push(cat.category);
            });
        });
    },
    methods: {
        deleteTimeSlot(i) {
            this.availability.splice(i, 1);
        },
        addAvailability() {
            this.pickAvailability.date = this.dateInput;
            this.pickAvailability.time = this.timeInput;
            if (
                (this.pickAvailability.date != null || "") &&
                (this.pickAvailability.time != null || "")
            ) {
                this.availability.push({
                    date: this.pickAvailability.date,
                    time: this.pickAvailability.time
                });
            }
        },

        createTour() {
            var instance = this;
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
                guests: {
                    high: this.guests.high,
                    low: this.guests.low
                },
                additional_comments: this.additional_comments,
                availability: this.availability,
                token: this.$store.getters.getUserToken
            };

            console.log(formData);

            this.$http
                .post("/tour/add", formData)
                .then(function(response) {
                    instance.submitFiles(response.data.id);
                    instance.submitAdditionalFiles(response.data.id);
                    router.push("/tours");
                })
                .catch(function(error) {
                    alert(error);
                });
        },
        onFileChange(e) {
            this.file = [];
            this.file.push(e.target.files[0]);
            this.url = URL.createObjectURL(this.file[0]);
            // this.files = this.$refs.files.files;
        },
        onAdditionalFileChange(e) {
            // this.additionalFiles = [];
            // this.additionalFiles.push(e.target.files[0]);
            this.files = [];
            let uploadedFiles = this.$refs.files.files;
            for (var i = 0; i < uploadedFiles.length; i++) {
                this.files.push(uploadedFiles[i]);
            }
            this.getImagePreviews();
        },
        getImagePreviews() {
            for (let i = 0; i < this.files.length; i++) {
                if (/\.(jpe?g|png|gif)$/i.test(this.files[i].name)) {
                    let reader = new FileReader();
                    reader.addEventListener(
                        "load",
                        function() {
                            this.$refs[i][0].src = reader.result;
                        }.bind(this),
                        false
                    );
                    reader.readAsDataURL(this.files[i]);
                }
            }
        },
        submitFiles(tour_key) {
            var instance = this;
            var fileData = new FormData();
            for (let i = 0; i < this.file.length; i++) {
                fileData.append("img", this.file[i]);
            }
            if (this.file.length > 0) {
                this.$http
                    .post("/tour/image/main/" + tour_key, fileData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })
                    .then(function(data) {
                        // router.push("/tours");
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            }
        },
        submitAdditionalFiles(tour_key) {
            var instance = this;
            var fileData = new FormData();
            for (let i = 0; i < this.files.length; i++) {
                fileData.append("img", this.files[i]);
            }
            if (this.files.length > 0) {
                this.$http
                    .post("/tour/image/additional/" + tour_key, fileData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })
                    .then(function(data) {
                        // router.push("/tours");
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            }
        },

        removeFile(key) {
            this.files.splice(key, 1);
        }
    }
};
</script>
<style scoped>
.preview {
    width: 100% !important;
}

.v-carousel {
    height: 500px;
    width: 500px;
}
</style>
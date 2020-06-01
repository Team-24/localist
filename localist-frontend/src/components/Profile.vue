<template>
    <v-container grid-list-xl text-xs-center mb-5>
        <v-layout wrap pt-3 justify-center>
            <v-flex
                xs8
                class="cyan--text text--darken-2 display-2 font-weight-black font-italic"
            >Profile</v-flex>
        </v-layout>

        <v-divider></v-divider>

        <v-layout row wrap>
            <v-flex xs12>
                <form v-on:submit.prevent="updateProfile">
                    <v-layout row wrap justify-space-around>
                        <v-flex xs6>
                            <v-layout row wrap>
                                <v-flex xs6 pr-5 class="title align-right">Profile Image</v-flex>

                                <v-layout row wrap>
                                    <v-flex xs6>
                                        <div id="preview">
                                            <img v-if="url" :src="url" class="preview">
                                            <img v-else :src="imgURL" class="preview">
                                        </div>
                                    </v-flex>

                                    <v-flex xs6>
                                        <input
                                            type="file"
                                            id="file"
                                            accept="image/x-png, image/gif, image/jpeg"
                                            ref="file"
                                            v-on:change="onFileChange"
                                        >
                                    </v-flex>
                                </v-layout>
                            </v-layout>

                            <v-divider></v-divider>

                            <v-layout row wrap>
                                <v-flex
                                    pr-5
                                    align-self-center
                                    xs6
                                    class="title align-right"
                                >First Name</v-flex>
                                <v-flex pl-5 xs6>
                                    <v-text-field single-line v-model="first_name"></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap>
                                <v-flex
                                    pr-5
                                    align-self-center
                                    xs6
                                    class="title align-right"
                                >Last Name</v-flex>
                                <v-flex pl-5 xs6>
                                    <v-text-field single-line v-model="last_name"></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap>
                                <v-flex
                                    pr-5
                                    align-self-center
                                    xs6
                                    class="title align-right"
                                >Date of Birth</v-flex>
                                <v-flex pl-5 xs6>
                                    <v-menu
                                        v-model="date_menu"
                                        :close-on-content-click="false"
                                        full-width
                                        max-width="290"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                :value="computedDateFormatted"
                                                clearable
                                                readonly
                                                v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                            outline
                                            v-model="dob"
                                            @change="date_menu = false"
                                        ></v-date-picker>
                                    </v-menu>
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap>
                                <v-flex pr-5 align-self-center xs6 class="title align-right">Gender</v-flex>
                                <v-flex pl-5 xs6>
                                    <v-select :items="genders" v-model="gender"></v-select>
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap>
                                <v-flex pr-5 align-self-center xs6 class="title align-right">City</v-flex>
                                <v-flex pl-5 xs6>
                                    <v-text-field single-line v-model="city"></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap>
                                <v-flex pr-5 align-self-center xs6 class="title align-right">Country</v-flex>
                                <v-flex pl-5 xs6>
                                    <v-text-field single-line v-model="country"></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </form>
                <div class="large-12 medium-12 small-12 cell">
                    <v-btn class="cyan darken-2 mt-5" dark large v-on:click="submitFiles()">Submit</v-btn>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import moment from "moment";
import router from "../router";
export default {
    name: "profile",
    data: () => ({
        files: [],
        url: null,
        first_name: "",
        last_name: "",
        dob: "",
        gender: "",
        city: "",
        country: "",
        genders: ["Male", "Female", "Other"],
        date_menu: false,
        imgURL: ""
    }),
    computed: {
        computedDateFormatted() {
            return this.dob
                ? moment(this.dob).format("dddd, MMMM Do YYYY")
                : "";
        }
    },
    created() {
        var instance = this;
        this.$http
            .get("/user/find/" + this.$store.getters.getUserKey)
            .then(function(response) {
                response = response.data;
                if (response.name) {
                    instance.first_name = response.name.first;
                    instance.last_name = response.name.last;
                }
                if (response.date_of_birth) {
                    instance.dob = response.date_of_birth;
                }
                if (response.gender) {
                    instance.gender = response.gender;
                }
                if (response.location) {
                    instance.country = response.location.country;
                    instance.city = response.location.city;
                }
                if (response.image) {
                    instance.imgURL = response.image;
                }
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    methods: {
        onFileChange(e) {
            this.files = [];
            this.files.push(e.target.files[0]);
            this.url = URL.createObjectURL(this.files[0]);
            // this.files = this.$refs.files.files;
        },
        /*
        Adds a file
      */
        addFiles() {
            this.$refs.files.click();
        },

        /*
        Submits files to the server
      */
        submitFiles() {
            var instance = this;
            /*
          Initialize the form data
        */
            var updateData = {};
            var fileData = new FormData();
            /*
          Iteate over any file sent over appending the files
          to the form data.
        */
            for (let i = 0; i < this.files.length; i++) {
                fileData.append("img", this.files[i]);
            }
            updateData = {
                name: {
                    first: this.first_name,
                    last: this.last_name
                },
                date_of_birth: this.dob,
                gender: this.gender,
                location: {
                    country: this.country,
                    city: this.city
                }
            };
            /*
          Make the request to the POST /select-files URL
        */
            if (this.files.length > 0) {
                this.$http
                    .post(
                        "/user/image/" + this.$store.getters.getUserKey,
                        fileData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        }
                    )
                    .then(function(data) {
                        // router.push("/tours");
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            }
            this.$http
                .patch(
                    "/user/update/" + this.$store.getters.getUserKey,
                    updateData
                )
                .catch(function(err) {
                    console.log(err);
                })
                .then(function(res) {
                    router.push("/");
                });
        },

        /*
        Handles the uploading of files
      */
        handleFilesUpload() {
            let uploadedFiles = this.$refs.files.files;

            /*
          Adds the uploaded file to the files array
        */
            for (let i = 0; i < uploadedFiles.length; i++) {
                this.files.push(uploadedFiles[i]);
            }
        },

        /*
        Removes a select file the user has uploaded
      */
        removeFile(key) {
            this.files.splice(key, 1);
        }
    }
};
</script>
<style scoped>
.preview {
    max-height: 100%;
    max-width: 90%;
}

.align-right {
    text-align: right;
}
</style>
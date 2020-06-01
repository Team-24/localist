<template>
    <div>
        <form v-on:submit.prevent="editGuide">
            <div>
                <p>First Name</p><input type="text" :placeholder= "guides.data.info.first_name" v-model="first_name"><br>
                <p>Last Name</p><input type="text" :placeholder= "guides.data.info.last_name" v-model="last_name"><br>
                <p>Age</p><input type="text" :placeholder= "guides.data.info.age" v-model="age"><br>
                <p>Gender</p><input type="text" :placeholder= "guides.data.info.gender" v-model="gender"><br>
                <p>City</p><input type="text" :placeholder= "guides.data.info.city" v-model="city"><br>
                <p>Country</p><input type="text" :placeholder= "guides.data.info.country" v-model="country">
            </div>
            <button type="submit">Edit Guide</button>
        </form>
    </div>
</template>
<script>
    import router from "../router";
    export default {
        name: "editGuide",
        data: () => ({
            guides: "",
            first_name: "",
            last_name: "",
            age: "",
            gender: "",
            city: "",
            country: ""
        }),
        mounted(){
            this.$http
                .get("/guide/find/" + this.$route.params.id)
                .then(response => (this.guides = response))
                .catch(error => alert(error))
                .finally(() => (this.loading = false));
        },
        methods: {
            editGuide() {
                const formData = {
                    first_name: this.first_name,
                    last_name: this.last_name,
                    age: this.age,
                    gender: this.gender,
                    city: this.city,
                    country: this.country
                };
                this.$http
                    .patch("/guide/update/" + this.$route.params.id, formData)
                    .then(function(response) {
                        router.push("/guides");
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
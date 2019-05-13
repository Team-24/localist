<template>
    <div>
        <form v-on:submit.prevent="editTour">
            <div>
                <p>Title</p>
                <input type="text" :placeholder="info.data.title" v-model="title">
                <br>
                <p>Description</p>
                <input type="text" :placeholder="info.data.description" v-model="description">
                <br>
                <p>Max Duration</p>
                <input type="text" :placeholder="info.data.duration.long" v-model="duration_long">
                <br>
                <p>Min Duration</p>
                <input type="text" :placeholder="info.data.duration.short" v-model="duration_short">
                <br>
                <p>Max Price</p>
                <input type="text" :placeholder="info.data.price.high" v-model="price_high">
                <br>
                <p>Min Price</p>
                <input type="text" :placeholder="info.data.price.low" v-model="price_low">
            </div>
            <button type="submit">Edit Tour</button>
        </form>
    </div>
</template>
<script>
import router from "../router";
export default {
    name: "editTour",
    data: () => ({
        info: "",
        title: "",
        description: "",
        duration_long: "",
        duration_short: "",
        price_high: "",
        price_low: ""
    }),
    mounted() {
        this.$http
            .get("/tour/find/" + this.$route.params.id + "/true")
            .then(response => (this.info = response))
            .catch(error => alert(error))
            .finally(() => (this.loading = false));
    },
    methods: {
        editTour() {
            const formData = {
                title: this.title,
                description: this.description,
                duration_long: this.duration_long,
                duration_short: this.duration_short,
                price_high: this.price_high,
                price_low: this.price_low
            };
            this.$http
                .get("/tour/find/" + this.$route.params.id + "/true")
                .then(response => (this.info = response))
                .catch(error => alert(error))
                .finally(() => (this.loading = false));
        },
        methods: {
            editTour() {
                const formData = {
                    title: this.title,
                    description: this.description,
                    duration_long: this.duration_long,
                    duration_short: this.duration_short,
                    price_high: this.price_high,
                    price_low: this.price_low
                };
                this.$http
                    .patch("/tour/update/" + this.$route.params.id, formData)
                    .then(function(response) {
                        router.push("/tours");
                    })
                    .catch(function(error) {
                        alert(error);
                    });
            }
        }
    }
};
</script>
<style scoped>
</style>
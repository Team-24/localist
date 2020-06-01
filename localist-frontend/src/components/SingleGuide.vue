<template>
    <div id="guideList">
        <h1>Guides</h1>
        <div>
            {{guides.data.info.first_name}}
            {{guides.data.info.last_name}}
            <br>
            {{guides.data.info.age}}
            <br>
            {{guides.data.info.gender}}
            <br>
            {{guides.data.info.city}}
            <br>
            {{guides.data.info.country}}
        </div>

        <router-link :to="'/guides/edit/' + this.$route.params.id">Edit</router-link>
    </div>
</template>

<script>
export default {
    data: () => ({
        guides: ""
    }),
    mounted() {
        this.$http
            .get("/guide/find/" + this.$route.params.id)
            .then(response => {
                this.guides = response;
            })
            .catch(error => alert(error))
            .finally(() => (this.loading = false));
    }
};
</script>

<style scoped>
</style>

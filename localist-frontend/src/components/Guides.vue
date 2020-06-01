<template>
    <div id="guideList">
        <h1>Guides</h1>
        
        <div class="container">
            <div class="row">
                <div
                    v-for="guide in guides"
                    :key="guide.id"
                    class="col-sm-3 col-md-3 col-lg-3 pb-2 guide-card"
                >
                    <div
                        class="card h-100 text-center shadow p-3 mb-5 bg-white rounded border-bottom-0"
                        :id="guide.key"
                    >
                        <img
                            class="card-img-top rounded-circle"
                            src="https://media.licdn.com/dms/image/C4E03AQHpOc7og5BUuw/profile-displayphoto-shrink_800_800/0?e=1562198400&v=beta&t=BsWTGGTHMroIWmeg-toVM3I5OVGNd45vAsNkSnYDvkY"
                            alt="Card image cap"
                        >
                        <div class="card-body">
                            <h5
                                class="card-title"
                            >{{guide.info.first_name}} {{guide.info.last_name}}</h5>
                            <h6>{{guide.info.city}}, {{guide.info.country}}</h6>
                            <h1>{{guide.info.gender}}</h1>
                            <router-link
                                class="btn btn-primary"
                                :to="'/guides/single/' + guide.key"
                            >View Info</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
export default {
    data: () => ({
        guides: []
    }),
    mounted() {
        this.$http
            .get("/guide/all")
            .then(response => (this.guides = response.data))
            .catch(error => alert(error))
            .finally(() => (this.loading = false));
    }
};
</script>

<style scoped>
.card-img-top {
    border: 1px solid black;
    width: 200px;
    margin: auto;
}

.card-text-center {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.container {
    margin-top: 40px;
}

.guide-card {
    margin-bottom: 50px;
}
</style>

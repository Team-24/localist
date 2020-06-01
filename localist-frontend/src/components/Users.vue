<template>
    <div>
        <b-row>
            <b-col cols="12">
                <div class="tableDiv">
                    <b-jumbotron bg-variant="dark" text-variant="white" border-variant="dark">
                        <div class="media" v-for="user in users" :key="user.uid">
                            <div class="media-body">
                                <h3>email: {{user.email}}</h3>
                            </div>
                        </div>
                    </b-jumbotron>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>

export default {
    name: "Users",
    data: () => ({
        users: [],
        UserRecord: {
            email: "",
            admin: ""
        }
    }),
    mounted() {
        this.$http.get("/user/all").then(response => {
            this.users = response.data.users;
        });
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>

<template>
    <div>
        <v-card>
            <v-card-title>
                Your Tours
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="tours" :search="search">
                <template v-slot:no-data>
                    <v-alert
                        :value="true"
                        color="error"
                        icon="warning"
                    >Sorry, nothing to display here :(. You should create a tour :)</v-alert>
                </template>
                <template v-slot:items="props">
                    <td class="text-xs-left">{{ props.item.title }}</td>
                    <td class="text-xs-center">{{ props.item.category }}</td>
                    <td class="text-xs-center">{{ props.item.location.city }}</td>
                    <td class="text-xs-center">{{ props.item.location.country }}</td>
                    <td class="text-xs-center">{{ props.item.rating.average }}</td>
                    <td class="text-xs-center">{{ props.item.rating.count }}</td>
                    <td>
                        <v-btn :to="'/tours/single/' + props.item.key">View</v-btn>
                    </td>
                    <td>
                        <v-btn :to="'/tours/edit/' + props.item.key">Edit</v-btn>
                    </td>
                </template>
                <template v-slot:no-results>
                    <v-alert
                        :value="true"
                        color="error"
                        icon="warning"
                    >Your search for "{{ search }}" found no results.</v-alert>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
export default {
    data: () => ({
        search: "",
        headers: [
            {
                text: "Tour Title",
                align: "left",
                sortable: false,
                value: "title"
            },
            { text: "Category", value: "category" },
            { text: "City", value: "city" },
            { text: "Country", value: "country" },
            { text: "Rating", value: "average" },
            { text: "# of ratings", value: "number_of_ratings" }
            // { text: "Iron (%)", value: "iron" }
        ],
        tours: []
    }),
    mounted() {
        this.$http
            .get("/tour/user/" + this.$store.getters.getUserKey)
            .then(response => (this.tours = response.data))
            .catch(error => alert(error));
        // .finally(() => (this.loading = false));
    }
};
</script>

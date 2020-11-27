<template>
  <div class="home">
    <div class="page-title">
      <h1 class="title">Dashboard</h1>
    </div>
    <section class="section is-main-section">
      <div class="stats">
        <card-widget
          class="stats-child"
          type="is-primary is-light"
          icon="credit-card"
          :number="59"
          label="Jobs"
        />
        <card-widget
          class="stats-child"
          type="is-danger is-light"
          icon="account-multiple "
          :number="5230"
          prefix="+"
          label="Candidates Appied"
        />
        <card-widget
          class="stats-child"
          type="is-success"
          icon="account-check"
          :number="200"
          label="Candidates Shortlisted"
        />
      </div>
      <b-tabs type="is-boxed" expanded>
        <b-tab-item>
          <template #header>
            <b-icon icon="tag-outline"></b-icon>
            <span>
              Recent Jobs <b-tag class="is-primary" rounded> {{jobs_list.length}} </b-tag>
            </span>
          </template>
          <br />
          <form @submit.prevent="submit">
            <b-field label="">
              <b-input
                placeholder="Search..."
                type="search"
                expanded
                v-model="form.searchValue"
              ></b-input>
              <p class="control">
                <b-dropdown v-model="form.categories" multiple aria-role="list">
                  <button
                    class="button is-primary"
                    type="button"
                    slot="trigger"
                  >
                    <span>Choose Category ({{ form.categories.length }})</span>
                    <b-icon icon="menu-down"></b-icon>
                  </button>

                  <b-dropdown-item
                    v-for="(item, index) in selectedOptions"
                    :key="index"
                    :value="item.id"
                    aria-role="listitem"
                  >
                    <span>{{ item.value }}</span>
                  </b-dropdown-item>
                </b-dropdown>
              </p>
              <b-field horizontal>
                <div class="control">
                  <button
                    type="submit"
                    class="button is-primary"
                    :class="{ 'is-loading': isLoading }"
                  >
                    Search
                  </button>
                </div>
              </b-field>
            </b-field>
          </form>
          <hr />
          <card-component
            title="Jobs List"
            class="has-table has-mobile-sort-spaced"
          >
            <list-table data-url="getAllJobs" />
          </card-component>
        </b-tab-item>
        <b-tab-item>
          <template #header>
            <b-icon icon="account-arrow-right-outline"></b-icon>
            <span>
              Candidates <b-tag class="is-primary" rounded> 100 </b-tag>
            </span>
          </template>
          <card-component
            title="All Candidates"
            class="has-table has-mobile-sort-spaced"
          >
            <list-table
              :data-url="`${$router.options.base}data-sources/clients.json`"
            />
          </card-component>
        </b-tab-item>
        <b-tab-item label="Rosters" icon="account-box">
          <card-component
            title="Rosters"
            class="has-table has-mobile-sort-spaced"
          >
            <list-table :data-url="[]" />
          </card-component>
        </b-tab-item>
        <b-tab-item label="Blacklist" icon="account-cancel-outline">
          <card-component
            title="Blacklist"
            class="has-table has-mobile-sort-spaced"
          >
            <list-table :data-url="[]" />
          </card-component>
        </b-tab-item>
      </b-tabs>
    </section>
  </div>
</template>

<script>
import CardWidget from "@/components/CardWidget";
import CardComponent from "@/components/CardComponent";
import ListTable from "@/components/ListTable";
import { mapState } from 'vuex';

export default {
  name: "Home",
  components: {
    CardWidget,
    CardComponent,
    ListTable,
  },
  data() {
    return {
      isLoading: false,

      form: {
        categories: [],
        searchValue: null,
      },
      selectedOptions: [
        { id: 1, value: "Debartment" },
        { id: 2, value: "Math" },
        { id: 3, value: "IT" },
      ],
    };
  },
computed:{
    ...mapState(['jobs_list'])

},
  methods: {
    submit() {
      console.log(this.form);
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;

        this.$buefy.snackbar.open({
          message: "Updated",
          queue: false,
        });
      }, 500);
    },
  },
};
</script>

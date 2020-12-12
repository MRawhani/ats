<template>
  <section class="filters-con">
     <div class="columns">
      <div class="column is-four-fifths">
        <div class="title is-5">Filter Jobs</div>
      </div>
      <div class="column">
    <b-input
      placeholder="Search..."
      type="search"
      expanded
      :value="jobs.filters.searchValue"
      @input="changeSearch"
    ></b-input>
     </div>
    </div>
   
    <!-- <b-collapse :open="false" aria-id="contentIdForA11y1">
      <b-button
        type="is-light is-success"
        slot="trigger"
        slot-scope="props"
        aria-controls="contentIdForA11y1"
        :icon-right="props.open ? 'menu-down' : 'menu-up'"
      >
        Filter Table
      </b-button>
    </b-collapse> -->

      <div class="applicant-filter notification  is-light">
        <div class="content">
          <nav class="level columns">
            <div class="column">
              <Select
              label="name"
                @update-selected="updateLocationsSelected"
                :value="jobs.filters.locationsSelected"
                :options="general.locations"
                title="Search For Locations"
              />
            </div>
            <div class="column">
              <Select
              label="name"
                @update-selected="updateCategoriesSelected"
                :value="jobs.filters.categoriesSelected"
                :options="general.categories"
                title="Search For Categories"
              />
            </div>
            <div class="column ">
              <b-field>
                <b-datepicker
                  ref="datepicker"
                  placeholder="Click to select..."
                  @input="changeDates"
                  range
                  :value="jobs.filters.dates"
                >
                  <button
                    class="button is-danger"
                    @click.prevent="() => changeDates([])"
                  >
                    <b-icon icon="close"></b-icon>
                    <span>Clear</span>
                  </button>
                </b-datepicker>
                <b-button
                  @click="$refs.datepicker.toggle()"
                  icon-left="calendar-today"
                  type="is-dark"
                />
              </b-field>
            </div>
          </nav>
        </div>
      </div>
  </section>
</template>

<script>
import Select from "@/components/Select";
import { mapState, mapMutations } from "vuex";
export default {
  name: "jobs-filters",
  computed: {
    ...mapState(["jobs", "general"])
  },

  methods: {
    ...mapMutations(["filterJobs"]),
    updateLocationsSelected: function(value) {
      this.filterJobs({ type: "location", value });
    },
    updateCategoriesSelected: function(value) {
      this.filterJobs({ type: "category", value });
    },
    changeDates: function(value) {
      this.filterJobs({ type: "date", value });
    },
    changeSearch: function(value) {
      console.log(value);
      this.filterJobs({ type: "search", value });
    }
  },
  components: {
    Select
  }
};
</script>

<style>
.content ul {
  margin-left: 0 !important;
}
.level-item {
  padding: 1rem;
  justify-content: left;
}
</style>

<template>
  <section>
    <b-input
      placeholder="Search..."
      type="search"
      expanded
      :value="job_applicants.filters.searchValue"
      @input="changeSearch"
    ></b-input>
    <b-collapse :open="false" aria-id="contentIdForA11y1">
      <b-button
        type="is-light"
        slot="trigger"
        slot-scope="props"
        aria-controls="contentIdForA11y1"
        :icon-right="props.open ? 'menu-down' : 'menu-up'"
      >
        Filter Table
      </b-button>

      <div class="notification">
        <div class="content">
          <nav class="level">
            <div class="level-item has-text-centered">
              <Select
                @update-selected="updateCitiesSelected"
                :value="job_applicants.filters.citiesSelected"
                :options="general.cities"
                title="Search For Cities"
              />
            </div>
            <div class="level-item has-text-centered">
              <Select
                @update-selected="updateEn_levelSelected"
                :value="job_applicants.filters.en_levelSelected"
                :options="general.en_levels"
                title="Search For en_levels"
              />
            </div>
              <div class="level-item has-text-centered">
              <Select
                @update-selected="updateEdu_levelSelected"
                :value="job_applicants.filters.edu_levelSelected"
                :options="general.education_levels"
                title="Search For edu_levels"
              />
            </div>
              <div class="level-item has-text-centered">
              <Select
                @update-selected="updateExp_rolSelected"
                :value="job_applicants.filters.exp_roleSelected"
                :options="general.experience_roles"
                title="Search For exp_role"
              />
            </div>
            <div class="level-item has-text-centered">
              <b-field>
                <b-datepicker
                  ref="datepicker"
                  placeholder="Click to select..."
                  @input="changeDates"
                  range
                  :value="job_applicants.filters.dates"
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
                  type="is-primary"
                />
              </b-field>
            </div>
          </nav>
        </div>
      </div>
    </b-collapse>
  </section>
</template>

<script>
import Select from "@/components/Select";
import { mapState, mapMutations } from "vuex";
export default {
  name: "job_applicants-filters",
  computed: {
    ...mapState(["job_applicants", "general"])
  },

  methods: {
    ...mapMutations(["filterApplicants"]),
    updateCitiesSelected: function(value) {
      this.filterApplicants({ type: "city", value });
    },
    updateEn_levelSelected: function(value) {
      this.filterApplicants({ type: "en_level", value });
    },
    updateEdu_levelSelected: function(value) {
      this.filterApplicants({ type: "edu_level", value });
    },
    updateExp_rolSelected: function(value) {
      this.filterApplicants({ type: "exp_role", value });
    },
    changeDates: function(value) {
      this.filterApplicants({ type: "date", value });
    },
    changeSearch: function(value) {
      console.log(value);
      this.filterApplicants({ type: "search", value });
    }
  },
  components: {
    Select
  }
};
</script>

<style>
.content ul {
  margin-left: 0 i !important;
}
</style>

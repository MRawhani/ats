<template>
  <section class="filters-con">
    <div class="columns ">
      <div class="column is-four-fifths">
        <div class="title is-5">Filter Applicants</div>
      </div>
      <div class="column">
        <b-input
          placeholder="Search..."
          type="search"
          expanded
          :value="job_applicants.filters.searchValue"
          @input="changeSearch"
        ></b-input>
      </div>
    </div>

    <!--<b-collapse :open="false" aria-id="contentIdForA11y1">-->
    <!--<b-button-->
    <!--type="is-primary "-->
    <!--slot="trigger"-->
    <!--slot-scope="props"-->
    <!--aria-controls="contentIdForA11y1"-->
    <!--:icon-right="props.open ? 'menu-down' : 'menu-up'"-->
    <!--&gt;-->
    <!--Filter Table-->
    <!--</b-button>-->
    <!---->
    <!--</b-collapse>-->
    <div class="applicant-filter notification is-light">
      <div class="content">
        <nav class="level columns  is-multiline">
          <div class="column is-one-third">
            <Select
              label="name"

              @update-selected="updateCitiesSelected"
              :value="job_applicants.filters.citiesSelected"
              :options="general.cities"
              title="Filter By City"
            />
          </div>
          <div class="column is-one-third">
            <Select
              label="name"

              @update-selected="updateEn_levelSelected"
              :value="job_applicants.filters.en_levelSelected"
              :options="general.en_levels"
              title="Search For en_levels"
            />
          </div>
          <div class="column is-one-third">
            <Select
              label="name"

              @update-selected="updateEdu_levelSelected"
              :value="job_applicants.filters.edu_levelSelected"
              :options="general.education_levels"
              title="Search For edu_levels"
            />
          </div>
          <div class="column is-one-third">
            <Select
              label="name"

              @update-selected="updateExp_rolSelected"
              :value="job_applicants.filters.exp_roleSelected"
              :options="general.experience_roles"
              title="Search For exp_role"
            />
          </div>
           <div class="column is-one-third">
            <Select
              label="name"

              @update-selected="updateExp_yearsSelected"
              :value="job_applicants.filters.exp_yearsSelected"
              :options="general.exp_years"
              title="Excperience years"
            />
          </div>
          <div v-if="jobFilter" class="column is-one-third">
            <Select
           
              @update-selected="updateJobsSelected"
              :value="job_applicants.filters.jobsSelected"
              :options="jobs.list"
              label="title"
              title="Select Job"
            />
          </div>
          <div class="column is-one-third">
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
  name: "job_applicants-filters",
  computed: {
    ...mapState(["job_applicants", "general","jobs"]),
  },
props:['jobFilter'],
  methods: {
    ...mapMutations(["filterApplicants"]),
    updateCitiesSelected: function (value) {
      this.filterApplicants({ type: "city", value });
    },
    updateEn_levelSelected: function (value) {
      this.filterApplicants({ type: "en_level", value });
    },
    updateEdu_levelSelected: function (value) {
      this.filterApplicants({ type: "edu_level", value });
    },
    updateExp_rolSelected: function (value) {
      this.filterApplicants({ type: "exp_role", value });
    },
    updateExp_yearsSelected: function (value) {
      this.filterApplicants({ type: "exp_years", value });
    },
     updateJobsSelected: function (value) {
      this.filterApplicants({ type: "jobs", value });
    },
    changeDates: function (value) {
      this.filterApplicants({ type: "date", value });
    },
    changeSearch: function (value) {
      console.log(value);
      this.filterApplicants({ type: "search", value });
    },
  },
  components: {
    Select,
  },
};
</script>

<style>

</style>

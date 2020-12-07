 <template>
  <section>
    <b-input
      placeholder="Search..."
      type="search"
      expanded
      :value="jobs.filters.searchValue"
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
                @update-selected="updateLocationsSelected"
                :value="jobs.filters.locationsSelected"
                :options="general.locations"
                title="Search For Locations"
              />
            </div>
            <div class="level-item has-text-centered">
              <Select
                @update-selected="updateCategoriesSelected"
                :value="jobs.filters.categoriesSelected"
                :options="general.categories"
                title="Search For Categories"
              />
            </div>
            <div class="level-item has-text-centered">
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
  name: "jobs-filters",
  computed: {
    ...mapState(["jobs", "general"]),
  },

  methods: {
    ...mapMutations(["filterJobs"]),
    updateLocationsSelected: function (value) {
      this.filterJobs({ type: "location", value });
    },
    updateCategoriesSelected: function (value) {
      this.filterJobs({ type: "category", value });
    },
    changeDates: function (value) {
      this.filterJobs({ type: "date", value });
    },
    changeSearch: function (value) {
      console.log(value);
      this.filterJobs({ type: "search", value });
    },
  },
  components: {
    Select,
  },
};
</script>

<style>
.content ul {
  margin-left: 0 i !important;
}
</style>
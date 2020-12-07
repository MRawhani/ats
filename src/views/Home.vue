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
         <card-widget
          class="stats-child"
          type="is-primary is-light"
          icon="credit-card"
          :number="59"
          label="Jobs"
        />
      </div>
      <b-tabs type="is-boxed" expanded>
        <b-tab-item>
          <template #header>
            <b-icon icon="tag-outline"></b-icon>
            <span>
              Recent Jobs
              <b-tag class="is-primary" rounded> {{ jobs.list.length }} </b-tag>
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
              <!-- <p class="control">
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
              </b-field> -->
            </b-field>
          </form>
          <br />

          <JobsFilters />
          <hr />
          <card-component
            :title="`Jobs List (${getJobsFiltered.length})`"
            class="has-table has-mobile-sort-spaced"
          >
            <list-table data-url="getJobsFiltered" />
          </card-component>
        </b-tab-item>
        <b-tab-item>
          <template #header>
            <b-icon icon="account-arrow-right-outline"></b-icon>
            <span>
              Candidates
              <b-tag class="is-primary" rounded>
                {{ getApplicantsFiltered("all").length }}
              </b-tag>
            </span>
          </template>
          <card-component
            :title="`All Jobs Candidates`"
            class="has-table has-mobile-sort-spaced"
          >
            <detail-table :data-url="getApplicantsFiltered('all')">
              <b-table-column
                width="30"
                custom-key="actions"
                cell-class="is-actions-cell"
                v-slot="props"
              >
                <div class="buttons">
                  <b-dropdown
                    aria-role="list"
                    class="is-pulled-right"
                    position="is-bottom-left"
                  >
                    <button
                      class="button is-small is-text"
                      type="button"
                      slot="trigger"
                      @click.prevent="menuNavBarToggle(props.row)"
                    >
                      <b-icon icon="dots-vertical" size="is-default" />
                    </button>

                    <b-dropdown-item aria-role="listitem">
                      <template>
                        <b-icon icon="contacts-outline"></b-icon>
                        <span> Contact Info </span>
                      </template></b-dropdown-item
                    >
                    <b-dropdown-item
                      aria-role="listitem"
                      @click="block_applicant(props.row.id)"
                    >
                      <template>
                        <b-icon
                          :icon="
                            props.row.blocked ? 'account' : 'account-cancel'
                          "
                        ></b-icon>
                        <span>
                          {{ props.row.blocked ? "UnBlock" : "Block" }}
                        </span>
                      </template></b-dropdown-item
                    >
                  </b-dropdown>
                </div>
              </b-table-column>
            </detail-table>
          </card-component>
        </b-tab-item>
        <b-tab-item
          :label="`Rosters (${getApplicantsFiltered('rostered').length})`"
          icon="account-box"
        >
          <card-component
            title="Rosters"
            class="has-table has-mobile-sort-spaced"
          >
            <detail-table :data-url="getApplicantsFiltered('rostered')">
              <b-table-column
                width="30"
                label="Tools"
                custom-key="actions"
                cell-class="is-actions-cell"
                v-slot="props"
              >
                <b-button
                  @click.prevent="roster_applicant(props.row.id)"
                  size="is-small"
                  :type="{
                    'is-primary is-light': !props.row.rostered,
                    'is-danger is-light': props.row.rostered,
                  }"
                  :icon-left="props.row.rostered ? 'pen-minus' : 'pen-plus'"
                >
                  {{
                    props.row.rostered
                      ? "Remove from Rosters"
                      : "Add to Rosters"
                  }}
                </b-button>
              </b-table-column>
              <b-table-column
                width="30"
                custom-key="actions"
                cell-class="is-actions-cell"
                v-slot="props"
              >
                <div class="buttons">
                  <b-dropdown
                    aria-role="list"
                    class="is-pulled-right"
                    position="is-bottom-left"
                  >
                    <button
                      class="button is-small is-text"
                      type="button"
                      slot="trigger"
                      @click.prevent="menuNavBarToggle(props.row)"
                    >
                      <b-icon icon="dots-vertical" size="is-default" />
                    </button>

                    <b-dropdown-item aria-role="listitem">
                      <template>
                        <b-icon icon="contacts-outline"></b-icon>
                        <span> Contact Info </span>
                      </template></b-dropdown-item
                    >
                    <b-dropdown-item
                      aria-role="listitem"
                      @click="block_applicant(props.row.id)"
                    >
                      <template>
                        <b-icon
                          :icon="
                            props.row.blocked ? 'account' : 'account-cancel'
                          "
                        ></b-icon>
                        <span>
                          {{ props.row.blocked ? "UnBlock" : "Block" }}
                        </span>
                      </template></b-dropdown-item
                    >
                  </b-dropdown>
                </div>
              </b-table-column>
            </detail-table>
          </card-component>
        </b-tab-item>
        <b-tab-item
          :label="`BlackList (${getApplicantsFiltered('blocked').length})`"
          icon="account-cancel-outline"
        >
          <card-component
            title="Blacklisted Applicants"
            class="has-table has-mobile-sort-spaced"
          >
            <detail-table :data-url="getApplicantsFiltered('blocked')">
              <b-table-column
                width="30"
                label="Tools"
                custom-key="actions"
                cell-class="is-actions-cell"
                v-slot="props"
              >
                <b-button
                  @click.prevent="block_applicant(props.row.id)"
                  size="is-small"
                  :type="{
                    'is-danger is-light': !props.row.blocked,
                    'is-success is-light': props.row.blocked,
                  }"
                  :icon-left="
                    props.row.blocked ? 'account-minus' : 'account-plus'
                  "
                >
                  {{ props.row.blocked ? "UnBlock" : "Block" }}
                </b-button>
              </b-table-column>
              <b-table-column
                width="30"
                custom-key="actions"
                cell-class="is-actions-cell"
                v-slot="props"
              >
                <div class="buttons">
                  <b-dropdown
                    aria-role="list"
                    class="is-pulled-right"
                    position="is-bottom-left"
                  >
                    <button
                      class="button is-small is-text"
                      type="button"
                      slot="trigger"
                      @click.prevent="menuNavBarToggle(props.row)"
                    >
                      <b-icon icon="dots-vertical" size="is-default" />
                    </button>

                    <b-dropdown-item aria-role="listitem">
                      <template>
                        <b-icon icon="contacts-outline"></b-icon>
                        <span> Contact Info </span>
                      </template></b-dropdown-item
                    >
                  </b-dropdown>
                </div>
              </b-table-column>
            </detail-table>
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
import DetailTable from "@/components/DetailsTable";
import JobsFilters from "@/components/Jobsfilters";
import { mapGetters, mapState, mapMutations } from "vuex";

export default {
  name: "Home",
  components: {
    CardWidget,
    CardComponent,
    ListTable,
    JobsFilters,
    DetailTable,
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
  computed: {
    ...mapGetters(["getJobsFiltered", "getApplicantsFiltered"]),

    ...mapState(["jobs"]),
  },
  methods: {
    ...mapMutations(["roster_applicant","block_applicant"]),
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

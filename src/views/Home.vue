<template>
  <div class="home">
    <!--<div class="page-title">-->
    <!--<h1 class="title">Dashboard</h1>-->
    <!--</div>-->

    <section class="section is-main-section">
      <div class="card company">
        <div class="card-content">
          <div class="media t-m">
            <div class="media-left">
              <figure class="image is-128x128">
                <img
                  src="https://yemenhr.com/media/4657/ACTEDLogo.png"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-2" style="margin-top: 23px">
                Welcome to your Applicant Tracking System
              </p>
              <p class="subtitle is-4" style="margin-top: -0.9rem">
                Here, You can view, screen, shortlist, and manage all the
                candidates applying to your jobs.
              </p>
            </div>
          </div>
          <div>
            <div class="stats">
              <card-widget
                class="stats-child"
                type="is-Warning is-light"
                icon="credit-card"
                :number="59"
                label="Jobs"
              />
              <card-widget
                class="stats-child"
                type="is-Warning is-light"
                icon="account-multiple "
                :number="5230"
                prefix="+"
                label="Total Applicants"
              />
              <card-widget
                class="stats-child"
                type="is-Warning"
                icon="account-check"
                :number="200"
                label="Candidates Shortlisted"
              />
              <card-widget
                class="stats-child"
                type="is-Warning is-light"
                icon="credit-card"
                :number="59"
                label="In Roster"
              />
            </div>
          </div>
        </div>
      </div>

      <b-tabs type="is-boxed is-medium" expanded>
        <b-tab-item>
          <template #header>
            <b-icon icon="tag-outline"></b-icon>
            <span>
              Recent Jobs
              <b-tag class="is-dark" rounded> {{ jobs.list.length }} </b-tag>
            </span>
          </template>
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
              <b-tag class="is-dark" rounded>
                {{ getApplicantsFiltered("all").length }}
              </b-tag>
            </span>
          </template>
         <applicantsfilters :jobFilter="true"/>
          <card-component
            :title="`All Jobs Candidates`"
            class="has-table has-mobile-sort-spaced"
          >
            <detail-table :data-url="getApplicantsFiltered('all')">
              <!-- <b-table-column
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
              </b-table-column> -->
            </detail-table>
          </card-component>
        </b-tab-item>
        <b-tab-item>
          <template #header>
            <b-icon icon="account-box"></b-icon>
            <span>
              Rosters
              <b-tag class="is-dark" rounded>
                {{ getApplicantsFiltered("rostered").length }}
              </b-tag>
            </span>
          </template>
         <applicantsfilters :jobFilter="true"/>

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
              <!-- <b-table-column
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
              </b-table-column> -->
            </detail-table>
          </card-component>
        </b-tab-item>
        <b-tab-item>
          <template #header>
            <b-icon icon="account-cancel-outline"></b-icon>
            <span>
              BlackList
              <b-tag class="is-dark" rounded>
                {{ getApplicantsFiltered("blocked").length }}
              </b-tag>
            </span>
          </template>
         <applicantsfilters :jobFilter="true"/>

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
              <!-- <b-table-column
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
              </b-table-column> -->
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
import Applicantsfilters from '../components/Applicantsfilters.vue';

export default {
  name: "Home",
  components: {
    CardWidget,
    CardComponent,
    ListTable,
    JobsFilters,
    DetailTable,
    
    Applicantsfilters
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
    ...mapMutations(["roster_applicant", "block_applicant"]),
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

<style>
.card.company {
  background-image: linear-gradient(120deg, #ffffff 0%, #ffc72887 100%);
  border: none;
  box-shadow: 0 0 19px rgba(221, 221, 221, 0.42);
  margin-bottom: 3rem;
}
.t-m {
  border-bottom: 3px solid #b5890f1f;
  padding-bottom: 20px;
}
</style>
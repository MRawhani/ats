<template>
  <div class="home About">
    <section class="section is-main-section">
      <div style="margin: 2rem 0 2rem">
        <h1 class="title is-2">
          <router-link to="/" class="button is-dark">
            <b-icon icon="arrow-left"></b-icon>
          </router-link>
          {{ $route.params.job_title }}
        </h1>
      </div>
      <applicants-filter />
      <br />
      <b-tabs type="is-boxed is-medium" expanded>
        <b-tab-item>
          <template #header>
            <b-icon icon="account-multiple"></b-icon>
            <span>
              Applicants
              <b-tag class="is-dark" rounded>
                {{ job_applicants.applicants.length }}
              </b-tag>
            </span>
          </template>

          <card-component
            :title="`All Applicants (${getApplicantsFiltered('all').length})`"
            class="has-table has-mobile-sort-spaced"
          >
            <list-table
              :data-url="getApplicantsFiltered('all')"
              :isLoading="isLoading"
            >
              <b-table-column
                width="30"
                label="Tools"
                custom-key="actions"
                cell-class="is-actions-cell"
                v-slot="props"
              >
                <b-button
                  @click.prevent="shortlist_applicant(props.row.id)"
                  size="is-small"
                  :type="{
                    'is-primary is-light': !props.row.shortlisted,
                    'is-danger is-light': props.row.shortlisted,
                  }"
                  :icon-left="
                    props.row.shortlisted
                      ? 'account-off-outline'
                      : 'account-minus'
                  "
                >
                  {{ props.row.shortlisted ? "UnShortlist" : "Shortlist" }}
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
            </list-table>
          </card-component>
        </b-tab-item>
        <b-tab-item>
          <template #header>
            <b-icon icon="fullscreen"></b-icon>
            <span>
              Screened Out
              <b-tag class="is-dark" rounded>
                {{ getApplicantsFiltered("screened").length }}
              </b-tag>
            </span>
          </template>
          <card-component
            :title="`Screend Out Candidates`"
            class="has-table has-mobile-sort-spaced"
          >
            <list-table :data-url="getApplicantsFiltered('screened')">
              <b-table-column
                width="30"
                label="Tools"
                custom-key="actions"
                cell-class="is-actions-cell"
                v-slot="props"
              >
                <b-button
                  @click.prevent="shortlist_applicant(props.row.id)"
                  size="is-small"
                  :type="{
                    'is-primary is-light': !props.row.shortlisted,
                    'is-danger is-light': props.row.shortlisted,
                  }"
                  :icon-left="
                    props.row.shortlisted
                      ? 'account-off-outline'
                      : 'account-minus'
                  "
                >
                  {{ props.row.shortlisted ? "UnShortlist" : "Shortlist" }}
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
            </list-table>
          </card-component>
        </b-tab-item>
        <b-tab-item>
          <template #header>
            <b-icon icon="account-minus-outline"></b-icon>
            <span>
              Short List
              <b-tag class="is-dark" rounded>
                {{ getApplicantsFiltered("shorlisted").length }}
              </b-tag>
            </span>
          </template>
          <card-component
            title="Short Listed Candidates"
            class="has-table has-mobile-sort-spaced"
          >
            <list-table :data-url="getApplicantsFiltered('shorlisted')">
              <b-table-column
                width="30"
                label="Tools"
                custom-key="actions"
                cell-class="is-actions-cell"
                v-slot="props"
              >
                <b-button
                  @click.prevent="shortlist_applicant(props.row.id)"
                  size="is-small"
                  :type="{
                    'is-primary is-light': !props.row.shortlisted,
                    'is-danger is-light': props.row.shortlisted,
                  }"
                  :icon-left="
                    props.row.shortlisted
                      ? 'account-off-outline'
                      : 'account-minus'
                  "
                >
                  {{ props.row.shortlisted ? "UnShortlist" : "Shortlist" }}
                </b-button>
              </b-table-column>
              <b-table-column
                width="30"
                label="Tools"
                custom-key="actions"
                cell-class="is-actions-cell"
                v-slot="props"
              >
                <b-tag v-if="props.row.interviewed" class="is-dark" rounded>
                  Interviewed</b-tag
                >
                <b-button
                  v-else
                  @click.prevent="interview_applicant(props.row.id)"
                  size="is-small"
                  type="is-primary is-light"
                  icon-left="account-plus-outline"
                >
                  Add To Interviews
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
            </list-table>
          </card-component>
        </b-tab-item>
        <b-tab-item>
          <template #header>
            <b-icon icon="account-check-outline"></b-icon>
            <span>
              Interviewed
              <b-tag class="is-dark" rounded>
                {{ getApplicantsFiltered("interviewed").length }}</b-tag
              >
            </span>
          </template>
          <card-component
            title="Interviewed Applicants"
            class="has-table has-mobile-sort-spaced"
          >
            <list-table :data-url="getApplicantsFiltered('interviewed')">
              <!-- <b-table-column
                width="30"
                label="Tools"
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
                custom-key="actions"
                cell-class="is-actions-cell"
                v-slot="props"
                label="Hired"
              >
                <div class="buttons">
                  <button
                    class="button is-small is-success"
                    @click="hire_applicant(props.row.id)"
                    :class="{ 'is-light': props.row.hired }"
                    type="button"
                  >
                    {{ props.row.hired ? "Hired" : " Hire" }}
                  </button>
                </div>
                <!-- <div v-if="props.row.id < 30" class="buttons">
                  <button
                    v-if="props.row.id <= 20"
                    class="button is-small is-danger is-light"
                    :class="''"
                    type="button"
                    @click.prevent="trashModal(props.row)"
                  >
                    Not Hired
                  </button>

                  <button
                    v-if="props.row.id > 20"
                    class="button is-small is-success is-light"
                    type="button"
                    @click.prevent="trashModal(props.row)"
                  >
                    Hired
                  </button>
                </div> -->
              </b-table-column>
            </list-table>
          </card-component>
        </b-tab-item>
      </b-tabs>
    </section>
  </div>
</template>

<script>
import CardComponent from "@/components/CardComponent";
import ListTable from "@/components/DetailsTable";
import ApplicantsFilter from "@/components/Applicantsfilters";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "About",
  components: {
    CardComponent,
    ListTable,
    ApplicantsFilter,
  },
  methods: {
    ...mapActions(["getJobApplicants"]),
    ...mapMutations([
      "clearApplicantsFilters",
      "shortlist_applicant",
      "interview_applicant",
      "block_applicant",
      "roster_applicant",
      "hire_applicant",
    ]),
  },
  data() {
    return {
      isLoading: false,
    };
  },
  async mounted() {
    this.clearApplicantsFilters();
    this.isLoading = true;

    try {
      await this["getJobApplicants"](this.$route.params.id);
    } catch (e) {
      this.isLoading = false;

      this.$buefy.toast.open({
        message: `Error: ${e.message}`,
        type: "is-danger",
      });
    }
    this.isLoading = false;
  },
  computed: {
    ...mapState(["job_applicants"]),
    ...mapGetters(["getJobById", "getApplicantsFiltered"]),
  },
};
</script>

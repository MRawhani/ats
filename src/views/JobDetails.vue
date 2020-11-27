<template>
  <div class="About">
    <div class="page-title">
      <h1 class="title">
        {{
          job_applicants.meta.job_id
            ? getJobById(job_applicants.meta.job_id).title
            : "Job Title"
        }}
      </h1>
    </div>
    <section class="section is-main-section">
      <b-tabs type="is-boxed" expanded>
        <b-tab-item>
          <template #header>
            <b-icon icon="account-multiple"></b-icon>
            <span>
              Applicants
              <b-tag class="is-info" rounded>
                {{ job_applicants.applicants.length }}
              </b-tag>
            </span>
          </template>
          <card-component
            title="All Applicants"
            class="has-table has-mobile-sort-spaced"
          >
            <list-table
              :data-url="`${$router.options.base}data-sources/clients.json`"
            >
              <b-table-column
                width="30"
                label="Tools"
                custom-key="actions"
                cell-class="is-actions-cell"
              >
                <b-button
                  size="is-small"
                  type="is-primary is-light"
                  icon-left="account-minus"
                >
                  Shortlist
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
                        <b-icon icon="file-link-outline"></b-icon>
                        <span> View Cv </span>
                      </template>
                    </b-dropdown-item>
                    <b-dropdown-item aria-role="listitem">
                      <template>
                        <b-icon icon="contacts-outline"></b-icon>
                        <span> Contact Info </span>
                      </template></b-dropdown-item
                    >
                    <b-dropdown-item aria-role="listitem">
                      <template>
                        <b-icon icon="account-cancel"></b-icon>
                        <span> Black List </span>
                      </template></b-dropdown-item
                    >
                  </b-dropdown>
                </div>
              </b-table-column>

              <b-table-column
                custom-key="actions"
                cell-class="is-actions-cell"
                v-slot="props"
              >
                <div class="buttons">
                  <button
                    class="button is-small is-danger"
                    type="button"
                    @click.prevent="trashModal(props.row)"
                  >
                    <b-icon icon="trash-can" size="is-small" />
                  </button>
                </div>
              </b-table-column>
            </list-table>
          </card-component>
        </b-tab-item>
        <b-tab-item>
          <template #header>
            <b-icon icon="fullscreen"></b-icon>
            <span>
              Screened Out <b-tag class="is-info" rounded> 10 </b-tag>
            </span>
          </template>
          <card-component
            title="Screend Out Candidates"
            class="has-table has-mobile-sort-spaced"
          >
            <list-table
              :data-url="`${$router.options.base}data-sources/clients.json`"
            >
              <b-table-column
                width="30"
                label="Tools"
                custom-key="actions"
                cell-class="is-actions-cell"
              >
                <b-button
                  size="is-small"
                  type="is-primary is-light"
                  icon-left="fullscreen-exit"
                >
                  Screen IN
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
                        <b-icon icon="file-link-outline"></b-icon>
                        <span> View Cv </span>
                      </template>
                    </b-dropdown-item>
                    <b-dropdown-item aria-role="listitem">
                      <template>
                        <b-icon icon="contacts-outline"></b-icon>
                        <span> Contact Info </span>
                      </template></b-dropdown-item
                    >
                    <b-dropdown-item aria-role="listitem">
                      <template>
                        <b-icon icon="account-cancel"></b-icon>
                        <span> Black List </span>
                      </template></b-dropdown-item
                    >
                  </b-dropdown>
                </div>
              </b-table-column>
              <b-table-column
                width="30"
                custom-key="actions"
                cell-class="is-actions-cell"
              >
                <b-button size="is-small" type="is-danger " icon-left="delete">
                </b-button>
              </b-table-column>
            </list-table>
          </card-component>
        </b-tab-item>
        <b-tab-item>
          <template #header>
            <b-icon icon="account-minus-outline"></b-icon>
            <span>
              Short List <b-tag class="is-info" rounded> 10 </b-tag>
            </span>
          </template>
          <card-component
            title="Short Listed Candidates"
            class="has-table has-mobile-sort-spaced"
          >
            <list-table
              :data-url="`${$router.options.base}data-sources/clients.json`"
            >
              <b-table-column
                width="30"
                label="Tools"
                custom-key="actions"
                cell-class="is-actions-cell"
              >
                <b-button
                  size="is-small"
                  type="is-danger is-light"
                  icon-left="account-off-outline"
                >
                  Unshortlist
                </b-button>
              </b-table-column>
              <b-table-column
                width="30"
                custom-key="actions"
                cell-class="is-actions-cell"
              >
                <b-button
                  size="is-small"
                  type="is-primary is-light"
                  icon-left="account-plus-outline"
                >
                  Add To Interviews
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
                        <b-icon icon="file-link-outline"></b-icon>
                        <span> View Cv </span>
                      </template>
                    </b-dropdown-item>
                    <b-dropdown-item aria-role="listitem">
                      <template>
                        <b-icon icon="contacts-outline"></b-icon>
                        <span> Contact Info </span>
                      </template></b-dropdown-item
                    >
                    <b-dropdown-item aria-role="listitem">
                      <template>
                        <b-icon icon="account-off-outline"></b-icon>
                        <span> Unshortlist </span>
                      </template></b-dropdown-item
                    >
                  </b-dropdown>
                </div>
              </b-table-column>
            </list-table>
          </card-component>
        </b-tab-item>
        <b-tab-item>
          <template #header>
            <b-icon icon="account-check-outline"></b-icon>
            <span>
              Interviewed <b-tag class="is-info" rounded> 31</b-tag>
            </span>
          </template>
          <card-component
            title="Clients"
            class="has-table has-mobile-sort-spaced"
          >
            <list-table
              :data-url="`${$router.options.base}data-sources/clients.json`"
            >
              <b-table-column
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
                        <b-icon icon="file-link-outline"></b-icon>
                        <span> View Cv </span>
                      </template>
                    </b-dropdown-item>
                    <b-dropdown-item aria-role="listitem">
                      <template>
                        <b-icon icon="contacts-outline"></b-icon>
                        <span> Contact Info </span>
                      </template></b-dropdown-item
                    >
                    <b-dropdown-item aria-role="listitem">
                      <template>
                        <b-icon icon="account-cancel"></b-icon>
                        <span> Black List </span>
                      </template></b-dropdown-item
                    >
                  </b-dropdown>
                </div>
              </b-table-column>
              <b-table-column
                width="30"
                custom-key="actions"
                cell-class="is-actions-cell"
              >
                <b-button
                  size="is-small"
                  type="is-primary is-light"
                  icon-left="pen-plus"
                >
                  Add to Roster
                </b-button>
              </b-table-column>
              <b-table-column
                custom-key="actions"
                cell-class="is-actions-cell"
                v-slot="props"
                label="Hired"
              >
                <div v-if="props.row.id >= 30" class="buttons">
                  <button
                    class="button is-small is-danger"
                    type="button"
                    @click.prevent="trashModal(props.row)"
                  >
                    No
                  </button>
                  <button class="button is-small is-success" type="button">
                    Yes
                  </button>
                </div>
                <div v-if="props.row.id < 30" class="buttons">
                  <button
                    v-if="props.row.id <= 20"
                    class="button is-small is-danger is-light"
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
                </div>
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
import { mapState, mapGetters } from "vuex";
export default {
  name: "About",
  components: {
    CardComponent,
    ListTable
  },
  computed: {
    ...mapState(["job_applicants"]),
    ...mapGetters(["getJobById"])
  }
};
</script>

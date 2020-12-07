<template>
  <div>
    <modal-box
      :is-active="isModalActive"
      :trash-object-name="trashObjectName"
      @confirm="trashConfirm"
      @cancel="trashCancel"
    />
    <b-table
      :checked-rows.sync="checkedRows"
      :checkable="checkable"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="created"
      :data="getJobsFiltered"
    >
      <b-table-column label="Posted" sortable field="created" v-slot="props">
        <small class="has-text-grey is-abbr-like" :title="props.row.created">{{
          formatDate(props.row.created_at, true)
        }}</small>
      </b-table-column>
      <b-table-column label="Name" field="name" sortable v-slot="props">
        <router-link :to="`/applicants/${props.row.id}/${props.row.title}`">
          <h2 class="link">
            {{ props.row.title }}
          </h2>
        </router-link>
      </b-table-column>

      <b-table-column label="City" field="city" sortable v-slot="props">
        {{ props.row.locations[0] }}
      </b-table-column>

      <b-table-column label="Deadline" v-slot="props">
        <small class="has-text-grey is-abbr-like" :title="props.row.created">{{
          formatDate(props.row.deadline, true)
        }}</small>
      </b-table-column>
      <b-table-column
        field="applicants"
        label="Applicants"
        sortable
        centered
        v-slot="props"
      >
        <span class="tag is-primary">
          {{ props.row.applicants_number || 40 }}
        </span>
      </b-table-column>

      <b-table-column
        custom-key="actions"
        cell-class="is-actions-cell"
        v-slot="props"
      >
        <div class="buttons is-right">
          <a
            href="https://google.com"
            target="_blank"
            class="button is-small is-success is-light"
          >
            <b-icon icon="eye" size="is-small" />
          </a>
          <router-link
            :to="{ name: 'client.edit', params: { id: props.row.id } }"
            class="button is-small is-secondary"
          >
            <b-icon icon="account-edit" size="is-small" />
          </router-link>

          <button
            class="button is-small is-danger"
            type="button"
            @click.prevent="trashModal(props.row)"
          >
            <b-icon icon="trash-can" size="is-small" />
          </button>
        </div>
      </b-table-column>
      <slot />

      <section slot="empty" class="section">
        <div class="content has-text-grey has-text-centered">
          <template v-if="isLoading">
            <p>
              <b-icon icon="dots-horizontal" size="is-large" />
            </p>
            <p>Fetching data...</p>
          </template>
          <template v-else>
            <p>
              <b-icon icon="emoticon-sad" size="is-large" />
            </p>
            <p>Nothing's here&hellip;</p>
          </template>
        </div>
      </section>
    </b-table>
  </div>
</template>

<script>
import { mapActions, mapState,mapGetters } from "vuex";
import ModalBox from "@/components/ModalBox";
export default {
  name: "ListTable",
  components: { ModalBox },
  props: {
    dataUrl: {
      type: String,
      default: null
    },
    checkable: {
      type: Boolean,
      default: false
    }
    
  },
  data() {
    return {
      isModalActive: false,
      trashObject: null,
      clients: [],
      isLoading: false,
      isMenuNavBarActive: false,
      paginated: false,
      perPage: 10,
      checkedRows: []
    };
  },
  computed: {
    ...mapState(["applicants"]),

    trashObjectName() {
      if (this.trashObject) {
        return this.trashObject.name;
      }

      return null;
    },
    ...mapGetters(["getJobsFiltered"])
  },
  async mounted() {
    this.isLoading = true;

    try {
      //specified "getAllJobs" just for test, otherwise the method name will be coming as a prop
      //since we will use this table for different kind of actions
      
      await this["getAllJobs"]();
    } catch (e) {
      this.isLoading = false;

      this.$buefy.toast.open({
        message: `Error: ${e.message}`,
        type: "is-danger"
      });
    }
    this.isLoading = false;
      this.clients = this.getJobsFiltered;

      if (this.getJobsFiltered.length > this.perPage) {
        this.paginated = true;
      }
    
  },
  methods: {
    ...mapActions(["getAllJobs"]),
    trashModal(trashObject) {
      this.trashObject = trashObject;
      this.isModalActive = true;
    },
    trashConfirm() {
      this.isModalActive = false;
      this.$buefy.snackbar.open({
        message: "Confirmed",
        queue: false
      });
    },
    menuNavBarToggle() {
      this.isMenuNavBarActive = !this.isMenuNavBarActive;
    },
    trashCancel() {
      this.isModalActive = false;
    }
  }
};
</script>

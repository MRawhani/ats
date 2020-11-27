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
      :data="clients"
    >
      <b-table-column
        label="Date Applied"
        sortable
        field="created"
        v-slot="props"
      >
        <small class="has-text-grey is-abbr-like" :title="props.row.created">{{
          formatDate(props.row.created_at, true)
        }}</small>
      </b-table-column>
      <b-table-column label="Name" field="name" sortable v-slot="props">
        <h2 class="">
          {{ props.row.first_name + ` ` + props.row.last_name }}
        </h2>
      </b-table-column>

      <b-table-column label="City" field="city" sortable v-slot="props">
        {{ getCity(props.row.city).name }}
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
import { mapActions, mapState, mapGetters } from "vuex";

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
    ...mapState(["job_applicants"]),
    ...mapGetters(["getCity"]),

    trashObjectName() {
      if (this.trashObject) {
        return this.trashObject.name;
      }

      return null;
    }
  },
  async mounted() {
    this.isLoading = true;

    try {
      await this["getJobApplicants"](this.$route.params.id);
    } catch (e) {
      this.isLoading = false;

      this.$buefy.toast.open({
        message: `Error: ${e.message}`,
        type: "is-danger"
      });
    }
    this.isLoading = false;
    if (this.job_applicants.applicants) {
      if (this.job_applicants.applicants.length > this.perPage) {
        this.paginated = true;
      }
      this.clients = this.job_applicants.applicants;
    }
  },
  methods: {
    ...mapActions(["getJobApplicants"]),

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

<template>
  <div>
    <modal-box
      :is-active="isModalActive"
     :trash-object-name="trashObjectName"
      @confirm="trashConfirm"
      @cancel="trashCancel"
    >
      <cv-view :applicant="trashObjectName" :job_title="$route.params.job_title "/>
    </modal-box>
    <b-table
      :checked-rows.sync="checkedRows"
      :checkable="checkable"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="false"
      :hoverable="false"
      default-sort="created"
      :data="dataUrl"
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
      <b-table-column
        width="30"
      v-slot="props"
        custom-key="actions"
        cell-class="is-actions-cell"
      >
        <b-button
          size="is-small"
          type=" is-light"
          icon-left="file-link-outline"
          @click.prevent="trashModal(props.row)"
        >
          View Cv
        </b-button>
  
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
import {mapGetters } from "vuex";

import ModalBox from "@/components/ModalBox";
import CvView from "./CvView.vue";

export default {
  name: "ListTable",
  components: { ModalBox, CvView },
  props: {
    dataUrl: {
      type: Array,
      default: null,
    },
    checkable: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isModalActive: false,
      trashObject: null,
      clients: [],
      // isLoading: false,
      isMenuNavBarActive: false,
      paginated: false,
      perPage: 10,
      checkedRows: [],
    };
  },
  watch: {
    dataUrl() {
      if (this.dataUrl.length > this.perPage) {
        this.paginated = true;
      }
    },
  },
  computed: {
    // ...mapState(["job_applicants"]),
    ...mapGetters(["getCity", "getApplicantsFiltered"]),

    trashObjectName() {
      if (this.trashObject) {
        console.log(this.trashObject);
        return this.trashObject;
      }

      return null;
    },
  },

  methods: {
    date(el){
      debugger
       let years = 0;

      el.experience.forEach((exp) => {
        years = parseFloat(years)+ parseFloat(new Number(
          (new Date(exp.end_at * 1000).getTime() -
            new Date(exp.start_at * 1000).getTime()) /
            31536000000
        ).toFixed(1))
      });
      return parseFloat(years)
    },
    trashModal(trashObject) {
      this.trashObject = trashObject;
      this.isModalActive = true;
    },
    trashConfirm() {
      this.isModalActive = false;
      this.$buefy.snackbar.open({
        message: "Confirmed",
        queue: false,
      });
    },
    menuNavBarToggle() {
      this.isMenuNavBarActive = !this.isMenuNavBarActive;
    },
    trashCancel() {
      this.isModalActive = false;
    },
  },
};
</script>

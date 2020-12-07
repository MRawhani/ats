<template>
  <b-modal :active.sync="isModalActive" has-modal-card>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">
          {{ trashObjectName ? trashObjectName.first_name : "" }} CV
        </p>
      </header>
      <section class="modal-card-body">
        <!-- <p>
          This will permanently delete <b>{{ trashObjectName }}</b>
        </p>
        <p>Action can not be undone.</p> -->
        <slot />
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="cancel">Close</button>
        <!-- <button class="button is-danger" @click="confirm">Delete</button> -->
      </footer>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "ModalBox",
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    trashObjectName: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      isModalActive: false,
    };
  },
  watch: {
    isActive(newValue) {
      this.isModalActive = newValue;
    },
    isModalActive(newValue) {
      if (!newValue) {
        this.cancel();
      }
    },
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    confirm() {
      this.$emit("confirm");
    },
  },
};
</script>

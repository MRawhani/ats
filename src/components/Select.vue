<!-- Vue component -->
<template>
  <multiselect
    :value="value"
    tag-placeholder="Add this as new tag"
    :placeholder="title"
    label="name"
    track-by="id"
    :options="options"
    :multiple="true"
    @input="$emit('update-selected', $event)"
  >
  </multiselect>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect
  },
  data() {
    return {
      //   value: [{ name: "Javascript", code: "js" }],
    };
  },
  beforeUpdate() {
    console.log(this.options);
  },
  props: {
    value: Array,
    options: Array,
    title: String
  }
};
</script>

<!-- New step!
     Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

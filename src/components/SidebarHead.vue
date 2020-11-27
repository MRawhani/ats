<template>
  <div class="aside-head">
    <div class="aside-head-label">
      <!-- <b-icon v-if="icon" :icon="icon" custom-size="default" />
      <slot name="label" /> -->
      <img src="https://vns.netlify.app/images/venus.svg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "SidebarTools",
  props: {
    icon: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    }
  }
};
</script>

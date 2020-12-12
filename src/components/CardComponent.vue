<template>
  <div class="card s-card">
    <header v-if="title" class="card-header">
      <p class="card-header-title">
        <b-icon v-if="icon" :icon="icon" custom-size="default" />
        {{ title }}
      </p>
      <a
        v-if="headerIcon"
        href="#"
        class="card-header-icon"
        aria-label="more options"
        @click.prevent="headerIconClick"
      >
        <b-icon :icon="headerIcon" custom-size="default" />
      </a>
    </header>
 
    <div class="card-content">
      <slot />
    </div>
  </div>
</template>

<script>
// import Toolbar from "@/components/CardComponent";
export default {
  name: "CardComponent",
  components: {
    
  },
  props: {
    title: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    headerIcon: {
      type: String,
      default: null
    }
  },
  methods: {
    headerIconClick() {
      this.$emit("header-icon-click");
    }
  }
};
</script>

<style>
  .stats > .s-card{
    box-shadow: 0 0 5px #ffe9a9;
    border: none;
  }
</style>

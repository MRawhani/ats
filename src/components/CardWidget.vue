<template>
  <card-component>
    <div class="level is-mobile">
      <div class="level-item">
        <div class="is-widget-label">
          <h3 class="subtitle is-spaced">
            {{ label }}
          </h3>
          <h1 class="title">
            <div>{{ prefix }}{{ number }}{{ suffix }}</div>
          </h1>
        </div>
      </div>
      <div v-if="icon" class="level-item has-widget-icon is-narrow">
        <div class="is-widget-icon">
          <b-icon :icon="icon" size="is-large" :type="type" />
        </div>
      </div>
    </div>
  </card-component>
</template>

<script>
import CardComponent from "@/components/CardComponent";

export default {
  name: "CardWidget",
  components: { CardComponent },
  props: {
    icon: {
      type: String,
      default: null
    },
    number: {
      type: Number,
      default: 0
    },
    prefix: {
      type: String,
      default: null
    },
    suffix: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null
    }
  }
};
</script>

<style>
  .subtitle {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .level-item{
     padding: 0 !important;
  }
</style>
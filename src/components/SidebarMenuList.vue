<template>
  <ul :class="{ 'menu-list': !isSubmenuList }">
    <sidebar-menu-item
      v-for="(item, index) in menu"
      :key="index"
      :item="item"
      @menu-click="menuClick"
    />
  </ul>
</template>

<script>
import SidebarMenuItem from "@/components/SidebarMenuItem";

export default {
  name: "SidebarMenuList",
  components: {
    SidebarMenuItem
  },
  props: {
    isSubmenuList: {
      type: Boolean,
      default: false
    },
    menu: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    menuClick(item) {
      this.$emit("menu-click", item);
    }
  }
};
</script>

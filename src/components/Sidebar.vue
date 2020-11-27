<template>
  <aside v-show="isAsideVisible" class="aside is-placed-left is-expanded">
    <sidebar-header :is-main-menu="true">
      <span slot="label"> <b>Venus</b> Agency </span>
    </sidebar-header>
    <div class="menu is-menu-main">
      <template v-for="(menuGroup, index) in menu">
        <p v-if="typeof menuGroup === 'string'" :key="index" class="menu-label">
          {{ menuGroup }}
        </p>
        <sidebar-menu-list
          v-else
          :key="index"
          :menu="menuGroup"
          @menu-click="menuClick"
        />
      </template>
    </div>
  </aside>
</template>

<script>
import { mapState } from "vuex";
import SidebarHeader from "@/components/SidebarHead";
import SidebarMenuList from "@/components/SidebarMenuList";

export default {
  name: "SidebarMenu",
  components: { SidebarHeader, SidebarMenuList },
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapState(["isAsideVisible"])
  },
  methods: {
    menuClick() {
      //
    }
  }
};
</script>

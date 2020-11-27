<template>
  <div>
    <div v-if="loading">
      <b-loading :is-full-page="true" v-model="loading"></b-loading>
    </div>
    <div v-else id="app">
      <nav-bar />
      <side-bar :menu="menu" />
      <router-view />
      <footer-bar />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/Sidebar";
import FooterBar from "@/components/Footer";

export default {
  name: "Home",
  components: {
    FooterBar,
    SideBar,
    NavBar
  },
  data() {
    return {
      loading: true
    };
  },
  computed: {
    menu() {
      return [
        "General",
        [
          {
            to: "/",
            icon: "desktop-mac",
            label: "Dashboard"
          },
          {
            to: "/about",
            label: "Details",
            icon: "help-circle",
            updateMark: true
          },
          {
            to: "/front",
            label: "Front Page",
            icon: "help-circle",
            updateMark: true
          },

          {
            label: "Profile",
            subLabel: "Profile ",
            icon: "view-list",
            menu: [
              {
                href: "#void",
                label: "Settings"
              },
              {
                href: "#void",
                label: "Logout"
              }
            ]
          },
          {
            to: "/apply",
            label: "Apply",
            icon: "square-edit-outline"
          }
        ]
      ];
    }
  },

    methods: {
      ...mapActions(["getCompanyInfo"])
    },

  async mounted() {
    this.loading = true;
    try {
      await this["getCompanyInfo"]();
    } catch (e) {
      this.$buefy.toast.open({
        message: `Error: ${e.message}`,
        type: "is-danger"
      });
    }
    this.loading = false;
  }
};
</script>

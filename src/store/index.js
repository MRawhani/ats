import Vue from "vue";

import Vuex from "vuex";
import * as actions from "./actions";
import * as getters from "./getters";
import * as mutations from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /* User */
    userName: null,
    userId: null,
    userAvatar: null,
    /* NavBar */
    isNavBarVisible: true,

    /* Aside */
    isAsideVisible: true,
    isAsideMobileExpanded: false,
    /* Jobs */
    jobs_list: [],
    /* cities */
    cities: [],
    /* applicants */

    job_applicants: {
      applicants: [],
      meta: {},
      filters: {
        citiesSelected: [],
        en_levelSelected: [],
        edu_levelSelected: [],
        exp_roleSelected: [],
        searchValue: "",
        dates: [],
      },
    },
    /* */
    general: {
      cities: [],
      categories: [],
      locations: [],
      en_levels: [],
      experience_roles: [],
      education_levels: [],
      experience_industries: [],
    },

    jobs: {
      filters: {
        categoriesSelected: [],
        locationsSelected: [],
        searchValue: "",
        dates: [],
      },
      list: [],
    },
  },
  mutations: {
    ...mutations,
  },
  actions,
  getters,
});

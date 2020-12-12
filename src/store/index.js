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
        exp_yearsSelected: [],
        jobsSelected: [],
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
      exp_years: [
        { id: 1, name: "Less than a year",from:0,to:1 },
        { id: 3, name: "From 1 to 3 years",from:1,to:3 },
        { id: 5, name: "From 3 to 5 years",from:3,to:5 },
        { id: 1000, name: "more than 5 years",from:5,to:1000 },
      ],
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

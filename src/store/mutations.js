/* User */
import Vue from "vue";

function user(state, payload) {
  if (payload.name) {
    state.userName = payload.name;
  }
  if (payload.id) {
    state.userId = payload.id;
  }
  if (payload.avatar) {
    state.userAvatar = payload.avatar;
  }
  if (payload.data) {
    state.cities = payload.data.cities;
    
    for (var key in payload.data) {
      // eslint-disable-next-line no-prototype-builtins
      if (payload.data.hasOwnProperty(key)) {
        state.general[key] = payload.data[key];
      } 
    }
  }
}

function jobs(state, payload) {
  state.jobs.list = payload.jobs_list;
}
function filterJobs(state, payload) {
  debugger;
  console.log("ssssssssss");
  if (payload.type === "location") {
    state.jobs.filters.locationsSelected = payload.value;
  }
  if (payload.type === "category") {
    state.jobs.filters.categoriesSelected = payload.value;
  }
  if (payload.type === "search") {
    state.jobs.filters.searchValue = payload.value;
  }
  if (payload.type === "date") {
    state.jobs.filters.dates = payload.value;
  }
}
function applicants(state, payload) {
  state.job_applicants.applicants = payload.applicants;
  state.job_applicants.meta = payload.meta;
}
function filterApplicants(state, payload) {
  debugger;
  if (payload.type === "city") {
    state.job_applicants.filters.citiesSelected = payload.value;
  }
  if (payload.type === "en_level") {
    state.job_applicants.filters.en_levelSelected = payload.value;
  }
  if (payload.type === "edu_level") {
    state.job_applicants.filters.edu_levelSelected = payload.value;
  }
  if (payload.type === "exp_role") {
    state.job_applicants.filters.exp_roleSelected = payload.value;
  }
  if (payload.type === "exp_years") {
    debugger
    state.job_applicants.filters.exp_yearsSelected = payload.value;
  }
  if (payload.type === "search") {
    state.job_applicants.filters.searchValue = payload.value;
  }
  if (payload.type === "date") {
    state.job_applicants.filters.dates = payload.value;
  }
  if (payload.type === "jobs") {
    state.job_applicants.filters.jobsSelected = payload.value;
  }
}
function clearApplicantsFilters(state) {
  const empty = {
    citiesSelected: [],
    en_levelSelected: [],
    edu_levelSelected: [],
    exp_roleSelected: [],
    exp_yearsSelected: [],
    jobsSelected: [],
    searchValue: "",
    dates: [],
  };
  state.job_applicants.filters = { ...empty };
}

/*applicants functions */
function shortlist_applicant(state, id) {
  const index = state.job_applicants.applicants.findIndex(
    (item) => item.id === id
  );

  const shortlisted = state.job_applicants.applicants[index].shortlisted;

  Vue.set(state.job_applicants.applicants[index], "shortlisted", !shortlisted);
}
function block_applicant(state, id) {
  const index = state.job_applicants.applicants.findIndex(
    (item) => item.id === id
  );

  const blocked = state.job_applicants.applicants[index].blocked;

  Vue.set(state.job_applicants.applicants[index], "blocked", !blocked);
}
function interview_applicant(state, id) {
  const index = state.job_applicants.applicants.findIndex(
    (item) => item.id === id
  );

  const interviewed = state.job_applicants.applicants[index].interviewed;

  !interviewed &&
    Vue.set(state.job_applicants.applicants[index], "interviewed", true);
}
function roster_applicant(state, id) {
  const index = state.job_applicants.applicants.findIndex(
    (item) => item.id === id
  );

  const rostered = state.job_applicants.applicants[index].rostered;

  Vue.set(state.job_applicants.applicants[index], "rostered", !rostered);
}
function hire_applicant(state, id) {
  const index = state.job_applicants.applicants.findIndex(
    (item) => item.id === id
  );

  const hired = state.job_applicants.applicants[index].hired;

  Vue.set(state.job_applicants.applicants[index], "hired", !hired);
}
/* Aside Mobile */
function asideMobileStateToggle(state, payload = null) {
  // const htmlClassName = "has-aside-mobile-expanded";
  const htmlClassName = "";

  let isShow;

  if (payload !== null) {
    isShow = payload;
  } else {
    isShow = !state.isAsideMobileExpanded;
  }

  if (isShow) {
    document.documentElement.classList.add(htmlClassName);
  } else {
    document.documentElement.classList.remove(htmlClassName);
  }

  state.isAsideMobileExpanded = isShow;
}

export {
  user,
  applicants,
  jobs,
  asideMobileStateToggle,
  filterJobs,
  filterApplicants,
  clearApplicantsFilters,
  shortlist_applicant,
  block_applicant,
  interview_applicant,
  roster_applicant,
  hire_applicant
};

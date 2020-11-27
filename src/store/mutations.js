/* User */
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
  if (payload.cities) {
    state.cities = payload.cities;
  }
}

function jobs(state, payload) {
  state.jobs_list = payload.jobs_list;
}
function applicants(state, payload) {
  state.job_applicants.applicants = payload.applicants;
  state.job_applicants.meta = payload.meta;
}
/* Aside Mobile */
function asideMobileStateToggle(state, payload = null) {
  const htmlClassName = "has-aside-mobile-expanded";

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

module.exports = {
  user,
  applicants,
  jobs,
  asideMobileStateToggle
};

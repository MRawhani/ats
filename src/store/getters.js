export const getState = (state) => {
  console.log(state);
  return state.store;
};
export const getImageUrl = () => (url) => {
  return `https://yemenhr.com${url}`;
};
export const getCity = (state) => (id) => {
  const foundCity = state.general.cities.find((city) => city.id === id);
  return foundCity;
};
export const getLocation = (state) => (id) => {
  const foundLoc = state.general.locations.find(
    (location) => location.id === id
  );
  return foundLoc;
};
export const getEn_level = (state) => (id) => {
  const foundLevel = state.general.en_levels.find((level) => level.id === id);
  return foundLevel;
};
export const getEducation_level = (state) => (id) => {
  const foundLevel = state.general.education_levels.find(
    (level) => level.id === id
  );
  return foundLevel;
};
export const getExperience_roles = (state) => (id) => {
  const foundLevel = state.general.experience_roles.find(
    (level) => level.id === id
  );
  return foundLevel;
};
export const getExperience_industries = (state) => (id) => {
  const found = state.general.experience_industries.find(
    (level) => level.id === id
  );
  return found;
};
export const getExperience_employment_status = (state) => (id) => {
  const found = state.general.experience_employment_status.find(
    (level) => level.id === id
  );
  return found;
};
export const getJobsFiltered = (state) => {
  let nwlist = state.jobs.list;
  debugger;
  if (state.jobs.filters.locationsSelected.length > 0) {
    nwlist = nwlist.filter((el) => {
      return el.locations.some((loc) => {
        if (
          state.jobs.filters.locationsSelected.findIndex(
            (com) => com.id === loc
          ) !== -1
        ) {
          return true;
        } else {
          return false;
        }
      });
    });
  }

  if (
    state.jobs.filters.categoriesSelected &&
    state.jobs.filters.categoriesSelected.length > 0
  ) {
    nwlist = nwlist.filter(
      (el) =>
        state.jobs.filters.categoriesSelected.findIndex(
          (cat) => cat.id === el.category_id
        ) !== -1
    );
  }
  if (state.jobs.filters.searchValue !== "") {
    nwlist = nwlist.filter((el) =>
      el.title
        .toLowerCase()
        .includes(state.jobs.filters.searchValue.toLowerCase())
    );
  }
  if (state.jobs.filters.dates.length > 0) {
    debugger;
    nwlist = nwlist.filter((job) => {
      console.log(Date.parse(`${state.jobs.filters.dates[0]}`));
      console.log(
        job.created_at * 1000 >= Date.parse(`${state.jobs.filters.dates[0]}`)
      );
      return (
        job.created_at * 1000 >= Date.parse(`${state.jobs.filters.dates[0]}`) &&
        job.created_at * 1000 <= Date.parse(`${state.jobs.filters.dates[1]}`)
      );
    });
  }
  return nwlist;
};
export const getApplicantsFiltered = (state) => (type) => {
  debugger;
  let nwlist;
  if (type === "rostered") {
    nwlist = state.job_applicants.applicants.filter(
      (el) => el.rostered === true
    );
  } else if (type === "screened") {
    nwlist = state.job_applicants.applicants.filter(
      (el) =>
        el.screening_one === true &&
        el.screening_two === true &&
        el.screening_three === true &&
        el.screening_four === true
    );
  } else if (type === "shorlisted") {
    nwlist = state.job_applicants.applicants.filter(
      (el) => el.shortlisted === true
    );
  } else if (type === "blocked") {
    nwlist = state.job_applicants.applicants.filter(
      (el) => el.blocked === true
    );
  } else if (type === "interviewed") {
    nwlist = state.job_applicants.applicants.filter(
      (el) => el.interviewed === true
    );
  } else {
    nwlist = state.job_applicants.applicants;
  }

  if (state.job_applicants.filters.citiesSelected.length > 0) {
    nwlist = nwlist.filter(
      (el) =>
        state.job_applicants.filters.citiesSelected.findIndex(
          (cat) => cat.id === el.city
        ) !== -1
    );
  }
  if (state.job_applicants.filters.en_levelSelected.length > 0) {
    nwlist = nwlist.filter(
      (el) =>
        state.job_applicants.filters.en_levelSelected.findIndex(
          (cat) => cat.id === el.en_level
        ) !== -1
    );
  }

  if (state.job_applicants.filters.edu_levelSelected.length > 0) {
    nwlist = nwlist.filter((el) => {
      return el.education.some((edu) => {
        if (
          state.job_applicants.filters.edu_levelSelected.findIndex(
            (e) => e.id === edu.level
          ) !== -1
        ) {
          return true;
        } else {
          return false;
        }
      });
    });
  }
  if (state.job_applicants.filters.exp_roleSelected.length > 0) {
    nwlist = nwlist.filter((el) => {
      return el.experience.some((exp) => {
        if (
          state.job_applicants.filters.exp_roleSelected.findIndex(
            (e) => e.id === exp.job_role
          ) !== -1
        ) {
          return true;
        } else {
          return false;
        }
      });
    });
  }
  if (state.job_applicants.filters.exp_yearsSelected.length > 0) {
    nwlist = nwlist.filter((el) => {
      let years = 0;

      el.experience.forEach((exp) => {
        years =
          parseFloat(years) +
          parseFloat(
            new Number(
              (new Date(exp.end_at * 1000).getTime() -
                new Date(exp.start_at * 1000).getTime()) /
                31536000000
            ).toFixed(1)
          );
      });
      if (
        state.job_applicants.filters.exp_yearsSelected.findIndex(
          (e) => e.from <= years && e.to >= years
        ) !== -1
      ) {
        return true;
      } else {
        return false;
      }
    });
  }

  if (state.job_applicants.filters.searchValue !== "") {
    nwlist = nwlist.filter(
      (el) =>
        el.first_name
          .toLowerCase()
          .includes(state.job_applicants.filters.searchValue.toLowerCase()) ||
        el.last_name
          .toLowerCase()
          .includes(state.job_applicants.filters.searchValue.toLowerCase())
    );
  }
  if (state.job_applicants.filters.dates.length > 0) {
    debugger;
    nwlist = nwlist.filter((job) => {
      console.log(Date.parse(`${state.job_applicants.filters.dates[0]}`));
      console.log(
        job.created_at * 1000 >=
          Date.parse(`${state.job_applicants.filters.dates[0]}`)
      );
      return (
        job.created_at * 1000 >=
          Date.parse(`${state.job_applicants.filters.dates[0]}`) &&
        job.created_at * 1000 <=
          Date.parse(`${state.job_applicants.filters.dates[1]}`)
      );
    });
  }
  return nwlist;
};

export const getJobById = (state) => (id) => {
  debugger;
  const foundJob = state.jobs.list.find((job) => job.id === id);

  console.log(foundJob);
  return foundJob;
};

export const getState = state => {
  console.log(state);
  return state.store;
};
export const getImageUrl = () => url => {
  return `https://yemenhr.com${url}`;
};
export const getCity = state => id => {
  const foundCity = state.cities.find(city => city.id === id);
  return foundCity;
};
export const getJobById = state => id => {
  const foundJob = state.jobs_list.find(job => job.id === id);

  console.log(foundJob);
  return foundJob;
};

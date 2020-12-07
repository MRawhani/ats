import axios from "axios";

const url = "https://yemenhr.com/api/ats/v1/";
const token = "MzxUjfSQvR3kcYwdaZzWqcDfZLSJUSnx";
export const getCompanyInfo = async context => {
  const response = await axios.get(`${url}attributes?token=${token}`);
  const res = response.data;
  context.commit("user", {
    name: res.company.name,
    id: res.company.id,
    data: res,
    avatar: `https://yemenhr.com${res.company.logo}`
  });
};

export const getAllJobs = async context => {
  const response = await axios.get(`${url}jobs?token=${token}`);
  const res = response.data;
  context.commit("jobs", {
    jobs_list: res.data
  });
};

export const setFilters = async context =>payload=> {
 
  context.commit("filterJobs", payload);
};

export const getJobApplicants = async context => {
  const response = await axios.get(
    `${url}jobs/16155/applicants?token=${token}`
  );
  const res = response.data;
  context.commit("applicants", {
    applicants: res.data,
    meta: { ...res.meta }
  });
};

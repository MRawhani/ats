import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    meta: {
      title: "Dashboard"
    },
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/applicants/:id/:job_title",
    name: "Applicants",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/JobDetails.vue")
  },
  {
    path: "/apply",
    name: "Apply",
    // route level code-splitting
    // this generates a separate chunk (apply.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "apply" */ "../views/ApplyForm.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

export default router;

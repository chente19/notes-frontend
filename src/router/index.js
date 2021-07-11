import Vue from "vue";
import VueRouter from "vue-router";
// import views like lazy loading magic method
const Home = () => import(/* webpackChunkName: "Home" */ "../views/Home.vue");
const Dashboard = () =>
  import(
    /* webpackChunkName: "Dashboard" */ "../components/common/Dashboard.vue"
  );
const Login = () =>
  import(/* webpackChunkName: "Login" */ "../components/common/Login.vue");

const NotesArea = () =>
  import(
    /* webpackChunkName: "NotesArea" */ "../components/admin/taskSection-component.vue"
  );


import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { admin: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { allAccess: true },
  },
  {
    path: "/list/notes",
    name: "NotesArea",
    component: NotesArea,
    meta: { admin: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.allAccess)) {
    next();
  } else if (
    store.state.user &&
    store.state.user.user_role == "admin"
  ) {
    if (to.matched.some((record) => record.meta.admin)) {
      next();
    }
  } else {
    next({ name: "Login" });
  }
});

export default router;

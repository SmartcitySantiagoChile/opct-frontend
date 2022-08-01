import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";
import { Actions, Mutations } from "@/store/enums/StoreEnums";

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    component: () => import("@/layout/Layout.vue"),
    children: [
      {
        path: "",
        redirect: "/dashboard",
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
      },
      {
        path: "/change-op-processes/:id",
        name: "changeOPRequest",
        component: () => import("@/views/opct/changeopprocess/detail/ChangeOPProcessDetail.vue"),
        props: true,
      },
      {
        path: "/operation-programs",
        name: "operationPrograms",
        component: () => import("@/views/opct/operationprogram/OperationPrograms.vue"),
        props: true,
      },
      {
        path: "/route-definitions",
        name: "routeDefinitions",
        component: () => import("@/views/opct/routedefinition/RouteDefinitions.vue"),
        props: true,
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/components/page-layouts/Auth.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () => import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () => import("@/views/crafted/authentication/basic-flow/SignUp.vue"),
      },
      {
        path: "/password-reset",
        name: "password-reset",
        component: () => import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
      },
    ],
  },
  {
    // the 404 route, when none of the above matches
    path: "/404",
    name: "404",
    component: () => import("@/views/crafted/authentication/Error404.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  // reset config to initial state
  await store.commit(Mutations.RESET_LAYOUT_CONFIG);
  // check user session
  await store.dispatch(Actions.USERS.VERIFY_AUTH);

  if (store.getters.isUserAuthenticated) {
    next();
    // Scroll page to top on every route change
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  } else if (to.name === "sign-in") {
    next();
  } else {
    next({ name: "sign-in" });
  }
});

export default router;

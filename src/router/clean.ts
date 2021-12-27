import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import store from "@/store";
import {Actions, Mutations} from "@/store/enums/StoreEnums";

const ifHasChangeStatusOption = (to, from, next) => {
    if (store.getters.hasChangeStatusOption) {
        next();
    } else {
        next("/")
    }
}

const routes: Array<RouteRecordRaw> = [

    {
        path: "",
        component: () => import("@/layout/Layout.vue"),
        children: [
            {
                path: "",
                redirect: "/dashboard"
            },
            {
                path: "/dashboard",
                name: "dashboard",
                component: () => import("@/views/Dashboard.vue"),
            },
            {
                path: "/change-op-requests/:id",
                name: "changeOPRequest",
                component: () => import("@/views/crafted/pages/changeOPRequest/ChangeOPRequest.vue"),
                props: true
            },
            {
                path: "/operation-programs",
                name: "operationPrograms",
                component: () => import("@/views/crafted/pages/operationProgram/OperationPrograms.vue"),
                props: true,
                beforeEnter: ifHasChangeStatusOption
            }

        ],
    },
    {
        path: "/",
        component: () => import("@/components/page-layouts/Auth.vue"),
        children: [
            {
                path: "/sign-in",
                name: "sign-in",
                component: () =>
                    import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
            },
            {
                path: "/sign-up",
                name: "sign-up",
                component: () =>
                    import("@/views/crafted/authentication/basic-flow/SignUp.vue"),
            },
            {
                path: "/password-reset",
                name: "password-reset",
                component: () =>
                    import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
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


router.beforeEach(() => {
    // reset config to initial state
    store.commit(Mutations.RESET_LAYOUT_CONFIG);

    store.dispatch(Actions.VERIFY_AUTH);

    // Scroll page to top on every route change
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
});

export default router;

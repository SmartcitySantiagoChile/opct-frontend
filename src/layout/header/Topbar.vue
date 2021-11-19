<template>
  <!--begin::Toolbar wrapper-->
  <div class="d-flex align-items-stretch flex-shrink-0">
    <div class="topbar d-flex align-items-stretch flex-shrink-0">
      <!--begin::User-->
      <div
        class="d-flex align-items-center me-n3 ms-1 ms-lg-3"
        id="kt_header_user_menu_toggle"
      >
        <!--begin::Menu-->
        <div
          class="
            btn btn-icon btn-active-light-primary
            w-30px
            h-30px
            w-md-40px
            h-md-40px
          "
          data-kt-menu-trigger="click"
          data-kt-menu-attach="parent"
          data-kt-menu-placement="bottom-end"
          data-kt-menu-flip="bottom"
        >
          <img
            src="media/avatars/150-25.jpg"
            alt="metronic"
            class="h-25px w-25px rounded"
          />
        </div>
        <KTUserMenu></KTUserMenu>
        <!--end::Menu-->
      </div>
      <!--end::User -->
    </div>
  </div>
  <!--end::Toolbar wrapper-->
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import KTUserMenu from "@/layout/header/partials/UserMenu.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "topbar",
  components: {
    KTUserMenu,
  },
  setup() {
    const store = useStore();
    const userNameAndSurname = computed(() => {
      return store.getters.currentUserNameAndSurname;
    });

    return {
      userNameAndSurname,
    };
  },
});
</script>

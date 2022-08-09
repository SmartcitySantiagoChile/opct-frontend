<template>
  <!--begin::Navbar-->
  <div class="card mb-5 mb-xxl-8">
    <div class="card-body pt-9 pb-0">
      <!--begin::Details-->
      <div class="d-flex flex-wrap flex-sm-nowrap mb-3">
        <!--begin: Pic-->
        <div class="me-7 mb-4">
          <div class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
            <img src="/media/avatars/blank.png" alt="image" />
          </div>
        </div>
        <!--end::Pic-->

        <!--begin::Info-->
        <div class="flex-grow-1">
          <!--begin::Title-->
          <div class="d-flex justify-content-between align-items-start flex-wrap mb-2">
            <!--begin::User-->
            <div class="d-flex flex-column">
              <!--begin::Name-->
              <div class="d-flex align-items-center mb-2">
                <a href="#" class="text-gray-800 text-hover-primary fs-2 fw-bolder me-1"
                  >{{ user.first_name }} {{ user.last_name }}</a
                >
              </div>
              <!--end::Name-->

              <!--begin::Info-->
              <div class="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                <a href="#" class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
                  <span class="svg-icon svg-icon-4 me-1">
                    <inline-svg src="/media/icons/duotune/communication/com006.svg" />
                  </span>
                  Rol
                </a>
                <a href="#" class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
                  <span class="svg-icon svg-icon-4 me-1">
                    <inline-svg src="/media/icons/duotune/general/gen018.svg" />
                  </span>
                  {{ user.organization.name }}
                </a>
                <a href="#" class="d-flex align-items-center text-gray-400 text-hover-primary mb-2">
                  <span class="svg-icon svg-icon-4 me-1">
                    <inline-svg src="/media/icons/duotune/communication/com011.svg" />
                  </span>
                  {{ user.email }}
                </a>
              </div>
              <!--end::Info-->
            </div>
            <!--end::User-->
          </div>
          <!--end::Title-->
        </div>
        <!--end::Info-->
      </div>
      <!--end::Details-->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "profile",
  setup() {
    const store = useStore();
    const user = store.getters.currentUser;
    return {
      user,
    };
  },
});
</script>

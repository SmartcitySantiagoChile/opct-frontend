<template>
  <div class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bolder fs-3 mb-1"></span>
        <span class="text-muted mt-1 fw-bold fs-7"></span>
      </h3>
      <div class="card-toolbar">
        <!--begin::Menu-->
        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3">
      <el-upload
        drag
        :show-file-list="false"
        accept="text/csv"
        :auto-upload="false"
        :on-change="onChange"
        v-loading="loading"
      >
        <i class="bi bi-file-earmark-arrow-up text-primary fs-3x"></i>
        <div class="ms-4">
          <h3 class="fs-5 fw-bold text-gray-900 mb-1">Actualizar diccionario de servicios</h3>
          <span class="fs-7 fw-semibold text-gray-400 el-upload__text"
            >Arrastra el archivo aquí o <em>haz clic para subirlo</em></span
          >
        </div>
        <template #tip>
          <div class="el-upload__tip">
            Debe utilizar el diccionario de servicios usado en los programas de operación
          </div>
        </template>
      </el-upload>
    </div>
    <!--end::Body-->
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "RouteDefinitions",
  setup() {
    const store = useStore();
    const { t } = useI18n();
    const loading = ref(false);

    onMounted(() => {
      setCurrentPageTitle("Administrador de PO");
    });

    const onChange = (uploadFile) => {
      if (uploadFile.percentage === 0) {
        loading.value = true;
        // upload file
        let formData = new FormData();
        formData.append("files", uploadFile.raw, uploadFile.name);
        const payload = {
          params: formData,
          headers: {
            "content-Type": "multipart/form-data",
          },
        };
        return store
          .dispatch(Actions.ROUTE_DEFINITIONS.BULK_UPDATE, payload)
          .then((data) => {
            Swal.fire({
              text: t("uploadedRouteFileSuccess", {
                created: data.created,
                updated: data.updated,
              }),
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: t("ok"),
              customClass: {
                confirmButton: "btn fw-bold btn-light-success",
              },
            });
            loading.value = false;
          })
          .catch(({ response }) => {
            Swal.fire({
              text: response.data.detail,
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: t("ok"),
              customClass: {
                confirmButton: "btn fw-bold btn-light-danger",
              },
            });
            loading.value = false;
          });
      }
    };

    return {
      onChange,
      loading,
    };
  },
});
</script>

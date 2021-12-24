<template>
  <!--begin::Tables OperationProgramLogTable -->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bolder fs-3 mb-1">
          {{ translate(dataName) }}
        </span>
      </h3>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3">
      <!--begin::Table container-->
      <div class="table-responsive">
        <!--begin::Table-->
        <table
            class="
            table
            align-middle
            gs-0
            gy-4
            table-rounded table-striped
            border
          "
        >
          <!--begin::Table head-->
          <thead>
          <tr
              class="fw-bold fs-5 text-gray-800 border-bottom-2 border-gray-200"
          >
            <th class="ps-4  rounded-start">
              {{ translate("information") }}
            </th>
            <th class="ps-4  min-w-150px rounded-start">
              {{ translate("value") }}
            </th>
          </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
          <template v-for="(item, index) in opData" :key="index">
            <tr>
              <td>
                <div class="d-flex align-items-center">
                  <div class="symbol symbol-10px me-5"></div>
                  <div class="d-flex justify-content-start flex-column">
                    <a
                        class="text-dark fw-bolder text-hover-primary mb-1 fs-6"
                        href=""
                    >{{
                        index
                      }}
                    </a>
                  </div>
                </div>
              </td>
              <td>
                <div class="d-flex align-items-center">
                  <div class="symbol symbol-10px me-5"></div>
                  <div class="d-flex justify-content-start flex-column">
                    <a
                        class="text-dark fw-bolder text-hover-primary mb-1 fs-6"
                        href=""
                    >{{item}}
                    </a>
                  </div>
                </div>
              </td>
            </tr>
          </template>
          </tbody>
          <!--end::Table body-->
        </table>
        <!--end::Table-->
      </div>
      <!--end::Table container-->
    </div>
    <!--begin::Body-->
  </div>
  <!--end::Tables OperationProgramLogTable-->
</template>
<script lang="ts">
import {computed, defineComponent} from "vue";
import {Actions} from "@/store/enums/StoreEnums";
import {useStore} from "vuex";
import {useI18n} from "vue-i18n";
import {DateTime} from "luxon";
import CreateOperationProgram from "@/views/crafted/pages/operationProgram/actions/CreateOperationProgram.vue";
import EditOperationProgramModal from "@/views/crafted/pages/operationProgram/actions/EditOperationProgram.vue";
import DeleteOperationProgramModal
  from "@/views/crafted/pages/operationProgram/actions/DeleteOperationProgramModal.vue";
import OperationProgramLogModal from "@/views/crafted/pages/operationProgram/logs/OperationProgramLogModal.vue"

export default defineComponent({
  name: "operation-program-log-table",
  props: {
    widgetClasses: String,
    opData: Object,
    dataName: String
  },
  setup(props) {
    const {t, te} = useI18n();
    const translate = (text) => (te(text) ? t(text) : text);

    return {
      translate,
      DateTime,
    };
  },
});
</script>

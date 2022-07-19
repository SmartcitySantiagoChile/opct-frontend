<template>
  <!--begin::Tables OperationProgramLogTable -->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div v-show="dataName !== ''" class="card-header border-0 pt-5">
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
        <table class="table align-middle gs-0 gy-4 table-rounded table-striped border">
          <!--begin::Table head-->
          <thead>
            <tr class="fw-bold fs-5 text-gray-800 border-bottom-2 border-gray-200">
              <th class="ps-4 rounded-start">
                {{ translate("information") }}
              </th>
              <th class="ps-4 min-w-150px rounded-start">
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
                      <div class="text-dark fw-bolder mb-1 fs-6">{{ translate(index) }}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <div class="symbol symbol-10px me-5"></div>
                    <div class="d-flex justify-content-start flex-column">
                      <div class="text-dark fw-bolder mb-1 fs-6">{{ translate(item) }}</div>
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
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { DateTime } from "luxon";

export default defineComponent({
  name: "operationProgramLogTable",
  props: {
    widgetClasses: String,
    opData: Object,
    dataName: String,
  },
  setup() {
    const { t, te } = useI18n();
    const translate = (text) => (te(text) ? t(text) : text);

    return {
      translate,
      DateTime,
    };
  },
});
</script>

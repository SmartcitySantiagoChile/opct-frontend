<template>
  <!--begin::ChangeOPRequestTimelineMilestone item-->
  <div class="timeline-item">
    <!--begin::Timeline line-->
    <div class="timeline-line w-40px"></div>
    <!--end::Timeline line-->

    <!--begin::Timeline icon-->
    <div class="timeline-icon symbol symbol-circle symbol-40px">
      <div class="symbol-label bg-light">
        <span class="svg-icon svg-icon-2 svg-icon-gray-500">
          <inline-svg src="/media/icons/duotune/communication/com009.svg" />
        </span>
      </div>
    </div>
    <!--end::Timeline icon-->

    <!--begin::Timeline content-->
    <div class="timeline-content mb-10 mt-n1">
      <!--begin::Timeline heading-->
      <div class="pe-3 mb-5">
        <!--begin::Title-->
        <div class="fs-5 fw-bold mb-2">
          <template v-if="data.type === LOG_TYPE.CHANGE_OP_REQUEST_CREATION">
            <span :class="`badge-light-warning`" class="badge fs-4 fw-bolder">
              {{ "Creación de solicitud de modificación" }}
            </span>
          </template>
          <template v-if="data.type === LOG_TYPE.CHANGE_OP_REQUEST_UPDATE">
            <span :class="`badge-light-warning`" class="badge fs-4 fw-bolder">
              {{ "Edición de solicitud de modificación" }}
            </span>
          </template>
        </div>
        <!--end::Title-->
      </div>
      <!--end::Timeline heading-->

      <!--begin::Timeline details-->
      <div class="overflow-auto pb-5">
        <template v-if="data.type === LOG_TYPE.CHANGE_OP_REQUEST_CREATION">
          <div class="d-flex align-items-center border border-dashed border-gray-300 rounded mb-5">
            <div class="d-flex flex-aligns-center pe-10 pe-lg-20">
              <OperationProgramLogTable :dataName="''" :opData="creationData"></OperationProgramLogTable>
            </div>
          </div>
        </template>
        <!--begin::Description-->
        <div class="d-flex align-items-center mt-1 fs-6">
          <div class="text-muted me-2 fs-7">
            {{ "Realizado el" }}
            {{ data.created_at ? DateTime.fromISO(data.created_at).setLocale(this.$i18n.locale).toLocaleString() : "" }}
            {{ translate("atTime") }}
            {{
              data.created_at
                ? DateTime.fromISO(data.created_at).setLocale(this.$i18n.locale).toLocaleString(DateTime.TIME_SIMPLE)
                : ""
            }}
          </div>
          <template v-if="data.type === LOG_TYPE.OP_CHANGE_WITH_DEADLINE_UPDATED">
            <div class="badge badge-warning me-2 mb-2">
              {{ translate("deadlinesUpdated") }}
            </div>
          </template>
          {{ translate("by") + "&nbsp;" }}
          <div class="text-primary fw-bolder me-1">{{ userName }}</div>
        </div>
        <!--end::Description-->
      </div>
      <!--end::Timeline details-->
    </div>
    <!--end::Timeline content-->
  </div>
  <!--end::Timeline item-->
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { DateTime } from "luxon";
import { pick } from "lodash";
import OperationProgramLogTable from "@/views/opct/operationprogram/logs/OperationProgramLogTable.vue";

export default defineComponent({
  name: "ChangeOPProcessTimelineMilestone",
  props: ["data"],
  components: { OperationProgramLogTable },
  setup(props) {
    const { t, te } = useI18n();
    const translate = (text) => (te(text) ? t(text) : text);
    const LOG_TYPE = {
      CHANGE_OP_REQUEST_CREATION: "change_op_request_creation",
      CHANGE_OP_REQUEST_UPDATE: "change_op_request_update",
    };

    const userName = computed(() => {
      const creator = props.data.user;
      if (creator) {
        return `${creator.first_name} ${creator.last_name}`;
      }
      return "";
    });
    const creationData = computed(() => {
      let creationData = { ...props.data.new_data };
      const op = props.data.new_data.operation_program;
      creationData.id = props.data.change_op_request.id;
      creationData.operation_program = op.date !== "" ? `${op.date} (${op.type})` : "";

      return creationData;
    });

    return {
      translate,
      DateTime,
      LOG_TYPE,
      userName,
      pick,
      creationData,
    };
  },
});
</script>

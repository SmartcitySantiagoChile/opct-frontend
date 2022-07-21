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
          <template v-if="data.type === LOG_TYPE.OP_CHANGE || data.type === LOG_TYPE.OP_CHANGE_WITH_DEADLINE_UPDATED">
            {{ translate("changeOPInfo") }}
            <span class="badge badge-light-warning fs-4 fw-bolder">
              <template v-if="data.previous_data.date !== ''">
                {{ `${data.previous_data.date} (${data.previous_data.type})` }}
              </template>
              <template v-else>
                {{ translate("withoutAssign") }}
              </template>
            </span>
            {{ translate("to") }}
            <span class="badge badge-light-warning fs-4 fw-bolder">
              <template v-if="data.new_data.date !== ''">
                {{ `${data.new_data.date} (${data.new_data.type})` }}
              </template>
              <template v-else>
                {{ translate("withoutAssign") }}
              </template>
            </span>
          </template>
          <template v-if="data.type === LOG_TYPE.CHANGE_OP_REQUEST_CREATION">
            <span :class="`badge-light-warning`" class="badge fs-4 fw-bolder">
              {{ "Creación de solicitud de modificación" }}
            </span>
          </template>
          <template v-if="data.type === LOG_TYPE.STATUS_CHANGE">
            {{ translate("changeStatusInfo") }}
            <span :class="`badge-light-warning`" class="badge fs-4 fw-bolder">
              {{ data.previous_data.value }}
            </span>
            {{ translate("to") }}
            <span :class="`badge-light-warning`" class="badge fs-4 fw-bolder">
              {{ data.new_data.value }}
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
              <OperationProgramLogTable
                :dataName="''"
                :opData="pick(data.new_data, ['title', 'reason', 'related_routes'])"
              ></OperationProgramLogTable>
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
      OP_CHANGE: "op_change",
      OP_CHANGE_WITH_DEADLINE_UPDATED: "op_change_with_deadline_updated",
      CHANGE_OP_REQUEST_CREATION: "change_op_request_creation",
      STATUS_CHANGE: "status_change",
    };

    const userName = computed(() => {
      const creator = props.data.user;
      if (creator) {
        return `${creator.first_name} ${creator.last_name}`;
      }
      return "";
    });

    return {
      translate,
      DateTime,
      LOG_TYPE,
      userName,
      pick,
    };
  },
});
</script>

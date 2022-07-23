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
              {{ "Creación de solicitud de modificación " + data.change_op_request.id }}
            </span>
          </template>
          <template v-if="data.type === LOG_TYPE.CHANGE_OP_REQUEST_UPDATE">
            <span :class="`badge-light-warning`" class="badge fs-4 fw-bolder">
              {{ "Edición de solicitud de modificación " + data.change_op_request.id }}
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
              <OperationProgramLogTable :dataName="''" :opData="newData"></OperationProgramLogTable>
            </div>
          </div>
        </template>
        <template v-if="data.type === LOG_TYPE.CHANGE_OP_REQUEST_UPDATE">
          <div class="d-flex align-items-center border border-dashed border-gray-300 rounded mb-5">
            <div class="d-flex flex-aligns-center pe-10 pe-lg-20">
              <OperationProgramLogTable :dataName="`previousData`" :opData="previousData"></OperationProgramLogTable>
            </div>
            <div class="d-flex flex-aligns-center pe-10 pe-lg-20">
              <OperationProgramLogTable :dataName="`newData`" :opData="newData"></OperationProgramLogTable>
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
import { pick, isEqual } from "lodash";
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

    const parseData = (data, updatedKeys) => {
      let parsedData = { ...data };
      const op = data.operation_program;
      parsedData.operation_program = op.date !== "" ? `${op.date} (${op.type})` : "";

      return pick(parsedData, updatedKeys);
    };

    const attributesThatChanged = (previousData, newData) => {
      let attributesThatChanged: Array<string> = [];
      const keys = Object.keys(newData);
      keys.forEach((key) => {
        if (!isEqual(previousData[key], newData[key])) {
          attributesThatChanged.push(key);
        }
      });
      return attributesThatChanged;
    };
    const updatedKeys = computed(() => {
      return attributesThatChanged(props.data.previous_data, props.data.new_data);
    });

    const previousData = computed(() => {
      return parseData(props.data.previous_data, updatedKeys.value);
    });

    const newData = computed(() => {
      return parseData(props.data.new_data, updatedKeys.value);
    });

    return {
      translate,
      DateTime,
      LOG_TYPE,
      userName,
      newData,
      previousData,
    };
  },
});
</script>

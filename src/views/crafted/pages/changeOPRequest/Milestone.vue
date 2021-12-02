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
          <template v-if="changeOPRequestTimelineMilestoneLog.new_status">
            <span :class="`badge-light-primary`" class="badge fs-4 fw-bolder">
              {{
                changeOPRequestTimelineMilestoneLog.new_status
                  ? changeOPRequestTimelineMilestoneLog.new_status.name
                  : ""
              }}
            </span>
          </template>
          <template v-if="changeOPRequestTimelineMilestoneLog.new_op">
            <span :class="`badge-light-warning`" class="badge fs-4 fw-bolder">
              {{
                changeOPRequestTimelineMilestoneLog.new_op
                  ? translate("changeOperationProgramTo")
                  : "" + " "
              }}
              {{
                changeOPRequestTimelineMilestoneLog.new_op
                  ? changeOPRequestTimelineMilestoneLog.new_op.start_at.split(
                      "T"
                    )[0]
                  : ""
              }}
            </span>
          </template>
          <template v-if="changeOPRequestTimelineMilestoneLog.time_threshold">
            <span :class="`badge-light-danger`" class="badge fs-4 fw-bolder">
              {{
                changeOPRequestTimelineMilestoneLog.time_threshold
                  ? translate("endOf") +
                    " " +
                    changeOPRequestTimelineMilestoneLog.name
                  : ""
              }}
            </span>
          </template>
        </div>
        <!--end::Title-->
      </div>
      <!--end::Timeline heading-->

      <!--begin::Timeline details-->
      <div class="overflow-auto pb-5">
        <!--begin::Description-->
        <div class="d-flex align-items-center mt-1 fs-6">
          <!--begin::Info-->
          <div class="text-muted me-2 fs-7">
            <template v-if="changeOPRequestTimelineMilestoneLog.time_threshold">
              {{ translate("finishOn") }}
              {{
                changeOPRequestTimelineMilestoneLog.dead_line
                  ? changeOPRequestTimelineMilestoneLog.dead_line.split("T")[0]
                  : ""
              }}
            </template>
            <template
              v-if="
                changeOPRequestTimelineMilestoneLog.new_op ||
                changeOPRequestTimelineMilestoneLog.new_status
              "
            >
              {{ translate("addedAt") }}
              {{
                changeOPRequestTimelineMilestoneLog.created_at
                  ? changeOPRequestTimelineMilestoneLog.created_at.split("T")[0]
                  : ""
              }}
              {{ translate("atTime") }}
              {{
                changeOPRequestTimelineMilestoneLog.created_at
                  ? changeOPRequestTimelineMilestoneLog.created_at
                      .split("T")[1]
                      .split("Z")[0]
                      .split(".")[0]
                  : ""
              }}
            </template>
          </div>
          <!--end::Info-->
        </div>
        <!--end::User-->
        <!--end::Description-->
      </div>
      <!--end::Timeline details-->
    </div>
    <!--end::Timeline content-->
  </div>
  <!--end::Timeline item-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "changeOPRequestTimelineMilestone",
  props: ["changeOPRequestTimelineMilestoneLog"],
  components: {},
  setup() {
    const { t, te } = useI18n();
    const translate = (text) => (te(text) ? t(text) : text);
    return {
      translate,
    };
  },
});
</script>

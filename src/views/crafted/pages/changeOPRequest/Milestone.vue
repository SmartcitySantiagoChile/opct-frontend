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
            {{ translate("changeStatusInfo") }}
            <span :class="`badge-light-primary`" class="badge fs-4 fw-bolder">
              {{ changeOPRequestTimelineMilestoneLog.previous_status.name }}
            </span>
            {{ translate("to") }}
            <span :class="`badge-light-primary`" class="badge fs-4 fw-bolder">
              {{ changeOPRequestTimelineMilestoneLog.new_status.name }}
            </span>
          </template>
          <template
            v-if="
              changeOPRequestTimelineMilestoneLog.previous_op ||
              changeOPRequestTimelineMilestoneLog.new_op
            "
          >
            {{ translate("changeOPInfo") }}
            <span class="badge badge-light-warning fs-4 fw-bolder">
              <template v-if="changeOPRequestTimelineMilestoneLog.previous_op">
                {{
                  changeOPRequestTimelineMilestoneLog.previous_op.start_at.split(
                    "T"
                  )[0]
                }}
                ({{
                  changeOPRequestTimelineMilestoneLog.previous_op.op_type.name
                }})
              </template>
              <template v-else>
                {{ translate("withoutAssign") }}
              </template>
            </span>
            {{ translate("to") }}
            <span class="badge badge-light-warning fs-4 fw-bolder">
              <template v-if="changeOPRequestTimelineMilestoneLog.new_op">
                {{
                  changeOPRequestTimelineMilestoneLog.new_op.start_at.split(
                    "T"
                  )[0]
                }}
                ({{ changeOPRequestTimelineMilestoneLog.new_op.op_type.name }})
              </template>
              <template v-else>
                {{ translate("withoutAssign") }}
              </template>
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
            <!--begin::OPStatusCase-->
            <template v-if="changeOPRequestTimelineMilestoneLog.time_threshold">
              {{ translate("finishOn") }}
              {{
                changeOPRequestTimelineMilestoneLog.dead_line
                  ? changeOPRequestTimelineMilestoneLog.dead_line.split("T")[0]
                  : ""
              }}
              {{ translate("atTime") }} 23:59:59
            </template>
            <!--end::OPStatusCase-->
            <!--begin::ChangeOPCase and ChangeStatusCase-->
            <template
              v-if="
                changeOPRequestTimelineMilestoneLog.new_op ||
                changeOPRequestTimelineMilestoneLog.previous_op ||
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
            <!--end::ChangeOPCase and ChangeStatusCase-->
          </div>
          <!--begin::OPStatus Deadline-->
          <template v-if="changeOPRequestTimelineMilestoneLog.update_deadlines">
            <div class="text-muted me-2 fs-7">
              -
              {{
                changeOPRequestTimelineMilestoneLog.update_deadlines
                  ? translate("deadlinesUpdated")
                  : ""
              }}
            </div>
          </template>
          <!--begin::OPStatus Deadline-->
          <!--end::Info-->
          <!--begin::User-->
          <template v-if="changeOPRequestTimelineMilestoneLog.new_status">
            {{ translate("by") + "&nbsp;" }}
            <a class="text-primary fw-bolder me-1" href="#">
              {{
                changeOPRequestTimelineMilestoneLog.user
                  ? changeOPRequestTimelineMilestoneLog.user.first_name +
                    " " +
                    changeOPRequestTimelineMilestoneLog.user.last_name
                  : ""
              }}
              {{
                changeOPRequestTimelineMilestoneLog.creator
                  ? changeOPRequestTimelineMilestoneLog.creator.first_name +
                    " " +
                    changeOPRequestTimelineMilestoneLog.creator.last_name
                  : ""
              }}
            </a>
          </template>
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

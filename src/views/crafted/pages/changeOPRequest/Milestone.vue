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
          <inline-svg src="/media/icons/duotune/communication/com009.svg"/>
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
          <span :class="`badge-light-success`" class="badge fs-4 fw-bolder">
            {{
              changeOPRequestTimelineMilestoneLog.new_status
                  ? translate("requestChangeStatus")
                  : "" + " "
            }}
            {{
              changeOPRequestTimelineMilestoneLog.new_status
                  ? changeOPRequestTimelineMilestoneLog.new_status.name
                  : ""
            }}
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
        </div>
        <!--end::Title-->
      </div>
      <!--end::Timeline heading-->

      <!--begin::Timeline details-->
      <div class="overflow-auto pb-5">
        <!--begin::Files Record-->
        <!--begin::Description-->
        <div class="d-flex align-items-center mt-1 fs-6">
          <!--begin::Info-->
          <div class="text-muted me-2 fs-7">
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
            {{ translate("by") }}
          </div>
          <!--end::Info-->

          <!--begin::User-->
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
        </div>
        <!--end::User-->
        <!--end::Description-->

        <!--end:: Files Record-->
      </div>
      <!--end::Timeline details-->
    </div>
    <!--end::Timeline content-->
  </div>
  <!--end::Timeline item-->
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useI18n} from "vue-i18n";

export default defineComponent({
  name: "changeOPRequestTimelineMilestone",
  props: ["changeOPRequestTimelineMilestoneLog"],
  components: {},
  setup() {
    const {t, te} = useI18n();
    const translate = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };
    return {
      translate,
    };
  },
});
</script>

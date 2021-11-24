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
          <span
              :class="`badge-light-success`"
              class="badge fs-4 fw-bolder"
          >
          {{
              translate("requestChangeStatus") + " " +
              changeOPRequestTimelineStatusLog.new_status.name
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
          <div class="text-muted me-2 fs-7">{{ translate("addedAt") }}
            {{
              changeOPRequestTimelineStatusLog.created_at ?
                  changeOPRequestTimelineStatusLog.created_at.split("T")[0] : ""
            }} {{ translate("atTime") }}
            {{
              changeOPRequestTimelineStatusLog.created_at ?
                  changeOPRequestTimelineStatusLog.created_at.split("T")[1].split("Z")[0] : ""
            }} {{ translate("by") }}
          </div>
          <!--end::Info-->

          <!--begin::User-->
          <a href="#" class="text-primary fw-bolder me-1">

            {{
              changeOPRequestTimelineStatusLog.user ? changeOPRequestTimelineStatusLog.user.first_name + " " + changeOPRequestTimelineStatusLog.user.last_name : ""
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
import {computed, defineComponent} from "vue";
import {useI18n} from "vue-i18n";

export default defineComponent({
  name: "changeOPRequestTimelineMilestone",
  props: ["changeOPRequestTimelineStatusLog"],
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
      translate
    };
  },
});
</script>

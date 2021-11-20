<template>
  <!--begin::Timeline-->
  <div class="card">
    <!--begin::Card head-->
    <div class="card-header card-header-stretch">
      <!--begin::Title-->
      <div class="card-title d-flex align-items-center">
        <span class="svg-icon svg-icon-1 svg-icon-primary me-3 lh-0">
          <inline-svg src="/media/icons/duotune/general/gen014.svg"/>
        </span>
        <h3 class="fw-bolder m-0 text-gray-800">
          {{ changeOPRequest.created_at ? changeOPRequest.created_at.split("T")[0] : "" }}</h3>
      </div>
      <!--end::Title-->
      <!--end::Toolbar-->
    </div>
    <!--end::Card head-->

    <!--begin::Card body-->
    <div class="card-body">
      <!--begin::Tab Content-->
      <div class="tab-content">
        <!--begin::Tab panel-->
        <div
            id="kt_activity_today"
            class="card-body p-0 tab-pane fade show active"
            role="tabpanel"
            aria-labelledby="kt_activity_today_tab"
        >
          <!--begin::Timeline-->
          <div class="timeline">
            <ChangeOPRequestTimelineHeader v-bind:header-data="changeOPRequest"></ChangeOPRequestTimelineHeader>
            <KTActivityItem1></KTActivityItem1>
            <KTActivityItem2></KTActivityItem2>
            <KTActivityItem3></KTActivityItem3>
            <KTActivityItem4></KTActivityItem4>
            <KTActivityItem5></KTActivityItem5>
            <KTActivityItem6></KTActivityItem6>
            <KTActivityItem7></KTActivityItem7>
            <KTActivityItem8></KTActivityItem8>
          </div>
          <!--end::Timeline-->
        </div>
        <!--end::Tab panel-->

        <!--begin::Tab panel-->
        <!--end::Tab panel-->
      </div>
      <!--end::Tab Content-->
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Timeline-->
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import KTActivityItem1 from "@/layout/header/partials/activity-timeline/Item1.vue";
import KTActivityItem2 from "@/layout/header/partials/activity-timeline/Item2.vue";
import KTActivityItem3 from "@/layout/header/partials/activity-timeline/Item3.vue";
import KTActivityItem4 from "@/layout/header/partials/activity-timeline/Item4.vue";
import KTActivityItem5 from "@/layout/header/partials/activity-timeline/Item5.vue";
import KTActivityItem6 from "@/layout/header/partials/activity-timeline/Item6.vue";
import KTActivityItem7 from "@/layout/header/partials/activity-timeline/Item7.vue";
import KTActivityItem8 from "@/layout/header/partials/activity-timeline/Item8.vue";
import ChangeOPRequestTimelineHeader from "@/views/crafted/pages/changeOPRequest/ChangeOPRequestTimelineHeader.vue";
export default defineComponent({
  name: "changeOPRequestActivity",
  props: ['changeOPRequest', 'id'],
  components: {
    KTActivityItem1,
    KTActivityItem2,
    KTActivityItem3,
    KTActivityItem4,
    KTActivityItem5,
    KTActivityItem6,
    KTActivityItem7,
    KTActivityItem8,
    ChangeOPRequestTimelineHeader
  },
});
</script>

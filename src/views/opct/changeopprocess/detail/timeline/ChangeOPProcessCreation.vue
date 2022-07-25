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
          <span :class="`badge-light-dark`" class="badge fs-4 fw-bolder">
            {{ `Creación de proceso de modificación` }}
          </span>
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
          <!--end::Info-->
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

export default defineComponent({
  name: "ChangeOPProcessTimelineMilestone",
  props: ["data"],
  setup(props) {
    const { t, te } = useI18n();
    const translate = (text) => (te(text) ? t(text) : text);

    const userName = computed(() => {
      const creator = props.data.creator;
      if (creator) {
        return `${creator.first_name} ${creator.last_name}`;
      }
      return "";
    });

    return {
      translate,
      DateTime,
      userName,
    };
  },
});
</script>

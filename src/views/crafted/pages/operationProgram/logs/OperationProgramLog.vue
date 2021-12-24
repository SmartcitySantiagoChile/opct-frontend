<template>
  <!--begin::ChangeOPRequestTimelineMessage item-->
  <div class="timeline-item">
    <!--begin::Timeline line-->
    <div class="timeline-line w-40px"></div>
    <!--end::Timeline line-->

    <!--begin::Timeline icon-->
    <div class="timeline-icon symbol symbol-circle symbol-40px me-4">
      <div class="symbol-label bg-light">
        <span class="svg-icon svg-icon-2 svg-icon-gray-500">
          <inline-svg src="/media/icons/duotune/communication/com003.svg"/>
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
          {{
            translate("dataChange")
          }}
        </div>
        <!--end::Title-->
      </div>
      <!--end::Timeline heading-->

      <!--begin::Timeline details-->
      <div class="overflow-auto pb-5">
        <!--begin::Files Record-->
        <template v-if="changeOPDataLog.created_at">
          <div
              class="
              d-flex
              align-items-center
              border border-dashed border-gray-300
              rounded
              px-7
              py-3
              mb-5
            "
          >
            <!--begin::Item-->
            <template v-if="changeOPDataLog.previous_data">
            <div class="d-flex flex-aligns-center pe-10 pe-lg-20">
            <OperationProgramLogTable :dataName="`previousData`" :opData="changeOPDataLog.previous_data"></OperationProgramLogTable>
              <!--begin::Info-->
            </div>
            </template>
            <!--end::Item-->

            <!--begin::Item-->
            <template v-if="changeOPDataLog.new_data">
            <div class="d-flex flex-aligns-center pe-10 pe-lg-20">

              <!--begin::Info-->
              <div class="ms-1 fw-bold">
                <OperationProgramLogTable :dataName="`newData`" :opData="changeOPDataLog.new_data"></OperationProgramLogTable>
              </div>
              <!--begin::Info-->
            </div>
            </template>
            <!--end::Item-->
          </div>
        </template>
        <!--begin::Description-->
        <div class="d-flex align-items-center mt-1 fs-6">
          <!--begin::Info-->
          <!--
                    <div class="text-muted me-2 fs-7">
                      {{ translate("addedAt") }}
                      {{
                        changeOpRequestTimelineMessage.created_at
                          ? DateTime.fromISO(changeOpRequestTimelineMessage.created_at)
                              .setLocale(this.$i18n.locale)
                              .toLocaleString()
                          : ""
                      }}
                      {{ translate("atTime") }}
                      {{
                        changeOpRequestTimelineMessage.created_at
                          ? DateTime.fromISO(changeOpRequestTimelineMessage.created_at)
                              .setLocale(this.$i18n.locale)
                              .toLocaleString(DateTime.TIME_SIMPLE)
                          : ""
                      }}
                      {{ translate("by") }}
                    </div>-->
          <!--end::Info-->

          <!--begin::User-->
          <div class="text-muted me-2 fs-7">
            {{ translate("addedAt") }}
            {{
              changeOPDataLog.created_at
                  ? DateTime.fromISO(changeOPDataLog.created_at)
                      .setLocale(this.$i18n.locale)
                      .toLocaleString()
                  : ""
            }}
            {{ translate("atTime") }}
            {{
              changeOPDataLog.created_at
                  ? DateTime.fromISO(changeOPDataLog.created_at)
                      .setLocale(this.$i18n.locale)
                      .toLocaleString(DateTime.TIME_SIMPLE)
                  : ""
            }}

            {{ translate("by") }}
          </div>
          <a class="text-primary fw-bolder me-1" href="#">
            {{
              changeOPDataLog.user
                  ? changeOPDataLog.user.first_name + " " + changeOPDataLog.user.last_name
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
import {DateTime} from "luxon";
import OperationProgramLogTable from "@/components/widgets/tables/OperationProgramLogTable.vue";
export default defineComponent({
  name: "operationProgramLog",
  props: ["changeOpRequestTimelineMessage", "changeOPDataLog"],
  components: {OperationProgramLogTable},
  setup() {
    const {t, te} = useI18n();
    const translate = (text) => (te(text) ? t(text) : text);
    return {
      translate,
      DateTime,
    };
  },
});
</script>

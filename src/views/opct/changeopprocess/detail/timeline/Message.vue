<template>
  <!--begin::ChangeOPProcessTimelineMessage item-->
  <div class="timeline-item">
    <!--begin::Timeline line-->
    <div class="timeline-line w-40px"></div>
    <!--end::Timeline line-->

    <!--begin::Timeline icon-->
    <div class="timeline-icon symbol symbol-circle symbol-40px me-4">
      <div class="symbol-label bg-light">
        <span class="svg-icon svg-icon-2 svg-icon-gray-500">
          <inline-svg src="/media/icons/duotune/communication/com003.svg" />
        </span>
      </div>
    </div>
    <!--end::Timeline icon-->

    <!--begin::Timeline content-->
    <div class="timeline-content mb-10 mt-n1">
      <!--begin::Timeline heading-->
      <div class="pe-3 mb-5">
        <!--begin::Title-->
        <div class="fs-5 fw-bold mb-2">{{ changeOPProcessTimelineMessage.message }}</div>
        <!--end::Title-->
      </div>
      <!--end::Timeline heading-->

      <!--begin::Timeline details-->
      <div class="overflow-auto pb-5">
        <!--begin::Files Record-->
        <template v-if="files.length > 0">
          <div
            class="d-flex align-items-center border border-dashed border-gray-300 rounded min-w-750px px-7 py-3 mb-5"
          >
            <template v-for="(item, index) in files" :key="index">
              <!--begin::Item-->
              <div class="d-flex flex-aligns-center pe-10 pe-lg-20">
                <!--begin::Icon-->
                <img alt="" class="w-30px me-3" :src="`/media/svg/files/${item.extension}.svg`" />
                <!--end::Icon-->

                <!--begin::Info-->
                <div class="ms-1 fw-bold">
                  <!--begin::Desc-->
                  <a :download="item.filename" :href="item.file" class="fs-6 text-hover-primary fw-bolder"
                    >{{ item.filename }}
                  </a>
                  <!--end::Desc-->
                  <!--begin::Number-->
                  <div class="text-gray-400">{{ (item.size / 1048576).toFixed(2) }} MB</div>
                  <!--end::Number-->
                </div>
                <!--begin::Info-->
              </div>
              <!--end::Item-->
            </template>
            <!--end::Action-->
          </div>
        </template>
        <!--end:: Files Record-->
        <!--begin::Description-->
        <div class="d-flex align-items-center mt-1 fs-6">
          <!--begin::Info-->
          <div class="text-muted me-2 fs-7">
            {{ translate("addedAt") }}
            {{
              changeOPProcessTimelineMessage.created_at
                ? DateTime.fromISO(changeOPProcessTimelineMessage.created_at)
                    .setLocale(this.$i18n.locale)
                    .toLocaleString()
                : ""
            }}
            {{ translate("atTime") }}
            {{
              changeOPProcessTimelineMessage.created_at
                ? DateTime.fromISO(changeOPProcessTimelineMessage.created_at)
                    .setLocale(this.$i18n.locale)
                    .toLocaleString(DateTime.TIME_SIMPLE)
                : ""
            }}
            {{ translate("by") }}
          </div>
          <!--end::Info-->

          <!--begin::User-->
          <div class="text-primary fw-bolder me-1">{{ userName }}</div>
          <!--end::User-->
          <div v-if="changeOPProcessTimelineMessage.related_requests.length > 1" class="text-muted me-2 fs-7">
            relacionado a las solicitudes:
          </div>
          <div v-else class="text-muted me-2 fs-7">relacionado a la solicitud:</div>

          <template v-for="(item, index) in changeOPProcessTimelineMessage.related_requests" :key="index">
            <el-popover placement="top-start" title="" :width="400" trigger="hover">
              <template #reference>
                <span class="badge badge-primary me-2 mb-2">
                  {{ `${item.id}` }}
                </span>
              </template>
              <table class="table table-row-dashed">
                <thead></thead>
                <tbody>
                  <tr>
                    <td>ID:</td>
                    <td>{{ item.id }}</td>
                  </tr>
                  <tr>
                    <td>Título:</td>
                    <td>{{ item.title }}</td>
                  </tr>
                  <tr>
                    <td>Motivo:</td>
                    <td>{{ item.get_reason_display }}</td>
                  </tr>
                  <tr>
                    <td>Servicios relacionados:</td>
                    <td>{{ item.related_routes.join(", ") }}</td>
                  </tr>
                  <tr>
                    <td>Programa de operación:</td>
                    <td>{{ item.operation_program ? item.operation_program : "" }}</td>
                  </tr>
                </tbody>
              </table>
            </el-popover>
          </template>
        </div>
        <!--end::Description-->
      </div>
      <!--end::Timeline details-->
    </div>
    <!--end::Timeline content-->
  </div>
  <!--end::ChangeOPProcessTimelineMessage item-->
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { DateTime } from "luxon";

export default defineComponent({
  name: "ChangeOPProcessTimelineMessage",
  props: ["changeOPProcessTimelineMessage"],
  components: {},
  setup(props) {
    const { t, te } = useI18n();
    const translate = (text) => (te(text) ? t(text) : text);
    const getExtension = (extension) => {
      if (["xls", "xlsm"].indexOf(extension) !== -1) {
        return "xls";
      } else if (["ai", "css", "csv", "pdf", "ppt", "sql", "tif", "xml", "zip"].indexOf(extension) === -1) {
        return "doc";
      } else {
        return extension;
      }
    };
    const files = computed(() => {
      if (props.changeOPProcessTimelineMessage.change_op_process_message_files) {
        const files = props.changeOPProcessTimelineMessage.change_op_process_message_files.map((el) => {
          el.extension = getExtension(el.extension);
          return el;
        });
        return files;
      }
      return [];
    });
    const userName = computed(() => {
      const creator = props.changeOPProcessTimelineMessage.creator;
      if (creator) {
        return `${creator.first_name} ${creator.last_name}`;
      }
      return "";
    });

    return {
      translate,
      DateTime,
      files,
      userName,
    };
  },
});
</script>

<template>
  <!--begin::Reply-->
  <div class="border">
    <div :class="widgetClasses" class="card">
      <!--begin::Body-->
      <div class="card-body pb-0">
        <!--begin::Header-->
        <div class="d-flex align-items-center">
          <!--begin::User-->
          <div class="d-flex align-items-center flex-grow-1">
            <!--begin::Avatar-->
            <div class="symbol symbol-50px">
              <div
                  class="
                  symbol-label
                  fs-2
                  fw-bold
                  bg-primary
                  text-inverse-primary
                "
              >
                {{ userNameAndSurname ? userNameAndSurname.split("")[0] : "" }}
              </div>
            </div>
            <!--end::Avatar-->

            <!--begin::Info-->
            <div class="d-flex flex-column">
              <a
                  class="text-gray-800 text-hover-primary px-3 fs-6 fw-bolder"
                  href="#"
              >{{ userNameAndSurname }}</a
              >
            </div>
            <!--end::Info-->
          </div>
          <!--end::User-->
        </div>
        <!--end::Header-->

        <!--begin::Form-->
        <form id="reply_form" class="ql-quil ql-quil-plain pb-3">
          <!--begin::Editor-->
          <div id="reply_editor" class="py-6"></div>

          <!--end::Editor-->

          <div class="separator"></div>

          <!--begin::Toolbar-->
          <div id="reply_toolbar" class="ql-toolbar d-flex flex-stack py-2">
            <div class="me-2">
              <span class="ql-formats ql-size ms-0">
                <select class="ql-size w-75px"></select>
              </span>

              <span class="ql-formats">
                <button class="ql-bold"></button>
                <button class="ql-italic"></button>
                <button class="ql-underline"></button>
                <button class="ql-strike"></button>
                <span class="btn btn-icon btn-sm btn-active-color-primary pe-0 me-2">
                  <span class="svg-icon svg-icon-3 mb-3">
                    <inline-svg
                      src="/media/icons/duotune/communication/com008.svg"/>
                  </span>
                </span>
                <span class="btn btn-icon btn-sm btn-active-color-primary pe-0 me-2">
                  <span class="svg-icon svg-icon-2 mb-3">
                    <inline-svg src="/media/icons/duotune/general/gen016.svg"/>
                  </span>
                </span>
              </span>
            </div>

          </div>
          <!--end::Toolbar-->
        </form>
        <!--end::Form-->
      </div>
      <!--end::Body-->
    </div>
    <!--end::Feeds Widget 1-->
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted} from "vue";
import Quill from "quill/dist/quill.js";
import {useStore} from "vuex";
import {useI18n} from "vue-i18n";

export default defineComponent({
  name: "reply",
  props: {
    widgetClasses: String,
  },

  setup() {
    const {t, te} = useI18n();
    const translate = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };
    const store = useStore();
    const userNameAndSurname = computed(() => {
      return store.getters.currentUserNameAndSurname;
    });
    onMounted(() => {
      const editorId = "reply_editor";

      // init editor
      const options = {
        modules: {
          toolbar: {
            container: "#reply_toolbar",
          },
        },
        placeholder: translate("writeReply"),
        theme: "snow",
      };

      // Init editor
      const quillEditor = new Quill("#" + editorId, options);
    });
    return {
      userNameAndSurname,
      translate,
    };
  },
});
</script>

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
          <div
            id="reply_toolbar"
            class="ql-toolbar d-flex flex-stack py-2"
          ></div>
          <el-upload
            :auto-upload="false"
            :file-list="fileList"
            :on-change="handleChange"
            action=""
          >
            <template #trigger>
              <el-button size="small" type="primary">{{
                translate("attachFiles")
              }}</el-button>
            </template>
            <el-button
              size="small"
              style="margin-left: 10px"
              type="primary"
              @click="createMessage"
            >
              {{ translate("send") }}
            </el-button>
          </el-upload>
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
import { computed, defineComponent, onMounted, ref } from "vue";
import Quill from "quill/dist/quill.js";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.min.js";

export default defineComponent({
  name: "reply",
  props: {
    widgetClasses: String,
  },
  setup() {
    const { t, te } = useI18n();
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
    let fileList = ref([]);
    const createMessage = () => {
      const container = document.querySelector("#reply_editor");
      const quill = Quill.find(container);
      const text = quill.getText();
      //let files = fileList.value.map((file) => {});
      console.log(fileList);
      const params = {
        created_at: new Date().toISOString(),
        message: text,
        creator: store.getters.currentUserUrl,
        change_op_request: store.getters.getCurrentChangeOPRequestUrl,
      };
      store
        .dispatch(Actions.CREATE_CHANGE_OP_REQUEST_MESSAGE, params)
        .then(function () {
          Swal.fire({
            text: translate("messageSuccess"),
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: translate("continue"),
            customClass: {
              confirmButton: "btn fw-bold btn-light-success",
            },
            allowOutsideClick: false,
          }).then(() => location.reload());
        })
        .catch(() => {
          Swal.fire({
            text: store.getters.getChangeOPRequestMessageErrors.map((error) => {
              return `${translate(error[0])} : ${translate(error[1])}`;
            }),
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: translate("tryAgain"),
            customClass: {
              confirmButton: "btn fw-bold btn-light-danger",
            },
          });
        });
    };
    const handleChange = (file, fileListData) => {
      fileList = fileListData;
    };
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
      new Quill("#" + editorId, options);
    });
    return {
      userNameAndSurname,
      fileList,
      handleChange,
      createMessage,
      translate,
    };
  },
});
</script>

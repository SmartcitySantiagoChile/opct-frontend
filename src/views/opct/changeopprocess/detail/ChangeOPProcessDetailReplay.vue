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
              <div class="symbol-label fs-2 fw-bold bg-primary text-inverse-primary">
                {{ userNameAndSurname ? userNameAndSurname.split("")[0] : "" }}
              </div>
            </div>
            <!--end::Avatar-->

            <!--begin::Info-->
            <div class="d-flex flex-column">
              <a class="text-gray-800 text-hover-primary px-3 fs-6 fw-bolder" href="#">{{ userNameAndSurname }}</a>
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
          <div id="reply_toolbar" class="ql-toolbar d-flex flex-stack py-2"></div>
          <el-upload
            :auto-upload="false"
            :file-list="fileList"
            :on-change="handleChange"
            action=""
            multiple=""
            :limit="5"
            ref="uploader"
          >
            <template #trigger>
              <el-button size="small" type="primary">{{ translate("attachFiles") }}</el-button>
            </template>
            <el-button size="small" style="margin-left: 10px" type="primary" @click="createMessage">
              {{ translate("send") }}
            </el-button>
            <template #tip>
              <div class="el-upload__tip">
                {{ translate("attachFilesHelp") }}
              </div>
            </template>
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
import { computed, defineComponent, nextTick, onMounted, ref } from "vue";
import Quill from "quill/dist/quill.js";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.min.js";

export default defineComponent({
  name: "ChangeOPProcessDetailReplay",
  props: {
    changeOPProcess: {
      type: Object,
      required: true,
    },
    widgetClasses: String,
  },
  setup(props, { emit }) {
    const { t, te } = useI18n();
    const translate = (text) => (te(text) ? t(text) : text);
    const store = useStore();
    const userNameAndSurname = computed(() => {
      return store.getters.currentUserNameAndSurname;
    });
    let fileList = [];
    const uploader = ref();

    const createMessage = () => {
      const container = document.querySelector("#reply_editor");
      const quill = Quill.find(container);
      const text = quill.getText();
      let formData = new FormData();
      fileList.forEach((file) => {
        const file_raw = file["raw"];
        formData.append("files", file_raw, file["name"]);
      });

      formData.append("created_at", new Date().toISOString());
      formData.append("message", text);
      formData.append("creator", store.getters.currentUserUrl);
      formData.append("change_op_process", store.getters.getCurrentChangeOPProcessUrl);
      const messageParams = {
        url: props.changeOPProcess.url,
        payload: {
          params: formData,
          headers: {
            "content-Type": "multipart/form-data",
          },
        },
      };

      Swal.fire({
        title: translate("confirmMessageInsert"),
        icon: "info",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: translate("save"),
        cancelButtonText: translate("cancel"),
      }).then((result) => {
        if (result.isConfirmed) {
          store
            .dispatch(Actions.CHANGE_OP_PROCESSES.ADD_MESSAGE, messageParams)
            .then(function () {
              Swal.fire({
                text: translate("messageSuccess"),
                icon: "success",
                showConfirmButton: false,
                timer: 1000,
                allowOutsideClick: false,
              })
                .then(() => emit("message-added"))
                .then(() => {
                  uploader.value.clearFiles();
                  quill.setContents([{ insert: "\n" }]);
                  nextTick(() => {
                    setTimeout(function () {
                      //uploader.value.scrollIntoView({ behavior: "smooth" });
                      window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
                    }, 500);
                  });
                });
            })
            .catch(() => {
              Swal.fire({
                text: store.getters.getChangeOPProcessMessageErrors.map((error) => {
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
        } else if (result.isDenied) {
          console.log("canceled");
        }
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
      uploader,
    };
  },
});
</script>

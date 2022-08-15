<template>
  <!--begin::Reply-->
  <div class="border">
    <div :class="widgetClasses" class="card">
      <!--begin::Body-->
      <div class="card-body pb-0">
        <!--begin::Header-->
        <div class="d-flex align-items-center">
          <!--begin::User-->
          <div class="d-flex align-items-center flex-grow-1 pb-2">
            <!--begin::Avatar-->
            <div class="symbol symbol-50px">
              <div class="symbol-label fs-2 fw-bold bg-primary text-inverse-primary">
                {{ userNameAndSurname ? userNameAndSurname.split("")[0] : "" }}
              </div>
            </div>
            <!--end::Avatar-->

            <!--begin::Info-->
            <div class="d-flex flex-column">
              <div class="text-gray-800 px-3 fs-6 fw-bolder">{{ userNameAndSurname }}</div>
            </div>
            <!--end::Info-->
          </div>
          <!--end::User-->
        </div>
        <!--end::Header-->

        <!--begin::Form-->
        <form id="reply_form" class="ql-quil ql-quil-plain pb-3">
          <!--begin::Toolbar-->
          <div class="card-footer pt-4" id="kt_chat_messenger_footer">
            <!--begin::Editor-->
            <div id="reply_editor" class="py-6 form-control form-control-flush mb-3 bg-light-primary rounded-3"></div>
            <!--end::Editor-->
            <!--begin:Toolbar-->
            <div id="reply_toolbar" class="ql-toolbar d-flex flex-stack py-2"></div>
            <div class="d-flex flex-stack">
              <!--begin::Actions-->
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
                  <el-button size="small" type="primary"> {{ translate("attachFiles") }}</el-button>
                </template>
                <template #tip>
                  <div class="el-upload__tip">
                    {{ translate("attachFilesHelp") }}
                  </div>
                </template>
              </el-upload>
              <div>
                <label for="exampleFormControlInput1" class="required"
                  >Solicitudes de modificación relacionadas al mensaje</label
                ><br />
                <el-select
                  v-model="related_requests"
                  multiple
                  filterable
                  collapse-tags
                  collapse-tags-tooltip
                  :placeholder="translate('selectPlaceholder')"
                >
                  <el-option
                    v-for="option in relatedRequestsOptions"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <!--end::Actions-->
              <!--begin::Send-->
              <button class="btn btn-primary" type="button" data-kt-element="send" @click="createMessage">
                {{ translate("send") }}
              </button>
              <!--end::Send-->
            </div>
            <!--end::Toolbar-->
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
import { computed, defineComponent, nextTick, onMounted, ref, Ref } from "vue";
import Quill from "quill/dist/quill.js";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { SelectOption } from "@/typings/globals";

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
    let related_requests: Ref<Array<number>> = ref([]);
    const uploader = ref();
    const relatedRequestsOptions = computed(() => {
      const requests = store.getters.getCurrentChangeOPProcessRequests;
      let options: Array<SelectOption> = [];
      if (requests && requests.length) {
        requests.forEach((request) => {
          options.push({ value: request.id, label: `(${request.id}) ${request.title}` });
        });
      }
      return options;
    });

    const createMessage = () => {
      const container = document.querySelector("#reply_editor");
      const quill = Quill.find(container);
      let quillContent: string = quill.getText();
      if (quillContent === "\n") {
        quillContent = "";
      }
      let formData = new FormData();
      fileList.forEach((file) => {
        const file_raw = file["raw"];
        formData.append("files", file_raw, file["name"]);
      });
      formData.append("message", quillContent);
      let related_requests_to_send: Array<string> = [];
      related_requests.value.forEach((el) => {
        related_requests_to_send.push(el.toString());
      });
      formData.append("related_requests", JSON.stringify(related_requests_to_send));
      formData.append("change_op_process", store.getters.getCurrentChangeOPProcessUrl);
      const messageParams = {
        resource: props.changeOPProcess.id,
        payload: {
          params: formData,
          headers: {
            "content-Type": "multipart/form-data",
          },
        },
      };

      Swal.fire({
        title: translate("confirmMessageInsert"),
        icon: "question",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: translate("save"),
        cancelButtonText: translate("cancel"),
      }).then((result) => {
        if (result.isConfirmed) {
          store
            .dispatch(Actions.CHANGE_OP_PROCESSES.ADD_MESSAGE, messageParams)
            .then(() => {
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
                  fileList = [];
                  quill.setContents([{ insert: "\r\n" }]);
                  related_requests.value = [];
                  nextTick(() => {
                    setTimeout(function () {
                      //uploader.value.scrollIntoView({ behavior: "smooth" });
                      window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
                    }, 500);
                  });
                });
            })
            .catch((data) => {
              Swal.fire({
                text: data[0],
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

      store.dispatch(Actions.ROUTE_DEFINITIONS.LIST);
    });

    return {
      userNameAndSurname,
      fileList,
      handleChange,
      createMessage,
      translate,
      uploader,
      relatedRequestsOptions,
      related_requests,
    };
  },
});
</script>

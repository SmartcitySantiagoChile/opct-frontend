<template>
  <!--begin::Modal - Create Change OP Request-->
  <span class="card-label fw-bolder fs-3 me-3">
    <a
      id="kt_toolbar_primary_button"
      class="btn btn-success"
      data-bs-target="#modal_create_change_op_request"
      data-bs-toggle="modal"
      href="#"
    >
      {{ translate("createOperationProgram") }}
    </a>
  </span>
  <div
    id="modal_create_change_op_request"
    ref="createOperationProgramModalRef"
    aria-hidden="true"
    class="modal fade"
    tabindex="-1"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-900px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header">
          <!--begin::Modal title-->
          <h2>{{ translate("createOperationProgram") }}</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="/media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body py-lg-10 px-lg-10">
          <!--begin::Stepper-->
          <div
            id="modal_create_change_op_request_stepper"
            ref="createChangeOPRef"
            class="
              stepper stepper-pills stepper-column
              d-flex
              flex-column flex-xl-row flex-row-fluid
            "
          >
            <!--begin::Aside-->
            <div
              class="
                d-flex
                justify-content-center justify-content-xl-start
                flex-row-auto
                w-100 w-xl-300px
              "
            >
              <!--begin::Nav-->
              <div class="stepper-nav ps-lg-10">
                <!--begin::Step 1-->
                <div class="stepper-item current" data-kt-stepper-element="nav">
                  <!--begin::Line-->
                  <div class="stepper-line w-40px"></div>
                  <!--end::Line-->

                  <!--begin::Icon-->
                  <div class="stepper-icon w-40px h-40px">
                    <i class="stepper-check fas fa-check"></i>
                    <span class="stepper-number">1</span>
                  </div>
                  <!--end::Icon-->

                  <!--begin::Label-->
                  <div class="stepper-label">
                    <h3 class="stepper-title">
                      {{ translate("initialInformation") }}
                    </h3>

                    <div class="stepper-desc">
                      {{ translate("operationProgramDate") }}
                    </div>
                  </div>
                  <!--end::Label-->
                </div>
                <!--end::Step 1-->

                <!--begin::Step 2-->
                <div class="stepper-item" data-kt-stepper-element="nav">
                  <!--begin::Line-->
                  <div class="stepper-line w-40px"></div>
                  <!--end::Line-->

                  <!--begin::Icon-->
                  <div class="stepper-icon w-40px h-40px">
                    <i class="stepper-check fas fa-check"></i>
                    <span class="stepper-number">2</span>
                  </div>
                  <!--end::Icon-->

                  <!--begin::Label-->
                  <div class="stepper-label">
                    <h3 class="stepper-title">
                      {{ translate("operationProgramType") }}
                    </h3>
                  </div>
                  <!--begin::Label-->
                </div>
                <!--end::Step 2-->

                <!--begin::Step 4-->
                <div class="stepper-item" data-kt-stepper-element="nav">
                  <!--begin::Line-->
                  <div class="stepper-line w-40px"></div>
                  <!--end::Line-->

                  <!--begin::Icon-->
                  <div class="stepper-icon w-40px h-40px">
                    <i class="stepper-check fas fa-check"></i>
                    <span class="stepper-number">4</span>
                  </div>
                  <!--end::Icon-->

                  <!--begin::Label-->
                  <div class="stepper-label">
                    <h3 class="stepper-title">
                      {{ translate("confirmation") }}
                    </h3>

                    <div class="stepper-desc">
                      {{ translate("confirmationInfo") }}
                    </div>
                  </div>
                  <!--end::Label-->
                </div>
                <!--end::Step 4-->
              </div>
              <!--end::Nav-->
            </div>
            <!--begin::Aside-->

            <!--begin::Content-->
            <div class="flex-row-fluid py-lg-5 px-lg-15">
              <!--begin::Form-->
              <form
                id="modal_create_change_op_request_form"
                class="form"
                novalidate="novalidate"
                @submit="handleStep"
              >
                <!--begin::Step 1-->
                <div class="current" data-kt-stepper-element="content">
                  <div class="w-100">
                    <!--begin::Input group-->
                    <div class="fv-row mb-10">
                      <!--begin::Label-->
                      <label
                        class="d-flex align-items-center fs-5 fw-bold mb-2"
                      >
                        <span class="required">{{ translate("date") }}</span>
                        <i
                          :title="`${translate('date')}`"
                          class="fas fa-exclamation-circle ms-2 fs-7"
                          data-bs-toggle="tooltip"
                        ></i>
                      </label>
                      <!--end::Label-->

                      <!--begin::Input-->
                      <Field
                        class="form-control form-control-lg form-control-solid"
                        name="date"
                        placeholder=""
                        type="date"
                      />
                      <ErrorMessage
                        class="fv-plugins-message-container invalid-feedback"
                        name="date"
                      />
                      <!--end::Input-->
                    </div>
                    <!--end::Input group-->
                  </div>
                </div>
                <!--end::Step 1-->

                <!--begin::Step 2-->
                <div data-kt-stepper-element="content">
                  <div class="w-100">
                    <!--begin::Input group-->
                    <div class="row mb-10">
                      <!--begin::Col-->
                      <div class="col-md-8 fv-row">
                        <!--begin::Label-->
                        <label class="required fs-6 fw-bold form-label mb-2">{{
                          translate("operationProgramType")
                        }}</label>
                        <!--end::Label-->

                        <!--begin::Row-->
                        <div class="row fv-row">
                          <!--begin::Col-->
                          <select
                            id="operationProgramType"
                            class="
                              form-select form-select-solid
                              select2-hidden-accessible
                              selected
                            "
                          >
                            <option
                              v-for="i in operationProgramTypeOptions"
                              :key="i.value"
                              :label="i.label"
                              :value="i.value"
                            ></option>
                          </select>
                          <!--end::Col-->
                        </div>
                        <!--end::Row-->
                      </div>
                      <!--end::Col-->
                    </div>
                    <!--end::Input group-->
                  </div>
                </div>
                <!--end::Step 2-->

                <!--begin::Step 4-->
                <div data-kt-stepper-element="content">
                  <div class="w-100 text-center">
                    <!--begin::Heading-->
                    <h1 class="fw-bolder text-dark mb-3">
                      {{ translate("confirmData") }}
                    </h1>
                    <!--end::Heading-->

                    <!--begin::Description-->
                    <table
                      class="
                        table
                        align-middle
                        table-rounded table-striped
                        border
                      "
                    >
                      <tbody>
                        <template
                          v-for="(item, index) in formDataInfo"
                          :key="index"
                        >
                          <tr>
                            <th>
                              <b>{{ translate(index) }}</b>
                            </th>
                            <th>
                              {{ item }}
                            </th>
                          </tr>
                        </template>
                      </tbody>
                    </table>
                    <!--end::Description-->

                    <!--begin::Illustration-->
                    <div class="text-center px-4 py-15">
                      <img
                        alt=""
                        class="w-100 mh-300px"
                        src="/media/illustrations/sketchy-1/9.png"
                      />
                    </div>
                    <!--end::Illustration-->
                  </div>
                </div>
                <!--end::Step 5-->

                <!--begin::Actions-->
                <div class="d-flex flex-stack pt-10">
                  <!--begin::Wrapper-->
                  <div class="me-2">
                    <button
                      class="btn btn-lg btn-light-primary me-3"
                      data-kt-stepper-action="previous"
                      type="button"
                      @click="previousStep()"
                    >
                      <span class="svg-icon svg-icon-3 me-1">
                        <inline-svg
                          src="/media/icons/duotune/arrows/arr063.svg"
                        />
                      </span>
                      {{ translate("back") }}
                    </button>
                  </div>
                  <!--end::Wrapper-->

                  <!--begin::Wrapper-->
                  <div>
                    <button
                      v-if="currentStepIndex === totalSteps - 1"
                      class="btn btn-lg btn-primary"
                      type="submit"
                      @click="formSubmit()"
                    >
                      <span class="indicator-label">
                        {{ translate("create") }}
                        <span class="svg-icon svg-icon-3 ms-2 me-0">
                          <inline-svg
                            src="/media/icons/duotune/arrows/arr064.svg"
                          />
                        </span>
                      </span>
                      <span class="indicator-progress">
                        {{ translate("pleaseWait") }}
                        <span
                          class="
                            spinner-border spinner-border-sm
                            align-middle
                            ms-2
                          "
                        ></span>
                      </span>
                    </button>

                    <button v-else class="btn btn-lg btn-primary" type="submit">
                      {{ translate("continue") }}
                      <span class="svg-icon svg-icon-3 ms-1 me-0">
                        <inline-svg
                          src="/media/icons/duotune/arrows/arr064.svg"
                        />
                      </span>
                    </button>
                  </div>
                  <!--end::Wrapper-->
                </div>
                <!--end::Actions-->
              </form>
              <!--end::Form-->
            </div>
            <!--end::Content-->
          </div>
          <!--end::Stepper-->
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!--end::Modal - Create App-->
</template>

<style lang="scss" scoped>
.el-input--suffix .el-input__inner {
  background-color: #f5f8fa;
}

.el-input__inner {
  background-color: #f5f8fa;
}
</style>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { StepperComponent } from "@/assets/ts/components/_StepperComponent";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { ErrorMessage, Field, useForm } from "vee-validate";
import * as Yup from "yup";
import { hideModal } from "@/core/helpers/dom";
import { useI18n } from "vue-i18n";
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";

interface Step1 {
  date: string;
}

interface Step2 {
  operationProgramType: string;
}

interface KTCreateApp extends Step1, Step2 {}

export default defineComponent({
  name: "CreateOperationProgram",
  components: {
    Field,
    ErrorMessage,
  },
  setup() {
    const _stepperObj = ref<StepperComponent | null>(null);
    const createChangeOPRef = ref<HTMLElement | null>(null);
    const createAppModalRef = ref<HTMLElement | null>(null);
    const currentStepIndex = ref(0);
    const { t, te } = useI18n();
    const translate = (text) => (te(text) ? t(text) : text);
    const store = useStore();
    store.dispatch(Actions.GET_OPERATION_PROGRAM_TYPES);

    const operationProgramTypeOptions = computed(() => {
      let options: Array<any> = [];
      const operationProgramTypes: Array<any> =
        store.getters.getCurrentOperationProgramTypes;
      if (operationProgramTypes.length) {
        operationProgramTypes.forEach((v) => {
          options.push({
            value: v.url,
            label: v.name,
          });
        });
      }
      return options;
    });

    const formData = ref<KTCreateApp>({
      date: "",
      operationProgramType: "1",
    });
    const formDataInfo = ref<KTCreateApp>({
      date: "",
      operationProgramType: "1",
    });

    onMounted(() => {
      _stepperObj.value = StepperComponent.createInsance(
        createChangeOPRef.value as HTMLElement
      );
    });

    const createAppSchema = [
      Yup.object({
        date: Yup.string().required(translate("dateRequired")).label("Date"),
      }),
      Yup.object({
        operationProgramType: Yup.string()
          .required()
          .label("operationProgramTYpe"),
      }),
    ];

    // extracts the individual step schema
    const currentSchema = computed(() => {
      return createAppSchema[currentStepIndex.value];
    });

    const totalSteps = computed(() => {
      if (!_stepperObj.value) {
        return;
      }

      return _stepperObj.value.totatStepsNumber;
    });

    const { resetForm, handleSubmit } = useForm<Step1 | Step2>({
      validationSchema: currentSchema,
    });

    const previousStep = () => {
      if (!_stepperObj.value) {
        return;
      }

      currentStepIndex.value--;

      _stepperObj.value.goPrev();
    };

    const handleStep = handleSubmit((values) => {
      formData.value = {
        ...formData.value,
        ...values,
      };

      formDataInfo.value["date"] = formData.value["date"];

      const operationProgramTypeSelector: HTMLSelectElement =
        document.querySelector("#operationProgramType") as HTMLSelectElement;
      if (operationProgramTypeSelector) {
        formData.value["operationProgramType"] =
          operationProgramTypeSelector.value;
        formDataInfo.value["operationProgramType"] =
          operationProgramTypeSelector.options[
            operationProgramTypeSelector.selectedIndex
          ].label;
      }
      currentStepIndex.value++;

      if (!_stepperObj.value) {
        return;
      }

      _stepperObj.value.goNext();
    });

    const formSubmit = () => {
      const params = {
        start_at: formData.value["date"],
        op_type: formData.value["operationProgramType"],
      };

      store
        .dispatch(Actions.CREATE_OPERATION_PROGRAM, params)
        .then(() => {
          Swal.fire({
            text: translate("createOperationProgramSuccess"),
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: translate("confirm"),
            customClass: {
              confirmButton: "btn fw-bold btn-light-primary",
            },
          })
            .then(() => {
              hideModal(createAppModalRef.value);
            })
            .then(() => location.reload());
        })
        .catch(() => {
          const errors = store.getters.getCurrentOperationProgramErrors;
          const parsedErrors = Object.entries(errors).map((key) => {
            return `<b>${translate(key[0])}</b>: ${translate(key[1])}<br><br>`;
          });
          Swal.fire({
            icon: "error",
            html: parsedErrors.join(""),
            buttonsStyling: false,
            confirmButtonText: translate("tryAgain"),
            customClass: {
              confirmButton: "btn fw-bold btn-light-danger",
            },
          });
        });
    };

    resetForm({
      values: {
        ...formData.value,
      },
    });

    return {
      handleStep,
      formSubmit,
      previousStep,
      createChangeOPRef,
      currentStepIndex,
      totalSteps,
      createAppModalRef,
      translate,
      formData,
      operationProgramTypeOptions,
      formDataInfo,
    };
  },
});
</script>

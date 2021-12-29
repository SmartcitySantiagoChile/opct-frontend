<template>
  <!--begin::Wrapper-->
  <div class="w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto">
    <!--begin::Form-->
    <Form
      class="form w-100"
      id="kt_login_signin_form"
      @submit="onSubmitLogin"
      :validation-schema="login"
    >
      <!--begin::Heading-->
      <div class="text-center mb-10">
        <!--begin::Title-->
        <h1 class="text-dark mb-3">Inicie Sesión en OPCT</h1>
        <!--end::Title-->

        <!--begin::Link-->

        <div class="text-gray-400 fw-bold fs-4">
          <router-link to="/sign-up" class="link-primary fw-bolder">
            {{ t("createAccount") }}
          </router-link>
        </div>
        <!--end::Link-->
      </div>
      <!--begin::Heading-->
      <!--
      <div class="mb-10 bg-light-info p-8 rounded">
        <div class="text-info">
          Use account <strong>admin@demo.com</strong> and password
          <strong>demo</strong> to continue.
        </div>
      </div>
      -->
      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="form-label fs-6 fw-bolder text-dark">{{
          t("email")
        }}</label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          class="form-control form-control-lg form-control-solid"
          type="text"
          name="email"
          autocomplete="off"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="email" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Wrapper-->
        <div class="d-flex flex-stack mb-2">
          <!--begin::Label-->
          <label class="form-label fw-bolder text-dark fs-6 mb-0">{{
            t("password")
          }}</label>
          <!--end::Label-->

          <!--begin::Link-->
          <router-link to="/password-reset" class="link-primary fs-6 fw-bolder">
            {{ t("forgotPassword") }}
          </router-link>
          <!--end::Link-->
        </div>
        <!--end::Wrapper-->

        <!--begin::Input-->
        <Field
          class="form-control form-control-lg form-control-solid"
          type="password"
          name="password"
          autocomplete="off"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="password" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="text-center">
        <!--begin::Submit button-->
        <button
          type="submit"
          ref="submitButton"
          id="kt_sign_in_submit"
          class="btn btn-lg btn-primary w-100 mb-5"
        >
          <span class="indicator-label"> {{ t("continue") }} </span>

          <span class="indicator-progress">
            {{ t("pleaseWait") }}
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
        <!--end::Submit button-->
        <!--begin::Separator-->
        <!--
        <div class="text-center text-muted text-uppercase fw-bolder mb-5">
          or
        </div>
        -->
        <!--end::Separator-->

        <!--begin::Google link-->
        <!--
        <a
          href="#"
          class="btn btn-flex flex-center btn-light btn-lg w-100 mb-5"
        >
          <img
            alt="Logo"
            src="/media/svg/brand-logos/google-icon.svg"
            class="h-20px me-3"
          />
          Continue with Google
        </a>
        -->
        <!--end::Google link-->

        <!--begin::Google link-->
        <!--
        <a
          href="#"
          class="btn btn-flex flex-center btn-light btn-lg w-100 mb-5"
        >
          <img
            alt="Logo"
            src="/media/svg/brand-logos/facebook-4.svg"
            class="h-20px me-3"
          />
          Continue with Facebook
        </a>
        -->
        <!--end::Google link-->

        <!--begin::Google link-->
        <!--
        <a href="#" class="btn btn-flex flex-center btn-light btn-lg w-100">
          <img
            alt="Logo"
            src="/media/svg/brand-logos/apple-black.svg"
            class="h-20px me-3"
          />
          Continue with Apple
        </a>
        -->
        <!--end::Google link-->
      </div>
      <!--end::Actions-->
    </Form>
    <!--end::Form-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import * as Yup from "yup";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "sign-in",
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const submitButton = ref<HTMLElement | null>(null);
    const { t, te } = useI18n();
    const translate = (text) => (te(text) ? t(text) : text);

    //Create form validation object
    const login = Yup.object().shape({
      email: Yup.string().email().required().label("Email"),
      password: Yup.string().min(4).required().label("Password"),
    });

    //Form submit function
    const onSubmitLogin = (values) => {
      // Clear existing errors
      store.dispatch(Actions.LOGOUT);

      if (submitButton.value) {
        // Activate indicator
        submitButton.value.setAttribute("data-kt-indicator", "on");
      }

      // Dummy delay
      setTimeout(() => {
        // Send login request
        store
          .dispatch(Actions.LOGIN, values)
          .then(function () {
            // Go to page after successfully login
            router.push({ name: "dashboard" });
          })
          .catch(() => {
            const errors = store.getters.getErrors;
            const parsedErrors = Object.entries(errors).map((key) => {
              return `<b>${translate(key[0])}</b>: ${translate(
                key[1]
              )}<br><br>`;
            });
            Swal.fire({
              html: parsedErrors.join(""),
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "¡Intente nuevamente!",
              customClass: {
                confirmButton: "btn fw-bold btn-light-danger",
              },
            });
          });

        //Deactivate indicator
        submitButton.value?.removeAttribute("data-kt-indicator");
      }, 1000);
    };

    return {
      onSubmitLogin,
      login,
      submitButton,
      t,
    };
  },
});
</script>

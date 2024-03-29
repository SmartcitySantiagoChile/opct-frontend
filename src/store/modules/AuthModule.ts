import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import { Dictionary } from "@/store/modules/HelperModule";
import { Organization } from "@/store/modules/OrganizationModule";

export interface User {
  url: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  token: string;
  organization: Organization;
  role: string;
  access_to_ops: boolean;
  access_to_organizations: boolean;
  access_to_users: boolean;
  access_to_upload_route_dictionary: boolean;
}

export interface UserAuthInfo {
  errors: Dictionary<string>;
  user: User;
  isAuthenticated: boolean;
}

@Module
export default class AuthModule extends VuexModule implements UserAuthInfo {
  errors = {};
  user = {} as User;
  isAuthenticated = !!JwtService.getToken();

  /**
   * Get current user object
   * @returns User
   */
  get currentUser(): User {
    return this.user;
  }

  /**
   * Get current user name and surname
   * @returns string
   */
  get currentUserNameAndSurname(): string {
    return `${this.user.first_name} ${this.user.last_name}`;
  }

  /**
   * Get if current user has access to OPs
   * @returns string
   */
  get currentUserHasOPsAccess(): boolean {
    return this.user.access_to_ops;
  }

  /**
   * Get if current user has access to users
   * @returns string
   */
  get currentUserHasUsersAccess(): boolean {
    return this.user.access_to_users;
  }

  /**
   * Get if current user has access to organizations
   * @returns string
   */
  get currentUserHasOrganizationsAccess(): boolean {
    return this.user.access_to_organizations;
  }

  /**
   * Get if current user has access to upload route dictionary
   * @returns string
   */
  get currentUserHasAccessToUploadRouteDictionary(): boolean {
    return this.user.access_to_upload_route_dictionary;
  }

  /**
   * Get current user email
   * @returns string
   */
  get currentUserEmail(): string {
    return this.user.email;
  }

  /**
   * Get current user url
   * @returns string
   */
  get currentUserUrl(): string {
    return this.user.url;
  }

  /**
   * Verify user authentication
   * @returns boolean
   */
  get isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  /**
   * Get authentication errors
   * @returns Dictionary
   */
  get getErrors(): Dictionary<string> {
    return this.errors;
  }

  /**
   * Returns true if organization can change counterpart
   * @returns boolean
   */
  get hasChangeStatusOption(): boolean {
    return this.user.organization ? this.user.organization.can_change_counterpart : false;
  }

  /**
   * Returns organization name  1Q
   * @returns boolean
   */
  get getOrganizationName(): string {
    return this.user.organization.name;
  }

  @Mutation
  [Mutations.SET_ERROR](error) {
    this.errors = error;
  }

  @Mutation
  [Mutations.SET_AUTH](user) {
    this.isAuthenticated = true;
    this.user = user;
    this.errors = [];
    JwtService.saveToken(this.user.token);
  }

  @Mutation
  [Mutations.SET_USER](user) {
    this.user = user;
  }

  @Mutation
  [Mutations.SET_PASSWORD](password) {
    this.user.password = password;
  }

  @Mutation
  [Mutations.PURGE_AUTH]() {
    this.isAuthenticated = false;
    this.user = {} as User;
    this.errors = [];
    JwtService.destroyToken();
  }

  @Action({ rawError: true })
  [Actions.USERS.LOGIN](credentials) {
    return new Promise<void>((resolve, reject) => {
      ApiService.post("login", credentials)
        .then(({ data }) => {
          this.context.commit(Mutations.SET_AUTH, data);
          resolve();
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR, response.data);
          reject();
        });
    });
  }

  @Action({ rawError: true })
  [Actions.USERS.LOGOUT]() {
    this.context.commit(Mutations.PURGE_AUTH);
  }

  @Action({ rawError: true })
  [Actions.USERS.REGISTER](credentials) {
    return new Promise<void>((resolve, reject) => {
      ApiService.post("registration", credentials)
        .then(({ data }) => {
          this.context.commit(Mutations.SET_AUTH, data);
          resolve();
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR, response.data);
          reject();
        });
    });
  }

  @Action({ rawError: true })
  [Actions.USERS.FORGOT_PASSWORD](payload) {
    return new Promise<void>((resolve, reject) => {
      ApiService.post("forgot_password", payload)
        .then(({ data }) => {
          this.context.commit(Mutations.SET_AUTH, data);
          resolve();
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR, response.data.errors);
          reject();
        });
    });
  }

  @Action({ rawError: true })
  [Actions.USERS.VERIFY_AUTH]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      return ApiService.get("verify")
        .then(({ data }) => {
          this.context.commit(Mutations.SET_AUTH, data);
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR, response.data.error);
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }

  @Action({ rawError: true })
  [Actions.USERS.UPDATE](payload) {
    ApiService.setHeader();
    return new Promise<void>((resolve, reject) => {
      ApiService.post("update_user", payload)
        .then(({ data }) => {
          this.context.commit(Mutations.SET_USER, data);
          resolve();
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR, response.data.errors);
          reject();
        });
    });
  }
}

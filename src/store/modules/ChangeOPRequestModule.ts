import ApiService from "@/core/services/ApiService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { Dictionary } from "@/store/modules/HelperModule";

export interface ChangeOPRequestReasons {
  options: Array<Array<string>>;
}

export interface RouteDefinition {
  auth_route_code: string;
  user_route_code: string;
}

export interface RouteDefinitions {
  options: Array<RouteDefinition>;
}

export interface ChangeOPRequest {
  url: string;
  created_at: string;
  title: string;
  message: string;
  updated_at: string;
  reason: string;
  op_release_date: string;
  creator: Dictionary<string>;
  op: Dictionary<string>;
  status: Dictionary<string>;
  counterpart: Dictionary<string>;
  contract_type: Dictionary<string>;
  change_op_request_files: Array<any>;
  change_op_request_message: Array<any>;
  op_change_logs: Array<any>;
  status_logs: Array<any>;
  related_requests: Array<any>;
}

export interface ChangeOPRequestInfo {
  errors: Dictionary<string>;
  changeOPRequest: ChangeOPRequest;
  reasons: ChangeOPRequestReasons;
}

@Module
export default class ChangeOPRequestModule extends VuexModule implements ChangeOPRequestInfo {
  errors = {};
  changeOPRequest = {} as ChangeOPRequest;
  reasons = {} as ChangeOPRequestReasons;
  routeDefinitions = {} as RouteDefinitions;

  /**
   * Get change op request errors
   * @returns di
   */
  get getChangeOPRequestErrors(): Dictionary<string> {
    return this.errors;
  }

  /**
   * Get current change op request
   * @returns ChangeOPRequest
   */
  get getCurrentChangeOPRequest(): ChangeOPRequest {
    return this.changeOPRequest;
  }

  /**
   * Get current change op request url
   * @returns string
   */
  get getCurrentChangeOPRequestUrl(): string {
    return this.changeOPRequest.url;
  }

  /**
   * Get current change op request op
   * @returns string
   */
  get getCurrentChangeOPRequestOP(): string {
    return this.changeOPRequest.op ? this.changeOPRequest.op.start_at : "";
  }

  /**
   * Get current change op request id
   * @returns string
   */
  get getCurrentChangeOPRequestId(): string {
    if (this.changeOPRequest.url) {
      const IdArray: Array<string> = this.changeOPRequest.url.split("/");
      IdArray.pop();
      return IdArray.pop() as string;
    } else {
      return "";
    }
  }

  /**
   * Get current change op request title
   * @returns string
   */
  get getCurrentChangeOPRequestTitle(): string {
    return this.changeOPRequest.title;
  }

  /**
   * Get current change op request contract type name
   * @returns string
   */
  get getCurrentChangeOPRequestContractTypeName(): string {
    return this.changeOPRequest.contract_type ? this.changeOPRequest.contract_type.name : "";
  }

  /**
   * Get current change op request contract type name
   * @returns Dictionary
   */
  get getCurrentChangeOPRequestStatus(): Dictionary<string> {
    return this.changeOPRequest.status;
  }

  /**
   * Get current change op request release date
   * @returns string
   */
  get getCurrentChangeOPRequestReleaseDate(): string {
    return this.changeOPRequest.op_release_date;
  }

  /**
   * Get all change op request reasons
   * @returns string
   */
  get getChangeOPRequestReason(): ChangeOPRequestReasons {
    return this.reasons;
  }

  /**
   * Get all change op request related requests
   * @returns Array<any>
   */
  get getChangeOPRequestRelatedRequests(): Array<any> {
    return this.changeOPRequest.related_requests;
  }

  /**
   * Get all route definitions
   * @returns RouteDefinitions
   */
  get getAllRouteDefinitions(): RouteDefinitions {
    return this.routeDefinitions;
  }

  @Mutation
  [Mutations.SET_CHANGE_OP_REQUEST](changeOPRequest) {
    this.changeOPRequest = changeOPRequest;
  }

  @Mutation
  [Mutations.SET_CHANGE_OP_REQUEST_REASONS](changeOPRequestReasons) {
    this.reasons = changeOPRequestReasons.options;
  }

  @Mutation
  [Mutations.SET_CREATE_CHANGE_OP_REQUEST_ERRORS](errors) {
    this.errors = errors;
  }

  @Mutation
  [Mutations.SET_ROUTE_DEFINITIONS](routeDefinitions) {
    this.routeDefinitions = routeDefinitions;
  }

  @Mutation
  [Mutations.SET_ROUTE_DEFINITIONS_ERROR](errors) {
    this.errors = errors;
  }

  @Action
  [Actions.GET_CHANGE_OP_REQUEST](changeOPRequestId) {
    ApiService.get("change-op-requests", changeOPRequestId)
      .then(({ data }) => {
        this.context.commit(Mutations.SET_CHANGE_OP_REQUEST, data);
      })
      .catch(({ response }) => {
        console.log(response);
        this.context.commit(Mutations.SET_CREATE_CHANGE_OP_REQUEST_ERRORS, [response.data.error]);
      });
  }

  @Action
  [Actions.CREATE_CHANGE_OP_REQUEST](params) {
    return new Promise<void>((resolve, reject) => {
      ApiService.postWithFiles("change-op-requests/", params)
        .then(({ data }) => {
          resolve();
        })
        .catch(({ response }) => {
          console.log(response);
          this.context.commit(Mutations.SET_CREATE_CHANGE_OP_REQUEST_ERRORS, response.data);
          reject();
        });
    });
  }

  @Action
  [Actions.CHANGE_CHANGE_OP_REQUEST_STATUS](data) {
    return new Promise<void>((resolve, reject) => {
      ApiService.put(`change-op-requests/${data.resource}/change-status/`, data.params)
        .then(({ data }) => {
          resolve();
        })
        .catch(({ response }) => {
          console.log(response);
          this.context.commit(Mutations.SET_CREATE_CHANGE_OP_REQUEST_ERRORS, [response.data.error]);
          reject();
        });
    });
  }

  @Action
  [Actions.CHANGE_CHANGE_OP_REQUEST_REASON](data) {
    return new Promise<void>((resolve, reject) => {
      ApiService.put(`change-op-requests/${data.resource}/change-reason/`, data.params)
        .then(({ data }) => {
          resolve();
        })
        .catch(({ response }) => {
          console.log(response);
          this.context.commit(Mutations.SET_CREATE_CHANGE_OP_REQUEST_ERRORS, [response.data.error]);
          reject();
        });
    });
  }

  @Action
  [Actions.CHANGE_CHANGE_OP_REQUEST_OP](data) {
    return new Promise<void>((resolve, reject) => {
      ApiService.put(`change-op-requests/${data.resource}/change-op/`, data.params)
        .then(({ data }) => {
          resolve();
        })
        .catch(({ response }) => {
          console.log(response);
          this.context.commit(Mutations.SET_CREATE_CHANGE_OP_REQUEST_ERRORS, [response.data.error]);
          reject();
        });
    });
  }

  @Action
  [Actions.GET_CHANGE_OP_REQUEST_REASONS]() {
    return ApiService.get("change-op-request-reasons")
      .then(({ data }) => {
        this.context.commit(Mutations.SET_CHANGE_OP_REQUEST_REASONS, data);
      })
      .catch(({ response }) => {
        console.log(response);
        this.context.commit(Mutations.SET_CREATE_CHANGE_OP_REQUEST_ERRORS, [response.data.error]);
      });
  }

  @Action
  [Actions.CHANGE_CHANGE_OP_REQUEST_RELATED_REQUESTS](data) {
    return new Promise<void>((resolve, reject) => {
      ApiService.put(`change-op-requests/${data.resource}/change-related-requests/`, data.params)
        .then(({ data }) => {
          console.log(data);
          resolve();
        })
        .catch(({ response }) => {
          console.log(response);
          this.context.commit(Mutations.SET_CREATE_CHANGE_OP_REQUEST_ERRORS, [response.data.error]);
          reject();
        });
    });
  }

  @Action
  [Actions.GET_ROUTE_DEFINITIONS]() {
    return ApiService.get("route-definitions")
      .then(({ data }) => {
        this.context.commit(Mutations.SET_ROUTE_DEFINITIONS, data);
      })
      .catch(({ response }) => {
        console.log(response);
        this.context.commit(Mutations.SET_ROUTE_DEFINITIONS_ERROR, [response.data.error]);
      });
  }
}

import ApiService from "@/core/services/ApiService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { Dictionary } from "@/store/modules/HelperModule";

export interface ChangeOPProcessMessage {
  url: string;
  created_at: string;
  message: string;
  creator: Dictionary<string>;
  change_op_request: string;
  change_op_request_message_files: Dictionary<string>;
}

export interface ChangeOPProcessMessageInfo {
  errors: Array<any>;
  changeOPProcessMessage: ChangeOPProcessMessage;
}

@Module
export default class ChangeOPProcessMessageModule extends VuexModule implements ChangeOPProcessMessageInfo {
  errors = [] as Array<any>;
  changeOPProcessMessage = {} as ChangeOPProcessMessage;

  /**
   * Get change op request errors
   * @returns array
   */
  get getChangeOPProcessMessageErrors(): Array<string> {
    return this.errors;
  }

  /**
   * Get current change op request
   * @returns ChangeOPRequest
   */
  get getCurrentChangeOPProcessMessage(): ChangeOPProcessMessage {
    return this.changeOPProcessMessage;
  }

  @Mutation
  [Mutations.SET_CHANGE_OP_PROCESS_MESSAGE_ERROR](error) {
    this.errors = Object.entries(error);
  }

  @Action
  [Actions.CREATE_CHANGE_OP_PROCESS_MESSAGE](params) {
    console.log(params);
    return new Promise<void>((resolve, reject) => {
      ApiService.postWithFiles("change-op-process-messages/", params)
        .then(({ data }) => {
          console.log(data);
          resolve();
        })
        .catch(({ response }) => {
          console.log(response);
          this.context.commit(
            Mutations.SET_CHANGE_OP_PROCESS_MESSAGE_ERROR,
            response.data
          );
          reject();
        });
    });
  }
}

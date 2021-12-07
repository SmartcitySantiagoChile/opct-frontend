import ApiService from "@/core/services/ApiService";
import {Actions, Mutations} from "@/store/enums/StoreEnums";
import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {Dictionary} from "@/store/modules/HelperModule";

export interface ChangeOPRequestMessage {
    url: string;
    created_at: string;
    message: string;
    creator: Dictionary<string>;
    change_op_request: string;
    change_op_request_message_files: Dictionary<string>;

}

export interface ChangeOPRequestMessageInfo {
    errors: Array<any>;
    changeOPRequestMessage: ChangeOPRequestMessage;
}

@Module
export default class ChangeOPRequestMessageModule extends VuexModule implements ChangeOPRequestMessageInfo {
    errors = [] as Array<any>;
    changeOPRequestMessage = {} as ChangeOPRequestMessage;

    /**
     * Get change op request errors
     * @returns array
     */
    get getChangeOPRequestMessageErrors(): Array<string> {
        return this.errors;
    }

    /**
     * Get current change op request
     * @returns ChangeOPRequest
     */
    get getCurrentChangeOPRequestMessage(): ChangeOPRequestMessage {
        return this.changeOPRequestMessage;
    }

    @Mutation
    [Mutations.SET_CHANGE_OP_REQUEST_MESSAGE_ERROR](error) {
        this.errors = Object.entries(error);
    }

    @Action
    [Actions.CREATE_CHANGE_OP_REQUEST_MESSAGE](params) {
        return new Promise<void>((resolve, reject) => {
            ApiService.postWithFiles("change-op-request-messages/", params)
                .then(({data}) => {
                    console.log(data);
                    resolve()
                })
                .catch(({response}) => {
                    console.log(response);
                    this.context.commit(Mutations.SET_CHANGE_OP_REQUEST_MESSAGE_ERROR, response.data);
                    reject()
                });
        });
    }
}

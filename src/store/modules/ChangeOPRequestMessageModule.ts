import ApiService from "@/core/services/ApiService";
import {Actions, Mutations} from "@/store/enums/StoreEnums";
import {Action, Module, VuexModule} from "vuex-module-decorators";
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
    errors: Array<string>;
    changeOPRequestMessage: ChangeOPRequestMessage;
}

@Module
export default class ChangeOPRequestMessageModule extends VuexModule implements ChangeOPRequestMessageInfo {
    errors = [];
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

    @Action
    [Actions.SEND_CHANGE_OP_REQUEST_MESSAGE](params) {
        return new Promise<void>((resolve, reject) => {
            ApiService.post("change-op-request-messages", params)
                .then(({data}) => {
                    console.log("");
                })
                .catch(({response}) => {
                    console.log(response);
                    this.context.commit(Mutations.SET_ERROR, [response.data.error]);
                });
        });
    }
}

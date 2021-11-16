import ApiService from "@/core/services/ApiService";
import {Actions, Mutations} from "@/store/enums/StoreEnums";
import {Module, Action, Mutation, VuexModule} from "vuex-module-decorators";
import {Dictionary} from "@/store/modules/HelperModule";



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
}

export interface ChangeOPRequestInfo {
    errors: Array<string>;
    changeOPRequest: ChangeOPRequest;
}

@Module
export default class ChangeOPRequestModule extends VuexModule implements ChangeOPRequestInfo {
    errors = [];
    changeOPRequest = {} as ChangeOPRequest;

    /**
     * Get change op request errors
     * @returns array
     */
    get getChangeOPRequestErrors(): Array<string> {
        return this.errors;
    }

    /**
     * Get current change op request
     * @returns ChangeOPRequest
     */
    get getCurrentChangeOPRequest(): ChangeOPRequest {
        return this.changeOPRequest;
    }

    @Mutation
    [Mutations.SET_CHANGE_OP_REQUEST](changeOPRequest) {
        this.changeOPRequest = changeOPRequest[0];
    }


    @Action
    [Actions.GET_CHANGE_OP_REQUEST](changeOPRequestId) {
        ApiService.get("change-op-requests", changeOPRequestId)
            .then(({data}) => {
                this.context.commit(Mutations.SET_CHANGE_OP_REQUEST, data);
            })
            .catch(({response}) => {
                console.log(response);
                this.context.commit(Mutations.SET_ERROR, [response.data.error]);
            });
    }
}

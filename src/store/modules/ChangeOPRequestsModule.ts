import ApiService from "@/core/services/ApiService";
import {Actions, Mutations} from "@/store/enums/StoreEnums";
import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import ChangeOPRequest from "@/store/modules/ChangeOPRequestModule";

export interface ChangeOPRequestsInfo {
    errors: Array<string>;
    changeOPRequests: Array<ChangeOPRequest>;
    count: number;
    next: string;
    previous: string;
}

@Module
export default class ChangeOPRequestsModule extends VuexModule implements ChangeOPRequestsInfo {
    errors = [];
    changeOPRequests =  [] as ChangeOPRequest[] ;
    count = 0;
    next = "";
    previous = "";


    /**
     * Get change op requests errors
     * @returns array
     */
    get getChangeOPRequestsErrors(): Array<string> {
        return this.errors;
    }

    /**
     * Get current change op requests
     * @returns ChangeOPRequest[]
     */
    get getCurrentChangeOPRequests(): ChangeOPRequest[] {
        return this.changeOPRequests;
    }

    /**
     * Get current change op requests count
     * @returns number
     */
    get getCurrentChangeOPRequestsCount(): number{
        return this.count;
    }



    @Mutation
    [Mutations.SET_CHANGE_OP_REQUESTS](changeOPRequestList) {
        this.changeOPRequests = changeOPRequestList.results;
        this.count = changeOPRequestList.count;
        this.next = changeOPRequestList.next;
        this.previous = changeOPRequestList.previous;
    }

    @Mutation
    [Mutations.SET_CHANGE_OP_REQUESTS_ERRORS](changeOPRequestList) {
        this.errors = changeOPRequestList.errors;
    }

    @Action
    [Actions.GET_CHANGE_OP_REQUESTS]() {
        ApiService.get("change-op-requests")
            .then(({data}) => {
                this.context.commit(Mutations.SET_CHANGE_OP_REQUESTS, data);
            })
            .catch(({response}) => {
                this.context.commit(Mutations.SET_CHANGE_OP_REQUESTS_ERRORS, [response.data.error]);
            });
    }

    @Action
    [Actions.GET_CHANGE_OP_REQUESTS_BY_OP](op_data) {
        ApiService.query("change-op-requests", {params: {search: op_data }})
            .then(({data}) => {
                this.context.commit(Mutations.SET_CHANGE_OP_REQUESTS, data);
            })
            .catch(({response}) => {
                this.context.commit(Mutations.SET_CHANGE_OP_REQUESTS_ERRORS, [response.data.error]);
            });
    }
}

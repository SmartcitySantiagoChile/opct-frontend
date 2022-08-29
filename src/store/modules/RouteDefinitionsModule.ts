import ApiService from "@/core/services/ApiService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

export interface RouteDefinition {
  ts_code: string;
}

export interface RouteDefinitions {
  routeDefinitions: Array<RouteDefinition>;
}

@Module
export default class RouteDefinitionsModule extends VuexModule implements RouteDefinitions {
  routeDefinitions = [] as RouteDefinition[];

  /**
   * Get all route definitions
   * @returns array
   */
  get getRouteDefinitions(): Array<RouteDefinition> {
    return this.routeDefinitions;
  }

  @Mutation
  [Mutations.SET_ROUTE_DEFINITIONS](routeDefinitions) {
    this.routeDefinitions = routeDefinitions;
  }

  @Action({ rawError: true })
  [Actions.ROUTE_DEFINITIONS.LIST]() {
    return ApiService.get("route-definitions")
      .then(({ data }) => {
        this.context.commit(Mutations.SET_ROUTE_DEFINITIONS, data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  }

  @Action({ rawError: true })
  [Actions.ROUTE_DEFINITIONS.BULK_UPDATE](params) {
    return new Promise<void>((resolve, reject) => {
      ApiService.postWithFiles("route-definitions/update-definitions/", params)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

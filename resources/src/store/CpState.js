// import { observable } from 'mobx-vue';
import { action, observable } from 'mobx';

export default class CpState {
  @observable environments = [];

  @observable dbTables = [];

  @observable skipTables = [];

  @action.bound setEnvironments(environments) {
    this.environments = environments;
  }

  @action.bound setDbTables(tables) {
    this.dbTables = tables;
  }

  @action.bound setSkipTables(tables) {
    this.skipTables = tables;
  }

  @action.bound addSkipTable(table) {
    this.skipTables = [...this.skipTables, table];
  }

  @action.bound removeSkipTable(table) {
    this.skipTables = this.skipTables.filter(existingTable => existingTable != table);
  }
}

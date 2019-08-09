// import { observable } from 'mobx-vue';
import { action, observable, computed, toJS } from 'mobx';

export default class CpState {
  @observable environments = [];

  @observable environmentAccordionHide = {};

  @observable dbTables = [];

  @observable skipTables = [];

  /**
   * Actions for environments
   */

  @action.bound setEnvironments(environments) {
    this.environments = environments.map(env => {
      env.uid = window.Craft.randomString(24);
      return env;
    });
    environments.forEach(env => {
      this.environmentAccordionHide[env.uid] = false;
    });
  }

  @action.bound addEnvironment() {
    const uid = window.Craft.randomString(24);
    this.environments = [
      ...this.environments,
      {
        name: 'new',
        pgDumpPath: '/usr/bin/pg_dump',
        mysqlDumpPath: '/usr/bin/mysqldump',
        phpPath: '/usr/bin/php',
        uid,
      },
    ];
    this.toggleEnvironmentAccordion(uid);
  }

  @action.bound removeEnvironment(uid) {
    this.environments = this.environments.filter(env => env.uid !== uid);
  }

  @action.bound toggleEnvironmentAccordion(uid) {
    this.environmentAccordionHide[uid] = !this.environmentAccordionHide[uid];
    console.log(this.dump);
  }

  /**
   * Actions for database tables
   */

  @action.bound setDbTables(tables) {
    this.dbTables = tables;
  }

  /**
   * Actions for skip tables
   */
  @action.bound setSkipTables(tables) {
    this.skipTables = tables;
  }

  @action.bound addSkipTable(table) {
    console.log(table);
    this.skipTables = [...this.skipTables, table];
  }

  @action.bound removeSkipTable(table) {
    this.skipTables = this.skipTables.filter(
      existingTable => existingTable != table,
    );
  }

  /** Debug */
  @computed get dump() {
    return {
      skipTables: toJS(this.skipTables),
      environmentAccordionHide: toJS(this.environmentAccordionHide),
      environments: toJS(this.environments),
    };
  }
}

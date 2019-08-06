import {
    action,
    observable
} from 'mobx';

export default class EnvironmentsModel {
    @observable environments = [];

    @action.bound setEnvironments(envs) {
        const obj = envs;
        const environments = [];
        Object.keys(obj).forEach((name, i) => {
            let mysqlDefault = false;
            if (obj[name].mysqlDumpPath !== undefined) {
                mysqlDefault = true;
            }
            const env = Object.assign({}, {
                ...obj[name],
                name,
                mysqlDefault
            });
            environments.push(env);
        });
        this.environments = environments;
    }

    @action.bound addEnvironment() {
        this.environments = [...this.environments, {}];
    }

    @action.bound removeEnvironment(index) {
        this.environments = [...this.environments.splice(0, index), ...this.environments.splice(index+1, 1)];
    }
};
<template>
    <div>
        <div>Environments</div>
        <div><button @click="addEnvironment">Add</button></div>
        <div v-for="(environment, i) in state.environments" :key="i" class="environment">
            <button @click="e => removeEnvironment(e, i)">Remove</button>
            <!-- Name -->
            <div class="field">
                <div class="heading">
                    <label>Name</label>
                </div>
                <div class="input">
                    <input v-model="environment.name"/>
                </div>
            </div>

            <!-- Environment -->
            <div class="field">
                <div class="heading">
                    <label>Environment</label>
                </div>
                <div class="input">
                    <select v-model="environment.environment">
                        <option value="production">Production</option>
                        <option value="staging">Staging</option>
                        <option value="development">Development</option>
                    </select>
                </div>
            </div>

            <!-- Verbosity -->
            <div class="field">
                <div class="heading">
                    <label>Verbosity</label>
                </div>
                <div class="input">
                    <select v-model="environment.verbosity">
                        <option value="16">Quiet</option>
                        <option value="32">Info</option>
                        <option value="64">Debug</option>
                        <option value="128">Very Verbose</option>
                    </select>
                </div>
            </div>

            <!-- SSH Host -->
            <div class="field">
                <div class="heading">
                    <label>SSH Host</label>
                </div>
                <div class="input">
                    <input v-model="environment.host"/>
                </div>
            </div>

            <!-- SSH Port -->
            <div class="field">
                <div class="heading">
                    <label>SSH Port</label>
                </div>
                <div class="input">
                    <input v-model="environment.port"/>
                </div>
            </div>

            <!-- SSH User -->
            <div class="field">
                <div class="heading">
                    <label>SSH User</label>
                </div>
                <div class="input">
                    <input v-model="environment.username"/>
                </div>
            </div>

            <!-- PHP Path -->
            <div class="field">
                <div class="heading">
                    <label>PHP Path</label>
                </div>
                <div class="input">
                    <input v-model="environment.phpPath"/>
                </div>
            </div>

            <!--  -->
            <div class="field">
                <div class="heading">
                    <label>{{ environment.mysqlDefault ? 'mysqldump' : 'pg_dump' }} Path</label>
                </div>
                <div class="input">
                    <label :for="'mysql-' + i">MySQL</label>
                    <input :id="'mysql-' + i" type="checkbox" v-model="environment.mysqlDefault">
                </div>
                <div class="input">
                    <input v-show="environment.mysqlDefault" v-model="environment.mysqlDumpPath"/>
                    <input v-show="!environment.mysqlDefault" v-model="environment.pgDumpPath"/>
                </div>
            </div><!-- {{ environment.name }} -->
        </div>
    </div>
</template>
<script>
import { toJS } from 'mobx';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Observer } from 'mobx-vue';
import EnvironmentsModel from './EnvironmentsModel';

@Observer
@Component({
    props: {
        environments: Object
    }
})
export default class Environments extends Vue {
    state = new EnvironmentsModel();

    @Watch('environments')
    parseEnvironments(val, oldVal) {
        this.state.setEnvironments(val);
    }

    getSettings() {
        return toJS(this.state.environments);
    }

    addEnvironment(e) {
        e.preventDefault();
        this.state.addEnvironment();
    }

    removeEnvironment(e, i) {
        e.preventDefault();
        this.state.removeEnvironment(i);
    }
}
</script>
<style>
.environment {
    padding: 20px;
    border: 1px solid black;
}
</style>

import defaults from './src/options.js';
import selectUsersVue from './src/index.vue';
import utils from './utils.js';
import _ from 'lodash';

let selectUsersConstructor = null,
    instance,
    defaultCallback = (selectUsers, instance) => {};

let SelectUsers = function(_options, _callback) {
    if ((typeof _options) == "object" && _options.callback && !_callback) {
        _callback = _options.callback;
    } else if ((typeof _options) == "object" && !_options.callback && !_callback) {
        _callback = defaultCallback;
    }

    let options = utils.merge({}, _.cloneDeep(defaults), _.cloneDeep(SelectUsers.defaults), _options);
    if (options.unitId && options.unitId.length > 0 && options.unitIds && options.unitIds.length == 0) {
        options.unitIds.push(options.unitId);
        options.unitId = '';
    }

    if (options.secondGroups && (typeof options.secondGroups == 'string')) {
        options.secondGroups = [options.secondGroups];
    }

    if (!options.secondGroups) {
        options.secondGroups = [];
    }

    options = utils.merge({}, options, {
        treeProps: {
            children: 'children',
            label: 'name'
        },
        treeDatas: [],
        treeDatasBack: [],
        userJsonBack: [],
        currentTreeId: '',
        checkAll: false,
        tabsSelect: 'all',
        isIndeterminate: false,
        checkedUserJson: [],
        parentIds: [],
        childrenIds: [],
        uid: 1,
        visible: false,
        callback: null,
        groupType: 'no',
        keyWord: ''
    });

    instance = new selectUsersConstructor({
        el: document.createElement('div'),
        data() {
            return options;
        }
    });

    document.body.appendChild(instance.$el);

    instance.callback = (selectUsers, instance) => {
        if (options.beforeClose && typeof options.beforeClose === "function" && options.beforeClose(selectUsers, instance)) {
            return false;
        }
        _callback(selectUsers, instance);
        instance.visible = false;
    };

    instance.visible = true;
};

SelectUsers.setDefaults = defaults => {
    SelectUsers.defaults = defaults;
};

SelectUsers.close = () => {
    instance.visible = false;
};

SelectUsers.install = function(Vue) {
    selectUsersConstructor = Vue.extend(selectUsersVue);
};

export default SelectUsers;
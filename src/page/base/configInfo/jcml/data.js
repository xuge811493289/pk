export default {
    data() {
        return {
            activeName: 'first',
            $treeObj: '',
            addVisible: false,
            editVisible: false,
            data: [{
                id: '1',
                parentId: '',
                name: '资源标签'
            }, {
                id: '1-1',
                parentId: '1',
                name: '教案'
            }, {
                id: '1-2',
                parentId: '1',
                name: '教学课程'
            }, {
                id: '1-2',
                parentId: '1',
                name: '作业试题'
            }, {
                id: '1-2',
                parentId: '1',
                name: '课堂实录'
            }, {
                id: '1-2',
                parentId: '1',
                name: '教学参考'
            }, ]
        }
    }
}
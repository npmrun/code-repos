export default [
    {
        type: 'input',
        name: 'componentName',
        message: '请输入组件名',
        validate(input: string) {
            if (!input) {
                return '请提供一个名字'
            }
            return true
        },
    },
    {
        type: 'input',
        name: 'componentVar',
        message: '请输入组件变量名',
        validate(input: string) {
            if (!input) {
                return '请提供一个名字'
            }
            return true
        },
    },
    {
        type: 'list',
        name: 'ui-name',
        message: '请选择组件库生成',
        choices: [
            { name: 'aiwo-ui', value: 'aiwo-ui' },
            { name: 'pupu-ui', value: 'pupu-ui' },
        ],
        default: 'pupu-ui',
    },
]
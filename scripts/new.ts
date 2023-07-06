import inquirer, { Answers, ChoiceCollection, Question, QuestionCollection } from 'inquirer'
import writefile from './_writefile'

import singleComponent from './question/single-component'
import component from './question/component'

const defaultQuestion: Record<'component' | 'single-component', any> = {
    'single-component': singleComponent,
    component: component,
}

    ; (async () => {
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'temp',
                message: '请选择一个模板生成',
                choices: [
                    { name: '组件', value: 'component' },
                    { name: '单组件包', value: 'single-component' },
                ],
                default: 'component',
            },
            ...(Object.keys(defaultQuestion) as (keyof typeof defaultQuestion)[])
                .map((n) => {
                    return defaultQuestion[n].map((v: any) => {
                        v.when = (answers: any) => answers['temp'] === n
                        return v
                    })
                })
                .reduce((a, b) => {
                    return a.concat(b)
                }, []),
        ])
        if (answers.temp === 'component') {
            writefile(
                'template/component',
                `packages/${answers['ui-name']}/src/components/${answers.componentName}`,
                answers,
                false
            )
        }
        if (answers.temp === 'single-component') {
            writefile(
                'template/single-component',
                `packages/${answers.componentName}`,
                answers,
                false
            )
        }
    })()

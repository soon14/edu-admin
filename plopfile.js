module.exports = (plop) => {
  // router
  plop.setGenerator('router', {
    description: 'Create a new router',
    prompts: [
      {
        type: 'input',
        name: 'dirname',
        message: '路由文件夹名称?',
        default: 'myRouter'
      },
      {
        type: 'input',
        name: 'routerName',
        message: '路由js文件名称?',
        default: 'myRouter'
      },
      {
        type: 'input',
        name: 'name',
        message: 'router name?',
        default: ''
      },
      {
        type: 'input',
        name: 'icon',
        message: 'router iconName?',
        default: ''
      },
      {
        type: 'input',
        name: 'title',
        message: 'router meta.title?',
        default: ''
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/router/module/{{dirname}}/{{routerName}}.ts',
        templateFile: 'plop-templates/router.hbs'
      }
    ]
  })
}

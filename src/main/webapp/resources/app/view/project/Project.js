Ext.define('Encore.mng.view.project.Project',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.project',
    requires: [
        'Encore.mng.view.project.ProjectController',
        'Encore.mng.view.project.ProjectModel'
    ],

    controller: 'project-project',
    viewModel: {
        type: 'project-project'
    },

    html: 'Hello, Project!!'
});

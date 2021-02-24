Ext.define('Encore.mng.view.project.popup.AddProject',{
    extend: 'Ext.window.Window',
    width: 600,
    height: 350,
    resizable: true,
    closable: true,
    maximizable: false,
    title: '프로젝트 등록',
    titleCollapse: false,
    modal: true,
    closeAction: 'close',
    layout: 'border',
    requires: [
        'Encore.mng.view.project.popup.AddProjectController',
        'Encore.mng.view.project.popup.AddProjectModel'
    ],

    controller: 'project-popup-addproject',
    viewModel: {
        type: 'project-popup-addproject'
    },

    html: 'Hello, World!!'
});

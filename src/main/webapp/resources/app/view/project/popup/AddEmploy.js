
Ext.define('Encore.mng.view.project.popup.AddEmploy',{
    extend: 'Ext.panel.Panel',

    requires: [
        'Encore.mng.view.project.popup.AddEmployController',
        'Encore.mng.view.project.popup.AddEmployModel'
    ],

    controller: 'project-popup-addemploy',
    viewModel: {
        type: 'project-popup-addemploy'
    },

    html: 'Hello, World!!'
});

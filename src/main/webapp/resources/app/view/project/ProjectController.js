Ext.define('Encore.mng.view.project.ProjectController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.project-project',
    onNew: function() {
        Ext.create('Encore.mng.view.project.popup.AddProject').show();
    },
    onSearch: function() {
        var s = this.lookupReference('projectGrid').store;
        var PROJ_NM = this.lookupReference('PROJ_NM').getValue();
        s.proxy.extraParams.PROJ_NM = PROJ_NM;
        s.reload();
    },
    onItemdblclick: function (dv, record, item, index, e) {
        console.log(record);
        Ext.create('Encore.mng.view.project.popup.AddProject',
            {
                row: record
            }).show();
    },
    onReload: function () {
        this.lookupReference('employGrid').store.reload();
    }
});

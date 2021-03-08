Ext.define('Encore.mng.view.project.ProjectController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.project-project',
    onNewProj: function() {
        Ext.create('Encore.mng.view.project.popup.AddProject').show();
    },
    onNewEmp: function() {
        var employGrid = this.lookupReference('employGrid');
        var PROJ_ID = this.lookupReference('PROJ_ID').getValue();
        Ext.create('Encore.mng.view.project.popup.AddEmploy', {
            employGrid: employGrid,
            PROJ_ID: PROJ_ID
        }).show();
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
    onItemclick: function (dv, record, item, index, e) {
        var PROJ_ID = record.get('PROJ_ID');
        var s = this.lookupReference('employGrid').store;
        s.proxy.extraParams.PROJ_ID = PROJ_ID;
        s.reload();

        var eg = this.lookupReference('projEmpWorkGrid').store;
        eg.proxy.extraParams.PROJ_ID = PROJ_ID;
        eg.reload();

        this.lookupReference('PROJ_ID').setValue(PROJ_ID);
    },
    onReload: function () {
        this.lookupReference('projectGrid').store.reload();
    }
});

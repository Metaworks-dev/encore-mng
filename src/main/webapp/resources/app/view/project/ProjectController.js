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
    onTabchange: function (tabPanel, newTab, oldTab) {
        this.reloadGrid();
    },
    onDeleteEmploy: function() {
        var grid = this.lookupReference('employGrid');
        var row = grid.getSelectionModel().selected.items[0];

        if (Ext.isEmpty(row)) {
            Ext.Msg.show({
                title: '확인',
                message: '삭제할 팀원을 선택하지 않았습니다.',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
            return;
        }

        Ext.Msg.confirm("확인", "팀원을 삭제하시겠습니까?", function (btn) {
            if (btn == 'yes') {
                var row = "";
                // var MAPP_TAB_UID = new Array();
                // for (i = 0; i < selModel.selected.length; i++) {
                //     row = selModel.selected.items[i].data;
                //     MAPP_TAB_UID.push(row.MAPP_TAB_UID);
                // }

                // Ext.Ajax.request({
                //     async: false,
                //     url: '/json',
                //     method: 'POST',
                //     params: {
                //         ns: 'migration',
                //         id: 'txDeleteMappTab',
                //         MAPP_TAB_UID: MAPP_TAB_UID
                //     },
                //     success: function (response) {
                //         // me.lookupReference('mappingColumnGrid').store.removeAll();
                //         me.lookupReference('mappingJoinTableGrid').store.reload();
                //         // me.lookupReference('mappingTableGrid').store.reload();
                //     },
                //     callback: function (opt, success, response) {
                //         console.log('callback..');
                //     },
                //     failure: function (response) {
                //         Ext.MessageBox.show({
                //             title: 'Connection Error',
                //             message: 'Database Server Connection Error',
                //             buttons: Ext.MessageBox.OK,
                //             icon: Ext.MessageBox.WARNING
                //         });
                //     }
                // });
            }
        });

    },
    reloadGrid: function() {
        var me = this;
        var tab = me.lookupReference('projectTabpanel');
        var PROJ_ID = me.lookupReference('PROJ_ID').getValue();

        if (tab.getActiveTab().title === '프로젝트 팀원') {
            var s = me.lookupReference('employGrid').store;
            s.proxy.extraParams.PROJ_ID = PROJ_ID;
            s.reload();
        } else {
            Ext.defer(function() {
                var eg = me.lookupReference('projEmpWorkGrid').store;
                eg.proxy.extraParams.PROJ_ID = PROJ_ID;
                eg.reload();
            }, 100);
        }
    },
    onItemclick: function (dv, record, item, index, e) {
        var me = this;
        var PROJ_ID = record.get('PROJ_ID');
        me.lookupReference('PROJ_ID').setValue(PROJ_ID);
        this.reloadGrid();
    },
    onReload: function () {
        this.lookupReference('projectGrid').store.reload();
    }
});

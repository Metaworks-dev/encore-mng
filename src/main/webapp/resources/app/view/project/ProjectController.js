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
    onCellUpdate: function (el, c) {
        el.grid.store.getAt(c.rowIdx).commit();
        console.log(c.record.data);

        Ext.Ajax.request({
            async: false,
            url: '/json',
            method: 'POST',
            params: {
                ns: 'project',
                id: 'updateProjEmp',
                EMP_ID: c.record.data.EMP_ID,
                PROJ_ID: c.record.data.PROJ_ID,
                EMP_PROJ_START_DT: c.record.data.EMP_PROJ_START_DT,
                EMP_PROJ_END_DT: c.record.data.EMP_PROJ_END_DT,
                PROJ_ROLE: c.record.data.PROJ_ROLE,
                EMP_PRICE: c.record.data.EMP_PRICE,
                BASIC_QUAL: c.record.data.BASIC_QUAL,
                JOB_SKILL: c.record.data.JOB_SKILL,
                OFFCE_ATTUDE: c.record.data.OFFCE_ATTUDE,
            },
            success: function (response) {
                var obj = Ext.decode(response.responseText);
                console.log(obj);
                el.grid.store.getAt(c.rowIdx).commit();
            },
            callback: function (opt, success, response) {
                console.log('callback..');
            },
            failure: function (response) {
                Ext.MessageBox.show({
                    title: 'Connection Error',
                    message: 'Database Server Connection Error',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.WARNING
                });
            }
        });

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

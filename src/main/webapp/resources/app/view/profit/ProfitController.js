Ext.define('Encore.mng.view.profit.ProfitController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.profit-profit',
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
    onSearch: function () {
        var s = this.lookupReference('projectGrid').store;
        var PROJ_NM = this.lookupReference('PROJ_NM').getValue();
        s.proxy.extraParams.PROJ_NM = PROJ_NM;
        s.reload();
    },
    onItemclick: function (dv, record, item, index, e) {
        var me = this;
        var PROJ_ID = record.get('PROJ_ID');
        me.lookupReference('PROJ_ID').setValue(PROJ_ID);
        var eg = me.lookupReference('profitEmpWorkGrid').store;
        eg.proxy.extraParams.PROJ_ID = PROJ_ID;
        eg.reload();
    },
    onReload: function () {
        this.lookupReference('projectGrid').store.reload();
    },
    onReload2: function () {
        this.lookupReference('projEmpWorkGrid').store.reload();
    }

});

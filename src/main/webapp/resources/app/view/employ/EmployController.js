Ext.define('Encore.mng.view.employ.EmployController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employ-employ',
    onNew: function() {
        Ext.create('Encore.mng.view.employ.popup.AddEmploy').show();
    },
    onSearch: function() {
        var s = this.lookupReference('employGrid').store;
        var EMP_NM = this.lookupReference('EMP_NM').getValue();
        s.proxy.extraParams.EMP_NM = EMP_NM;
        s.reload();
    },
    onItemdblclick: function (dv, record, item, index, e) {
        console.log(record);
        Ext.create('Encore.mng.view.employ.popup.AddEmploy',
            {
                row: record
            }).show();
    },
    onReload: function () {
        this.lookupReference('employGrid').store.reload();
    }
});

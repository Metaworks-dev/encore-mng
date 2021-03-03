Ext.define('Encore.mng.view.work.WorkController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.work-work',
    onReload: function () {
        this.lookupReference('projWorkGrid').store.reload();
    },
    getYear: function () {
        var me = this;
        var YYYY = this.lookupReference('YYYY').getValue();

        Ext.Ajax.request({
            async: true,
            url: 'json',
            method: 'POST',
            params: {
                ns: 'common',
                id: 'getCalendarYear',
                YYYY: YYYY,
            },
            success: function (response) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success == 'true') {
                    Ext.defer(function () {
                        me.lookupReference('YYYY').setValue(res.rows[0].YYYY);
                    }, 100, this);
                } else {
                    console.log(res.msg);
                }
            },
            failure: function (response) {
                console.log(response);
            }
        });
    },
    onAfterrender: function () {
        this.getYear();
    },
    onCelldblclick: function (obj, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var YYYY = this.lookupReference('YYYY').getValue();
        var projWorkGrid = this.lookupReference('projWorkGrid');

        console.log(obj);
        console.log(td);
        console.log(record);
        console.log(cellIndex);
        console.log(rowIndex);

        Ext.create('Encore.mng.view.work.popup.AddProjWork', {
            YYYY: YYYY,
            DD: cellIndex + 1,
            MM: rowIndex + 1,
            projWorkGrid: projWorkGrid
        }).show();
    },
});

Ext.define('Encore.mng.view.holiday.HolidayController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.holiday-holiday',
    onReload: function () {
        this.lookupReference('calendarGrid').store.reload();
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
        var calendarGrid = this.lookupReference('calendarGrid');

        console.log(obj);
        console.log(td);
        console.log(record);
        console.log(cellIndex);
        console.log(rowIndex);

        Ext.create('Encore.mng.view.holiday.popup.AddHoliday', {
            YYYY: YYYY,
            DD: cellIndex + 1,
            MM: rowIndex + 1,
            calendarGrid: calendarGrid
        }).show();
    },

});

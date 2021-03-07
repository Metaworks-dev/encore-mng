Ext.define('Encore.mng.view.holiday.HolidayModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.holiday-holiday',
    data: {
        name: 'Encore.mng'
    },
    stores: {
        empStore: {
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: 'json',
                extraParams: {
                    ns: 'common',
                    id: 'getHolidayCalendarList'
                },
                reader: {
                    type: 'json',
                    rootProperty: 'rows'
                }
            },
            listeners: {
            }
        },
    }

});
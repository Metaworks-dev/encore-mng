Ext.define('Encore.mng.view.work.WorkModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.work-work',
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
                    ns: 'employ',
                    id: 'getEmpCalendarList'
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

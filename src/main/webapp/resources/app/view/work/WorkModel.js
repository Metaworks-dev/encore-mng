Ext.define('Encore.mng.view.work.WorkModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.work-work',
    data: {
        name: 'Encore.mng'
    },
    stores: {
        projWorkStore: {
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: 'json',
                extraParams: {
                    ns: 'projwork',
                    id: 'getProjWorkCalList'
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

Ext.define('Encore.mng.view.work.popup.AddProjWorkModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.work-popup-addprojwork',
    data: {
        name: 'Encore.mng'
    },
    stores: {
        projStore: {
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: 'json',
                extraParams: {
                    ns: 'project',
                    id: 'getProjList'
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
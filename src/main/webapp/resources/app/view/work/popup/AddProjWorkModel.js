Ext.define('Encore.mng.view.work.popup.AddProjWorkModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.work-popup-addprojwork',
    data: {
        name: 'Encore.mng'
    },
    stores: {
        empStore: {
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: 'json',
                extraParams: {
                    ns: 'project',
                    id: 'getProjAddEmpList',
                    // cnt: 'getEmpListCnt'
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
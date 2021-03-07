Ext.define('Encore.mng.view.project.popup.AddEmployModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.project-popup-addemploy',
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

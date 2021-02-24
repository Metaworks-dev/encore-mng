Ext.define('Encore.mng.view.employ.EmployModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.employ-employ',
    data: {
        name: 'Encore.mng'
    },
    stores: {
        empStore: {
            autoLoad: true,
            groupField: 'CONN_NM',
            autoLoad: {
                start: 0,
                limit: 25
            },
            pageSize: 25,
            proxy: {
                type: 'ajax',
                url: 'json',
                extraParams: {
                    ns: 'employ',
                    id: 'getEmpList',
                    cnt: 'getEmpListCnt'
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

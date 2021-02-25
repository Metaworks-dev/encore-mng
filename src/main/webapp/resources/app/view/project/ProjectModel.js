Ext.define('Encore.mng.view.project.ProjectModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.project-project',
    data: {
        name: 'Encore.mng'
    },
    stores: {
        projStore: {
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
                    ns: 'project',
                    id: 'getProjList',
                    cnt: 'getProjListCnt'
                },
                reader: {
                    type: 'json',
                    rootProperty: 'rows'
                }
            },
            listeners: {
            }
        },

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
                    ns: 'project',
                    id: 'getProjEmpList',
                    cnt: 'getProjEmpListCnt'
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

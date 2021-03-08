Ext.define('Encore.mng.view.project.ProjectModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.project-project',
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
        projEmpStore: {
            proxy: {
                type: 'ajax',
                url: 'json',
                extraParams: {
                    ns: 'project',
                    id: 'getProjEmpList',
                },
                reader: {
                    type: 'json',
                    rootProperty: 'rows'
                }
            },
            listeners: {
            }
        },
        projEmpWorkStore: {
            proxy: {
                type: 'ajax',
                url: 'json',
                extraParams: {
                    ns: 'project',
                    id: 'getProjEmpList',
                },
                reader: {
                    type: 'json',
                    rootProperty: 'rows'
                }
            },
            listeners: {
            }
        },
        projEmpWorkSumStore: {
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: 'json',
                extraParams: {
                    ns: 'project',
                    id: 'getProjWorkSum',
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

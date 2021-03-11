Ext.define('Encore.mng.view.profit.ProfitModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.profit-profit',
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
        projWorkSumStore: {
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
        projEmpWorkSumStore: {
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
        empWorkSumStore: {
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: 'json',
                extraParams: {
                    ns: 'employ',
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

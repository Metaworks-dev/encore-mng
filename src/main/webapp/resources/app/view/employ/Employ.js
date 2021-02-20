Ext.define('Encore.mng.view.employ.Employ',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.employ',
    requires: [
        'Encore.mng.view.employ.EmployController',
        'Encore.mng.view.employ.EmployModel'
    ],

    controller: 'employ-employ',
    viewModel: {
        type: 'employ-employ'
    },

    items: [
        {
            extend: 'Ext.grid.Panel',
            requires: [
                'Encore.mng.store.Personnel'
            ],

            title: 'Employ',

            store: {
                type: 'personnel'
            },

            columns: [
                { text: 'Name',  dataIndex: 'name' },
                { text: 'Email', dataIndex: 'email', flex: 1 },
                { text: 'Phone', dataIndex: 'phone', flex: 1 }
            ],

            listeners: {
                // select: 'onItemSelected'
            }
        }
    ]
});

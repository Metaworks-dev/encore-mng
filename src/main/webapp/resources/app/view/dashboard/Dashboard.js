Ext.define('Encore.mng.view.dashboard.Dashboard',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.edashboard',
    requires: [
        'Encore.mng.view.dashboard.DashboardController',
        'Encore.mng.view.dashboard.DashboardModel'
    ],
    controller: 'dashboard-dashboard',
    viewModel: {
        type: 'dashboard-dashboard'
    },
    items: [
        {
            xtype: 'panel',
            title: 'EN-CORE Portal',
            header: false,
            html: 'Welcome EN-CORE ~ ',
            bodyPadding: '15 5 5 15'
        }
    ]
});

Ext.define('Encore.mng.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',
    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },
    onConfirm: function (choice) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
        if (choice === 'yes') {
            window.location.replace('/logout.do');
        }
    }
});

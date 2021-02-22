Ext.define('Encore.mng.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',
    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },
    onConfirm: function (choice) {
        Ext.Msg.confirm("로그아웃", "로그아웃 하시겠습니까?", function (btn) {
            if (btn === 'yes') {
                window.location.replace('/logout.do');
            }
        });
    }
});

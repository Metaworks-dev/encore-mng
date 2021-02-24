Ext.define('Encore.mng.view.employ.popup.AddEmployController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.employ-popup-addemploy',
    onCancelClick: function() {
        var me = this;
        me.getView().close();
    },
    onSaveClick: function() {
        var me = this;
        var f = me.lookupReference('frm').getForm();

        if (f.isValid()) {
            f.submit({
                method: 'POST',
                url: 'json',
                waitTitle: '저장 중..',
                waitMsg: '데이터를 전송 중입니다.',
                submitEmptyText: false,
                params: {
                    ns: 'employ',
                    id: Ext.isEmpty(f.findField('EMP_ID').getValue()) ? 'insertEmp' : 'updateEmp'
                },
                success: function (form, action) {
                    var obj = Ext.decode(action.response.responseText);
                    if (obj.success === 'true') {
                        Ext.Msg.alert('알림', '등록 완료', function() {
                            var grid = Ext.ComponentQuery.query('employ')[0].lookupReference('employGrid')
                            grid.getStore().reload();
                            me.getView().close();
                        });
                    } else {
                        Ext.Msg.alert('알림', obj.msg, function() {
                        });
                    }
                },
                failure: function (response) {
                    Ext.Msg.alert('알림', '회원 정보 등록 중 오류가 발생하였습니다.<br>' + response.error);
                }
            });
        }
    },
    onAfterrender: function() {
        var row = this.getView().row;
        if (!Ext.isEmpty(row)) {
            this.lookupReference('frm').getForm().setValues(row.data);
        }
    }
});

Ext.define('Encore.mng.view.work.popup.AddProjWorkController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.work-popup-addprojwork',
    onAfterrender: function() {
        var me = this;
        var YYYY_MM_DD = me.getView().YYYY
            + '-' + Util.String.lpad(me.getView().MM, 2, '0')
            + '-' + Util.String.lpad(me.getView().DD, 2, '0');
        me.lookupReference('START_DT').setValue(YYYY_MM_DD);
        me.lookupReference('END_DT').setValue(YYYY_MM_DD);

        Ext.Ajax.request({
            async: true,
            url: 'json',
            method: 'POST',
            params: {
                ns: 'common',
                id: 'getHoliday',
                YYYY_MM_DD: YYYY_MM_DD
            },
            success: function (response) {
                var res = Ext.JSON.decode(response.responseText);
                console.log('------------ success')
                console.log(res);
                if (res.success == 'true') {
                    if (!Ext.isEmpty(res.rows[0].HOLIDAY_NM)) {
                        me.lookupReference('HOLIDAY_NM').setValue(res.rows[0].HOLIDAY_NM);
                        me.lookupReference('deleteBtn').setVisible(true);
                    }
                } else {
                    console.log(res.msg);
                }
            },
            failure: function (response) {
                console.log(response);
            }
        });
    },
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
                    ns: 'projwork',
                    id: 'txUpsertProjWork'
                    // id: 'insertProjWork'
                },
                success: function (form, action) {
                    var obj = Ext.decode(action.response.responseText);
                    if (obj.success === 'true') {
                        Ext.Msg.alert('알림', '등록 완료', function() {
                            me.getView().projWorkGrid.store.reload();
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
    }
});

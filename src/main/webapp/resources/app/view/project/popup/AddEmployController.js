Ext.define('Encore.mng.view.project.popup.AddEmployController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.project-popup-addemploy',
    onItemdblclick: function (obj, record, item, index, e, eOpts) {
        console.log(obj);
        console.log(record);

        var me = this;
        console.log(me.getView().employGrid);
        console.log(me.getView().PROJ_ID);
        console.log(record.get('EMP_ID'));

        Ext.Msg.show({
            title: '알림',
            message: '프로젝트에 추가 하시겠습니까?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                console.log(btn);

                if (btn === 'yes') {
                    console.log('yes -----');
                    Ext.Ajax.request({
                        async: true,
                        url: 'json',
                        method: 'POST',
                        params: {
                            ns: 'project',
                            id: 'insertProjEmp',
                            PROJ_ID: me.getView().PROJ_ID,
                            EMP_ID: record.get('EMP_ID')
                        },
                        success: function (response) {
                            var res = Ext.JSON.decode(response.responseText);
                            console.log('------------ success')
                            console.log(res);
                            if (res.success == 'true') {
                                me.getView().employGrid.store.reload();
                                me.lookupReference('employGrid').store.reload();
                            } else {
                                console.log(res.msg);
                                // mailshot.lib.msg.errorMsg(res.msg);
                            }
                        },
                        failure: function (response) {
                            console.log(response);
                        }
                    });
                }
            }
        });
    },
    onSearch: function () {
        var s = this.lookupReference('employGrid').store;
        var EMP_NM = this.lookupReference('EMP_NM').getValue();
        s.proxy.extraParams.EMP_NM = EMP_NM;
        s.reload();
    },
    onCancelClick: function () {
        var me = this;
        me.getView().close();
    },
    onSaveClick: function () {
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
                    ns: 'project',
                    id: Ext.isEmpty(f.findField('PROJ_ID').getValue()) ? 'insertProj' : 'updateProj'
                },
                success: function (form, action) {
                    var obj = Ext.decode(action.response.responseText);
                    if (obj.success === 'true') {
                        Ext.Msg.alert('알림', '등록 완료', function () {
                            var grid = Ext.ComponentQuery.query('project')[0].lookupReference('projectGrid')
                            grid.getStore().reload();
                            me.getView().close();
                        });
                    } else {
                        Ext.Msg.alert('알림', obj.msg, function () {
                        });
                    }
                },
                failure: function (response) {
                    Ext.Msg.alert('알림', '회원 정보 등록 중 오류가 발생하였습니다.<br>' + response.error);
                }
            });
        }
    },
    onAfterrender: function () {
        var me = this;
        console.log(me.getView().employGrid);
        console.log(me.getView().PROJ_ID);

        var PROJ_ID = me.getView().PROJ_ID;

        Ext.defer(function() {
            var s = this.lookupReference('employGrid').store;
            s.proxy.extraParams.PROJ_ID = PROJ_ID;
            s.reload();
        }, 100, this);


    }
});

Ext.define('Encore.mng.view.work.popup.AddProjWork',{
    extend: 'Ext.window.Window',
    width: 600,
    height: 370,
    resizable: true,
    closable: true,
    maximizable: false,
    title: '프로젝트 등록',
    titleCollapse: false,
    modal: true,
    closeAction: 'close',
    layout: 'border',

    requires: [
        'Encore.mng.view.work.popup.AddProjWorkController',
        'Encore.mng.view.work.popup.AddProjWorkModel'
    ],

    controller: 'work-popup-addprojwork',
    viewModel: {
        type: 'work-popup-addprojwork'
    },
    buttons: [
        '->',
        {
            text: 'Save',
            handler: 'onSaveClick'
        },
        {
            text: 'Cancel',
            handler: 'onCancelClick'
        }
    ],
    items: [
        {
            xtype: 'form',
            layout: 'anchor',
            region: 'center',
            reference: 'frm',
            itemId: 'frm',
            bodyPadding: 5,
            defaults: {
                labelWidth: 110,
                anchor: '100%',
                labelAlign: 'right'
            },
            items: [
                {
                    xtype: 'hidden',
                    itemId: 'EMP_ID',
                    name: 'EMP_ID',
                    fieldLabel: 'EMP_ID',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    itemId: 'EMP_NO',
                    name: 'EMP_NO',
                    fieldLabel: '사번',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    itemId: 'EMP_NM',
                    name: 'EMP_NM',
                    fieldLabel: '이름',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    itemId: 'EMAIL',
                    name: 'EMAIL',
                    fieldLabel: 'E-mail',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    itemId: 'PASSWD',
                    name: 'PASSWD',
                    fieldLabel: 'Password',
                    allowBlank: false
                },
                {
                    xtype: 'combo',
                    fieldLabel: '직급',
                    itemId: 'MNG_LVL',
                    name: 'MNG_LVL',
                    displayField: 'name',
                    valueField: 'value',
                    editable: false,
                    collapsible: false,
                    allowBlank: false,
                    store: Ext.create('Ext.data.Store', {
                        fields: ['name', 'value'],
                        data: [
                            {name: '대표이사', value: '대표이사'},
                            {name: '전무', value: '전무'},
                            {name: '상무', value: '상무'},
                            {name: '이사', value: '이사'},
                            {name: '수석', value: '수석'},
                            {name: '책임', value: '책임'},
                            {name: '선임', value: '선임'},
                            {name: '전임', value: '전임'},
                            {name: '사원', value: '사원'},
                        ]
                    })
                },
                {
                    xtype: 'datefield',
                    itemId: 'ENT_DT',
                    name: 'ENT_DT',
                    format: 'Y-m-d',
                    fieldLabel: '입사일자',
                    allowBlank: false
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onAfterrender'
        // afterrender: function() {
        //     var me = this;
        //     me.down('#frmConnection').getForm().findField('PAR_OBJ_UID').setValue(me.OBJ_UID);
        // }
    }
});
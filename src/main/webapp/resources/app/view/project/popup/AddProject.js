Ext.define('Encore.mng.view.project.popup.AddProject',{
    extend: 'Ext.window.Window',
    width: 600,
    height: 270,
    resizable: true,
    closable: true,
    maximizable: false,
    title: '프로젝트 등록',
    titleCollapse: false,
    modal: true,
    closeAction: 'close',
    layout: 'border',
    requires: [
        'Encore.mng.view.project.popup.AddProjectController',
        'Encore.mng.view.project.popup.AddProjectModel'
    ],

    controller: 'project-popup-addproject',
    viewModel: {
        type: 'project-popup-addproject'
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
                    itemId: 'PROJ_ID',
                    name: 'PROJ_ID',
                    fieldLabel: 'PROJ_ID',
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    itemId: 'PROJ_NM',
                    name: 'PROJ_NM',
                    fieldLabel: '프로젝트명',
                    allowBlank: false
                },
                {
                    xtype: 'datefield',
                    itemId: 'PROJ_START_DT',
                    name: 'PROJ_START_DT',
                    format: 'Y-m-d',
                    fieldLabel: '시작일자',
                    allowBlank: false
                },
                {
                    xtype: 'datefield',
                    itemId: 'PROJ_END_DT',
                    name: 'PROJ_END_DT',
                    format: 'Y-m-d',
                    fieldLabel: '종료일자',
                    allowBlank: false
                },
                {
                    xtype: 'combo',
                    fieldLabel: '상태',
                    itemId: 'PROJ_STAT_CD',
                    name: 'PROJ_STAT_CD',
                    displayField: 'name',
                    valueField: 'value',
                    editable: false,
                    collapsible: false,
                    allowBlank: false,
                    store: Ext.create('Ext.data.Store', {
                        fields: ['name', 'value'],
                        data: [
                            {name: '준비', value: '준비'},
                            {name: '진행중', value: '진행중'},
                            {name: '종료', value: '종료'}
                        ]
                    })
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
Ext.define('Encore.mng.view.work.popup.AddProjWork',{
    extend: 'Ext.window.Window',
    width: 500,
    height: 270,
    resizable: true,
    closable: true,
    maximizable: false,
    title: '투입공수 등록',
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
            text: 'Delete',
            hidden: true,
            reference: 'deleteBtn',
            itemId: 'deleteBtn',
            handler: 'onDeleteClick'
        },
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
                labelWidth: 90,
                anchor: '100%',
                labelAlign: 'right'
            },
            items: [
                {
                    xtype: 'combo',
                    itemId: 'PROJ_ID',
                    name: 'PROJ_ID',
                    reference: 'PROJ_ID',
                    fieldLabel: '프로젝트선택',
                    displayField: 'PROJ_NM',
                    valueField: 'PROJ_ID',
                    editable: false,
                    bind: {
                        store: '{projStore}'
                    },
                    allowBlank: false
                },
                {
                    xtype: 'combo',
                    itemId: 'WORK_STAT_CD',
                    name: 'WORK_STAT_CD',
                    reference: 'WORK_STAT_CD',
                    fieldLabel: '근태구분',
                    displayField: 'name',
                    valueField: 'value',
                    editable: false,
                    store: Ext.create('Ext.data.Store', {
                        fields: ['name', 'value'],
                        data: [
                            {name: '근무', value: '근무'},
                            {name: '정기휴가', value: '정기휴가'},
                            {name: '오전반차', value: '오전반차'},
                            {name: '오후반차', value: '오후반차'},
                            {name: '건강검진', value: '건강검진'},
                        ]
                    })
                },
                {
                    xtype: 'datefield',
                    itemId: 'START_DT',
                    name: 'START_DT',
                    reference: 'START_DT',
                    format: 'Y-m-d',
                    submitFormat:'Y-m-d',
                    fieldLabel: '시작일자',
                    allowBlank: false
                },
                {
                    xtype: 'datefield',
                    itemId: 'END_DT',
                    name: 'END_DT',
                    reference: 'END_DT',
                    format: 'Y-m-d',
                    submitFormat:'Y-m-d',
                    fieldLabel: '종료일자',
                    allowBlank: false
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onAfterrender'
    }
});
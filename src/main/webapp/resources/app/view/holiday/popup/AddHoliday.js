Ext.define('Encore.mng.view.holiday.popup.AddHoliday',{
    extend: 'Ext.window.Window',
    width: 400,
    height: 270,
    resizable: true,
    closable: true,
    maximizable: false,
    title: '휴일 등록',
    titleCollapse: false,
    modal: true,
    closeAction: 'close',
    layout: 'border',
    requires: [
        'Encore.mng.view.holiday.popup.AddHolidayController',
        'Encore.mng.view.holiday.popup.AddHolidayModel'
    ],

    controller: 'holiday-popup-addholiday',
    viewModel: {
        type: 'holiday-popup-addholiday'
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
                labelWidth: 60,
                anchor: '100%',
                labelAlign: 'right'
            },
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'HOLIDAY_NM',
                    name: 'HOLIDAY_NM',
                    reference: 'HOLIDAY_NM',
                    fieldLabel: '휴일명',
                    allowBlank: false
                },
                {
                    xtype: 'hidden',
                    itemId: 'HOLIDAY_YN',
                    name: 'HOLIDAY_YN',
                    reference: 'HOLIDAY_YN',
                    value: '1',
                    fieldLabel: '휴일여부',
                    // displayField: 'name',
                    // valueField: 'value',
                    // store: Ext.create('Ext.data.Store', {
                    //     fields: ['name', 'value'],
                    //     data: [
                    //         {name: '휴일', value: '1'},
                    //         {name: '근무일', value: '0'},
                    //     ]
                    // })
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
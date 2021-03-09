Ext.define('Encore.mng.view.project.popup.AddEmploy',{
    extend: 'Ext.window.Window',
    width: 900,
    height: 470,
    resizable: true,
    closable: true,
    maximizable: false,
    title: '프로젝트 팀원 추가',
    titleCollapse: false,
    modal: true,
    closeAction: 'close',
    layout: 'border',
    requires: [
        'Encore.mng.view.project.popup.AddEmployController',
        'Encore.mng.view.project.popup.AddEmployModel'
    ],
    controller: 'project-popup-addemploy',
    viewModel: {
        type: 'project-popup-addemploy'
    },
    // buttons: [
    //     '->',
    //     {
    //         text: 'Save',
    //         handler: 'onSaveClick'
    //     },
    //     {
    //         text: 'Cancel',
    //         handler: 'onCancelClick'
    //     }
    // ],
    items: [
        {
            xtype: 'grid',
            region: 'center',
            itemId: 'employGrid',
            reference: 'employGrid',
            loadingText: 'loading',
            tbar: [
                // {
                //     xtype: 'button',
                //     text: '새로고침',
                //     handler: 'onReload'
                // },
                // {
                //     xtype: 'checkbox',
                //     fieldLabel: '투입인력제외',
                //     disabled: false,
                //     handler: 'onSearch'
                // },
                // '-',
                {
                    fieldLabel: '이름',
                    labelWidth: 45,
                    xtype: 'textfield',
                    reference: 'EMP_NM',
                    itemId: 'EMP_NM',
                    name: 'EMP_NM',
                    // plugins: ['clearbutton'],
                    width: 250,
                    emptyText: '이름',
                    listeners: {
                        specialKey: function (field, e) {
                            if (e.getKey() == e.ENTER) {
                                console.log('enter');
                                // me.membGrid.down('#searchBtn').fireEvent('click');
                            }
                        }
                    }
                },
                {
                    xtype: 'button',
                    itemId: 'btnSearch',
                    text: '검색',
                    disabled: false,
                    handler: 'onSearch'
                },
                '->',
                // {
                //     xtype: 'button',
                //     text: '추가',
                //     handler: 'onNew'
                // },
            ],
            bind: {
                store: '{empStore}'
            },
            // dockedItems: [
            //     {
            //         xtype: 'pagingtoolbar',
            //         bind: {
            //             store: '{empStore}'
            //         },
            //         dock: 'bottom'
            //     }
            // ],
            columns: [
                // {xtype: 'rownumberer', width: 35},
                {text: 'EMP_ID', dataIndex: 'EMP_ID', hidden: true, hideable: false},
                {text: '사번', dataIndex: 'EMP_NO', flex: 0.5, align: 'center'},
                {text: 'E-mail', dataIndex: 'EMAIL', flex: 2, align: 'left'},
                {text: 'Password', dataIndex: 'PASSWD', flex: 1, align: 'left'},
                {text: '이름', dataIndex: 'EMP_NM', flex: 1, align: 'center'},
                {text: '직급', dataIndex: 'MNG_LVL', flex: 1, align: 'center'},
                {text: '입사일자', dataIndex: 'ENT_DT', flex: 1, align: 'center'},
            ],
            listeners: {
                itemdblclick: 'onItemdblclick'
            }
        }
    ],
    listeners: {
        afterrender: 'onAfterrender'
    }
});
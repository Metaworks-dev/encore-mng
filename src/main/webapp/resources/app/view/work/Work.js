Ext.define('Encore.mng.view.work.Work',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.work',
    requires: [
        'Encore.mng.view.work.WorkController',
        'Encore.mng.view.work.WorkModel'
    ],

    controller: 'work-work',
    viewModel: {
        type: 'work-work'
    },
    title: '투입공수 관리',
    layout: 'border',
    items: [
        {
            xtype: 'grid',
            region: 'center',
            itemId: 'employGrid',
            reference: 'employGrid',
            loadingText: 'loading',
            tbar: [
                {
                    xtype: 'button',
                    text: '새로고침',
                    handler: 'onReload'
                },
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
                {
                    xtype: 'button',
                    text: '추가',
                    handler: 'onNew'
                },
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
                {text: '년월', dataIndex: 'YYYY_MM', flex: 3, align: 'center'},
                {text: '프로젝트', dataIndex: 'PROJ_NM', flex: 3, align: 'center'},
                {text: '투입율', dataIndex: 'EMAIL', flex: 3, align: 'left'},
                // {text: 'Password', dataIndex: 'PASSWD', flex: 1, align: 'left'},
                {text: '1', dataIndex: 'D01', flex: 0.5, align: 'center'},
                {text: '2', dataIndex: 'D02', flex: 0.5, align: 'center'},
                {text: '3', dataIndex: 'D03', flex: 0.5, align: 'center'},
                {text: '4', dataIndex: 'D04', flex: 0.5, align: 'center'},
                {text: '5', dataIndex: 'D05', flex: 0.5, align: 'center'},
                {text: '6', dataIndex: 'D06', flex: 0.5, align: 'center'},
                {text: '7', dataIndex: 'D07', flex: 0.5, align: 'center'},
                {text: '8', dataIndex: 'D08', flex: 0.5, align: 'center'},
                {text: '9', dataIndex: 'D09', flex: 0.5, align: 'center'},
                {text: '10', dataIndex: 'D10', flex: 0.5, align: 'center'},
                {text: '11', dataIndex: 'D11', flex: 0.5, align: 'center'},
                {text: '12', dataIndex: 'D12', flex: 0.5, align: 'center'},
                {text: '13', dataIndex: 'D13', flex: 0.5, align: 'center'},
                {text: '14', dataIndex: 'D14', flex: 0.5, align: 'center'},
                {text: '15', dataIndex: 'D15', flex: 0.5, align: 'center'},
                {text: '16', dataIndex: 'D16', flex: 0.5, align: 'center'},
                {text: '17', dataIndex: 'D17', flex: 0.5, align: 'center'},
                {text: '18', dataIndex: 'D18', flex: 0.5, align: 'center'},
                {text: '19', dataIndex: 'D19', flex: 0.5, align: 'center'},
                {text: '20', dataIndex: 'D20', flex: 0.5, align: 'center'},
                {text: '21', dataIndex: 'D21', flex: 0.5, align: 'center'},
                {text: '22', dataIndex: 'D22', flex: 0.5, align: 'center'},
                {text: '23', dataIndex: 'D23', flex: 0.5, align: 'center'},
                {text: '24', dataIndex: 'D24', flex: 0.5, align: 'center'},
                {text: '25', dataIndex: 'D25', flex: 0.5, align: 'center'},
                {text: '26', dataIndex: 'D26', flex: 0.5, align: 'center'},
                {text: '27', dataIndex: 'D27', flex: 0.5, align: 'center'},
                {text: '28', dataIndex: 'D28', flex: 0.5, align: 'center'},
                {text: '29', dataIndex: 'D29', flex: 0.5, align: 'center'},
                {text: '30', dataIndex: 'D30', flex: 0.5, align: 'center'},
                {text: '31', dataIndex: 'D31', flex: 0.5, align: 'center'}
            ],
            listeners: {
                itemdblclick: 'onItemdblclick'
            }
        }
    ]
});

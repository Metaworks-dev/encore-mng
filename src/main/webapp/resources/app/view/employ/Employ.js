Ext.define('Encore.mng.view.employ.Employ', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.employ',
    requires: [
        'Encore.mng.view.employ.EmployController',
        'Encore.mng.view.employ.EmployModel'
    ],
    controller: 'employ-employ',
    viewModel: {
        type: 'employ-employ'
    },
    layout: 'border',
    items: [
        {
            xtype: 'tabpanel',
            region: 'center',
            items: [
                {
                    xtype: 'grid',
                    region: 'center',
                    title: '직원 관리',
                    itemId: 'employGrid',
                    reference: 'employGrid',
                    loadingText: 'loading',
                    viewConfig: {
                        enableTextSelection: true
                    },
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
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            bind: {
                                store: '{empStore}'
                            },
                            dock: 'bottom'
                        }
                    ],
                    columns: [
                        // {xtype: 'rownumberer', width: 35},
                        {text: 'EMP_ID', dataIndex: 'EMP_ID', hidden: true, hideable: false},
                        {text: '사번', dataIndex: 'EMP_NO', flex: 0.5, align: 'center'},
                        {text: 'E-mail', dataIndex: 'EMAIL', flex: 2, align: 'left'},
                        {text: 'Password', dataIndex: 'PASSWD', flex: 1, align: 'left'},
                        {text: '이름', dataIndex: 'EMP_NM', flex: 1, align: 'center'},
                        {text: '직급', dataIndex: 'MNG_LVL', flex: 1, align: 'center'},
                        {text: '입사일자', dataIndex: 'ENT_DT', flex: 1, align: 'center'}
                    ],
                    listeners: {
                        itemdblclick: 'onItemdblclick'
                    }
                },
                {
                    xtype: 'panel',
                    title: '개별손익',
                    html: '개인매출액'
                }
            ]
        }

        // {
        //     xtype: 'tabpanel',
        //     region: 'center',
        //     // tabPosition: 'left',
        //     items: [
        //

        //     ]
        // }
    ]
});

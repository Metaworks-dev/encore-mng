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
                    features: [{
                        ftype: 'grouping',
                        groupHeaderTpl: '{name}',
//                hideGroupedHeader: true,
//                enableGroupingMenu: true
                    }],
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
                    columns: {
                        defaults: {menuDisabled: true},
                        items: [
                            // {xtype: 'rownumberer', width: 35},
                            {text: 'EMP_ID', dataIndex: 'EMP_ID', hidden: true, hideable: false},
                            {text: '사번', dataIndex: 'EMP_NO', flex: 0.5, align: 'center'},
                            {text: 'E-mail', dataIndex: 'EMAIL', flex: 2, align: 'left'},
                            {text: 'Password', dataIndex: 'PASSWD', flex: 1, align: 'left'},
                            {text: '이름', dataIndex: 'EMP_NM', flex: 1, align: 'center'},
                            {text: '직급', dataIndex: 'MNG_LVL', flex: 1, align: 'center'},
                            {text: '입사일자', dataIndex: 'ENT_DT', flex: 1, align: 'center'},
                            {
                                text: '퇴사일자', dataIndex: 'RETIRE_DT', flex: 1, align: 'center'

                            },
                        ]
                    },
                    listeners: {
                        itemcontextmenu: function (grid, record, item, index, e) {
                            var contextMenu = Ext.create('Ext.menu.Menu', {
                                // height: 200,
                                // width: 250,
                                items: [{
                                    text: 'Preview',
                                    handler: function () {
                                        //code...
                                    }
                                }]
                            });
                            e.stopEvent();
                            contextMenu.showAt(e.getXY());
                        },
                        itemdblclick: 'onItemdblclick'
                    }
                },
                // {
                //     xtype: 'panel',
                //     region: 'center',
                //     layout: 'border',
                //     collapsible: true,
                //     split: true,
                //     header: false,
                //     title: '개인별 매출액',
                //     flex: 2,
                //     items: [
                //         {
                //             xtype: 'grid',
                //             region: 'center',
                //             itemId: 'projEmpWorkGrid',
                //             reference: 'projEmpWorkGrid',
                //             // collapsible: true,
                //             // split: true,
                //             // header: false,
                //             flex: 2,
                //             emptyText: Ext.String
                //                 .format(
                //                     '<div style="display: table; width: 100%; height: 99%; #position: relative; overflow: hidden;">'
                //                     + '<div style="#position: absolute; #top: 50%; display: table-cell; vertical-align: middle; text-align: center;">'
                //                     + '<div style="#position: relative; #top: -50%;font-size:12px;">{0}</div>'
                //                     + '</div>' + '</div>', '프로젝트를 선택해 주세요'),
                //             loadingText: 'loading',
                //             tbar: [
                //                 {
                //                     xtype: 'button',
                //                     text: '새로고침',
                //                     handler: 'onReload2'
                //                 },
                //                 {
                //                     fieldLabel: '이름',
                //                     labelWidth: 45,
                //                     xtype: 'textfield',
                //                     width: 250,
                //                     emptyText: '이름',
                //                     listeners: {
                //                         specialKey: function (field, e) {
                //                             if (e.getKey() == e.ENTER) {
                //                                 console.log('enter');
                //                                 // me.membGrid.down('#searchBtn').fireEvent('click');
                //                             }
                //                         }
                //                     }
                //                 },
                //                 {
                //                     xtype: 'button',
                //                     itemId: 'btnSearch',
                //                     text: '검색',
                //                     disabled: false,
                //                     handler: 'onSearch'
                //                 },
                //             ],
                //             bind: {
                //                 store: '{projEmpWorkSumStore}'
                //             },
                //             viewConfig: {
                //                 stripeRows: false,
                //                 columnLines: true,
                //             },
                //             features: [{
                //                 ftype: 'summary'
                //             }],
                //             columns: {
                //                 defaults: {menuDisabled: true},
                //                 items: [
                //                     {
                //                         text: 'EMP_ID',
                //                         dataIndex: 'EMP_ID',
                //                         hidden: true,
                //                         hideable: false,
                //                         locked: true
                //                     },
                //                     {
                //                         xtype: 'rownumberer',
                //                         width: 40,
                //                         sortable: false,
                //                     },
                //                     {
                //                         text: '사번', dataIndex: 'EMP_NO', width: 50, align: 'center'
                //                         , locked: true
                //                     },
                //                     {
                //                         text: '이름', dataIndex: 'EMP_NM', width: 70, align: 'center'
                //                         , locked: true
                //                     },
                //                     {
                //                         text: '입사일자', dataIndex: 'ENT_DT', width: 90, align: 'center'
                //                         , locked: true
                //                     },
                //                     {
                //                         text: '퇴사일자', dataIndex: 'RETIRE_DT', width: 90, align: 'center'
                //                         , locked: true
                //                     },
                //                     {
                //                         text: '부서', dataIndex: 'DEPT', width: 70, align: 'center'
                //                         , locked: true
                //                     },
                //                     {
                //                         text: '직급', dataIndex: 'MNG_LVL', width: 70, align: 'center'
                //                         , locked: true
                //                     },
                //                     // {text: '역할', dataIndex: 'MNG_LVL', width: 60, align: 'center'
                //                     // , locked: true
                //                     // },
                //                     {text: '단가', dataIndex: 'EMP_PRICE', width: 80, align: 'center'},
                //                     // {
                //                     //     text: '기본자질',
                //                     //     dataIndex: 'BASIC_QUAL',
                //                     //     width: 80,
                //                     // }, {
                //                     //     text: '직무수행능력',
                //                     //     dataIndex: 'JOB_SKILL',
                //                     //     width: 100,
                //                     // }, {
                //                     //     text: '직무수행태도',
                //                     //     dataIndex: 'OFFCE_ATTUDE',
                //                     //     width: 100,
                //                     // },
                //                     {
                //                         text: '1월',
                //                         dataIndex: 'M01',
                //                         width: 60,
                //                         align: 'center',
                //                         type: 'float',
                //                         summaryType: 'sum',
                //                         summaryRenderer: function (value, summaryData, dataIndex) {
                //                             return value;
                //                         }
                //                     },
                //                     {
                //                         text: '2월',
                //                         dataIndex: 'M02',
                //                         width: 60,
                //                         align: 'center',
                //                         type: 'float',
                //                         summaryType: 'sum',
                //                         summaryRenderer: function (value, summaryData, dataIndex) {
                //                             return value;
                //                         }
                //                     },
                //                     {
                //                         text: '3월',
                //                         dataIndex: 'M03',
                //                         width: 60,
                //                         align: 'center',
                //                         type: 'float',
                //                         summaryType: 'sum',
                //                         summaryRenderer: function (value, summaryData, dataIndex) {
                //                             return value;
                //                         }
                //                     },
                //                     {
                //                         text: '4월',
                //                         dataIndex: 'M04',
                //                         width: 60,
                //                         align: 'center',
                //                         type: 'float',
                //                         summaryType: 'sum',
                //                         summaryRenderer: function (value, summaryData, dataIndex) {
                //                             return value;
                //                         }
                //                     },
                //                     {
                //                         text: '5월',
                //                         dataIndex: 'M05',
                //                         width: 60,
                //                         align: 'center',
                //                         type: 'float',
                //                         summaryType: 'sum',
                //                         summaryRenderer: function (value, summaryData, dataIndex) {
                //                             return value;
                //                         }
                //                     },
                //                     {
                //                         text: '6월',
                //                         dataIndex: 'M06',
                //                         width: 60,
                //                         align: 'center',
                //                         type: 'float',
                //                         summaryType: 'sum',
                //                         summaryRenderer: function (value, summaryData, dataIndex) {
                //                             return value;
                //                         }
                //                     },
                //                     {
                //                         text: '7월',
                //                         dataIndex: 'M07',
                //                         width: 60,
                //                         align: 'center',
                //                         type: 'float',
                //                         summaryType: 'sum',
                //                         summaryRenderer: function (value, summaryData, dataIndex) {
                //                             return value;
                //                         }
                //                     },
                //                     {
                //                         text: '8월',
                //                         dataIndex: 'M08',
                //                         width: 60,
                //                         align: 'center',
                //                         type: 'float',
                //                         summaryType: 'sum',
                //                         summaryRenderer: function (value, summaryData, dataIndex) {
                //                             return value;
                //                         }
                //                     },
                //                     {
                //                         text: '9월',
                //                         dataIndex: 'M09',
                //                         width: 60,
                //                         align: 'center',
                //                         type: 'float',
                //                         summaryType: 'sum',
                //                         summaryRenderer: function (value, summaryData, dataIndex) {
                //                             return value;
                //                         }
                //                     },
                //                     {
                //                         text: '10월',
                //                         dataIndex: 'M10',
                //                         width: 60,
                //                         align: 'center',
                //                         type: 'float',
                //                         summaryType: 'sum',
                //                         summaryRenderer: function (value, summaryData, dataIndex) {
                //                             return value;
                //                         }
                //                     },
                //                     {
                //                         text: '11월',
                //                         dataIndex: 'M11',
                //                         width: 60,
                //                         align: 'center',
                //                         type: 'float',
                //                         summaryType: 'sum',
                //                         summaryRenderer: function (value, summaryData, dataIndex) {
                //                             return value;
                //                         }
                //                     },
                //                     {
                //                         text: '12월',
                //                         dataIndex: 'M12',
                //                         width: 60,
                //                         align: 'center',
                //                         type: 'float',
                //                         summaryType: 'sum',
                //                         summaryRenderer: function (value, summaryData, dataIndex) {
                //                             return value;
                //                         }
                //                     },
                //                 ]
                //             },
                //             listeners: {
                //                 itemcontextmenu: function (grid, record, item, index, e) {
                //                     var contextMenu = Ext.create('Ext.menu.Menu', {
                //                         // height: 200,
                //                         // width: 250,
                //                         items: [{
                //                             text: 'Preview',
                //                             handler: function () {
                //                                 //code...
                //                             }
                //                         }]
                //                     });
                //                     e.stopEvent();
                //                     contextMenu.showAt(e.getXY());
                //                 },
                //                 itemdblclick: 'onItemdblclick'
                //             }
                //         }
                //     ]
                // },
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

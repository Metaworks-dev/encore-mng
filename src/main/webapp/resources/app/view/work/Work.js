Ext.define('Encore.mng.view.work.Work', {
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
            itemId: 'projWorkGrid',
            reference: 'projWorkGrid',
            loadingText: 'loading',
            viewConfig: {
                stripeRows: false,
                columnLines: true,
            },
            tbar: [
                {
                    xtype: 'button',
                    text: '새로고침',
                    handler: 'onReload'
                },
                {
                    fieldLabel: '년도',
                    labelWidth: 45,
                    width: 100,
                    xtype: 'textfield',
                    reference: 'YYYY',
                    itemId: 'YYYY',
                    name: 'YYYY',
                },
                //     {
                //         fieldLabel: '이름',
                //         labelWidth: 45,
                //         xtype: 'textfield',
                //         reference: 'EMP_NM',
                //         itemId: 'EMP_NM',
                //         name: 'EMP_NM',
                //         // plugins: ['clearbutton'],
                //         width: 250,
                //         emptyText: '이름',
                //         listeners: {
                //             specialKey: function (field, e) {
                //                 if (e.getKey() == e.ENTER) {
                //                     console.log('enter');
                //                     // me.membGrid.down('#searchBtn').fireEvent('click');
                //                 }
                //             }
                //         }
                //     },
                //     {
                //         xtype: 'button',
                //         itemId: 'btnSearch',
                //         text: '검색',
                //         disabled: false,
                //         handler: 'onSearch'
                //     },
                '->',
                {
                    xtype: 'button',
                    text: '<<',
                    handler: 'onNew'
                },
                {
                    xtype: 'button',
                    text: '>>',
                    handler: 'onNew'
                },
            ],
            bind: {
                store: '{projWorkStore}'
            },
            features: [{
                ftype: 'summary'
            }],
            columns: {
                defaults: {menuDisabled: true},
                items: [
                    {
                        text: '월', dataIndex: 'MM', width: 40, align: 'center', locked: true,
                    },
                    {
                        text: '프로젝트', dataIndex: 'PROJ_NM', width: 140, align: 'left', locked: true,
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex) {
                            return 'Total';
                        }
                    },
                    {
                        text: '근무일', dataIndex: 'WORK_DD', width: 60, align: 'center', locked: true,
                        type: 'float',
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex) {
                            return value;
                            // return Ext.String.format('{0}', value);
                        }
                    },
                    {
                        text: '투입일', dataIndex: 'PROJ_WORK_DD', width: 60, align: 'center', locked: true,
                        type: 'float',
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex) {
                            return Ext.String.format('{0}', value);
                            // return Ext.util.Format.number(value, '0,000.00');
                        }
                    },
                    {
                        text: '투입율(%)', dataIndex: 'PROJ_WORK_RATE', width: 80, align: 'center', locked: true,
                        // type: 'float',
                        summaryType: 'average',
                        summaryRenderer: function (value, summaryData, dataIndex) {
                            return Ext.Number.roundToPrecision(value);
                        }
                    },
                    {
                        text: '1', dataIndex: 'D01', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            return Util.Calendar.cellRenderer(value, record.data.H01, meta);
                        },
                    },
                    {
                        text: '2', dataIndex: 'D02', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            return Util.Calendar.cellRenderer(value, record.data.H02, meta);
                        }
                    },
                    {
                        text: '3', dataIndex: 'D03', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            return Util.Calendar.cellRenderer(value, record.data.H03, meta);
                        }
                    },
                    {
                        text: '4', dataIndex: 'D04', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            return Util.Calendar.cellRenderer(value, record.data.H04, meta);
                        }
                    },
                    {
                        text: '5', dataIndex: 'D05', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            return Util.Calendar.cellRenderer(value, record.data.H05, meta);
                        }
                    },
                    {
                        text: '6', dataIndex: 'D06', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            return Util.Calendar.cellRenderer(value, record.data.H06, meta);
                        }
                    },
                    {
                        text: '7', dataIndex: 'D07', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            return Util.Calendar.cellRenderer(value, record.data.H07, meta);
                        }
                    },
                    {
                        text: '8', dataIndex: 'D08', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            return Util.Calendar.cellRenderer(value, record.data.H08, meta);
                        }
                    },
                    {
                        text: '9', dataIndex: 'D09', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            return Util.Calendar.cellRenderer(value, record.data.H09, meta);
                        }
                    },
                    {
                        text: '10', dataIndex: 'D10', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            return Util.Calendar.cellRenderer(value, record.data.H10, meta);
                        }
                    },
                    {
                        text: '11', dataIndex: 'D11', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            return Util.Calendar.cellRenderer(value, record.data.H11, meta);
                        }
                    },
                    {
                        text: '12', dataIndex: 'D12', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            return Util.Calendar.cellRenderer(value, record.data.H12, meta);
                        }
                    },
                    {
                        text: '13', dataIndex: 'D13', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            return Util.Calendar.cellRenderer(value, record.data.H13, meta);
                        }
                    },
                    {
                        text: '14', dataIndex: 'D14', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            return Util.Calendar.cellRenderer(value, record.data.H14, meta);
                        }
                    },
                    {
                        text: '15', dataIndex: 'D15', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            return Util.Calendar.cellRenderer(value, record.data.H15, meta);
                        }
                    },
                    {
                        text: '16', dataIndex: 'D16', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            return Util.Calendar.cellRenderer(value, record.data.H16, meta);
                        }
                    },
                    {
                        text: '17', dataIndex: 'D17', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            return Util.Calendar.cellRenderer(value, record.data.H17, meta);
                        }
                    },
                    {
                        text: '18', dataIndex: 'D18', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            return Util.Calendar.cellRenderer(value, record.data.H18, meta);
                        }
                    },
                    {
                        text: '19', dataIndex: 'D19', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            return Util.Calendar.cellRenderer(value, record.data.H19, meta);
                        }
                    },
                    {
                        text: '20', dataIndex: 'D20', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            return Util.Calendar.cellRenderer(value, record.data.H20, meta);
                        }
                    },
                    {
                        text: '21', dataIndex: 'D21', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            return Util.Calendar.cellRenderer(value, record.data.H21, meta);
                        }
                    },
                    {
                        text: '22', dataIndex: 'D22', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            return Util.Calendar.cellRenderer(value, record.data.H22, meta);
                        }
                    },
                    {
                        text: '23', dataIndex: 'D23', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            return Util.Calendar.cellRenderer(value, record.data.H23, meta);
                        }
                    },
                    {
                        text: '24', dataIndex: 'D24', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            return Util.Calendar.cellRenderer(value, record.data.H24, meta);
                        }
                    },
                    {
                        text: '25', dataIndex: 'D25', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            return Util.Calendar.cellRenderer(value, record.data.H25, meta);
                        }
                    },
                    {
                        text: '26', dataIndex: 'D26', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            return Util.Calendar.cellRenderer(value, record.data.H26, meta);
                        }
                    },
                    {
                        text: '27', dataIndex: 'D27', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            return Util.Calendar.cellRenderer(value, record.data.H27, meta);
                        }
                    },
                    {
                        text: '28', dataIndex: 'D28', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            return Util.Calendar.cellRenderer(value, record.data.H28, meta);
                        }
                    },
                    {
                        text: '29', dataIndex: 'D29', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            return Util.Calendar.cellRenderer(value, record.data.H29, meta);
                        }
                    },
                    {
                        text: '30', dataIndex: 'D30', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            return Util.Calendar.cellRenderer(value, record.data.H30, meta);
                        }
                    },
                    {
                        text: '31', dataIndex: 'D31', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            return Util.Calendar.cellRenderer(value, record.data.H31, meta);
                        }
                    },
                    {text: 'H01', dataIndex: 'H01', flex: 1, align: 'center', hidden: true},
                    {text: 'H02', dataIndex: 'H02', flex: 1, align: 'center', hidden: true},
                    {text: 'H03', dataIndex: 'H03', flex: 1, align: 'center', hidden: true},
                    {text: 'H04', dataIndex: 'H04', flex: 1, align: 'center', hidden: true},
                    {text: 'H05', dataIndex: 'H05', flex: 1, align: 'center', hidden: true},
                    {text: 'H06', dataIndex: 'H06', flex: 1, align: 'center', hidden: true},
                    {text: 'H07', dataIndex: 'H07', flex: 1, align: 'center', hidden: true},
                    {text: 'H08', dataIndex: 'H08', flex: 1, align: 'center', hidden: true},
                    {text: 'H09', dataIndex: 'H09', flex: 1, align: 'center', hidden: true},
                    {text: 'H11', dataIndex: 'H11', flex: 1, align: 'center', hidden: true},
                    {text: 'H12', dataIndex: 'H12', flex: 1, align: 'center', hidden: true},
                    {text: 'H13', dataIndex: 'H13', flex: 1, align: 'center', hidden: true},
                    {text: 'H10', dataIndex: 'H10', flex: 1, align: 'center', hidden: true},
                    {text: 'H14', dataIndex: 'H14', flex: 1, align: 'center', hidden: true},
                    {text: 'H15', dataIndex: 'H15', flex: 1, align: 'center', hidden: true},
                    {text: 'H16', dataIndex: 'H16', flex: 1, align: 'center', hidden: true},
                    {text: 'H17', dataIndex: 'H17', flex: 1, align: 'center', hidden: true},
                    {text: 'H18', dataIndex: 'H18', flex: 1, align: 'center', hidden: true},
                    {text: 'H19', dataIndex: 'H19', flex: 1, align: 'center', hidden: true},
                    {text: 'H20', dataIndex: 'H20', flex: 1, align: 'center', hidden: true},
                    {text: 'H21', dataIndex: 'H21', flex: 1, align: 'center', hidden: true},
                    {text: 'H22', dataIndex: 'H22', flex: 1, align: 'center', hidden: true},
                    {text: 'H23', dataIndex: 'H23', flex: 1, align: 'center', hidden: true},
                    {text: 'H24', dataIndex: 'H24', flex: 1, align: 'center', hidden: true},
                    {text: 'H25', dataIndex: 'H25', flex: 1, align: 'center', hidden: true},
                    {text: 'H26', dataIndex: 'H26', flex: 1, align: 'center', hidden: true},
                    {text: 'H27', dataIndex: 'H27', flex: 1, align: 'center', hidden: true},
                    {text: 'H28', dataIndex: 'H28', flex: 1, align: 'center', hidden: true},
                    {text: 'H29', dataIndex: 'H29', flex: 1, align: 'center', hidden: true},
                    {text: 'H30', dataIndex: 'H30', flex: 1, align: 'center', hidden: true},
                    {text: 'H31', dataIndex: 'H31', flex: 1, align: 'center', hidden: true}
                ]
            },
            listeners: {
                afterrender: 'onAfterrender',
                celldblclick: 'onCelldblclick'
            }
        }
    ]
});

Ext.define('Encore.mng.view.holiday.Holiday',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.holiday',
    requires: [
        'Encore.mng.view.holiday.HolidayController',
        'Encore.mng.view.holiday.HolidayModel'
    ],

    controller: 'holiday-holiday',
    viewModel: {
        type: 'holiday-holiday'
    },
    title: '휴무일 관리',
    layout: 'border',
    items: [
        {
            xtype: 'grid',
            region: 'center',
            itemId: 'employGrid',
            reference: 'employGrid',
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

            columns: {
                defaults: { menuDisabled: true },
                items: [
                    {text: '월', dataIndex: 'MM', width: 40, align: 'center', locked: true},
                    {text: '1', dataIndex: 'D01', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            var val = record.data.H01;
                            if (!Ext.isEmpty(val) && val === '7') {
                                meta.style = "background-color:#ADD8E6";
                            } else if (!Ext.isEmpty(record.data.H02) && val === '1') {
                                meta.style = "background-color:#FFB6C1";
                            }
                            return value;
                        },

                    },
                    {text: '2', dataIndex: 'D02', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            var val = record.data.H02;
                            if (!Ext.isEmpty(val) && val === '7') {
                                meta.style = "background-color:#ADD8E6";
                            } else if (!Ext.isEmpty(val) && val === '1') {
                                meta.style = "background-color:#FFB6C1";
                            }
                            return value;
                        }
                    },
                    {text: '3', dataIndex: 'D03', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            var val = record.data.H03;
                            if (!Ext.isEmpty(val) && val === '7') {
                                meta.style = "background-color:#ADD8E6";
                            } else if (!Ext.isEmpty(val) && val === '1') {
                                meta.style = "background-color:#FFB6C1";
                            }
                            return value;
                        }
                    },
                    {text: '4', dataIndex: 'D04', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            var val = record.data.H04;
                            if (!Ext.isEmpty(val) && val === '7') {
                                meta.style = "background-color:#ADD8E6";
                            } else if (!Ext.isEmpty(val) && val === '1') {
                                meta.style = "background-color:#FFB6C1";
                            }
                            return value;
                        }
                    },
                    {text: '5', dataIndex: 'D05', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            var val = record.data.H05;
                            if (!Ext.isEmpty(val) && val === '7') {
                                meta.style = "background-color:#ADD8E6";
                            } else if (!Ext.isEmpty(val) && val === '1') {
                                meta.style = "background-color:#FFB6C1";
                            }
                            return value;
                        }
                    },
                    {text: '6', dataIndex: 'D06', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            var val = record.data.H06;
                            if (!Ext.isEmpty(val) && val === '7') {
                                meta.style = "background-color:#ADD8E6";
                            } else if (!Ext.isEmpty(val) && val === '1') {
                                meta.style = "background-color:#FFB6C1";
                            }
                            return value;
                        }
                    },
                    {text: '7', dataIndex: 'D07', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            var val = record.data.H07;
                            if (!Ext.isEmpty(val) && val === '7') {
                                meta.style = "background-color:#ADD8E6";
                            } else if (!Ext.isEmpty(val) && val === '1') {
                                meta.style = "background-color:#FFB6C1";
                            }
                            return value;
                        }
                    },
                    {text: '8', dataIndex: 'D08', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            var val = record.data.H08;
                            if (!Ext.isEmpty(val) && val === '7') {
                                meta.style = "background-color:#ADD8E6";
                            } else if (!Ext.isEmpty(val) && val === '1') {
                                meta.style = "background-color:#FFB6C1";
                            }
                            return value;
                        }
                    },
                    {text: '9', dataIndex: 'D09', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            var val = record.data.H09;
                            if (!Ext.isEmpty(val) && val === '7') {
                                meta.style = "background-color:#ADD8E6";
                            } else if (!Ext.isEmpty(val) && val === '1') {
                                meta.style = "background-color:#FFB6C1";
                            }
                            return value;
                        }
                    },
                    {text: '10', dataIndex: 'D10', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            var val = record.data.H10;
                            if (!Ext.isEmpty(val) && val === '7') {
                                meta.style = "background-color:#ADD8E6";
                            } else if (!Ext.isEmpty(val) && val === '1') {
                                meta.style = "background-color:#FFB6C1";
                            }
                            return value;
                        }
                    },
                    {text: '11', dataIndex: 'D11', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            var val = record.data.H11;
                            if (!Ext.isEmpty(val) && val === '7') {
                                meta.style = "background-color:#ADD8E6";
                            } else if (!Ext.isEmpty(val) && val === '1') {
                                meta.style = "background-color:#FFB6C1";
                            }
                            return value;
                        }
                    },
                    {text: '12', dataIndex: 'D12', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            var val = record.data.H12;
                            if (!Ext.isEmpty(val) && val === '7') {
                                meta.style = "background-color:#ADD8E6";
                            } else if (!Ext.isEmpty(val) && val === '1') {
                                meta.style = "background-color:#FFB6C1";
                            }
                            return value;
                        }
                    },
                    {text: '13', dataIndex: 'D13', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            var val = record.data.H13;
                            if (!Ext.isEmpty(val) && val === '7') {
                                meta.style = "background-color:#ADD8E6";
                            } else if (!Ext.isEmpty(val) && val === '1') {
                                meta.style = "background-color:#FFB6C1";
                            }
                            return value;
                        }
                    },
                    {text: '14', dataIndex: 'D14', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            var val = record.data.H14;
                            if (!Ext.isEmpty(val) && val === '7') {
                                meta.style = "background-color:#ADD8E6";
                            } else if (!Ext.isEmpty(val) && val === '1') {
                                meta.style = "background-color:#FFB6C1";
                            }
                            return value;
                        }
                    },
                    {text: '15', dataIndex: 'D15', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            var val = record.data.H15;
                            if (!Ext.isEmpty(val) && val === '7') {
                                meta.style = "background-color:#ADD8E6";
                            } else if (!Ext.isEmpty(val) && val === '1') {
                                meta.style = "background-color:#FFB6C1";
                            }
                            return value;
                        }
                    },
                    {text: '16', dataIndex: 'D16', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            var val = record.data.H16;
                            if (!Ext.isEmpty(val) && val === '7') {
                                meta.style = "background-color:#ADD8E6";
                            } else if (!Ext.isEmpty(val) && val === '1') {
                                meta.style = "background-color:#FFB6C1";
                            }
                            return value;
                        }
                    },
                    {text: '17', dataIndex: 'D17', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            var val = record.data.H17;
                            if (!Ext.isEmpty(val) && val === '7') {
                                meta.style = "background-color:#ADD8E6";
                            } else if (!Ext.isEmpty(val) && val === '1') {
                                meta.style = "background-color:#FFB6C1";
                            }
                            return value;
                        }
                    },
                    {text: '18', dataIndex: 'D18', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            var val = record.data.H18;
                            if (!Ext.isEmpty(val) && val === '7') {
                                meta.style = "background-color:#ADD8E6";
                            } else if (!Ext.isEmpty(val) && val === '1') {
                                meta.style = "background-color:#FFB6C1";
                            }
                            return value;
                        }
                    },
                    {text: '19', dataIndex: 'D19', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            var val = record.data.H19;
                            if (!Ext.isEmpty(val) && val === '7') {
                                meta.style = "background-color:#ADD8E6";
                            } else if (!Ext.isEmpty(val) && val === '1') {
                                meta.style = "background-color:#FFB6C1";
                            }
                            return value;
                        }
                    },
                    {text: '20', dataIndex: 'D20', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            var val = record.data.H20;
                            if (!Ext.isEmpty(val) && val === '7') {
                                meta.style = "background-color:#ADD8E6";
                            } else if (!Ext.isEmpty(val) && val === '1') {
                                meta.style = "background-color:#FFB6C1";
                            }
                            return value;
                        }
                    },
                    {text: '21', dataIndex: 'D21', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            var val = record.data.H21;
                            if (!Ext.isEmpty(val) && val === '7') {
                                meta.style = "background-color:#ADD8E6";
                            } else if (!Ext.isEmpty(val) && val === '1') {
                                meta.style = "background-color:#FFB6C1";
                            }
                            return value;
                        }
                    },
                    {text: '22', dataIndex: 'D22', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            var val = record.data.H22;
                            if (!Ext.isEmpty(val) && val === '7') {
                                meta.style = "background-color:#ADD8E6";
                            } else if (!Ext.isEmpty(val) && val === '1') {
                                meta.style = "background-color:#FFB6C1";
                            }
                            return value;
                        }
                    },
                    {text: '23', dataIndex: 'D23', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            var val = record.data.H23;
                            if (!Ext.isEmpty(val) && val === '7') {
                                meta.style = "background-color:#ADD8E6";
                            } else if (!Ext.isEmpty(val) && val === '1') {
                                meta.style = "background-color:#FFB6C1";
                            }
                            return value;
                        }
                    },
                    {text: '24', dataIndex: 'D24', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            var val = record.data.H24;
                            if (!Ext.isEmpty(val) && val === '7') {
                                meta.style = "background-color:#ADD8E6";
                            } else if (!Ext.isEmpty(val) && val === '1') {
                                meta.style = "background-color:#FFB6C1";
                            }
                            return value;
                        }
                    },
                    {text: '25', dataIndex: 'D25', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            var val = record.data.H25;
                            if (!Ext.isEmpty(val) && val === '7') {
                                meta.style = "background-color:#ADD8E6";
                            } else if (!Ext.isEmpty(val) && val === '1') {
                                meta.style = "background-color:#FFB6C1";
                            }
                            return value;
                        }
                    },
                    {text: '26', dataIndex: 'D26', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            var val = record.data.H26;
                            if (!Ext.isEmpty(val) && val === '7') {
                                meta.style = "background-color:#ADD8E6";
                            } else if (!Ext.isEmpty(val) && val === '1') {
                                meta.style = "background-color:#FFB6C1";
                            }
                            return value;
                        }
                    },
                    {text: '27', dataIndex: 'D27', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            var val = record.data.H27;
                            if (!Ext.isEmpty(val) && val === '7') {
                                meta.style = "background-color:#ADD8E6";
                            } else if (!Ext.isEmpty(val) && val === '1') {
                                meta.style = "background-color:#FFB6C1";
                            }
                            return value;
                        }
                    },
                    {text: '28', dataIndex: 'D28', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            var val = record.data.H28;
                            if (!Ext.isEmpty(val) && val === '7') {
                                meta.style = "background-color:#ADD8E6";
                            } else if (!Ext.isEmpty(val) && val === '1') {
                                meta.style = "background-color:#FFB6C1";
                            }
                            return value;
                        }
                    },
                    {text: '29', dataIndex: 'D29', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            var val = record.data.H29;
                            if (!Ext.isEmpty(val) && val === '7') {
                                meta.style = "background-color:#ADD8E6";
                            } else if (!Ext.isEmpty(val) && val === '1') {
                                meta.style = "background-color:#FFB6C1";
                            }
                            return value;
                        }
                    },
                    {text: '30', dataIndex: 'D30', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            var val = record.data.H30;
                            if (!Ext.isEmpty(val) && val === '7') {
                                meta.style = "background-color:#ADD8E6";
                            } else if (!Ext.isEmpty(val) && val === '1') {
                                meta.style = "background-color:#FFB6C1";
                            }
                            return value;
                        }
                    },
                    {text: '31', dataIndex: 'D31', flex: 1, align: 'center',
                        renderer: function (value, meta, record) {
                            var val = record.data.H31;
                            if (!Ext.isEmpty(val) && val === '7') {
                                meta.style = "background-color:#ADD8E6";
                            } else if (!Ext.isEmpty(val) && val === '1') {
                                meta.style = "background-color:#FFB6C1";
                            }
                            return value;
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
                // itemdblclick: 'onItemdblclick',
                cellclick: function(obj, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                    console.log(obj);
                    console.log(td);
                    console.log(record);
                    console.log(cellIndex);
                    console.log(rowIndex);
                    console.log(e);
                    console.log(eOpts);
                }
            }
        }
    ]
});

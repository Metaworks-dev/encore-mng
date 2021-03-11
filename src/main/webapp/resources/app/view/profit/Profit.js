Ext.define('Encore.mng.view.profit.Profit', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.profit',
    requires: [
        'Encore.mng.view.profit.ProfitController',
        'Encore.mng.view.profit.ProfitModel'
    ],

    controller: 'profit-profit',
    viewModel: {
        type: 'profit-profit'
    },
    layout: 'border',
    items: [
        {
            xtype: 'tabpanel',
            region: 'center',
            items: [
                {
                    xtype: 'panel',
                    layout: 'border',
                    title: '프로젝트 투입공수',
                    items: [
                        {
                            xtype: 'grid',
                            region: 'west',
                            itemId: 'projectGrid',
                            reference: 'projectGrid',
                            loadingText: 'loading',
                            collapsible: true,
                            split: true,
                            header: false,
                            flex: 1,
                            tbar: [
                                {
                                    xtype: 'button',
                                    text: '새로고침',
                                    handler: 'onReload'
                                },
                                {
                                    xtype: 'hidden',
                                    reference: 'PROJ_ID',
                                    itemId: 'PROJ_ID',
                                    name: 'PROJ_ID'
                                },
                                '->',
                                // {
                                //     xtype: 'button',
                                //     text: '프로젝트 추가',
                                //     handler: 'onNewProj'
                                // },
                            ],
                            bind: {
                                store: '{projStore}'
                            },
                            columns: {
                                defaults: {menuDisabled: true},
                                items: [
                                    {text: 'PROJ_ID', dataIndex: 'PROJ_ID', hidden: true, hideable: false},
                                    {text: '프로젝트명', dataIndex: 'PROJ_NM', flex: 3, align: 'left'},
                                    {text: '상태', dataIndex: 'PROJ_STAT_CD', flex: 1, align: 'center'},
                                    {text: '시작일자', dataIndex: 'PROJ_START_DT', flex: 1.5, align: 'center'},
                                    {text: '종료일자', dataIndex: 'PROJ_END_DT', flex: 1.5, align: 'center'},
                                    {text: '인원', dataIndex: 'PROJ_EMP_CNT', flex: 1, align: 'center'},
                                ]
                            },
                            listeners: {
                                itemdblclick: 'onItemdblclick',
                                itemclick: 'onItemclick'
                            }
                        },
                        {
                            xtype: 'grid',
                            region: 'center',
                            itemId: 'profitEmpWorkGrid',
                            reference: 'profitEmpWorkGrid',

                            flex: 2,
                            emptyText: Ext.String
                                .format(
                                    '<div style="display: table; width: 100%; height: 99%; #position: relative; overflow: hidden;">'
                                    + '<div style="#position: absolute; #top: 50%; display: table-cell; vertical-align: middle; text-align: center;">'
                                    + '<div style="#position: relative; #top: -50%;font-size:12px;">{0}</div>'
                                    + '</div>' + '</div>', '프로젝트를 선택해 주세요'),
                            loadingText: 'loading',
                            plugins: {
                                ptype: 'cellediting',
                                clicksToEdit: 2,
                                listeners: {
                                    edit: 'onCellUpdate'
                                }
                            },
                            tbar: [
                                {
                                    fieldLabel: '이름',
                                    labelWidth: 45,
                                    xtype: 'textfield',
                                    // reference: 'EMP_NM',
                                    // itemId: 'EMP_NM',
                                    // name: 'EMP_NM',
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
                                //     text: '구성원 추가',
                                //     handler: 'onNewEmp'
                                // },
                            ],
                            bind: {
                                store: '{projEmpWorkSumStore}'
                            },
                            viewConfig: {
                                stripeRows: false,
                                columnLines: true,
                            },
                            features: [{
                                ftype: 'summary'
                            }],
                            columns: {
                                defaults: {menuDisabled: true},
                                items: [
                                    {
                                        text: 'EMP_ID',
                                        dataIndex: 'EMP_ID',
                                        hidden: true,
                                        hideable: false,
                                        locked: true
                                    },
                                    {
                                        text: '사번', dataIndex: 'EMP_NO', width: 50, align: 'center'
                                        , locked: true,
                                        flex: 1,
                                        align: 'center',
                                    },
                                    {
                                        text: '이름', dataIndex: 'EMP_NM', width: 70, align: 'center'
                                        , locked: true
                                    },
                                    {
                                        text: '직급', dataIndex: 'MNG_LVL', width: 70, align: 'center'
                                        , locked: true
                                    },
                                    // {text: '역할', dataIndex: 'MNG_LVL', width: 60, align: 'center'
                                    // , locked: true
                                    // },
                                    {
                                        text: '단가', dataIndex: 'EMP_PRICE', width: 80, align: 'center',
                                        renderer: function (value, meta, record) {
                                            meta.style = "background-color:#f5f5f0;";
                                            return Ext.util.Format.number(value, "0,000");
                                        },
                                        editor: {
                                            field: {
                                                xtype: 'textfield',
                                                allowBlank: false
                                            }
                                        }
                                    },
                                    {
                                        text: '기본자질',
                                        dataIndex: 'BASIC_QUAL',
                                        width: 100,
                                        align: 'center',
                                        // renderer: function (value, meta, record) {
                                        //     meta.style = "background-color:#f5f5f0;";
                                        //     return value;
                                        // },
                                        // editor: new Ext.form.field.ComboBox({
                                        //     typeAhead: true,
                                        //     triggerAction: 'all',
                                        //     displayField: 'name',
                                        //     valueField: 'value',
                                        //     selectOnTab: true,
                                        //     store: Ext.create('Ext.data.Store', {
                                        //         fields: ['name', 'value'],
                                        //         data: [
                                        //             {name: '탁월', value: '탁월'},
                                        //             {name: '우수', value: '우수'},
                                        //             {name: '양호', value: '양호'},
                                        //             {name: '보통', value: '보통'},
                                        //             {name: '미흡', value: '미흡'},
                                        //         ]
                                        //     }),
                                        //     lazyRender: true,
                                        //     listClass: 'x-combo-list-small'
                                        // })
                                    }, {
                                        text: '직무수행능력',
                                        dataIndex: 'JOB_SKILL',
                                        width: 100,
                                        align: 'center',
                                        // renderer: function (value, meta, record) {
                                        //     meta.style = "background-color:#f0f5f5;";
                                        //     return value;
                                        // },
                                        // editor: new Ext.form.field.ComboBox({
                                        //     typeAhead: true,
                                        //     triggerAction: 'all',
                                        //     displayField: 'name',
                                        //     valueField: 'value',
                                        //     selectOnTab: true,
                                        //     store: Ext.create('Ext.data.Store', {
                                        //         fields: ['name', 'value'],
                                        //         data: [
                                        //             {name: '탁월', value: '탁월'},
                                        //             {name: '우수', value: '우수'},
                                        //             {name: '양호', value: '양호'},
                                        //             {name: '보통', value: '보통'},
                                        //             {name: '미흡', value: '미흡'},
                                        //         ]
                                        //     }),
                                        //     lazyRender: true,
                                        //     listClass: 'x-combo-list-small'
                                        // })
                                    }, {
                                        text: '직무수행태도',
                                        dataIndex: 'OFFCE_ATTUDE',
                                        width: 100,
                                        align: 'center',
                                        // renderer: function (value, meta, record) {
                                        //     meta.style = "background-color:#f0f5f5;";
                                        //     return value;
                                        // },
                                        // editor: new Ext.form.field.ComboBox({
                                        //     typeAhead: true,
                                        //     triggerAction: 'all',
                                        //     displayField: 'name',
                                        //     valueField: 'value',
                                        //     selectOnTab: true,
                                        //     store: Ext.create('Ext.data.Store', {
                                        //         fields: ['name', 'value'],
                                        //         data: [
                                        //             {name: '탁월', value: '탁월'},
                                        //             {name: '우수', value: '우수'},
                                        //             {name: '양호', value: '양호'},
                                        //             {name: '보통', value: '보통'},
                                        //             {name: '미흡', value: '미흡'},
                                        //         ]
                                        //     }),
                                        //     lazyRender: true,
                                        //     listClass: 'x-combo-list-small'
                                        // })
                                    },
                                    {
                                        text: '1월', dataIndex: 'M01', width: 60, align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '2월', dataIndex: 'M02', width: 60, align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '3월', dataIndex: 'M03', width: 60, align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.String.format('{0}', value);
                                        }
                                    },
                                    {
                                        text: '4월', dataIndex: 'M04', width: 60, align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.String.format('{0}', value);
                                        }
                                    },
                                    {
                                        text: '5월', dataIndex: 'M05', width: 60, align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.String.format('{0}', value);
                                        }
                                    },
                                    {
                                        text: '6월', dataIndex: 'M06', width: 60, align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.String.format('{0}', value);
                                        }
                                    },
                                    {
                                        text: '7월', dataIndex: 'M07', width: 60, align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.String.format('{0}', value);
                                        }
                                    },
                                    {
                                        text: '8월', dataIndex: 'M08', width: 60, align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.String.format('{0}', value);
                                        }
                                    },
                                    {
                                        text: '9월', dataIndex: 'M09', width: 60, align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.String.format('{0}', value);
                                        }
                                    },
                                    {
                                        text: '10월', dataIndex: 'M10', width: 60, align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.String.format('{0}', value);
                                        }
                                    },
                                    {
                                        text: '11월', dataIndex: 'M11', width: 60, align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.String.format('{0}', value);
                                        }
                                    },
                                    {
                                        text: '12월', dataIndex: 'M12', width: 60, align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.String.format('{0}', value);
                                        }
                                    },
                                    {text: '합계', dataIndex: 'M_TOT', width: 60, align: 'center',
                                        type: 'float',
                                        renderer: function (value, meta, record) {
                                            meta.style = "background-color:#f5f5f0;";
                                            // Ext.util.Format.number(value, "0,000");
                                            return value;
                                        },
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
                                // itemdblclick: 'onItemdblclick'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    region: 'center',
                    layout: 'border',
                    collapsible: true,
                    split: true,
                    header: false,
                    title: '개인별 매출액',
                    flex: 2,
                    items: [
                        {
                            xtype: 'grid',
                            region: 'center',
                            itemId: 'projEmpWorkGrid',
                            reference: 'projEmpWorkGrid',
                            // collapsible: true,
                            // split: true,
                            // header: false,
                            flex: 2,
                            emptyText: Ext.String
                                .format(
                                    '<div style="display: table; width: 100%; height: 99%; #position: relative; overflow: hidden;">'
                                    + '<div style="#position: absolute; #top: 50%; display: table-cell; vertical-align: middle; text-align: center;">'
                                    + '<div style="#position: relative; #top: -50%;font-size:12px;">{0}</div>'
                                    + '</div>' + '</div>', '프로젝트를 선택해 주세요'),
                            loadingText: 'loading',
                            tbar: [
                                {
                                    xtype: 'button',
                                    text: '새로고침',
                                    handler: 'onReload2'
                                },
                                {
                                    fieldLabel: '이름',
                                    labelWidth: 45,
                                    xtype: 'textfield',
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
                            ],
                            bind: {
                                store: '{empWorkSumStore}'
                            },
                            viewConfig: {
                                stripeRows: false,
                                columnLines: true,
                            },
                            features: [{
                                ftype: 'summary'
                            }],
                            columns: {
                                defaults: {menuDisabled: true},
                                items: [
                                    {
                                        text: 'EMP_ID',
                                        dataIndex: 'EMP_ID',
                                        hidden: true,
                                        hideable: false,
                                        locked: true
                                    },
                                    {
                                        xtype: 'rownumberer',
                                        width: 40,
                                        sortable: false,
                                    },
                                    {
                                        text: '사번', dataIndex: 'EMP_NO', width: 50, align: 'center'
                                        , locked: true
                                    },
                                    {
                                        text: '이름', dataIndex: 'EMP_NM', width: 70, align: 'center'
                                        , locked: true
                                    },
                                    {
                                        text: '입사일자', dataIndex: 'ENT_DT', width: 90, align: 'center'
                                        , locked: true
                                    },
                                    {
                                        text: '퇴사일자', dataIndex: 'RETIRE_DT', width: 90, align: 'center'
                                        , locked: true
                                    },
                                    {
                                        text: '부서', dataIndex: 'DEPT', width: 70, align: 'center'
                                        , locked: true
                                    },
                                    {
                                        text: '직급', dataIndex: 'MNG_LVL', width: 70, align: 'center'
                                        , locked: true
                                    },
                                    // {text: '역할', dataIndex: 'MNG_LVL', width: 60, align: 'center'
                                    // , locked: true
                                    // },
                                    {text: '단가', dataIndex: 'EMP_PRICE', width: 80, align: 'right',
                                        renderer : function(value, meta, record) {
                                            meta.style = "background-color:#f5f5f0;";
                                            return Ext.util.Format.number(value, "0,000");
                                        }
                                    },
                                    // {
                                    //     text: '기본자질',
                                    //     dataIndex: 'BASIC_QUAL',
                                    //     width: 80,
                                    // }, {
                                    //     text: '직무수행능력',
                                    //     dataIndex: 'JOB_SKILL',
                                    //     width: 100,
                                    // }, {
                                    //     text: '직무수행태도',
                                    //     dataIndex: 'OFFCE_ATTUDE',
                                    //     width: 100,
                                    // },
                                    {
                                        text: '1월',
                                        dataIndex: 'M01',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '2월',
                                        dataIndex: 'M02',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '3월',
                                        dataIndex: 'M03',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '4월',
                                        dataIndex: 'M04',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '5월',
                                        dataIndex: 'M05',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '6월',
                                        dataIndex: 'M06',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '7월',
                                        dataIndex: 'M07',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '8월',
                                        dataIndex: 'M08',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '9월',
                                        dataIndex: 'M09',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '10월',
                                        dataIndex: 'M10',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '11월',
                                        dataIndex: 'M11',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '12월',
                                        dataIndex: 'M12',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {text: '계', dataIndex: 'M_TOT', width: 80, align: 'center',
                                        renderer : function(value, meta, record) {
                                            meta.style = "background-color:#f5f5f0;";
                                            return Ext.util.Format.number(value, "0,000");
                                        }
                                    },
                                    {text: '개인표준원가', dataIndex: 'EMP_PRICE', width: 130, align: 'right',
                                            renderer : function(value, meta, record) {
                                                meta.style = "background-color:#f5f5f0;";
                                                return Ext.util.Format.number(value, "0,000");
                                            }
                                    },
                                    {text: '월 원가', dataIndex: 'ENT_DT', width: 100, align: 'right',
                                        renderer : function(value, meta, record) {
                                            meta.style = "background-color:#f5f5f0;";
                                            return Ext.util.Format.number(value, "0,000");
                                        }
                                    },
                                    {text: '손익', dataIndex: 'ENT_DT', width: 80, align: 'right',
                                        renderer : function(value, meta, record) {
                                            meta.style = "background-color:#f5f5f0;";
                                            return Ext.util.Format.number(value, "0,000");
                                        }
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
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    region: 'center',
                    layout: 'border',
                    collapsible: true,
                    split: true,
                    header: false,
                    title: '원가투입율',
                    flex: 2,
                    items: [
                        {
                            xtype: 'grid',
                            region: 'center',
                            itemId: 'projEmpWorkGrid2',
                            reference: 'projEmpWorkGrid2',
                            // collapsible: true,
                            // split: true,
                            // header: false,
                            flex: 2,
                            emptyText: Ext.String
                                .format(
                                    '<div style="display: table; width: 100%; height: 99%; #position: relative; overflow: hidden;">'
                                    + '<div style="#position: absolute; #top: 50%; display: table-cell; vertical-align: middle; text-align: center;">'
                                    + '<div style="#position: relative; #top: -50%;font-size:12px;">{0}</div>'
                                    + '</div>' + '</div>', '프로젝트를 선택해 주세요'),
                            loadingText: 'loading',
                            tbar: [
                                {
                                    xtype: 'button',
                                    text: '새로고침',
                                    handler: 'onReload2'
                                },
                                {
                                    fieldLabel: '이름',
                                    labelWidth: 45,
                                    xtype: 'textfield',
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
                            ],
                            bind: {
                                store: '{empWorkSumStore}'
                            },
                            viewConfig: {
                                stripeRows: false,
                                columnLines: true,
                            },
                            features: [{
                                ftype: 'summary'
                            }],
                            columns: {
                                defaults: {menuDisabled: true},
                                items: [
                                    {
                                        text: 'EMP_ID',
                                        dataIndex: 'EMP_ID',
                                        hidden: true,
                                        hideable: false,
                                        locked: true
                                    },
                                    {
                                        xtype: 'rownumberer',
                                        width: 40,
                                        sortable: false,
                                    },
                                    {
                                        text: '사번', dataIndex: 'EMP_NO', width: 50, align: 'center'
                                        , locked: true
                                    },
                                    {
                                        text: '이름', dataIndex: 'EMP_NM', width: 70, align: 'center'
                                        , locked: true
                                    },
                                    {
                                        text: '입사일자', dataIndex: 'ENT_DT', width: 90, align: 'center'
                                        , locked: true
                                    },
                                    {
                                        text: '퇴사일자', dataIndex: 'RETIRE_DT', width: 90, align: 'center'
                                        , locked: true
                                    },
                                    {
                                        text: '부서', dataIndex: 'DEPT', width: 70, align: 'center'
                                        , locked: true
                                    },
                                    {
                                        text: '직급', dataIndex: 'MNG_LVL', width: 70, align: 'center'
                                        , locked: true
                                    },
                                    // {text: '역할', dataIndex: 'MNG_LVL', width: 60, align: 'center'
                                    // , locked: true
                                    // },
                                    {text: '단가', dataIndex: 'EMP_PRICE', width: 80, align: 'right',
                                        renderer : function(value, meta, record) {
                                            meta.style = "background-color:#f5f5f0;";
                                            return Ext.util.Format.number(value, "0,000");
                                        }
                                    },
                                    // {
                                    //     text: '기본자질',
                                    //     dataIndex: 'BASIC_QUAL',
                                    //     width: 80,
                                    // }, {
                                    //     text: '직무수행능력',
                                    //     dataIndex: 'JOB_SKILL',
                                    //     width: 100,
                                    // }, {
                                    //     text: '직무수행태도',
                                    //     dataIndex: 'OFFCE_ATTUDE',
                                    //     width: 100,
                                    // },
                                    {
                                        text: '1월',
                                        dataIndex: 'M01',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '2월',
                                        dataIndex: 'M02',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '3월',
                                        dataIndex: 'M03',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '4월',
                                        dataIndex: 'M04',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '5월',
                                        dataIndex: 'M05',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '6월',
                                        dataIndex: 'M06',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '7월',
                                        dataIndex: 'M07',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '8월',
                                        dataIndex: 'M08',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '9월',
                                        dataIndex: 'M09',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '10월',
                                        dataIndex: 'M10',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '11월',
                                        dataIndex: 'M11',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '12월',
                                        dataIndex: 'M12',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {text: '계', dataIndex: 'M_TOT', width: 80, align: 'center',
                                        renderer : function(value, meta, record) {
                                            meta.style = "background-color:#f5f5f0;";
                                            return Ext.util.Format.number(value, "0,000");
                                        }
                                    },
                                    {text: '개인표준원가', dataIndex: 'EMP_PRICE', width: 130, align: 'right',
                                        renderer : function(value, meta, record) {
                                            meta.style = "background-color:#f5f5f0;";
                                            return Ext.util.Format.number(value, "0,000");
                                        }
                                    },
                                    {text: '월 원가', dataIndex: 'ENT_DT', width: 100, align: 'right',
                                        renderer : function(value, meta, record) {
                                            meta.style = "background-color:#f5f5f0;";
                                            return Ext.util.Format.number(value, "0,000");
                                        }
                                    },
                                    {text: '손익', dataIndex: 'ENT_DT', width: 80, align: 'right',
                                        renderer : function(value, meta, record) {
                                            meta.style = "background-color:#f5f5f0;";
                                            return Ext.util.Format.number(value, "0,000");
                                        }
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
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    region: 'center',
                    layout: 'border',
                    collapsible: true,
                    split: true,
                    header: false,
                    title: '개별투입율',
                    flex: 2,
                    items: [
                        {
                            xtype: 'grid',
                            region: 'center',
                            itemId: 'projEmpWorkGrid3',
                            reference: 'projEmpWorkGrid3',
                            // collapsible: true,
                            // split: true,
                            // header: false,
                            flex: 2,
                            emptyText: Ext.String
                                .format(
                                    '<div style="display: table; width: 100%; height: 99%; #position: relative; overflow: hidden;">'
                                    + '<div style="#position: absolute; #top: 50%; display: table-cell; vertical-align: middle; text-align: center;">'
                                    + '<div style="#position: relative; #top: -50%;font-size:12px;">{0}</div>'
                                    + '</div>' + '</div>', '프로젝트를 선택해 주세요'),
                            loadingText: 'loading',
                            tbar: [
                                {
                                    xtype: 'button',
                                    text: '새로고침',
                                    handler: 'onReload2'
                                },
                                {
                                    fieldLabel: '이름',
                                    labelWidth: 45,
                                    xtype: 'textfield',
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
                            ],
                            bind: {
                                store: '{empWorkSumStore}'
                            },
                            viewConfig: {
                                stripeRows: false,
                                columnLines: true,
                            },
                            features: [{
                                ftype: 'summary'
                            }],
                            columns: {
                                defaults: {menuDisabled: true},
                                items: [
                                    {
                                        text: 'EMP_ID',
                                        dataIndex: 'EMP_ID',
                                        hidden: true,
                                        hideable: false,
                                        locked: true
                                    },
                                    {
                                        xtype: 'rownumberer',
                                        width: 40,
                                        sortable: false,
                                    },
                                    {
                                        text: '사번', dataIndex: 'EMP_NO', width: 50, align: 'center'
                                        , locked: true
                                    },
                                    {
                                        text: '이름', dataIndex: 'EMP_NM', width: 70, align: 'center'
                                        , locked: true
                                    },
                                    {
                                        text: '입사일자', dataIndex: 'ENT_DT', width: 90, align: 'center'
                                        , locked: true
                                    },
                                    {
                                        text: '퇴사일자', dataIndex: 'RETIRE_DT', width: 90, align: 'center'
                                        , locked: true
                                    },
                                    {
                                        text: '부서', dataIndex: 'DEPT', width: 70, align: 'center'
                                        , locked: true
                                    },
                                    {
                                        text: '직급', dataIndex: 'MNG_LVL', width: 70, align: 'center'
                                        , locked: true
                                    },
                                    // {text: '역할', dataIndex: 'MNG_LVL', width: 60, align: 'center'
                                    // , locked: true
                                    // },
                                    {text: '단가', dataIndex: 'EMP_PRICE', width: 80, align: 'right',
                                        renderer : function(value, meta, record) {
                                            meta.style = "background-color:#f5f5f0;";
                                            return Ext.util.Format.number(value, "0,000");
                                        }
                                    },
                                    // {
                                    //     text: '기본자질',
                                    //     dataIndex: 'BASIC_QUAL',
                                    //     width: 80,
                                    // }, {
                                    //     text: '직무수행능력',
                                    //     dataIndex: 'JOB_SKILL',
                                    //     width: 100,
                                    // }, {
                                    //     text: '직무수행태도',
                                    //     dataIndex: 'OFFCE_ATTUDE',
                                    //     width: 100,
                                    // },
                                    {
                                        text: '1월',
                                        dataIndex: 'M01',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '2월',
                                        dataIndex: 'M02',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '3월',
                                        dataIndex: 'M03',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '4월',
                                        dataIndex: 'M04',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '5월',
                                        dataIndex: 'M05',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '6월',
                                        dataIndex: 'M06',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '7월',
                                        dataIndex: 'M07',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '8월',
                                        dataIndex: 'M08',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '9월',
                                        dataIndex: 'M09',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '10월',
                                        dataIndex: 'M10',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '11월',
                                        dataIndex: 'M11',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {
                                        text: '12월',
                                        dataIndex: 'M12',
                                        width: 60,
                                        align: 'center',
                                        type: 'float',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return value;
                                        }
                                    },
                                    {text: '계', dataIndex: 'M_TOT', width: 80, align: 'center',
                                        renderer : function(value, meta, record) {
                                            meta.style = "background-color:#f5f5f0;";
                                            return Ext.util.Format.number(value, "0,000");
                                        }
                                    },
                                    {text: '개인표준원가', dataIndex: 'EMP_PRICE', width: 130, align: 'right',
                                        renderer : function(value, meta, record) {
                                            meta.style = "background-color:#f5f5f0;";
                                            return Ext.util.Format.number(value, "0,000");
                                        }
                                    },
                                    {text: '월 원가', dataIndex: 'ENT_DT', width: 100, align: 'right',
                                        renderer : function(value, meta, record) {
                                            meta.style = "background-color:#f5f5f0;";
                                            return Ext.util.Format.number(value, "0,000");
                                        }
                                    },
                                    {text: '손익', dataIndex: 'ENT_DT', width: 80, align: 'right',
                                        renderer : function(value, meta, record) {
                                            meta.style = "background-color:#f5f5f0;";
                                            return Ext.util.Format.number(value, "0,000");
                                        }
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
                        }
                    ]
                },
                // {
                //     xtype: 'panel',
                //     layout: 'border',
                //     title: '***',
                //     items: [
                //
                //     ]
                // }
            ]
        }

    ]
});

Ext.define('Encore.mng.view.project.Project', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.project',
    requires: [
        'Encore.mng.view.project.ProjectController',
        'Encore.mng.view.project.ProjectModel'
    ],

    controller: 'project-project',
    viewModel: {
        type: 'project-project'
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
                    title: '프로젝트 관리',
                    items: [
                        {
                            xtype: 'grid',
                            region: 'center',
                            itemId: 'projectGrid',
                            reference: 'projectGrid',
                            loadingText: 'loading',
                            flex: 1.5,
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
                                {
                                    xtype: 'button',
                                    text: '프로젝트 추가',
                                    handler: 'onNewProj'
                                },
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
                            xtype: 'tabpanel',
                            region: 'east',
                            collapsible: true,
                            itemId: 'projectTabpanel',
                            reference: 'projectTabpanel',
                            split: true,
                            header: false,
                            tabPosition: 'bottom',
                            flex: 3,
                            layout: 'border',
                            listeners: {
                                tabchange: 'onTabchange'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    region: 'center',
                                    layout: 'border',
                                    title: '프로젝트 팀원',
                                    flex: 2,
                                    items: [
                                        {
                                            xtype: 'grid',
                                            region: 'center',
                                            itemId: 'employGrid',
                                            reference: 'employGrid',
                                            collapsible: true,
                                            split: true,
                                            header: false,
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
                                                    handler: 'onNewEmp'
                                                },
                                                {
                                                    xtype: 'button',
                                                    text: '삭제',
                                                    handler: 'onDeleteEmploy'
                                                }
                                            ],
                                            bind: {
                                                store: '{projEmpStore}'
                                            },
                                            columns: {
                                                defaults: {menuDisabled: true},
                                                items: [
                                                    {
                                                        text: 'EMP_ID',
                                                        dataIndex: 'EMP_ID',
                                                        hidden: true,
                                                        hideable: false
                                                    },
                                                    {text: '사번', dataIndex: 'EMP_NO', flex: 0.5, align: 'center'},
                                                    {text: '이름', dataIndex: 'EMP_NM', flex: 1, align: 'center'},
                                                    {text: '직급', dataIndex: 'MNG_LVL', flex: 1, align: 'center'},
                                                    {text: '역할', dataIndex: 'PROJ_ROLE', flex: 1, align: 'center',
                                                        editor: new Ext.form.field.ComboBox({
                                                            typeAhead: true,
                                                            triggerAction: 'all',
                                                            displayField: 'name',
                                                            valueField: 'value',
                                                            selectOnTab: true,
                                                            store: Ext.create('Ext.data.Store', {
                                                                fields: ['name', 'value'],
                                                                data: [
                                                                    {name: 'PM', value: 'PM'},
                                                                    {name: '팀원', value: '팀원'},
                                                                ]
                                                            }),
                                                            lazyRender: true,
                                                            listClass: 'x-combo-list-small'
                                                        })
                                                    },
                                                    {
                                                        text: '투입일자',
                                                        dataIndex: 'EMP_PROJ_START_DT',
                                                        flex: 1,
                                                        align: 'center',
                                                    },
                                                    {
                                                        text: '종료일자',
                                                        dataIndex: 'EMP_PROJ_END_DT',
                                                        flex: 1,
                                                        align: 'center',
                                                        // editor: {
                                                        //     field: {
                                                        //         xtype: 'datefield',
                                                        //         format: 'Y-m-d',
                                                        //         submitFormat:'Y-m-d',
                                                        //         allowBlank: false
                                                        //     }
                                                        // }
                                                    },
                                                ]
                                            },
                                            listeners: {
                                                itemcontextmenu: function (grid, record, item, index, e) {
                                                    var contextMenu = Ext.create('Ext.menu.Menu', {
                                                        // height: 200,
                                                        // width: 250,
                                                        items: [{
                                                            text:'Preview',
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
                                    title: '투입 공수',
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
                                                    text: '구성원 추가',
                                                    handler: 'onNewEmp'
                                                },
                                            ],
                                            bind: {
                                                store: '{projEmpWorkSumStore}'
                                            },
                                            viewConfig: {
                                                stripeRows: false,
                                                columnLines: true,
                                            },
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
                                                        , locked: true
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
                                                    {text: '단가', dataIndex: 'EMP_PRICE', width: 80, align: 'center'},
                                                    {
                                                        text: '기본자질',
                                                        dataIndex: 'BASIC_QUAL',
                                                        width: 80,
                                                    }, {
                                                        text: '직무수행능력',
                                                        dataIndex: 'JOB_SKILL',
                                                        width: 100,
                                                    }, {
                                                        text: '직무수행태도',
                                                        dataIndex: 'OFFCE_ATTUDE',
                                                        width: 100,
                                                    },
                                                    {text: '1월', dataIndex: 'M01', width: 50, align: 'center'},
                                                    {text: '2월', dataIndex: 'M02', width: 50, align: 'center'},
                                                    {text: '3월', dataIndex: 'M03', width: 50, align: 'center'},
                                                    {text: '4월', dataIndex: 'M04', width: 50, align: 'center'},
                                                    {text: '5월', dataIndex: 'M05', width: 50, align: 'center'},
                                                    {text: '6월', dataIndex: 'M06', width: 50, align: 'center'},
                                                    {text: '7월', dataIndex: 'M07', width: 50, align: 'center'},
                                                    {text: '8월', dataIndex: 'M08', width: 50, align: 'center'},
                                                    {text: '9월', dataIndex: 'M09', width: 50, align: 'center'},
                                                    {text: '10월', dataIndex: 'M10', width: 50, align: 'center'},
                                                    {text: '11월', dataIndex: 'M11', width: 50, align: 'center'},
                                                    {text: '12월', dataIndex: 'M12', width: 50, align: 'center'},
                                                ]
                                            },
                                            listeners: {
                                                itemcontextmenu: function (grid, record, item, index, e) {
                                                    var contextMenu = Ext.create('Ext.menu.Menu', {
                                                        // height: 200,
                                                        // width: 250,
                                                        items: [{
                                                            text:'Preview',
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
                            ],
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

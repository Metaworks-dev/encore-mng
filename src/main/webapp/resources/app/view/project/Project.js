Ext.define('Encore.mng.view.project.Project',{
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
    title: '프로젝트 관리',
    layout: 'border',
    items: [
        {
            xtype: 'grid',
            region: 'center',
            itemId: 'projectGrid',
            reference: 'projectGrid',
            loadingText: 'loading',
            flex: 1,
            tbar: [
                {
                    xtype: 'button',
                    text: '새로고침',
                    handler: 'onReload'
                },
                {
                    fieldLabel: '프로젝트',
                    labelWidth: 65,
                    xtype: 'textfield',
                    reference: 'PROJ_NM',
                    itemId: 'PROJ_NM',
                    name: 'PROJ_NM',
                    // plugins: ['clearbutton'],
                    width: 250,
                    emptyText: '프로젝트',
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
                    text: '프로젝트 추가',
                    handler: 'onNew'
                },
            ],
            bind: {
                store: '{projStore}'
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
                {text: 'PROJ_ID', dataIndex: 'PROJ_ID', hidden: true, hideable: false},
                {text: '프로젝트명', dataIndex: 'PROJ_NM', flex: 3, align: 'left'},
                {text: '상태', dataIndex: 'PROJ_STAT_CD', flex: 1, align: 'center'},
                {text: '시작일자', dataIndex: 'PROJ_START_DT', flex: 1.5, align: 'center'},
                {text: '종료일자', dataIndex: 'PROJ_END_DT', flex: 1.5, align: 'center'},
                {text: '인원', dataIndex: 'PROJ_EMP_CNT', flex: 1, align: 'center'},
                // {text: '등록일자', dataIndex: 'REG_DTM', flex: 1, align: 'center'}
            ],
            listeners: {
                itemdblclick: 'onItemdblclick'
            }
        },
        {
            xtype: 'panel',
            region: 'east',
            layout: 'border',
            collapsible: true,
            split: true,
            header: false,
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
                    loadingText: 'loading',
                    tbar: [
                        // {
                        //     xtype: 'button',
                        //     text: '새로고침',
                        //     handler: 'onReload'
                        // },
                        // {
                        //     fieldLabel: '프로젝트',
                        //     labelWidth: 75,
                        //     xtype: 'textfield',
                        //     reference: 'PROJ_NM',
                        //     itemId: 'PROJ_NM',
                        //     name: 'PROJ_NM',
                        //     width: 250,
                        //     emptyText: '프로젝트',
                        //     listeners: {
                        //         specialKey: function (field, e) {
                        //             if (e.getKey() == e.ENTER) {
                        //                 console.log('enter');
                        //                 // me.membGrid.down('#searchBtn').fireEvent('click');
                        //             }
                        //         }
                        //     }
                        // },
                        // {
                        //     xtype: 'button',
                        //     itemId: 'btnSearch',
                        //     text: '검색',
                        //     disabled: false,
                        //     handler: 'onSearch'
                        // },
                        '->',
                        {
                            xtype: 'button',
                            text: '구성원 추가',
                            handler: 'onNew'
                        },
                    ],
                    bind: {
                        store: '{empStore}'
                    },
                    columns: [
                        // {text: 'EMP_ID', dataIndex: 'EMP_ID', hidden: true, hideable: false},
                        {text: '사번', dataIndex: 'EMP_NO', flex: 0.5, align: 'center'},
                        // {text: 'E-mail', dataIndex: 'EMAIL', flex: 2, align: 'left'},
                        // {text: 'Password', dataIndex: 'PASSWD', flex: 1, align: 'left'},
                        {text: '이름', dataIndex: 'EMP_NM', flex: 1, align: 'center'},
                        {text: '직급', dataIndex: 'MNG_LVL', flex: 1, align: 'center'},
                        {text: '투입일자', dataIndex: 'START_DT', flex: 1, align: 'center'},
                        {text: '투입일자', dataIndex: 'ENT_DT', flex: 1, align: 'center'}
                    ],
                    listeners: {
                        itemdblclick: 'onItemdblclick'
                    }
                },
                {
                    xtype: 'grid',
                    region: 'south',
                    itemId: 'employProfitGrid',
                    reference: 'employProfitGrid',
                    collapsible: true,
                    split: true,
                    header: false,
                    flex: 2,
                    loadingText: 'loading',
                    tbar: [
                        // {
                        //     xtype: 'button',
                        //     text: '새로고침',
                        //     handler: 'onReload'
                        // },
                        // {
                        //     fieldLabel: '프로젝트',
                        //     labelWidth: 75,
                        //     xtype: 'textfield',
                        //     reference: 'PROJ_NM',
                        //     itemId: 'PROJ_NM',
                        //     name: 'PROJ_NM',
                        //     width: 250,
                        //     emptyText: '프로젝트',
                        //     listeners: {
                        //         specialKey: function (field, e) {
                        //             if (e.getKey() == e.ENTER) {
                        //                 console.log('enter');
                        //                 // me.membGrid.down('#searchBtn').fireEvent('click');
                        //             }
                        //         }
                        //     }
                        // },
                        // {
                        //     xtype: 'button',
                        //     itemId: 'btnSearch',
                        //     text: '검색',
                        //     disabled: false,
                        //     handler: 'onSearch'
                        // },
                        '->',
                        {
                            xtype: 'button',
                            text: '구성원 추가',
                            handler: 'onNew'
                        },
                    ],
                    bind: {
                        store: '{empStore}'
                    },
                    columns: [
                        // {text: 'EMP_ID', dataIndex: 'EMP_ID', hidden: true, hideable: false},
                        {text: '사번', dataIndex: 'EMP_NO', flex: 0.5, align: 'center'},
                        // {text: 'E-mail', dataIndex: 'EMAIL', flex: 2, align: 'left'},
                        // {text: 'Password', dataIndex: 'PASSWD', flex: 1, align: 'left'},
                        {text: '이름', dataIndex: 'EMP_NM', flex: 1, align: 'center'},
                        {text: '1', dataIndex: 'D1', flex: 0.5, align: 'center'},
                        {text: '2', dataIndex: 'D2', flex: 0.5, align: 'center'},
                        {text: '3', dataIndex: 'D3', flex: 0.5, align: 'center'},
                        {text: '4', dataIndex: 'D4', flex: 0.5, align: 'center'},
                        {text: '5', dataIndex: 'D5', flex: 0.5, align: 'center'},
                        {text: '6', dataIndex: 'D6', flex: 0.5, align: 'center'},
                        {text: '7', dataIndex: 'D7', flex: 0.5, align: 'center'},
                        {text: '8', dataIndex: 'D8', flex: 0.5, align: 'center'},
                        {text: '9', dataIndex: 'D9', flex: 0.5, align: 'center'},
                        {text: '10', dataIndex: 'D10', flex: 0.5, align: 'center'},
                        {text: '11', dataIndex: 'D11', flex: 0.5, align: 'center'},
                    ],
                    listeners: {
                        itemdblclick: 'onItemdblclick'
                    }
                }
            ]
        }
    ]
});

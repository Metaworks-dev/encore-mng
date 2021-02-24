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
            flex: 2,
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
                {text: '프로젝트명', dataIndex: 'PROJ_NM', flex: 3, align: 'center'},
                {text: '시작일자', dataIndex: 'EMAIL', flex: 1, align: 'left'},
                {text: '종료일자', dataIndex: 'PASSWD', flex: 1, align: 'left'},
                {text: '인원', dataIndex: 'EMP_NM', flex: 1, align: 'center'},
                // {text: '직급', dataIndex: 'MNG_LVL', flex: 1, align: 'center'},
                // {text: '입사일자', dataIndex: 'ENT_DT', flex: 1, align: 'center'}
            ],
            listeners: {
                itemdblclick: 'onItemdblclick'
            }
        },
        {
            xtype: 'grid',
            region: 'east',
            itemId: 'employGrid',
            reference: 'employGrid',
            collapsible: true,
            split: true,
            header: false,
            flex: 1,
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
        }
    ]
});

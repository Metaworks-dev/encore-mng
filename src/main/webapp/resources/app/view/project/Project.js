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
            columns: [
                {text: 'PROJ_ID', dataIndex: 'PROJ_ID', hidden: true, hideable: false},
                {text: '프로젝트명', dataIndex: 'PROJ_NM', flex: 3, align: 'left'},
                {text: '상태', dataIndex: 'PROJ_STAT_CD', flex: 1, align: 'center'},
                {text: '시작일자', dataIndex: 'PROJ_START_DT', flex: 1.5, align: 'center'},
                {text: '종료일자', dataIndex: 'PROJ_END_DT', flex: 1.5, align: 'center'},
                {text: '인원', dataIndex: 'PROJ_EMP_CNT', flex: 1, align: 'center'},
            ],
            listeners: {
                itemdblclick: 'onItemdblclick',
                itemclick: 'onItemclick'
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
                    emptyText: Ext.String
                        .format(
                            '<div style="display: table; width: 100%; height: 99%; #position: relative; overflow: hidden;">'
                            + '<div style="#position: absolute; #top: 50%; display: table-cell; vertical-align: middle; text-align: center;">'
                            + '<div style="#position: relative; #top: -50%;font-size:12px;">{0}</div>'
                            + '</div>' + '</div>', '프로젝트를 선택해 주세요'),
                    loadingText: 'loading',
                    tbar: [
                        {
                            xtype: 'hidden',
                            reference: 'PROJ_ID',
                            itemId: 'PROJ_ID',
                            name: 'PROJ_ID'
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
                            text: '구성원 추가',
                            handler: 'onNewEmp'
                        },
                    ],
                    bind: {
                        store: '{empStore}'
                    },
                    columns: [
                        {text: 'PROJ_ID', dataIndex: 'PROJ_ID', hidden: true, hideable: false},
                        {text: 'EMP_ID', dataIndex: 'EMP_ID', hidden: true, hideable: false},
                        {text: '사번', dataIndex: 'EMP_NO', flex: 0.5, align: 'center'},
                        {text: '이름', dataIndex: 'EMP_NM', flex: 1, align: 'center'},
                        {text: '직급', dataIndex: 'MNG_LVL', flex: 1, align: 'center'},
                        {text: '단가', dataIndex: 'EMP_PRICE', flex: 1, align: 'center'},
                        {text: '역할', dataIndex: 'PROJ_ROLE', flex: 1, align: 'center'},
                        {text: '투입일자', dataIndex: 'EMP_PROJ_START_DT', flex: 1, align: 'center'},
                        {text: '종료일자', dataIndex: 'EMP_PROJ_END_DT', flex: 1, align: 'center'},
                    ],
                    listeners: {
                        itemdblclick: 'onItemdblclick'
                    }
                }
            ]
        }
    ]
});

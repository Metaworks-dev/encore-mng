Ext.define('Encore.mng.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'Encore.mng.view.main.MainController',
        'Encore.mng.view.main.MainModel',
        'Encore.mng.view.main.List'
    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: '{name}'
            },
            flex: 0
        },
        // iconCls: 'fa-th-list'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        bodyPadding: 20,
        tabConfig: {
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },
    tbar: [
        {
            xtype: 'button',
            text: 'Metanet Portal',
            handler: function() {
                window.open(
                    'http://portal.metanet.co.kr',
                    '_blank' // <- This is what makes it open in a new window.
                )
            }
        },
        {
            xtype: 'button',
            text: '전자결재',
            handler: function() {
                window.open(
                    'https://metanet.sharepoint.com/sites/gwen-core/gw',
                    '_blank' // <- This is what makes it open in a new window.
                )
            }
        },
        {
            xtype: 'button',
            text: '경비시스템',
            handler: function() {
                window.open(
                    'http://exp.metanetict.co.kr/uat/uia/egovLoginUsr.do',
                    '_blank' // <- This is what makes it open in a new window.
                )
            }
        },
        '->',
        {
            xtype: 'button',
            text: '로그아웃',
            handler: 'onConfirm'
        }
    ],
    items: [
        {
            title: 'Dashboard',
            // iconCls: 'fa-home',
            // The following grid shares a store with the classic version's grid as well!
            items: [
                {
                    xtype: 'mainlist'
                }]
        }, {
            title: '프로젝트 관리',
            items: [
                {
                    xtype: 'project'
                }]
        }, {
            title: '직원 관리',
            items: [
                {
                    xtype: 'employ'
                }]
        }, {
            title: '투입공수',
            bind: {
                html: '{loremIpsum}'
            }
        }, {
            title: 'Settings',
            bind: {
                html: '{loremIpsum}'
            }
        }, {
            title: 'logout',
            // onClick: function() {
            //     console.log('onClick;');
            //     window.location.replace('/logout.do');
            // },
            listeners: {
                click: 'onConfirm'
            }
        }]
});

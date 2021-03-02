Ext.define('Encore.mng.view.work.WorkController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.work-work',
    onColumnRender: function(value, meta, record)  {
        // console.log(value);
        console.log(meta);
        console.log('cellIndex:' + meta.cellIndex);
        console.log(record);
        var val = eval('record.data.H' + '');
        // if (!Ext.isEmpty(record.data.H02) && val === '7') {
        //     meta.style="background-color:#ADD8E6";
        // } else if (!Ext.isEmpty(record.data.H02) && val === '1') {
        //     meta.style="background-color:#FFB6C1";
        // }
        return value;
    }
});

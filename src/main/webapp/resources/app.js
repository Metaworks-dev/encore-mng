/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'Encore.mng.Application',

    name: 'Encore.mng',

    requires: [
        // This will automatically load all classes in the Encore.mng namespace
        // so that application classes do not need to require each other.
        'Encore.mng.*'
    ],

    // The name of the initial view to create.
    mainView: 'Encore.mng.view.main.Main'
});

require.config({
    baseUrl: 'scripts',
    paths: {
        "components": "../bower_components",
        "modernizr": "../bower_components/modernizr/modernizr"
    },
    shim: {
    }
});

require(["modules/module1"], function(module1)
{

});
var MediaLibrary = Class.create({
   
    baseUrl : "/media/browse-json.jsp?genThumbs=true&path=",
    
    getNodeListing: function ( path, callback ) {
        
        var url = this.baseUrl + encodeURIComponent(path);
            
        new Ajax.Request (url, {
            method : 'get',
            onSuccess : function (transport, json) {
                if (!json) {
                    json = transport.responseText.evalJSON ();
                }
                console.log( callback );
                
                callback (json);
            },
            onFailure : function () {
                console.log ('ajax call failed');

            }
        });
        
//        url = "http://kusanagi.local/media2/?action=folderList&argument1=videos/tluda/";
//        
//        new Ajax.Request (url, {
//            method : 'get',
//            onSuccess : function (transport, json) {
//                if (!json) {
//                    json = transport.responseText.evalJSON ();
//                }
//                console.log ("Air Video");
//                console.log (json);
//            },
//            onFailure : function () {
//                console.log ('ajax call failed');
//
//            }
//        });
//        
        
    },
    
    getPreviewImage: function ( node ) {
        return null;
    }

});

var mediaLibrary = new MediaLibrary();
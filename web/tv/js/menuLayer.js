var menuLayer = null;

var MenuLayer = Class.create ({

    defaultImage : "images/5601-3d-abstract-white-wallpaper.jpg",// "02857_zvirwhirlpool_2560x1440.jpg";
    currentNode : null,
    activeLayer : null,
    
    baseUrl : "/media/browse-json.jsp?genThumbs=true&path=",
    pathStack : [],
    hasPrev : false,
    currentPath : "/Volumes/Blue%20Mana/media/videos/",
    listEntryCount : 0,
    globalRefName: null,
    
    initialize : function ( globalRefName ) {
        console.log ('inited');
        this.globalRefName = globalRefName;
        this.pathStack = [];
        
        var that = this;
//        document.documentElement.on ('keyup', function (event) {
//            that.handleKeyUp (event);
//        });   


        $j(window).bind('keyup',function() {
            that.handleKeyUp (event);
        });
        
        if ( this.globalRefName ) {
            setTimeout( this.globalRefName + '.updateTime("' + this.globalRefName + '")',1000);
            
        }

        $j(window).bind('resize',function() {
            that.handleWindowSize ();
        });
        
//       window.onresize = function() {
//            that.handleWindowSize ();
//        };
        
        this.handleWindowSize ();
        
    },

    handleWindowSize: function () {
        var windowHeight = $j (window).height ();
        var windowWidth = $j (window).width ();

        if (windowHeight < 1080 || windowWidth < 1920) {
            $j('.previewZone').css('display','none');
        }        
        else {
            $j('.previewZone').css('display','block');
        }
    } ,
    
    updateTime: function ( globalRefName ) {
        var now = new Date();
        var formattedTime = $j.format.date(new Date(),' HH:mm:ss ');//now.toTimeString();
        $j('#timeDiv').html(formattedTime);    
        setTimeout( globalRefName + '.updateTime("' + globalRefName + '")',1000);
    },
    
    showVideo : function (idx) {
        
        console.log(this.currentNode.entries[idx].name);
        
        
        if ( this.currentNode.entries[idx].name.endsWith(".swf") ) {
            this.activeLayer = layerRegistry.getLayer('flash');
        }
        else if ( this.currentNode.entries[idx].name.endsWith(".m4a") ) {
            this.activeLayer = layerRegistry.getLayer('audio');
        }
        else if ( this.currentNode.entries[idx].name.endsWith(".mp3") ) {
            this.activeLayer = layerRegistry.getLayer('audio');
        }    
        else if ( this.currentNode.entries[idx].name.endsWith(".html") ) {
            this.activeLayer = layerRegistry.getLayer('web');
        }  
        else if ( this.currentNode.entries[idx].name.endsWith(".svg") ) {
            this.activeLayer = layerRegistry.getLayer('web');
        }       
        else if ( this.currentNode.entries[idx].name.endsWith(".wmv") ) {
            this.activeLayer = layerRegistry.getLayer('plugin');
        }           
        else {      
            this.activeLayer = layerRegistry.getLayer('video');
        }
        
//        console.log('layer: ')
        this.activeLayer.setObject (this.currentNode.entries[idx]);
        this.activeLayer.show ();        
    },

    renderResults : function (data) {
        this.currentNode = data;

        this.currentPath = this.currentNode.path;
        this.pathStack.push (this.currentPath);

        var backgroundImage = this.currentNode['background-image'];
        if (backgroundImage == null) {
            backgroundImage = this.defaultImage;
        }
        
        layerRegistry.getLayer('background').setObject({
            type: 'image',
            url: backgroundImage
            });
        
        // hack, I am mishandling the object, but don't know why
        //var globalRefName = "menuLayer";
        
        
        $j ('#path').html (this.currentNode.title);
        $j ('#title').html (this.currentNode.title);

        var entries = this.currentNode.entries;
        var listingText = "<ul>";

        var entryId = 0;

        console.log( this.pathStack );
        
        this.hasPrev = false;
        if (this.pathStack.length > 1) {
            this.hasPrev = true;
            listingText += '<li class="file listEntry" id="entry-' + 0 + '"><a href="#"' //;//javascript:openPath(\'' + ".."                   
                    + ' onclick="' + this.globalRefName + '.openPath(\'' + ".."
                    + '\')"><img src="images/return.png" alt="[back]" style="width: 30px;"/></a> - ' + "dir" + '</li>';
        }

        console.log(listingText);
        
        if (!this.currentPath.endsWith ("/")) {
            this.currentPath += "/";
        }

        for ( var i = 0; i < entries.length; i++) {
            var name = "";
            if (entries[i].name) {
                name = entries[i].name;
            }

            var type = "file";
            var href = "";

            if (entries[i].type === "folder") {
                type = "dir";
                href = this.globalRefName + '.openPath(\'' + this.currentPath + "" + name + '\')';
            } else {
                href = this.globalRefName + '.showVideo(\'' + i + '\')'; // entries[i].url;
                //if (entries[i].name.endsWith ('.swf')) {
                //    href = 'menuLayer.showFlash(\'' + entries[i].url + '\')'; // entries[i].url;
               // }
            }

            // href="javascript:' + href + '"
            listingText += '<li class="file listEntry" id="entry-' + (i + 1) + '"><a href="#" onclick="' + href
                    + '">' + entries[i].name + '</a> - [' + type + ']</li>';

        }

        listingText += "</ul>";

        $j ('#file-list-scroll').html (listingText);
        $j ('#entry-0').focus ();

        this.listEntryCount = 0;
        var that = this;
        for ( var i = 0; i < (entries.length + 1); i++) {
            if ($j ('#entry-' + i).length > 0) {

                $ ('entry-' + i).on ('mouseover', function (event) {
                    that.changeSelection (event);
                    that.showDetails (event)
                });

                this.listEntryCount++;
            }
            // console.log ('xxxxx');

        }

        if (this.listEntryCount > 1) {
            $j ('#entry-1').addClass ('current');
        } else if (listEntryCount > 0) {
            $j ('#entry-0').addClass ('current');
        }
        this.showDetails ();
    },

    openPath : function (path) {

        if (path === "..") {
            if (this.pathStack.length < 1) {
                return false;
            }
            path = this.pathStack.pop ();
            path = this.pathStack.pop ();
        }

        console.log ("path: " + path);

        if (path === undefined) {
            return false;
        }
        var url = this.baseUrl + encodeURIComponent (path);

        console.log (url);

        var that = this;

        mediaLibrary.getNodeListing(path,
                function( json ) { that.renderResults(json); } );

        /*
         * $.ajax ({ url : "http://kusanagi.local:32400/video/", dataType :
         * 'json', // data: data, success : function (data) { console.log
         * (data); } });
         */

        return false;

    },

    changeSelection : function (event) {

        var matchList = $j ('.current');
        // console.log(matchList);
        if (event.srcElement.id.startsWith ("entry-")) {
            var id = event.srcElement.id;
            matchList.removeClass ('current');
            $j ("#" + id).addClass ('current');
        }
        // else if (matchList.length > 0) {
        // matchList.removeClass ('current');
        // $j("#" + this.id).addClass ('current');
        // }
        else {
            // $j("#entry-1").addClass ('current');

        }
    },

    showDetails : function () {

        // var parts = this.id.split("-");
        var matchList = $j ('.current');

        if (matchList.length > 0) {
            var idx = $j ('.current')[0].id.split ("-")[1];

            if (idx != 0) {
                console.log (this.currentNode);
                var entry = this.currentNode.entries[idx - 1];
                // console.log(entry);
                var description = "";
                if (entry.duration) {
                    var duration = entry.duration / 1000;
                    var hours = Math.floor (duration / 3600);
                    var minutes = Math.floor ((duration / 60) % 60);
                    var seconds = Math.floor (duration % 60);

                    description += "Duration: "
                            + ((hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes + ":"
                                    + (seconds < 10 ? "0" : "") + seconds) + "<br/>";
                }
                description += entry.description;
                $j ('#info').html (description);

                if (entry["preview-image"]) {
                    $j ('#previewImage').html ('<img src="' + entry["preview-image"] + '"/>');
                } else if (entry.type === "folder") {
                    $j ('#previewImage').html ('<img src="images/folder.png"/>');
                } else {
                    $j ('#previewImage').html ('');
                }
            } else {
                $j ('#info').html ("");
            }
        }
    },
    
    getEntryAt: function ( idx ) {
        return this.currentNode.entries[idx-1];
    },

    handleKeyUp : function (event) {
        
        if (this.activeLayer && this.activeLayer.visible) {
            this.activeLayer.handleKeyUp(event);
            return;
        }

        switch (event.keyCode) {
        case 38:

            var matchList = $j ('.current');
            if (matchList.length > 0) {

                var idx = $j ('.current')[0].id.split ("-")[1];
                var newIdx = parseInt (idx) - 1;

                if ((this.hasPrev && newIdx < 0) || (!this.hasPrev && newIdx < 1)) {
                    newIdx = this.listEntryCount - 1;
                }

                if ($j ('#entry-' + newIdx).length > 0) {
                    $j ('#entry-' + idx).removeClass ('current');
                    $j ('#entry-' + newIdx).addClass ('current');

                    if (utils.isScrolledIntoView ($j ('#entry-' + newIdx)[0], $j ('#file-list')[0])) {
                        console.log ('in view');
                    } else {
                        console.log ('not in view');
                        $j ('#entry-' + newIdx)[0].scrollIntoView ();
                    }
                }
                this.showDetails ();

            }
            break;
        case 40:

            var matchList = $j ('.current');
            if (matchList.length > 0) {
                var idx = $j ('.current')[0].id.split ("-")[1];
                var newIdx = parseInt (idx) + 1;

                if (newIdx >= this.listEntryCount) {
                    if (this.hasPrev) {
                        newIdx = 0;
                    } else {
                        newIdx = 1;
                    }
                }

                if ($j ('#entry-' + newIdx).length > 0) {
                    $j ('#entry-' + idx).removeClass ('current');
                    $j ('#entry-' + newIdx).addClass ('current');

                    if (utils.isScrolledIntoView ($j ('#entry-' + newIdx)[0], $j ('#file-list')[0])) {
                        console.log ('in view');
                    } else {
                        $j ('#entry-' + newIdx)[0].scrollIntoView (false);
                    }

                }
                this.showDetails ();

            }
            break;
        case 'R'.charCodeAt(0):
            this.activeLayer = layerRegistry.getLayer('video');
            this.activeLayer.setRandom (true);
            this.activeLayer.playAll (this.currentNode.entries);
            break;
        case 'P'.charCodeAt(0):
            this.activeLayer = layerRegistry.getLayer('video');          
            this.activeLayer.setRandom (false);
            this.activeLayer.playAll (this.currentNode.entries);
            break;                           
        case 13:
            var matchList = $j ('.current');
            if (matchList.length > 0) {
//                var idx = $j ('.current')[0].id.split ("-")[1];
//                this.openPath ( this.getEntryAt(idx).path );
                eval ( $j ('.current a').attr('onclick') );
            }
//            var matchList = $j ('.current a');
//            if (matchList.length > 0) {
//                window.location = matchList[0].href;
//            }
            break;
        case 27:
            this.openPath ('..');
            break;
        default:
            console.log (event.keyCode);
        }
    }

});

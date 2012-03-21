var menuLayer = null;

var MenuLayer = Class.create ({
    
    node : null,
    globalRefName: null,
    previousPath: [],

    initialize : function ( globalRefName ) {
        this.globalRefName = globalRefName;
        this.initLayout();
    },

    initLayout: function () {
        var html = "";
        
        html += '<div class="header"></div>';
        html += '<div class="content"></div>';
        html += '<div class="footer"></div>';
        $j('#body').html(html);
    },
    
//    renderHeader: function () {
//        
//        $j('#header').html(html);
//    },
    
    renderPage: function ( node ) {
        
        this.node = node;
        
        this.previousPath.push(this.node.path);
        
        console.log(node);
        
        var entries = this.node.entries;
        
        var html = "";
        
        //><img src="images/IphoneNavigationButton_Back.png"/>
        //html += '<div class="header"> ' + this.node.title + '</div>';
        
//        console.log("----");
//        console.log(this.previousPath);
        if ( this.previousPath.length > 1 ) {
            html += '<div class="back"><a href="#" onclick="' + this.globalRefName + '.openPath(\'..\')">back</a></div>';
        }
//        /html += '<div class="back"><a href="#" onclick="openPath(\'..\')">back</a></div>';
        html += '<span class="title">' + this.node.title + '</span>';
        
        $j('.header').html(html);
        
        html = "";
        html += "<ul>";
        //html += '<li class="top"></li>';
        for ( var i=0; i < entries.length; i++ ) {
            var image = "";
            var anchor = "";
            
            if ( entries[i].type === "folder"  ) {
                image = '<img class="icon" src="images/folder-icon.png" />';
                var fnCall = this.globalRefName + '.openPath(\'' + entries[i].path +  '\')'; 
                anchor = ' href="#" onclick="' + fnCall + '"';
            }
            else if ( entries[i].type === "file"  ) {
                image = '<img class="icon" src="images/Videos-Library-icon.png" />';
                var path = entries[i].path;
                var len = "/Volumes/Blue Mana".length;
                path = path.substring(len);
                anchor = 'href="' +  path  + '"';
            }
            
            html += '<li>' + image + '<a ' + anchor + '"><span class="label" id="label-' + i + '">' + entries[i].name + '</span></a> <span class="desc">' + entries[i].type + '</span>' + '</li>';            
        }
        
        html += '<li class="bottom"></li>';
        html += "</ul>";
        
        $j('.content').html(html);
        
        var labels = $j('.label');
        
        $j('.label').expander();
        for ( var i=0;i<labels.length; i++ ) {
            labels[i].expander();
        }
//        var labels = $j('.label');
//        console.log( $j('.label').attr('id') );
//        for ( var i=0;i<labels.length; i++ ) {
//            var x = $j(labels[i]);
//            var y = labels[i];
//            var element = document.getElementById( $j(labels[i]).attr('id') );
//            utils.abridge( element );
//            //$j(labels[i]).html('xxx');
//        }
    },
    
    openPath : function ( path ) {
        var that = this;
        
        if ( path == '..' ) {
            this.previousPath.pop ();  
            path = this.previousPath.pop ();    
            console.log('xxx');
        }   
        console.log(path);
        console.log(this.previousPath);
        
        path = encodeURIComponent (path);
        mediaLibrary.getNodeListing(path, function ( json) { that.renderPage(json); });
            
    }
});

$j (document).ready (function () {

    menuLayer = new MenuLayer ('menuLayer');
    menuLayer.openPath ("/Volumes/Blue%20Mana/media/videos/");
    
});

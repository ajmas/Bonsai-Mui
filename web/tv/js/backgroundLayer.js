var BackgroundLayer = Class.create (Layer.prototype, {
    
    name: 'background',
    
    initialize : function ( $superclass ) {
        this.name = 'background';
    },
    

    show : function () {
        
        var url = "http://superfad.com/missioncontrol/traffic/";
//        var url = "http://lights.elliegoulding.com/";

        var html = '';
        
        html += '<iframe src="' + url + '" style="position: absolute; top: 0px; left 0px; right: 0px; bottom: 0px; margin: 0 auto; width: 100%; height: 100%;"></iframe>';
        
//        console.log(this.name);
//        console.log( $j('.' + this.name ) );
//        console.log( $j('.background') );
        $j('.' + this.name ).css ('display', 'block');
        $j('.' + this.name ).html ( html );
        
        //Layer.prototype.show.call(this);
        this.visible = true;
    },
    
    setObject: function ( object ) {
        this.object = object;
        
        if ( object.type == "image" ) {
            $j('.' + this.name ).html ( '' );
            $j('.' + this.name ).css('background-image','url(\'' + object.url + '\')');
        }
    }

});

$j (document).ready (function () {
    var background = new BackgroundLayer(); //Object.extend(new Layer(),new BackgroundLayer());
    layerRegistry.register(background );

    background.show();
});
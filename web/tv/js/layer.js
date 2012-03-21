var Layer = Class.create( {
    
    object: null,
    visible: false,
    url: null,
    name: undefined,
    
    initialize: function () {
        
    },
    
    getName: function () {
        return this.name;
    },
    
    setObject: function  ( object ) {
        this.object = object;
    },
    
    setObject: function  () {
        return this.object;
    },
        
    isVisible: function () {
        return this.visible;
    },
    
    setVisible: function ( visible ) {
        //this.visible = visible;
        if ( visible ) {
            this.show();
        }
        else {
            this.hide ();
        }
    },
    
    isVisible: function () {
        return this.visible;        
    },
    
    show: function () {
        this.visible = true;
    },
    
    hide: function () {
        this.visible = false;
    }    
        
    

});
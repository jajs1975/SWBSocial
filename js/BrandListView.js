var brandListView = function (service) {

    var brands;

    this.initialize = function() {
        this.$el = $('<div/>');
        this.render();
    };

    this.setBrands = function(list) {
        brands = list;
        this.render();
    }

    this.render = function() {
        this.$el.html(this.template(brands));
        return this;
    };
	
	
    this.initialize();

}
var BrandHomeView = function () {

    var brandListView;

    this.initialize = function() {
		alert("Entra a InitBrandHomeView");
        this.$el = $('<div/>');
        //this.$el.on('keyup', '.search-key', this.findByName);
		brandListView = new BrandListView();
        this.render();
    };

    this.render = function() {
        this.$el.html(this.template());
		this.getBrands();
        $('.content', this.$el).html(brandListView.$el);
        return this;
    };

	this.getBrands = function() {
        service.getBrands(window.localStorage["username"]).done(function(brands) {
            brandListView.setBrands(brands);
        });
    };

    this.initialize();
}
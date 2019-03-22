class FloatingBar {
    constructor ({$bar, scrollTop}) {
        this.$bar = $bar;
        this.scrollTop = scrollTop;
    }

    init () {
        const that = this;
        const $window = $(window);

        this.$bar.hide();

        $window.on('scroll', function () {
            if (that.scrollTop < $window.scrollTop()) {
                that.$bar.show();
            }
        });
    }
}

export default FloatingBar

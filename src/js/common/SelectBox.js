class SelectBox {
    constructor ({$button, $menu, $menuItem, $result}) {
        this.$button = $button;
        this.$menu = $menu;
        this.$menuItem = $menuItem;
        this.$result = $result;
    }

    init () {
        const that = this;

        this.$menu.hide();

        this.$button.on('click', function () {
            that.$menu.toggle();
            that.$button.toggleClass('on');
        });

        this.$menuItem.on('click', function (e) {
            e.preventDefault();

            that.$result.text($(this).text());
            that.$button.removeClass('on');
            that.$menu.hide();
        });
    }
}

export default SelectBox

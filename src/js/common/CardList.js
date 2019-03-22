class CardList {
    constructor ({$wrap, data, template}) {
        this.$wrap = $wrap;
        this.data = data;
        this.template = template;
    }

    init (data) {
        this.data = [];
        this.add(data);
    }

    add (data) {
        this.data = this.data.concat(data);

        this.data.map(d => {
            return $(this.template(d));
        }).forEach($item => {
            this.$wrap.append($item);
        });
    }
}

export default CardList

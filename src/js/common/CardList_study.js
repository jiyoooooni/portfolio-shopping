class CardList {
    constructor ({$wrap, data, template}) {//생성자 함수
        this.$wrap = $wrap;
        this.data = data;
        this.template = template;
    }

    init (data) {
        this.data = []; // data를 배열로 받겠다.
        this.add(data); // CardList에 배열값인 data를 추가해주겠다.
    }

    add (data) {
        this.data = this.data.concat(data); // add에 data를 배열로 추가해주겠다.

        this.data.map(d => { // [{product1}, {product2}, ...] => [$el1, $el2, ...]
            const type = d.type || 'default'; // data의 type이 있거나('event'), default면 type이라 한다.
                        // 'event'|| 'default'

            return $(this.template[type](d)); // type = default인 것을 template으로 리턴해라.
        }).forEach($item => {
            this.$wrap.append($item); // $('#art_products')에 $item을 넣어주겠다.
        });
    }
}

export default CardList

class CardList {
    constructor({$wrap, data, template}){
        this.$wrap = $wrap;
        this.data = data;
        this.template = template;
    }

    init (data) {
        this.data = [];
        this.add(data); //??
    }
    add (data) {
        this.data.map( d=> {
            const type = d.type || 'default';

            return $(this.template[type](d));
        }).forEach($item => {
            $(this.$wrap.append($item));
        });
    }
}

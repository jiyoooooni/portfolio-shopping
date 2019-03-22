import CardList from "./common/CardList.js"

const productCardList = new CardList({
    $wrap: $('#art_products'),
    data: [],
    template: _.template(`<li class="art_list">
    <a href="#">
      <div class="thumb">
        <img src="<%= imageUrl %>" alt="">
        <button type="button">
          <span class="blind">찜하기</span>
        </button>
      </div>
      <strong class="price"><%= price %></strong>
      <span class="info"><%= description %></span>
      <div class="made">
        <div class="made_logo">
          <img src="<%= shopImageUrl %>" alt="">
        </div>
        <span><%= shop %></span>
      </div>
    </a>
  </li>`)
});

fetchItems();

$(window).on('scroll', function () {
    const scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();

    if (scrollBottom < 10) {
        fetchItems();
    }
});

function fetchItems () {
    $.ajax({
        method: 'get',
        url: 'json/products.json',
        success: function (data) {
            productCardList.add(data.items)
        }
    });
}

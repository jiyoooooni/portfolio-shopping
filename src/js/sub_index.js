import CardList from "./common/CardList.js"
import SelectBox from "./common/SelectBox.js"

const filterbox = new SelectBox({
  $button: $('#select_button_filter'),
  $menu: $('#select_list_filter'),
  $menuItem: $('#select_list_filter .select_list a'),
  $result: $('#select_button_filter')
});


filterbox.init();

const productCardList = new CardList({
    $wrap: $('#art_products'),
    data: [],
    template: {
      default: _.template(`<li class="item_art">
        <a href="<%= url %>" class="item_art_in">
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
    </li>`),
      event: _.template(`<li class="item_art event">
      <a href="#" class="item_art_in">
        <div class="thumb">
          <img src="<%= imageUrl%>" alt="">
          <div class="text">
            <strong><%=title%></strong>
          </div>
        </div>
        <div class="eventbx">
          <div class="event_title">
            <span class="blind">event</span>
          </div>
          <p class="event_info"><%= description %></p>
          <strong>EVENT</strong>
        </div>
      </a>
    </li>`)
    }
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
            productCardList.add(data.items)//productCardList에 json의 items를 추가해줘라.
        }
    });
}

import FloatingBar from "./common/FloatingBar.js"
import SelectBox from "./common/SelectBox.js"

/**
 * 1. 절차지향 프로그래밍
 * 
 * 2. 객체지향 프로그래밍
 * 
 * 객체란?
 * 객체: 관념(class)의 실체화(new 키워드를 이용해서 생성) => instance (인스턴스) => 자바스크립트 객체의 형태
 * 
 * class 란?
 * 생성자함수 / 멤버변수 / 메소드
 */

const deliverySelectBox = new SelectBox({
    $button: $('#select_button_delivery'),
    $menu: $('#select_menu_delivery'),
    $menuItem: $('#select_menu_delivery a'),
    $result: $('#select_button_delivery')
});

const optionSelectBox = new SelectBox({
    $button: $('#select_button_option'),
    $menu: $('#select_menu_option'),
    $menuItem: $('#select_menu_option a'),
    $result: $('#select_button_option')
});

const qnaFilter = new SelectBox({
    $button: $('#filter_button_qna'),
    $menu: $('#filter_menu_qna'),
    $menuItem: $('#filter_menu_qna a'),
    $result: $('#filter_button_qna')
});

const productFloatingBar = new FloatingBar({
    $bar: $('#floating_bar_product'),
    scrollTop: 995
});

deliverySelectBox.init();
optionSelectBox.init();
qnaFilter.init();
productFloatingBar.init();

$('#section_review').on('click', '.review_notice_list', function (e) {
    e.preventDefault();

    $(this).toggleClass('check');
});
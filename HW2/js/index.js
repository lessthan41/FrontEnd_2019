// 當文件已經全載入至記憶體時，開始執行程式
$(document).ready(function() {

    // 清空 product-list
    // $('#product-list').empty();
    $('#page').hide()

    var items = null
    var pageCount = 20
    var showItems = (page) => {
        if (items == null) return
        var start = (page - 1) * pageCount
        var end = start + pageCount - 1 >= items.length-1 ? items.length-1 : start + pageCount - 1
        $('#product-list').empty();

        for (var i = start; i <= end; i++) {
            newItem(items[i])
        }
    }

    var newItem = (item) => {
        $img = $('<div>').attr('class', 'image').css('background-image', 'url('+item.image +')');
        $h3 = $('<h6>').attr('class', 'name').text(item.name)
        $p = $('<p>').attr('class', 'price').text('NT$ ' + item.price)

        $item = $('<div>').attr('class', 'item').attr('class', 'card-body').append($h3).append($p)
        $col = $('<div>').attr('class', 'col-*').attr('class', 'card').attr('class', 'item').append($img).append($item)

        $('#product-list').append($col)
    }

    var newPage = (n) => {
        var pageNum = n / 20
        var nowPage = 1
        pageNum = (n % 20 != 0) ? pageNum + 1 : pageNum

        $('#page-number').empty()

        $la = $('<a>').attr('class', 'page-link').attr('href', '#').attr('tabindex', '-1').attr('aria-disabled', 'true').text('«')
        $la.on('click', function() {
          nowPage--;
          $.each($(this).parent().parent().children(), function() {
            $(this).attr('class', 'page-item');
          });
          $( "li" ).eq( nowPage+1 ).attr('class', 'page-item active');
          showItems(nowPage);
          if(nowPage == 1){ $lli.addClass('disabled') }
        });
        $lli = $('<li>').attr('class', 'page-item').addClass('disabled').append($la)

        $('#page-number').append($lli)

        // 插入分頁數字
        for (var i = 1; i <= pageNum; i++) {
            $a = $('<a>').attr('class', 'page-link').attr('href', '#').text(i)

            $a.on('click', function() {
                var i = $(this).text();
                nowPage = +i;
                $.each($(this).parent().parent().children(), function() {
                  $(this).attr('class', 'page-item');
                });
                $(this).parent().attr('class', 'page-item active')
                showItems(Number(i))
                if(nowPage == 1){ $lli.addClass('disabled') }
                if(nowPage == Math.floor(pageNum)){ $rli.addClass('disabled') }
            })

            var strActive = ((i == 1) ? ' active' : '')
            $li = $('<li>').attr('class', 'page-item' + strActive).append($a)
            $('#page-number').append($li)
        }

        $ra = $('<a>').attr('class', 'page-link').attr('href', '#').text('»')
        $ra.on('click', function() {
          nowPage++;
          $.each($(this).parent().parent().children(), function() {
            $(this).attr('class', 'page-item');
          });
          $( "li" ).eq( nowPage+1 ).attr('class', 'page-item active');
          showItems(nowPage);
          if(nowPage == Math.floor(pageNum)){ $rli.addClass('disabled') }
        });
        $rli = $('<li>').attr('class', 'page-item').append($ra)
        $('#page-number').append($rli);
    }

    $('#query').on('click', function() {
        $.get('https://js.kchen.club/B06208030/query', function(response) {
            if (response) {
                // 伺服器有回傳資料
                if (response.result) {
                    $('#product-list').empty();
                    // 資料庫有回傳資料
                    items = response.items

                    // for (var i = 0; i < items.length; i++) {
                    //     newItem(items[i])
                    // }

                    // 加了分頁效果，預設顯示第一頁
                    showItems(1)

                    // 顯示分頁和設定分頁的函式
                    $('#page').show()
                    newPage(items.length)

                } else {
                    $('#message').text('查無相關資料')
                    $('#dialog').modal('show')
                }
            } else {
                $('#message').text('伺服器出錯')
                $('#dialog').modal('show')
            }

            console.log(response)
        }, "json")
    })

})

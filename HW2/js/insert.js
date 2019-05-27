$(() => {

  $('#insert').on('click', function() {
    $('#product-list').empty();
    $('#page-number').empty();
    $('#insert-list').css('display', 'unset');
  })

  $('#insertBtn').on('click', function() {
    // 取得商品資料
    var data = {
        item: {
            name: $('#inputProductName').val(),
            price: Number($('#inputProductPrice').val()),
            count: +$('#inputProductCount').val(),
            image: $('#inputProductImage').val(),
        }
    }

    // 新增商品
    $.post('https://js.kchen.club/B06208030/insert', data, function(response) {
        if (response) {
            // 伺服器有回傳資料
            if (response.result) {
                $('#message').text('新增成功')
                console.log(response.item)
                $('#dialog').modal('show')
            } else {
                $('#message').text('新增失敗')
                console.log(response.message)
                $('#dialog').modal('show')
            }
        } else {
            $('#message').text('伺服器出錯')
            $('#dialog').modal('show')
        }
    })
  })

})

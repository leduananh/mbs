var utilities = {
  _baseUrlApi: window.location.origin + '/api',
  get(url) {
    return new Promise((resolve, reject) =>
      $.ajax({
        url: utilities._baseUrlApi + url,
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
      })
        .done(resolve)
        .fail(reject)
    );
  },
  post(url, payload) {
    return new Promise((resolve, reject) =>
      $.ajax({
        url: utilities._baseUrlApi + url,
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: payload,
      })
        .done(resolve)
        .fail(reject)
    );
  },
  
  updateView(selector, content) {
    $(selector).html(content);
  },

  vndFormat(number) {
    return number.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  },
};

$('#createProductForm').on('submit', function (e) {
  e.preventDefault(); // prevent native submit
  $(this).ajaxSubmit({
    target: '#state',
  });
});

$('#state').bind('DOMSubtreeModified', function (event) {
  if (event.target.innerText === 'true') alert('product is added');
});

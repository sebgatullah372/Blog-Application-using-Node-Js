$(document).ready(function(){
  $('.delete-article').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    console.log(id);
    $.ajax({
      type:'DELETE',
      url: '/article/'+id,
      success: function(response){
        alert('Deleting Article');
        window.location.href='/';
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});

$(document).ready(function(){
  $('#cross').on('click', function(){
    $.ajax({
      url:'/',
      success: location.reload()
    });
    

  });
});
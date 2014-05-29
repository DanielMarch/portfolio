(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('#add-photo').click(addPhoto);
  }

  function addPhoto(e){
    $('#add-photo').after('<input type=file name=photo>');
    e.preventDefault();
  }
})();

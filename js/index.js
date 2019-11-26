"use strict";

window.addEventListener('load', function() {






//------------------------------------------------------------------------------------
//						CONTACT FORM VALIDATION'S SETTINGS
//------------------------------------------------------------------------------------
$('#subscribe-text-field-form').validate({
    onfocusout: false,
    onkeyup: false,
    rules: {
    },
    errorPlacement: function (error, element) {

        if ((element.attr("type") == "radio") || (element.attr("type") == "checkbox")) {
            error.appendTo($(element).parents("div").eq(0));
        } else {
            error.insertAfter(element);
        }
    }
});

//------------------------------------------------------------------------------------
//								CONTACT FORM SCRIPT
//------------------------------------------------------------------------------------

$('#subscribe-text-field-form').submit(function () {
    // submit the form
    //data area
    var data = [];
    var $fields = $(this).find('.form-group, div.radio');
    $fields.each(function(indx, el){
        if ($( el ).hasClass('radio')) {
            var name = $( el ).find('.label-name').html();
            var $radioinput = $(el).find('input');
            $( el).find('input').each(function(indx, el){
                if ( $(el)[0].checked) {
                    var value = $(el).parent().find('span.lbl').html();
                    data.push({ name: name, value: value, name_attr: $radioinput.attr('name') });
                    return;
                }
            });
        } else if ($( el ).find('input').attr('type') === 'checkbox') {
            var $input = $( el ).find( 'input' );
            data.push( {name: $input.attr( 'placeholder' ), value: $input[0].checked ? 'checked' : 'unchecked', name_attr: $input.attr('name')} );
        } else if ($( el ).find('select')[0]) {
            var name = $( el ).find('select option' ).val();
            var $select = $(el).find('select');
            data.push({ name: name, value: $select.val(), name_attr: $select.attr('name')});
        } else if ($( el ).find('textarea')[0]) {
            var $textarea = $(el).find('textarea');
            data.push({ name: $textarea.attr('placeholder'), value: $textarea.val(), name_attr: $textarea.attr('name') });
        } else {
            var $input = $(el).find('input');
            data.push({ name: $input.attr('placeholder'), value: $input.val(), name_attr: $input.attr('name') });
        }
    });
    //end data area
    if ($(this).valid()) {
        $(this).find('[type=submit]').button('loading');
        var form = new FormData();
        var $inputFiles = $('.inputfile');
        $inputFiles.each(function(indx, inputFile){
            $.each(inputFile.files, function(i, file) {
                form.append('file-' + indx + '-' + i, file);
            });
        });
        form.append('data', JSON.stringify(data));
        form.append('id', this.id);
        var action = $(this).attr('action');
        $.ajax({
            url: action,
            type: 'POST',
            data: form,
            cache: false,
            contentType: false,
            processData: false,
            success: function () {
	$('#subscribe-text-field-form').find('[type=submit]').button('complete');
},
            error: function () {
	$('#subscribe-text-field-form').find('[type=submit]').button('reset');
}
        });
    } else {
        //if data was invalidated
    }
    return false;
});


});

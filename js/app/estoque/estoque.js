var modal_action = 0;

function modal_onload(e) {
    if ($(e.currentTarget).data('attr-edit') == true) {
        modal_action = 'edit';
    } else if ($(e.relatedTarget).data('attr-delete') == true) {
        modal_action = 'delete';
        model_id = $(e.relatedTarget).attr('data-attr-id');
    }
}

function modal_apply() {
    if (modal_action == 'delete') {
        $.ajax({
            type: "POST",
            dataType: "json",
            url: url_form,
            data: {
                'csrfmiddlewaretoken': csrf_token,
                'attr_id': model_id
            },
            success: function(response) {
                $(MODAL_NAME).modal('hide');
                $('#row_' + model_id).remove();
                notify('Registro removido com sucesso!', SUCCESS);
            },
            error: function(request, status, error) {
                response = JSON.parse(request.responseText);
                notify(response.message, ERROR);
            }
        });
    }
    return false;
}

function modal_cancel() {}
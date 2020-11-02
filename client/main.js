let baseUrl = "http://localhost:3000"
let idTemp = null

$(document).ready(function () {
    checkLogin()
})

function checkLogin() {
    if (localStorage.token) {
        $('#login-page').hide()
        $('#home-page').show()
        $('#register-page').hide()
        $('#edit-page').hide()
        $('#add-page').hide()
        $('#error').hide()
        fetchTodo()
    } else {
        $('#home-page').hide()
        $('#login-page').show()
        $('#register-page').hide()
        $('#edit-page').hide()
        $('#add-page').hide()
        $('#error').hide()
    }
}

function showError(error) {
    $('#error').show()
    $('#error').empty()
    $('#error').append(`
    <p>${error.join(",")}</p>
    `)
    setTimeout(() => {
        $('#error').hide()
    }, 3000)
}

function toAddTodo() {
    $('#add-page').show()
    $('#home-page').hide()
}

function toRegPage() {
    checkLogin()
    $('#register-page').show()
    $('#login-page').hide()

}

function register(event) {
    event.preventDefault();
    let email = $("#register-email").val()
    let password = $("#register-password").val()
    $.ajax({
            url: `${baseUrl}/users/register`,
            method: "POST",
            data: {
                email,
                password
            }
        })
        .done(data => {
            console.log(data, "<<<<<<< register sukses");
            checkLogin()
        })
        .fail(err => {
            console.log(err.responseJSON.errors, '<<<<<<<<<<<<<<<<< error login');
            Swal.fire("error", err.responseJSON.errors.join(","), "error")
        })
        .always(() => {
            $('#register-email').val('')
            $('#register-password').val('')
        })
}

function login(event) {
    event.preventDefault();
    let email = $("#login-email").val();
    let password = $("#login-password").val();
    $.ajax({
            url: `${baseUrl}/users/login`,
            method: "POST",
            data: {
                email,
                password
            }
        })
        .done(data => {
            // console.log(data, '<<<<<<<<<<<<<<<<< data login');
            localStorage.setItem("token", data.token)
            checkLogin()
            Swal.fire(
                'Login Success!',
                'Welcome to Todo App',
              )

        })
        .fail(err => {
            console.log(err.responseJSON.errors, '<<<<<<<<<<<<<<<<< error login');
            Swal.fire("error", err.responseJSON.errors.join(","), "error")
        })
        .always(() => {
            $('#login-email').val('')
            $('#login-password').val('')
        })
}

function logout() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    localStorage.clear()
    checkLogin()
}

function fetchTodo() {
    $.ajax({
            url: `${baseUrl}/todos`,
            method: 'get',
            headers: {
                token: localStorage.token
            }
        })

        .done(data => {
            console.log(data.todos, '<<<<<<<<< Data todo');
            $('#container-todo').empty()
            data.todos.forEach(element => {
                $('#container-todo').append(`
                <li>
                    <div class="card text-white bg-dark mb-3" style="margin: 50px;">
                        <div class="card-header"> 📕 ${element.title}</div>
                        <div class="card-body">
                            <h5 class="card-title">Due Date: ${element.due_date ? new Date (element.due_date).toDateString().slice(4) : "-"}</h5>
                            ${element.status ?  '<span class="badge badge-success">Done</span>' : ' <span class="badge badge-danger">Not Done</span>'}
                            <p class="card-text mt-20px">${element.description}.</p>
                            <button onclick="toEditTodo(${element.id}, '${element.title}', '${element.description}', '${element.due_date}', '${element.status}')" class="btn btn-warning text-black">Edit</button>
                            <button onclick="remove(${element.id})" class="btn btn-danger">Hapus</button>
                        </div>
                    </div>
                </li>
                `)
            });
        })
        .fail(err => {
            console.log(err.responseJSON.errors, "<<<<<<<<< error login");
            Swal.fire("error", err.responseJSON.errors.join(","), "error")
        })
}

function remove(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
      .then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: `${baseUrl}/todos/${id}`,
                method: "DELETE",
                headers: {
                    token: localStorage.token
                }
            })
         .done(data => {
                console.log(data, '<<<<<<<< delete data');
                fetchTodo()
        
            })
        }
    })
        .fail(err => {
            console.log(err.responseJSON.errors, '<<<<<<<< error login');
            Swal.fire("error", err.responseJSON.errors.join(","), "error")
        })
}

function toEditTodo(id, title, description, due_date, status) {
    console.log(id, title, description, due_date, status, '<<<<<<<<<<<<<edit')
    $('#home-page').hide()
    $('#edit-page').show()
    $('#edit-title').val(title)
    $('#edit-description').val(description)
    $('#edit-status').val(status)
    const getDate = `${due_date}`.substring(0, 10)
    $('#edit-date').val(getDate)
    idTemp = id
}

function editTodo(event) {
    event.preventDefault()
    let title = $('#edit-title').val()
    let description = $('#edit-description').val()
    let due_date = $('#edit-date').val()
    let status = $('#edit-status').val()
    $.ajax({
            url: baseUrl + "/todos/" + idTemp,
            method: "PUT",
            headers: {
                token: localStorage.token
            },
            data: {
                title,
                description,
                due_date,
                status
            }
        })
        .done(() => {
            fetchTodo()
            $('#home-page').show()
            $('#edit-page').hide()
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Update Successfully',
                showConfirmButton: false,
                timer: 1500
              })
        })
        .fail(err => {
            console.log(err.responseJSON.errors, "<<<<<<<< error edit todo");
            Swal.fire("error", err.responseJSON.errors.join(","), "error")

        })
        .always(() => {
            $('#add-title').val('')
            $('#add-description').val('')
            $('#add-date').val('')
        })

}

function addTodo(event) {
    event.preventDefault()
    let title = $('#add-title').val()
    let description = $('#add-description').val()
    let due_date = $('#add-date').val()
    $.ajax({
            url: `${baseUrl}/todos`,
            method: "POST",
            headers: {
                token: localStorage.token
            },
            data: {
                title,
                description,
                due_date
            }
        })
        .done(() => {
            fetchTodo()
            $('#add-page').hide()
            $('#home-page').show()
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Add Data Successfully',
                showConfirmButton: false,
                timer: 1500
              })
        })
        .fail(err => {
            console.log(err.responseJSON.errors, "<<<<<<<< error login");
            Swal.fire("error", err.responseJSON.errors.join(","), "error")
        })
        .always(() => {
            $('#add-title').val('')
            $('#add-description').val('')
            $('#add-date').val('')
        })
}

function onSignIn(googleUser) {
    var tokenGoogle = googleUser.getAuthResponse().id_token;
    // console.log(id_token);
    $.ajax({
            url: `${baseUrl}/users/google-sign`,
            method: 'POST',
            data: {
                tokenGoogle
            }
        })
        .done(res => {
            console.log(res, '<<<<<<<< berhasil login with gogole');
            localStorage.setItem('token', res.token)
            checkLogin()
        })
        .fail(err => {
            console.log(err);
            Swal.fire("error", err.responseJSON.errors.join(","), "error")
        })
}

(function ($) {
    "use strict";


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit', function () {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        } else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }



})(jQuery);

$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('.modal-body input').val(recipient)
})
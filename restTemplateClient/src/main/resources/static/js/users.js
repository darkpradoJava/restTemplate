$(document).ready(function () {
        // AJAX-запрос с помощью функции getJSON
        //   url - адрес запроса
        //   success - обработка данных при успешном ответе сервера
        const createTable = () => $.getJSON({
            url: 'http://localhost:8080/api/users',
            success: function (data) {
                // переменная, для хранения результата
                var output = '';
                // переберём всех пользователей
                data.forEach(function (item) {
                    output += '<tr>';
                    output += '<td><span>' + item.id + '</span></td>';
                    output += '<td><span>' + item.username + '</span></td>';
                    output += '<td><span>' + item.password + '</span></td>';
                    output += '<td><span>' + item.name + '</span></td>';
                    for (let i = 0; i < item.roles.length; i++) {
                        output += '<td><span>' + item.roles[i].role + '</span></td>';
                    }
                    output += '<td>';
                    output += '<button type="button" class="btn_edit btn btn-primary" data-toggle="modal" data-target="#editUserModal" data-btn-id="' + item.id + '" >edit</button>';
                    output += '</td>';
                    output += '<td>';
                    output += '<button class="btn_delete btn btn-primary" data-btn-id="' + item.id + '" type="submit">delete</button>';
                    output += '</td>';
                    output += '</tr>';
                });
                $('#users').empty().append(output);
            }
        });

        createTable();

        $(document).on("click", ".btn_delete", function () {
            const userId = $(this).attr("data-btn-id");
            $.ajax({
                url: 'http://localhost:8080/api/delete?id=' + userId,
                type: 'DELETE',
            });
            location.reload();
        });

        $('#formAdd').submit(function () {
            const data = $("#formAdd").serialize();
            $.post(
                'http://localhost:8080/api/add',
                data
            );
            location.reload();
        });

        $(document).on("click", ".btn_edit", function () {
            const id = $(this).attr("data-btn-id");
            $('#formEdit').submit(function () {
                const data = ($("#formEdit").serialize()) + '&id=' + id;
                $.ajax({
                    url: 'http://localhost:8080/api/edit',
                    type: 'PUT',
                    data: data,
                }).then(function () {
                        window.location.href = "http://localhost:8080/admin"
                    },
                    function () {
                        window.location.href = "http://localhost:8080/admin"
                    },
                    function () {
                        window.location.href = "http://localhost:8080/admin"
                    });

                // $("#editUserButton").click(function () {
                //         window.location.href = "http://localhost:8080/admin"
                //     }
                // )
            });
        })

        // $("#addUserButton").click(function () {
        //         window.location.href = "http://localhost:8080/admin"
        //     }
        // )

        // const createUser = (user) => {
        //     let result = null;
        //     const jsonUser = JSON.stringify(user);
        //     $.ajax({
        //         type: 'post',
        //         url: "http://localhost:8080/api/add",
        //         async: false,
        //         data: jsonUser,
        //         contentType: "application/json"
        //     }).done(function (data) {
        //         result = data;
        //     });
        //     return result;
        // };

        // $("#addUserButton").click(
        //     function () {
        //         const login = document.getElementById('login').value;
        //         const password = document.getElementById('password').value;
        //         const name = document.getElementById('name').value;
        //         const role = document.getElementById('role').value;
        //         const entity = {
        //             login: login,
        //             password: password,
        //             name: name
        //         };
        //         createUser(entity);
        //     });

    }
)
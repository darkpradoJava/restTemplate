$(document).ready(function () {

    const createTable = () => fetch('http://localhost:8080/api/users')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            var output = '';
            data.forEach(function (item) {
                output += '<tr>';
                output += `<td><span>${item.id}</span></td>`;
                output += `<td><span> ${item.username}</span></td>`;
                output += `<td><span>${item.password}</span></td>`;
                output += `<td><span>${item.name}</span></td>`;
                for (let i = 0; i < item.roles.length; i++) {
                    output += `<td><span>${item.roles[i].role}</span></td>`;
                }
                output += '<td>';
                output += `<button type="button" class="btn_edit btn btn-primary" data-toggle="modal" data-target="#editUserModal" data-btn-id="${item.id}" >edit</button>`;
                output += '</td>';
                output += '<td>';
                output += `<button class="btn_delete btn btn-primary" data-btn-id="${item.id}" type="submit">delete</button>`;
                output += '</td>';
                output += '</tr>';
            });
            $('#users').empty().append(output);
        });

    function addUser() {
        const formAdd = document.getElementById('formAdd');
        formAdd.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(this);
            fetch('http://localhost:8080/api/add', {
                method: 'post',
                body: formData
            });
            location.reload();
        });
    }


    const deleteUser = () => $(document).on("click", ".btn_delete", function () {
        const userId = $(this).attr("data-btn-id");
        fetch('http://localhost:8080/api/delete?id=' + userId, {
            method: 'delete',
        });
        location.reload();
    });

    const editUser = () => $(document).on("click", ".btn_edit", function () {
        const id = $(this).attr("data-btn-id");
        createFormEdit(id);
        const formEdit = document.getElementById('formEdit');
        formEdit.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(this);
            formData.set('id', id);
            fetch('http://localhost:8080/api/edit', {
                method: 'put',
                body: formData
            });
            location.reload();
        });
    });

    function createFormEdit(id) {
        fetch('http://localhost:8080/api/getUserById?id=' + Number.parseInt(id))
            .then((response) => {
                return response.json();
            })
            .then((item) => {
                var output = '';
                output += `<input type="number" name="id" id="idEdit" placeholder="${item.id}" readonly>`;
                output += '<label for="idEdit">id</label><br>';
                output += `<input type="text" name="login" id="loginEdit" placeholder="${item.username}">`;
                output += '<label for="loginEdit">login</label><br>';
                output += `<input type="text" name="password" id="passwordEdit" placeholder="${item.password}">`;
                output += '<label for="passwordEdit">password</label><br>';
                output += `<input type="text" name="name" id="nameEdit" placeholder="${item.name}">`;
                output += '<label for="nameEdit">name</label><br>';
                for (let i = 0; i < item.roles.length; i++) {
                    output += `<input type="text" name="role" id="roleEdit" placeholder="${item.roles[i].role}">`;
                }
                output += '<label for="roleEdit">role</label><br>';
                output += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
                output += '<button type="submit" class="btn btn-primary">Edit user</button>';
                $('#formEdit').empty().append(output);
            });
    }

    createTable();
    addUser();
    deleteUser();
    editUser();

})
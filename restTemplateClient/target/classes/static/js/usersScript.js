$(document).ready(function () {
    fetch('http://localhost:8080/api/users')
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

    $(document).on("click", ".btn_delete", function () {
        const userId = $(this).attr("data-btn-id");
        fetch('http://localhost:8080/api/delete?id=' + userId, {
            method: 'delete',
        });
        location.reload();
    });

    $(document).on("click", ".btn_edit", function () {
        const id = $(this).attr("data-btn-id");
        const formEdit = document.getElementById('formEdit');
        formEdit.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(this);
            formData.append('id', id);
            fetch('http://localhost:8080/api/edit', {
                method: 'put',
                body: formData
            });
            location.reload();
        });
    })

})
let token = sessionStorage.getItem("token")

function getAllCustomer() {
    $.ajax({
        headers: {
            Authorization: "Bearer " + token
        },
        type: "GET",
        url: "http://localhost:8080/customers",
        success: function (a) {
            let content = '<table border="1"><tr>\n' +
                '        <td>Name</td>\n' +
                '        <td>Age</td>\n' +
                '        <td>Address</td>\n' +
                '        <td colspan="2">Action</td>\n' +
                '    </tr>';
            for (let i = 0; i < a.length; i++) {
                content += displayCustomer(a[i]);
            }
            content += '</table>'
            document.getElementById('list_customer').innerHTML = content;
        }
    });
}

function displayCustomer(customer) {
    return `<tr><td >${customer.name}</td><td >${customer.age}</td><td >${customer.address}</td>
        <td><button onclick="deleteCustomer(${customer.id})">Delete</button></td>
        <td><button onclick="updateCustomer(${customer.id})">Update</button></td></tr>`;
}

let idUpdate;

function updateCustomer(id) {
    idUpdate = id
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/customers/" + id,
        success: function (data) {
            $("#name1").val(data.name)
            $("#age1").val(data.age)
            $("#address1").val(data.address)
            document.getElementById("update").hidden = false
        }
    });
}

function update() {
    let name = $("#name1").val()
    let age = $("#age1").val()
    let address = $("#address1").val()
    let newCustomer = {
        id: idUpdate,
        name: name,
        age: age,
        address: address
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        url: "http://localhost:8080/customers/" + idUpdate,
        data: JSON.stringify(newCustomer),
        success: function (data) {
            getAllCustomer()
            if (data.name != null) {
                alert("Thay đổi thành công!")
            }
            document.getElementById("update").hidden = true
        }
    })
    event.preventDefault();
}

function deleteCustomer(id) {
    if (confirm("Bạn chắc chắn muốn xóa?")) {
        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/customers/" + id,
            success: function (data) {
                getAllCustomer()
                alert(data)
            }
        });
    }
}

function createCustomer() {
    let name = $("#name").val()
    let age = $("#age").val()
    let address = $("#address").val()
    let newCustomer = {
        name: name,
        age: age,
        address: address
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        },
        type: "POST",
        url: "http://localhost:8080/customers",
        data: JSON.stringify(newCustomer),
        success: function (data) {
            getAllCustomer()
            if (data.name != null) {
                alert("Tạo thành công!")
            }
            document.getElementById("create").hidden = true
        }
    })
    event.preventDefault();
}

function displayCreateForm() {
    document.getElementById("create").hidden = false
}

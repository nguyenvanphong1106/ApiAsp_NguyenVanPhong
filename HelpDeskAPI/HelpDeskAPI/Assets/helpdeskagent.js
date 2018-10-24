$(document).ready(function () {
    getItemList();
    loadData();

});
function getItemList() {
    $.ajax({
        url: '/api/WorkItems/',
        type: 'GET',
        dataType: 'json',
        success: function (items) {
            $("#itemTable tbody").remove();
            $.each(items, function (index, item) {
                itemAddRow(item);
            });
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
    });
}
function itemAddRow(item) {
    if ($("#itemTable tbody").length == 0) {
        $("#itemTable").append("<tbody></tbody>");
    }
    $("#itemTable tbody").append(
        itemBuildTableRow(item));
}
function itemBuildTableRow(item) {
    var items =
        "<tr>"
        + "<td>" + item.Id + "</td>"
        + "<td>" + item.Title + "</td>"
        + "<td>" + item.Status + "</td>"
        + "<td>" + item.CreatedDate + "</td>"
        + "<td>" + item.CompletedDate + "</td>"
        + "<td>" +
        "<button class='btnEdit btn btn-info btn-sm'>Edit</button>" + " / " +
        "<button class='btnDelete btn btn-danger btn-sm' >Delete</button>"
        + "</td>"
        + "</tr>";
    return items;
}

function handleException(request, message, error) {
    var msg = "";
    msg += "Code: " + request.status + "\n";
    msg += "Text: " + request.statusText + "\n";
    if (request.responseJSON != null) {
        msg += "Message" + request.responseJSON.Message + "\n";
    }

    alert(msg);
}
var new_item = { Id: 0, Title: "", Status: "", CreatedDate: "", CompletedDate: ""}
function addItem(item) {
    var obj = {};
    obj.url = "/api/WorkItems/";
    obj.type = "POST";
    obj.contentType = "application/json;charset=utf-8";
    obj.dataType = "html";
    var n_i = new_item;
    n_i.Title = $("#title").val();
    n_i.Status = $("#status").val();
    n_i.CreatedDate = $("#createdDate").val();
    n_i.CompletedDate = $("#completedDate").val();
    obj.data = JSON.stringify(n_i);
    obj.success = function (msg) {
        getItemList();
        document.getElementById('title').value = '';
        document.getElementById('status').value = '';
        document.getElementById('createdDate').value = '';
        document.getElementById('completedDate').value = '';
        $("#msg").css("color", "green");
        $("#msg").html("Đã thêm thành công : " + msg);
    },
        obj.error = function () {
            $("#msg").css("color", "red");
            $("#msg").html("Đã xảy ra lỗi. Vui lòng kiểm tra lại thông tin nhập vào!");
        };
    $.ajax(obj);
}

function loadData() {
    $(".btnDelete").click(function () {
        $.ajax({
            url: "/api/WorkItems/" + id,
            type: "DELETE", 
            contentType: "application/json",
            success: function () {
                bootbox.alert("Proposal deleted successfully.");
                ReloadGrid();
            },
            error: function () {
            }
        });
    });
}
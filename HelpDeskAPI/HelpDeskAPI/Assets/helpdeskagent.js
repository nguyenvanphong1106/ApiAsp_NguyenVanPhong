$(document).ready(function () {
    getItemList();
    //showEdit();

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
        "<button data-id='" + item.Id + "' class='btnEdit btn btn-info btn-sm' type='button' data-toggle='modal' data-target='#myModal'>Edit</button>" + " / " +
        "<button data-id='" + item.Id + "' class='btnDelete btn btn-danger btn-sm' type='button' >Delete</button>"
        + "</td>"
        + "</tr>";

        deleteRows();
    

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
var new_item = { Id: 0, Title: "", Status: "", CreatedDate: "", CompletedDate: "",}
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

function deleteRows() {



    var dataid = $('.btnDelete').attr('data-id');
    $('.btnDelete').click(function (e) {
        e.preventDefault();
        swal({
            title: "Are you sure?",
            text: "Are you sure to delete this record?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        },
            function (isConfirmed) {
                if (isConfirmed) {
                    //$(".file").addClass("isDeleted");
                    $.ajax({
                        url: "/api/WorkItems/" + dataid,
                        type: "DELETE",
                        contentType: "application/json",
                        success: function () {
                            swal("Deleted!", "Your record has been deleted.", "success");
                            location.reload();
                        },
                        error: function () {
                        }
                    });

                }
            }
        );
    });
}





$('.btnEdit').click(function () {

    var dataid = $('.btnDelete').attr('data-id');
    showEdit(dataid);
});



function showEdit(dataid) {
    //var dataid = $('.btnDelete').attr('data-id');
    $.ajax({
        url: "/api/WorkItems/",
        data: {
            id: dataid
        },
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            if (response.status == true) {
                var data = response.data;
                $('#txtTitle').text(data.Title);
                $('#txtStatus').text(data.Status);
                //$('#txtCreatedDate').val(data.CreatedDate);
                //$('#txtCompletedDate').val(data.CreatedDate);
            }
            else {
                //alert(response.message);

            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}
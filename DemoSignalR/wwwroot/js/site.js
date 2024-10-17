//"use strict";

//var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

////Disable send button until connection is established
//document.getElementById("sendButton").disabled = true;

//connection.on("ReceiveMessage", function (user, message) {
//    var li = document.createElement("li");
//    document.getElementById("messagesList").appendChild(li);
//    // We can assign user-supplied strings to an element's textContent because it
//    // is not interpreted as markup. If you're assigning in any other way, you
//    // should be aware of possible script injection concerns.
//    li.textContent = `${user} says ${message}`;
//});

//connection.start().then(function () {
//    document.getElementById("sendButton").disabled = false;
//}).catch(function (err) {
//    return console.error(err.toString());
//});
//document.getElementById("sendButton").addEventListener("click", function (event) {
//    var user = document.getElementById("userInput").value;
//    var message = document.getElementById("messageInput").value;
//    connection.invoke("SendMessage", user, message).catch(function (err) {
//        return console.error(err.toString());
//    });
//    event.preventDefault();
//});

"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, koiFish) {
    var tableBody = document.querySelector("#commonTable tbody");

    // Thêm hàng mới vào bảng
    var row = document.createElement("tr");

    var cellFishName = document.createElement("td");
    cellFishName.textContent = koiFish.fishName;
    row.appendChild(cellFishName);

    var cellBodyShape = document.createElement("td");
    cellBodyShape.textContent = koiFish.bodyShape;
    row.appendChild(cellBodyShape);

    var cellAge = document.createElement("td");
    cellAge.textContent = koiFish.age;
    row.appendChild(cellAge);

    var cellSize = document.createElement("td");
    cellSize.textContent = koiFish.size;
    row.appendChild(cellSize);

    tableBody.appendChild(row);

    // Thêm thông báo bên dưới bảng
    var li = document.createElement("li");
    li.textContent = `${user} đã gửi: ${koiFish.fishName}`;
    document.getElementById("messagesList").appendChild(li);
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var fishName = document.getElementById("fishNameInput").value;
    var bodyShape = document.getElementById("bodyShapeInput").value;
    var age = parseInt(document.getElementById("ageInput").value);
    var size = parseFloat(document.getElementById("sizeInput").value);

    var koiFish = {
        fishName: fishName,
        bodyShape: bodyShape,
        age: age,
        size: size
    };

    connection.invoke("SendMessage", user, koiFish).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

const tableBody = document.querySelector('#tableBody');

const base_URL = 'http://localhost:3001/users';

function fetchData() {
    fetch(base_URL)
        .then(response => response.json())
        .then(data => {
            fillData(data);
        })
        .catch(error => {
            alert(error)
        })
}

function fillData(data) {
    data.forEach(element => {
        const bodyRow = document.createElement('tr');
        bodyRow.innerHTML = `
    <td>${element.name}</td>
    <td>${element.surname}</td>
    <td>${element.tel}</td>
    <td>${element.email}</td>
    <td>
     <button class="edit" onclick="editRow(this)">Edit</button>
     <button class="delete" onclick="deleteRow(this)">Delete</button>
    </td>
    `;
        tableBody.appendChild(bodyRow)
    });
}
fetchData();

function createContact() {
    let addName = document.querySelector('#addName').value;
    let addSurname = document.querySelector('#addSurname').value;
    let addEmail = document.querySelector('#addEmail').value;
    let addNumber = document.querySelector('#addNumber').value;

    const contactData = {
        name: addName,
        tel: addNumber,
        surname: addSurname,
        email: addEmail
    };

    if (!addName || !addSurname || !addEmail || !addNumber) {
        alert("All fields must be filled out");
    } else {
        fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
        })
    }

}

const submitButton = document.querySelector('#createContact');
submitButton.addEventListener('click', createContact);




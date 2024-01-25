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
    <td class="operations">
     <button class="edit" onclick="editContact('${element.name}', '${element.surname}')">Edit</button>
     <button class="delete" onclick="deleteContact('${element.id}')">Delete</button>
    </td>
    `;
        tableBody.appendChild(bodyRow)
    });
}

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

async function deleteContact(userId) {
    document.querySelector('.deleteModalContainer').classList.add('open');

    document.querySelector('.approveDelete').addEventListener('click', async () => {
        

        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'  
            }
        })
        if(response.ok) {
            console.log('Okay')
        }else {
            console.log('Not okay')
        }
    })
    document.querySelector('.cancelDelete').addEventListener('click', () => {
        document.querySelector('.deleteModalContainer').classList.remove('open');
    })
}

function editContact(name, surName) {
    document.querySelector('.editModalContainer').classList.add('open');

    document.querySelector('.editName').value = name;
    document.querySelector('.editSurname').value = surName;
    
}

const submitButton = document.querySelector('#createContact');
submitButton.addEventListener('click', createContact);

fetchData();




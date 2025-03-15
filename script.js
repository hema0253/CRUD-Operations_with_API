const apiUrl = 'http://localhost:3000/records'; // Replace with your API endpoint

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('data-form');
    const message = document.getElementById('message');
    const tableBody = document.querySelector('#data-table tbody');
    let isEditMode = false;
    let editRecordId = null;

    // Fetch and display records on load
    fetchRecords();

    // Form submission handler
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        if (isEditMode) {
            // Update operation
            const updatedRecord = await updateRecord(editRecordId, { name, email });
            if (updatedRecord) {
                showMessage('Record updated successfully!', 'success');
                isEditMode = false;
                editRecordId = null;
                form.reset();
                document.getElementById('submit-btn').innerText = 'Add Record';
                fetchRecords();
            }
        } else {
            // Create operation
            const newRecord = await createRecord({ name, email });
            if (newRecord) {
                showMessage('Record added successfully!', 'success');
                form.reset();
                fetchRecords();
            }
        }
    });

    // Fetch records from the API
    async function fetchRecords() {
        const response = await fetch(apiUrl);
        const records = await response.json();
        displayRecords(records);
    }

    // Display records in the table
    function displayRecords(records) {
        tableBody.innerHTML = '';
        records.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.name}</td>
                <td>${record.email}</td>
                <td class="actions">
                    <button onclick="editRecord('${record.id}', '${record.name}', '${record.email}')">Edit</button>
                    <button onclick="deleteRecord('${record.id}')">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Create a new record
    async function createRecord(record) {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(record)
        });

        if (!response.ok) {
            showMessage('Failed to add record!', 'error');
            return null;
        }

        return await response.json();
    }

    // Update an existing record
    async function updateRecord(id, record) {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(record)
        });

        if (!response.ok) {
            showMessage('Failed to update record!', 'error');
            return null;
        }

        return await response.json();
    }

    // Delete a record
    async function deleteRecord(id) {
        if (!confirm('Are you sure you want to delete this record?')) return;

        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            showMessage('Failed to delete record!', 'error');
            return;
        }

        showMessage('Record deleted successfully!', 'success');
        fetchRecords();
    }

    // Edit a record
    window.editRecord = function(id, name, email) {
        isEditMode = true;
        editRecordId = id;
        document.getElementById('name').value = name;
        document.getElementById('email').value = email;
        document.getElementById('submit-btn').innerText = 'Update Record';
    }

    // Show message
    function showMessage(msg, type) {
        message.innerText = msg;
        message.className = type;
        setTimeout(() => {
            message.innerText = '';
            message.className = '';
        }, 3000);
    }
});

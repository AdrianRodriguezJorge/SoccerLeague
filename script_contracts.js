// script.js
let contracts = [
    { id: 1, contrato: 'C-001', cliente: 'Cliente A', fechaInicio: '2023-01-01', vigencia: '12 meses' },
    { id: 2, contrato: 'C-002', cliente: 'Cliente B', fechaInicio: '2023-02-01', vigencia: '6 meses' }
];

function displayContracts() {
    const tbody = document.getElementById('contractsBody');
    tbody.innerHTML = '';
    
    contracts.forEach(contract => {
        const row = `<tr onclick="selectContract(${contract.id})">
                        <td>${contract.id}</td>
                        <td>${contract.contrato}</td>
                        <td>${contract.cliente}</td>
                        <td>${contract.fechaInicio}</td>
                        <td>${contract.vigencia}</td>
                    </tr>`;
        tbody.innerHTML += row;
    });
}

function filterContracts() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    
    const filteredContracts = contracts.filter(contract => 
        contract.contrato.toLowerCase().includes(input) || 
        contract.cliente.toLowerCase().includes(input)
    );
    
    const tbody = document.getElementById('contractsBody');
    tbody.innerHTML = '';
    
    filteredContracts.forEach(contract => {
        const row = `<tr onclick="selectContract(${contract.id})">
                        <td>${contract.id}</td>
                        <td>${contract.contrato}</td>
                        <td>${contract.cliente}</td>
                        <td>${contract.fechaInicio}</td>
                        <td>${contract.vigencia}</td>
                    </tr>`;
        tbody.innerHTML += row;
    });
}

function newContract() {
    // Logic to create a new contract
}

function editContract() {
    // Logic to edit the selected contract
}

function deleteContract() {
    // Logic to delete the selected contract
}

function selectContract(id) {
   // Logic to select a contract from the table
}

// Initial display of contracts
displayContracts();
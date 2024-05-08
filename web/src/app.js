const doc = {
    compBody: document.querySelector('#compBody'),
    multiButton: document.querySelector('#multiButton'),
    idInput: document.querySelector('#id'),
    descInput: document.querySelector('#description'),
    compInput: document.querySelector('#complaint'),
    productInput: document.querySelector('#product'),
    typeInput: document.querySelector('#type'),
    operatorModalLabel: document.querySelector('#operatorModalLabel'),
}

const state = {
    url: 'http://localhost:8000',
    endpoint: 'complaintsDesc',
    id: 0,
    description: 'nincs',
    complaint: 'ismeretlen',
    product: 'ismeretlen',
    type: 'ismeretlen',
    mode: 'add'
}

doc.multiButton.addEventListener('click', () => {
    console.log('Mentés...')
    setComplaintState()
    addComplaint()
})

function setComplaintState(){
    state.id = doc.idInput.value
    state.description = doc.descInput.value
    state.complaint = doc.compInput.value
    state.product = doc.productInput.value
    state.type = doc.typeInput.value
    deleteOperatorContent()
}

function addComplaint(){
    doc.operatorModalLabel.textContent='Hozzáadás'
    let url= state.url+ '/'+ state.endpoint
    fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            description: state.description,
            complaint: state.complaint,
            product: state.product,
            type: state.type
        })
        
    })
}

function getComplaint(){
    let url= state.url+ '/'+ state.endpoint
    fetch(url)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        renderComplaint(result)
    })
}

function renderComplaint(compList){
    compList.forEach(comp => {
        const tr = document.createElement('tr')
        tr.innerHTML= `
            <td>${comp.id}</td>
            <td>${comp.description}</td>
            <td>${comp.complaint}</td>
            <td>${comp.product}</td>
            <td>${comp.type}</td>
            <td>
                <button class="btn btn-primary"
                data-id="${comp.id}"
                data-description="${comp.description}"
                data-complaint="${comp.complaint}"
                data-product="${comp.product}"
                data-type="${comp.type}"
                onclick="updateComplaint(this)"
                data-bs-target="#operatorModal"
                data-bs-toggle="modal"
                >
                    Szerkesztés
                </button>
                <button class="btn btn-danger"
                onclick="deleteComplaint(${comp.id})"
                >
                    Törlés
                </button>
            </td>
        `
        doc.compBody.appendChild(tr)
        console.log(comp.id, comp.description, comp.complaint, comp.product, comp.type)

    });
}

function deleteComplaint(id){
    const url= state.url+ '/' + state.endpoint + '/' + id
    console.log(url)
    fetch(url, {method: 'DELETE'})
}

function updateComplaint(source){
    doc.operatorModalLabel.textContent='Szerkesztés'
    const url= state.url+ '/' + state.endpoint + '/' + id
    console.log(source.dataset.id)
    doc.idInput.value= source.dataset.id
    doc.descInput.value= source.dataset.description
    doc.compInput.value= source.dataset.complaint
    doc.productInput.value= source.dataset.product
    doc.typeInput.value= source.dataset.type
}

function showAddModal(){
    doc.operatorModalLabel.textContent="Hozzáadás"
    deleteOperatorContent()
}

function deleteOperatorContent(){
    doc.idInput.value= ''
    doc.descInput.value= ''
    doc.compInput.value= ''
    doc.productInput.value= ''
    doc.typeInput.value= ''
}

getComplaint()
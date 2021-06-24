var isEdit = false;
var sel_id;

window.onload = function(){
    getAllCustomers();
}

async function getAllCustomers(){
    let uri = `http://localhost:3000/api/customers/getAllCustomers`;
    let response = await fetch(uri);
    let result = await response.json();
    showData(result.data);
}

function showData(customers){
    let tbl = document.getElementById("dTable");
    while(tbl.rows.length>1){
        tbl.deleteRow(1);
    }
    for(let i=0; i<customers.length;i++){
        let e = customers[i];
        let cb = e.isActive?"checked":'';
        let id = e._id
        let tRow = `<tr>
                <td>${i+1}</td>
                <td>${e.name}</td>
                <td>${e.phone}</td>
                <td>${e.city}</td>
                <td>${e.email}</td>
                <td><input type="checkbox" ${cb} onchange="onStatus(event,'${id}')"></td>
                <td>
                    <button class="btn btn-info" onclick="onEdit('${id}')">Edit</button>
                    <button class="btn btn-danger" onclick="onDelete('${id}')">Delete</button>
                </td>
        </tr>`;
        tbl.insertAdjacentHTML("beforeend",tRow);
    }
}

async function onEdit(id){
    let uri = `http://localhost:3000/api/customers/getCustomerById/${id}`;
    let response = await fetch(uri);
    let result = await response.json();
    let rec = result.data;
    document.getElementById("name").value = rec.name;
    document.getElementById("phone").value = rec.phone;
    document.getElementById("city").value = rec.city;
    document.getElementById("email").value = rec.email;
    isEdit = true;
    sel_id=id;
    document.getElementById("sbtn").innerHTML = "Update";
    document.getElementById("sbtn").className = "btn btn-success";
}

function onReset(){
    isEdit = false;
    sel_id=null;
    document.getElementById("sbtn").innerHTML = "Submit";
    document.getElementById("sbtn").className = "btn btn-primary";
}


function onStatus(e,id){
    let data = {
        id:id,
        isActive:e.target.checked
    };
    updateCustomer(data)
}

async function updateCustomer(data){
    let uri = `http://localhost:3000/api/customers/updateCustomer`;
    let options={
        method:'PUT',
        body:JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
    };
    let response = await fetch(uri,options);
    let result = await response.json();
    onReset();
    document.getElementById("cform").reset();
    getAllCustomers();
}

function onSubmit(e){
    e.preventDefault();
    let obj={
        name:document.getElementById("name").value,
        phone:document.getElementById("phone").value,
        city:document.getElementById("city").value,
        email:document.getElementById("email").value,
    };
    isEdit?(obj.id=sel_id,updateCustomer(obj)):saveCustomer(obj);
}

async function saveCustomer(customer){
    let uri = `http://localhost:3000/api/customers/createCustomer`;
    let options={
        method:'POST',
        body:JSON.stringify(customer),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
    };
    let response = await fetch(uri,options);
    let result = await response.json();
    document.getElementById("cform").reset();
    getAllCustomers();
}
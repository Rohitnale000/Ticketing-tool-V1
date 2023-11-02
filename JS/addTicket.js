let ticketArray = JSON.parse(localStorage.getItem('ticketData')) || [];
let titleInput = document.getElementById('title');
let descriptionInput = document.getElementById('exampleFormControlTextarea1');
let tagInput = document.getElementById('tag');
let assignInput = document.getElementById('assign');
let priorityInput = document.getElementById('priority');
let statusInput = document.getElementById('status');
let ID;
let updatedName;
let iCnt = 0;
let array = JSON.parse(localStorage.getItem('Registration')) || [];
let loginData = JSON.parse(sessionStorage.getItem('loginData'))

//to set admin name into a dropdown
JSON.parse(localStorage.getItem('Registration')).map((item) => {
   if (item.role === 'admin') {
      const option = document.createElement('option')
      option.innerHTML = item.firstName + " " + item.lastName
      assignInput.appendChild(option)
   }
})

let fullname = array.find(x=>{
   return x.username===loginData.username && x.password===loginData.password 
 })

//this fuction add color font and some css to status and priority and tag feilds
const addColor = () => {
   JSON.parse(localStorage.getItem('ticketData')).forEach((item, index) => {
      let element = document.getElementsByClassName('tagClass')[index];
      let priorityElement = document.getElementsByClassName('priorityClass')[index];
      if (item.tag === 'Replace') {
         element.style.background = '#ffe3d1';
         element.style.color = '#b16a5f';     
         element.style.border = '1px solid #b16a5f';      
      } if (item.tag === 'New') {
         element.style.background = '#e1f5ff';
         element.style.color = '#76adc7';
         element.style.border = '1px solid #76adc7';
        
      } if (item.tag === 'Repair') {
         element.style.background = '#fddde9';
         element.style.color = '#bd7295';
         element.style.border = '1px solid #bd7295';
      }
      if (item.tag === 'Issue') {
         element.style.background = '#eff5d9';
         element.style.color = '#a0b26c';
         element.style.border = '1px solid #a0b26c';   
      }
      if (item.priority === 'Low') {
         priorityElement.style.background = '#eff5d9';
         priorityElement.style.color = '#a0b26c';
         priorityElement.style.border = '1px solid #a0b26c';
      }
      if (item.priority === 'High') {
         priorityElement.style.background = '#ffe3d1';
         priorityElement.style.color = '#b16a5f';
         priorityElement.style.border = '1px solid #b16a5f';
      }
      if (item.priority === 'Medium') {
         priorityElement.style.background = '#e1f5ff';
         priorityElement.style.color = '#76adc7';
         priorityElement.style.border = '1px solid #76adc7';
      }
   });
}

const cardColor=()=>{
   JSON.parse(localStorage.getItem('ticketData')).forEach((item, index) => {
      let element = document.getElementsByClassName('cartTagClass')[index];
      let priorityElement = document.getElementsByClassName('cartPriorityClass')[index];
      if (item.tag === 'Replace') {
         element.style.background = '#ffe3d1';
         element.style.color = '#b16a5f';
         element.style.border = '1px solid #b16a5f';
       
      } else if (item.tag === 'New') {
         element.style.background = '#e1f5ff';
         element.style.color = '#76adc7';
         element.style.border = '1px solid #76adc7';
       
      } else if (item.tag === 'Repair') {
         element.style.background = '#fddde9';
         element.style.color = '#bd7295';
         element.style.border = '1px solid #bd7295';
      }

      if (item.tag === 'Issue') {
         element.style.background = '#eff5d9';
         element.style.color = '#a0b26c';
         element.style.border = '1px solid #a0b26c';
      }
      if (item.priority === 'Low') {
         priorityElement.style.background = '#eff5d9';
         priorityElement.style.color = '#a0b26c';
         priorityElement.style.border = '1px solid #a0b26c';
     
      }
      if (item.priority === 'High') {
         priorityElement.style.background = '#ffe3d1';
         priorityElement.style.color = '#b16a5f';
         priorityElement.style.border = '1px solid #b16a5f';
        ;
      }
      if (item.priority === 'Medium') {
         priorityElement.style.background = '#e1f5ff';
         priorityElement.style.color = '#76adc7';   
         priorityElement.style.border = '1px solid #76adc7';
      }
   });
}

//this button increments the counter and guides to user click to save a new record
document.getElementById('addTicket').addEventListener('click', () => {
   iCnt = 1
})

//this button function save and update data from ticket
document.getElementById('btn-save-ticket').addEventListener('click', (event) => {
   if (iCnt === 1) {
      event.preventDefault()
      const id = new Date().getTime()
      const allInputObj = {
         id: id,
         name: fullname.firstName + " " + fullname.lastName,
         title: titleInput.value,
         description: descriptionInput.value,
         tag: tagInput.value,
         assign: assignInput.value,
         priority: priorityInput.value,
         status: statusInput.value,
      }
      try {
         let result = ticketFormValidation(allInputObj)
         if (result) {
            ticketArray.push(allInputObj)
            localStorage.setItem('ticketData', JSON.stringify(ticketArray))
            toastr.options.progressBar = true;
            toastr.options.positionClass = "toast-bottom-right";
            toastr.success(allInputObj.title + 'Ticket Created Successfully', 'Ticket')
            document.getElementById("ticketForm").reset();
            displayDataOnTable();
            showDataIntoCart()

         }
      } catch (error) {
         console.log(error)
      }

   }
   else if (iCnt === 2) {
       const response = confirm("Are you sure you want to Update?");
      let newObj = {
         id: ID,
         name: updatedName,
         title: titleInput.value,
         description: descriptionInput.value,
         tag: tagInput.value,
         assign: assignInput.value,
         priority: priorityInput.value,
         status: statusInput.value
      }

      if (response) {
         newTicketData = JSON.parse(localStorage.getItem('ticketData')) || []
         let index = newTicketData.findIndex(itme => itme.id === ID)
         newTicketData[index] = newObj;
         localStorage.setItem('ticketData', JSON.stringify(newTicketData))
         document.getElementById("ticketForm").reset();
         toastr.success("Ticket Data update Successfully")
         document.getElementById('closeBtn').click()
      }
   }
   displayDataOnTable();
   showDataIntoCart()
   document.getElementById('closeBtn').click()
})

//dispaly ticket data into table
const displayDataOnTable = () => {
   if(fullname.role=='user'){
      let name = fullname.firstName+" "+fullname.lastName
      let output = document.querySelector('tbody');
      output.innerHTML = "";
      JSON.parse(localStorage.getItem('ticketData')).forEach((data, i) => {
         if (name == data.name) {
            output.innerHTML +=
               `<tr>
                     <td>${i + 1}</td>
                     <td>${'TN' + '-' + (i + 1)}</td>
                     <td>${data.name}</td>
                     <td>
                     <span class="tagClass">${data.tag}</span>
                     <span class="fw-bold">${data.title}</span><br><br>
                     <span class="text-secondary pt-4">${data.description}</span> 
                     </td>
                     <td>${data.assign}</td>
                     <td ><span class="priorityClass">${data.priority}</span></td>
                     <td>${data.status}</td>
                     <td>
                     <button class="btn btn-primary" onclick='setInputForUpdate(${JSON.stringify(data)})' data-bs-toggle="modal"
                     href="#exampleModalToggle"><i class="fa-regular fa-pen-to-square"></i></button>
                     <button class="btn btn-danger" onclick="onDeleteData(${data.id})"><i class="fa-regular fa-trash-can"></i></button>
                      </td>
                  </tr>`
         }
      });
      addColor();
   }

   if(fullname.role=='admin'){

      document.getElementById('status').removeAttribute('disabled')
      document.getElementById('addTicket').style.display='none'
      let output = document.querySelector('tbody');
      output.innerHTML = "";
      JSON.parse(localStorage.getItem('ticketData')).map((data, i) => {
            output.innerHTML +=
               `<tr>
                     <td>${i + 1}</td>
                     <td>${'TN' + '-' + (i + 1)}</td>
                     <td>${data.name}</td>
                     <td>
                     <span class="tagClass">${data.tag}</span>
                     <span class="fw-bold">${data.title}</span><br><br>
                     <span class="text-secondary pt-4">${data.description}</span> 
                     </td>
                     <td>${data.assign}</td>
                     <td ><span class="priorityClass">${data.priority}</span></td>
                     <td>${data.status}</td>
                     <td>
                     <button class="btn btn-primary" onclick='setInputForUpdate(${JSON.stringify(data)})' data-bs-toggle="modal"
                     href="#exampleModalToggle"><i class="fa-regular fa-pen-to-square"></i></button>
                     <button class="btn btn-danger" onclick="onDeleteData(${data.id})"><i class="fa-regular fa-trash-can"></i></button>
                      </td>
                  </tr>`
         
      });
      addColor();
   }

}

//this function delete the ticket data 
const onDeleteData = (id) => {
   const response = confirm("Are you sure you want to Delete?");
   if(response){
      id = Number(id);
      newTicketData = JSON.parse(localStorage.getItem('ticketData')) || []
      newTicketData = newTicketData.filter(value => {
         return value.id != id;
      });
      localStorage.setItem('ticketData', JSON.stringify(newTicketData))
      showDataIntoCart()
      displayDataOnTable()
   }
}

//to set all data from the ticket to input fields
const setInputForUpdate = (dataString) => {
   console.log(dataString.id)
   iCnt = 2
   dataString.id = Number(dataString.id);
   ID = dataString.id
   updatedName=dataString.name
   newTicketData = JSON.parse(localStorage.getItem('ticketData')) || []
   newTicketData.forEach(element => {
      if (element.id === dataString.id) {
         titleInput.value = element.title
         descriptionInput.value = element.description
         tagInput.value = element.tag
         assignInput.value = element.assign
         priorityInput.value = element.priority
         statusInput.value = element.status
      }
   });
}

//this function return the filter data from table
const filterTableData = (status) => {
   let name = fullname.firstName+" "+fullname.lastName
   let output = document.querySelector('tbody');
   output.innerHTML = "";
   JSON.parse(localStorage.getItem('ticketData')).map((data, i) => {
      if (data.status == status && data.name == name && fullname.role=='user') {
         output.innerHTML += `
              <tr>
                  <td>${i + 1}</td>
                  <td>${'TN' + '-' + (i + 1)}</td>
                  <td>${data.name}</td>
                  <td>
                  <span class="tagClass">${data.tag}</span>
                  <span class="fw-bold">${data.title}</span><br><br>
                  <span class="text-secondary pt-4">${data.description}</span> 
                  </td>
                  <td>${data.assign}</td>
                  <td ><span class="priorityClass">${data.priority}</span></td>
                  <td>${data.status}</td>
                  <td>
                  <button class="btn btn-primary" onclick='setInputForUpdate(${JSON.stringify(data)})' data-bs-toggle="modal"
                  href="#exampleModalToggle"><i class="fa-regular fa-pen-to-square"></i></button>
                  <button class="btn btn-danger" onclick="onDeleteData(${data.id})"><i class="fa-regular fa-trash-can"></i></button>
                   </td>
              </tr>
             `
      }
   });

   JSON.parse(localStorage.getItem('ticketData')).map((data, i) => {
      if (data.status == status && fullname.role=='admin') {
         output.innerHTML += `
              <tr>
                  <td>${i + 1}</td>
                  <td>${'TN' + '-' + (i + 1)}</td>
                  <td>${data.name}</td>
                  <td>
                  <span class="tagClass">${data.tag}</span>
                  <span class="fw-bold">${data.title}</span><br><br>
                  <span class="text-secondary pt-4">${data.description}</span> 
                  </td>
                  <td>${data.assign}</td>
                  <td ><span class="priorityClass">${data.priority}</span></td>
                  <td>${data.status}</td>
                  <td>
                  <button class="btn btn-primary" onclick='setInputForUpdate(${JSON.stringify(data)})' data-bs-toggle="modal"
                  href="#exampleModalToggle"><i class="fa-regular fa-pen-to-square"></i></button>
                  <button class="btn btn-danger" onclick="onDeleteData(${data.id})"><i class="fa-regular fa-trash-can"></i></button>
                   </td>
              </tr>
             `
      }
   });

   addColor()
}

//this function return the filter data from cart
const filterCartData = (status) => {
   let name = fullname.firstName+" "+fullname.lastName
   const container = document.querySelector('.container-fluid .row');
   container.innerHTML = '';

   JSON.parse(localStorage.getItem('ticketData')).map(item => {
      if (item.name == name && item.status == status && fullname.role=='user') {
         const card = document.createElement('div');
         card.className = 'col-lg-2 col-md-4 col-sm-12 pt-4';
         card.innerHTML = `<div class="card border-0 shadow pb-4">
               <div class="card-body p-3">
                   <h5 class="card-title text-center">${item.name}</h5>
                   <h4 class="text-center fw-bold">${item.title}</h4>
                   <p class="text-secondary text-center">${item.description}</p>
                   <div class="text-center pb-4">
                   <h6><span class="text-primary">Assign to:</span> ${item.assign}</h6>
                   <h6><span class="text-success">Status:</span> ${item.status}</h6>
                   </div>
                   <div class="d-flex justify-content-evenly align-items-center text-center">
                   <span class="cartTagClass">${item.tag}</span>
                   <span class="cartPriorityClass">${item.priority}</span>
                   </div>
                   <div class="d-flex justify-content-evenly align-items-center pt-4 text-center">
                   <button class="btn btn-primary fs-4" onclick='setInputForUpdate(${JSON.stringify(item)})' data-bs-toggle="modal"
                   href="#exampleModalToggle"><i class="fa-regular fa-pen-to-square"></i></button>
                   <button class="btn btn-danger fs-4" onclick="onDeleteData(${item.id})"><i class="fa-regular fa-trash-can"></i></button>
                   </div>
               </div>
           </div>`;
         container.appendChild(card);
      }
   });


   JSON.parse(localStorage.getItem('ticketData')).map(item => {
      if (item.status == status && fullname.role=='admin') {
         const card = document.createElement('div');
         card.className = 'col-lg-2 col-md-4 col-sm-12 pt-4';
         card.innerHTML = `<div class="card border-0 shadow pb-4">
               <div class="card-body p-3">
                   <h5 class="card-title text-center">${item.name}</h5>
                   <h4 class="text-center fw-bold">${item.title}</h4>
                   <p class="text-secondary text-center">${item.description}</p>
                   <div class="text-center pb-4">
                   <h6><span class="text-primary">Assign to:</span> ${item.assign}</h6>
                   <h6><span class="text-success">Status:</span> ${item.status}</h6>
                   </div>
                   <div class="d-flex justify-content-evenly align-items-center text-center">
                   <span class="cartTagClass">${item.tag}</span>
                   <span class="cartPriorityClass">${item.priority}</span>
                   </div>
                   <div class="d-flex justify-content-evenly align-items-center pt-4 text-center">
                   <button class="btn btn-primary fs-4" onclick='setInputForUpdate(${JSON.stringify(item)})' data-bs-toggle="modal"
                   href="#exampleModalToggle"><i class="fa-regular fa-pen-to-square"></i></button>
                   <button class="btn btn-danger fs-4" onclick="onDeleteData(${item.id})"><i class="fa-regular fa-trash-can"></i></button>
                   </div>
               </div>
           </div>`;
         container.appendChild(card);
      }
   });

  cardColor()
}

//this function will deside which data do you want to filter
document.getElementById("filterTableDataId").addEventListener('change', () => {
   let toggle = document.getElementById('myCheck');
   let filter = document.getElementById("filterTableDataId").value
   if (filter === 'All') {
      if (toggle.checked === false) {
         displayDataOnTable()
      } else if (toggle.checked === true) {
         showDataIntoCart()
      }
   } else {
      if (toggle.checked === false) {
         filterTableData(filter)
      } else if (toggle.checked === true) {
         filterCartData(filter)
      }
   }
})

//show data into cart
const showDataIntoCart = () => {
   let name = fullname.firstName+" "+fullname.lastName
   let toggle = document.getElementById('myCheck');

   if (toggle.checked) {
      let table = document.querySelector('table');
      table.style.display = "none";
      const container = document.querySelector('.container-fluid .row');
      container.innerHTML = '';
      JSON.parse(localStorage.getItem('ticketData')).map(item => {
         if (item.name == name && fullname.role=='user') {
            const card = document.createElement('div');
            card.className = 'col-lg-2 col-md-4 col-sm-12 pt-4';
            card.innerHTML = `<div class="card border-0 shadow pb-4">
                   <div class="card-body p-3">
                       <h5 class="card-title text-center">${item.name}</h5>
                       <h4 class="text-center fw-bold">${item.title}</h4>
                       <p class="text-secondary text-center">${item.description}</p>
                       <div class="text-center pb-4">
                       <h6><span class="text-primary">Assign to:</span> ${item.assign}</h6>
                       <h6><span class="text-success">Status:</span> ${item.status}</h6>
                       </div>
                       <div class="d-flex justify-content-evenly align-items-center text-center">
                       <span class="cartTagClass">${item.tag}</span>
                       <span class="cartPriorityClass">${item.priority}</span>
                       </div>
                    
                       <div class="d-flex justify-content-evenly align-items-center pt-4 text-center">
                       <button class="btn btn-primary fs-4" onclick='setInputForUpdate(${JSON.stringify(item)})' data-bs-toggle="modal"
                       href="#exampleModalToggle"><i class="fa-regular fa-pen-to-square"></i></button>
                       <button class="btn btn-danger fs-4" onclick="onDeleteData(${item.id})"><i class="fa-regular fa-trash-can"></i></button>
                       </div>
                   </div>
               </div>`;
            container.appendChild(card);
         }

         if (fullname.role=='admin') {
            const card = document.createElement('div');
            card.className = 'col-lg-2 col-md-4 col-sm-12 pt-4';
            card.innerHTML = `<div class="card border-0 shadow pb-4">
                   <div class="card-body p-3">
                       <h5 class="card-title text-center">${item.name}</h5>
                       <h4 class="text-center fw-bold">${item.title}</h4>
                       <p class="text-secondary text-center">${item.description}</p>
                       <div class="text-center pb-4">
                       <h6><span class="text-primary">Assign to:</span> ${item.assign}</h6>
                       <h6><span class="text-success">Status:</span> ${item.status}</h6>
                       </div>
                       <div class="d-flex justify-content-evenly align-items-center text-center">
                       <span class="cartTagClass">${item.tag}</span>
                       <span class="cartPriorityClass">${item.priority}</span>
                       </div>
                    
                       <div class="d-flex justify-content-evenly align-items-center pt-4 text-center">
                       <button class="btn btn-primary fs-4" onclick='setInputForUpdate(${JSON.stringify(item)})' data-bs-toggle="modal"
                       href="#exampleModalToggle"><i class="fa-regular fa-pen-to-square"></i></button>
                       <button class="btn btn-danger fs-4" onclick="onDeleteData(${item.id})"><i class="fa-regular fa-trash-can"></i></button>
                       </div>
                   </div>
               </div>`;
            container.appendChild(card);
         }

      });
     cardColor()

   } else {
      let table = document.querySelector('table');
      table.style.display = "";
      const container = document.querySelector('.container-fluid .row');
      container.innerHTML = '';
   }
}

//ticket form validation
const ticketFormValidation = (formData) => {
   let titleValid = formData.title.length > 2;
   let descriptionValid = formData.description.length > 2;
   if (!titleValid) {
      document.getElementById("title_val").style.display = "block";
   } else {
      document.getElementById("title_val").style.display = "none";
   }
   if (!descriptionValid) {
      document.getElementById("description_val").style.display = "block";
   } else {
      document.getElementById("description_val").style.display = "none";
   }
   if (!titleValid || !descriptionValid) {
      return false;
   } else {
      return true;
   }

};




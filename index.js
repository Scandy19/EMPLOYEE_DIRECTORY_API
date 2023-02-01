let employeeDirectory;
$(document).ready(function(){

    var randomUser = 'https://randomuser.me/api/?nat=us&results=12&exc=gender,login,registered,id'
    $.getJSON(randomUser, function(getResponse){
        $.each(getResponse.results, function(index,employee){
            dirHTML = '<div class="card">'
            dirHTML += '<div class="card-img-container">'
            dirHTML += '<img class="card-img" src="' + employee.picture.large +'">'
            dirHTML += '</div>' 
            dirHTML += '<div class="card-info-container">'
            dirHTML += '<h3 id="name" class="card-name cap">' + employee.name.first + ' ' + employee.name.last + '</h3>'
            dirHTML += '<p class="card-text">' + employee.email + '</p>'
            dirHTML += '<p class="card-text cap">' + employee.location.city + ', ' + employee.location.state + '</p>'
            dirHTML += '</div>' 
            dirHTML += '</div>' 
            document.getElementById('gallery').innerHTML += dirHTML;
        }) 
            employeeDirectory = getResponse.results 
    }) 

});

let modalContainer = document.createElement('div');
modalContainer.className = 'modal-container';
document.body.append(modalContainer);

let modal = document.createElement('div');
modal.className = 'modal';
modalContainer.append(modal);

let modalCloseButton = document.createElement('button');
modalCloseButton.className = 'modal-close-btn';
modalCloseButton.setAttribute('id', 'modal-close-btn')
modalCloseButton.innerHTML = '<strong>X</strong>';
modal.append(modalCloseButton);


let modalInfoContainer = document.createElement('div');
modalInfoContainer.className = 'modal-info-container';
modal.append(modalInfoContainer);

let img = document.createElement('img');
img.className = 'modal-img';
img.setAttribute('src','https://placehold.it/125x125'); 
img.setAttribute('alt','profile picture');
modalInfoContainer.append(img);


 
let username = document.createElement('h3');
username.className = 'modal-name cap';
username.setAttribute('id', 'name');
username.textContent = 'name';  
modalInfoContainer.append(username);

let mail = document.createElement('p');
mail.className = 'modal-text';
mail.textContent = 'email';  
modalInfoContainer.append(mail);


let city = document.createElement('p');
city.className = 'modal-text cap';
city.textContent = 'city';  
modalInfoContainer.append(city);


let lineBreak = document.createElement('hr');
modalInfoContainer.append(lineBreak);


let contact = document.createElement('p');
contact.className = 'modal-text';
contact.textContent = '(555) 555-5555';  
modalInfoContainer.append(contact);

let address = document.createElement('p');
address.className = 'modal-text cap';
address.textContent = '123 Portland Ave., Portland, OR 97204';  
modalInfoContainer.append(address);


let dob = document.createElement('p');
dob.className = 'modal-text';
dob.textContent = 'Birthday:';  
modalInfoContainer.append(dob);

$('.modal-container').hide()  


$('#gallery').click(function(e){ 
        let target = $(e.target)
    if(!target.hasClass('gallery')){ 
        if(target.hasClass('card')){ 
            select = target.index(); 
        }
        if(target.parent().hasClass('card')){ 
            select = target.parent().index(); 
        }
        if(target.parent().parent().hasClass('card')){  
            select = target.parent().parent().index(); 
        }
        
        
    $('img.modal-img').attr('src', employeeDirectory[select].picture.large);
    username.textContent = employeeDirectory[select].name.first + ' ' +employeeDirectory[select].name.last;
    mail.textContent = employeeDirectory[select].email;
    city.textContent = employeeDirectory[select].location.city;
    contact.textContent = employeeDirectory[select].cell;
    address.textContent = employeeDirectory[select].location.street.number +', '+ employeeDirectory[select].location.state +' '+ employeeDirectory[select].location.postcode;
    dob.textContent = 'Birthday: ' + employeeDirectory[select].dob.date.slice(0,10);
    $('.modal-container').show()
    }
});


$('#modal-close-btn').on('click', function(){
    $('.modal-container').hide();
})
var
    nom = document.getElementById('nom'),
    date = document.getElementById('date'),
    email = document.getElementById('email'),
    time = document.getElementById('time'),
    phone = document.getElementById('phone'),
    address = document.getElementById('address'),
    message = document.getElementById('message'),
    temoinOk = true,
    
    //error var
    nomError = document.querySelector('.nomError'),
    dateError = document.getElementById('dateError'),
    emailError = document.getElementById('emailError'),
    timeError = document.getElementById('timeError'),
    phoneError = document.getElementById('phoneError'),
    addressError = document.getElementById('addressError'),
    messageError = document.getElementById('messageError'),
    



    //validation
    envoi = document.getElementById('envoi');
    envoi.addEventListener("click", f_valid);
    //fonction
function f_valid(e)
    {
        
        if(nom.value == '' && nom.length < 3)
            {
                e.preventDefault();
                nomError.textContent = 'Veuillez entrer un nom valide';
                nomError.style.color = 'red';
                temoinOk = false
            }
            else {
                nom.textContent = "";
                temoinOk = true
            }


        if(date.value == '')
            {
                e.preventDefault();
                dateError.textContent = 'Champ requis';
                dateError.style.color = 'red';                
                temoinOk = false
            }
            else {
                date.textContent = "";
                temoinOk = true
            }


        if(email.value == '')
            {
                e.preventDefault();
                emailError.textContent = 'Veuillez entrer un email valide svp';
                emailError.style.color = 'red';
                
                temoinOk = false
            }
            else {
                email.textContent = "";
                temoinOk = true
            }



        if(time.value == '')
            {
                e.preventDefault();
                timeError.textContent = 'Champ requis';
                timeError.style.color = 'red';
                
                temoinOk = false

            }
            else {
                time.textContent = "";
                temoinOk = true
            }

            if(phone.value == '')
            {
                e.preventDefault();
                phoneError.textContent = 'Champ requis';
                phoneError.style.color = 'red';
                
                temoinOk = false

            }
            else {
                phone.textContent = "";
                temoinOk = true
            }

        if(address.value == '')
        {
            e.preventDefault();
            addressError.textContent = 'Champ requis ! ';
            addressError.style.color = 'red';
            
            temoinOk = false
        }
        else {
            address.textContent = "";
            temoinOk = true
        }
        
        if(message.value == '')
        {
            e.preventDefault();
            messageError.textContent = 'Dites nous quelque chose svp !';
            messageError.style.color = 'red';
            
            temoinOk = false
        }
        else {
            message.textContent = "";
            temoinOk = true
        }




        if(temoinOk == true)
            {
                alert("Félicitations " +nom.value+ ' vous avez effectué votre réservation avec succès pour le ' +date.value+ ' à ' +time.value+ '!!!' );
            }            
            else {
                alert("Remplissez les champs du formulaire svp !!!");
            }
    }
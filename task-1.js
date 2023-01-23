document.querySelector("#send-members").onclick = function(){
   
    const $membersNumber = document.querySelector("#member");
    const $announce = document.querySelector("#announce");   
    const membersNumber = $membersNumber.value 
   
    if (membersNumber == 0){
        $announce.innerText = 'Introduce valid numbers !'
    } else if (!document.querySelector('#new-member')){ 
     createMembers(membersNumber);
     createButtons();
     $announce.remove();
    }
}

function createMembers(number){
                  
    for (let i = 0; i < number; i++){ 
    const $div = document.createElement('div')
    
    const $label = document.createElement('label')
    $label.innerText = `Family member number #${i + 1}`

    const $input = document.createElement('input')
    $input.type = 'number'
    $input.className = 'create-member'
    $input.id = 'new-member'

    $div.appendChild($label)
    $div.appendChild($input)

    const $membersNumber = document.querySelector('#members-list')
    $membersNumber.appendChild($div) 
    }
}

function createButtons($membersNumber){
    const $div = document.querySelector('#members-list')
    
    const $calculateButton = document.createElement('button')
    $calculateButton.innerText = 'Calculate'
    
    const $redo = document.createElement('button')
    $redo.innerText = 'Redo'

    const $strong = document.createElement('strong')
    $strong.id = 'announce-results'

    const $br = document.createElement('br')

    $div.appendChild($calculateButton)
    $div.appendChild($redo)
    $div.appendChild($strong)

    $calculateButton.onclick = function(){
        const ageValues = document.querySelectorAll('.create-member')
        const $announce = document.querySelector("#announce-results")
        let min = Infinity
        let max = 0  
        let avg = 0
        for (let i = 0; i < ageValues.length; i++){
      
           let number = (parseInt(ageValues[i].value))
           if(isNaN(number)){
            $announce.textContent = `Please introduce valid ages for each member`
            return;
           }
           min = Math.min(min, number)
           max = Math.max(max, number)
           avg += number   
        }
     const average = avg / ageValues.length   
     $announce.textContent = `The minimun age in your family is ${min} the higher is ${max} and the average of the whole is ${average.toFixed(0)}`
       
     $calculateButton.remove();
            
     $announce.appendChild($br)
     $announce.appendChild($redo)
    }
   
    $redo.onclick = function(){ 
        if(!document.querySelector('#members-list') === false){ 
            const $results = document.querySelector('#members-list')
            while ($results.firstChild) {
                $results.removeChild($results.firstChild);
            }
        }
    }
}

document.querySelector("#quantity-submit").onclick = function(event){

    const $membersNumber = document.querySelector("#members-quantity");
    const $validation = document.querySelector("#quantity-validation");
    const membersNumber = $membersNumber.value 

    if (membersNumber == 0){
        $validation.innerText = 'Introduce valid numbers !'
    } else if (!document.querySelector(".input-list")){      
        createMembers(membersNumber);
        createButtons();
        $validation.remove();
    }
    return false
}

function createMembers(quantity){

    for (let i = 0; i < quantity; i++){ 
        const $div = document.createElement("div")

        const $label = document.createElement("label")
        $label.innerText = `Family member number #${i + 1}`

        const $input = document.createElement("input")
        $input.type = "number"
        $input.className = "input-list"

        $div.appendChild($label)
        $div.appendChild($input)

        const $membersNumber = document.querySelector("#members-list")
        $membersNumber.appendChild($div) 
    }
}

function createButtons(){
    const $div = document.querySelector("#members-list")

    const $calculateButton = document.createElement("button")
    $calculateButton.innerText = "Calculate"

    const $reset = document.createElement("reset")

    const $strong = document.createElement("strong")
    $strong.id = "announce-results"

    const $br = document.createElement("br")

    $div.appendChild($calculateButton)
    $div.appendChild($reset)
    $div.appendChild($strong)

    $calculateButton.onclick = function(){
        const $list = document.querySelectorAll(".input-list")
        const $announce = document.querySelector("#announce-results")
        
        let minimumAge = parseInt($list[0].value)
        let maximumAge = parseInt($list[0].value)
        let ageSum = 0
        for (let i = 0; i < $list.length; i++){

           let age = (parseInt($list[i].value))
           if(isNaN(age)){
               $announce.textContent = `Please introduce valid numbers for each member`
               return false; 
            }

            if ( age > maximumAge){
                maximumAge = age
            } else if ( age < minimumAge){
                minimumAge = age
            }
            ageSum += age
        }
        const average = ageSum / $list.length
        $announce.textContent = `The minimun age in your family is ${minimumAge} the higher is ${maximumAge} and the average of the whole is ${average.toFixed(0)}`

        $calculateButton.remove();
        $announce.appendChild($br)
        $announce.appendChild($reset)
    }

    $reset.onclick = function(){ 
        if(true){ 
            const $results = document.querySelector("#members-list")
            while ($results.firstChild) {
                $results.removeChild($results.firstChild);
            }
        }
    }
}

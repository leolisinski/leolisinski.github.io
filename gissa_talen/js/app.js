const guess_boxes = document.getElementsByClassName('guess')
const rand_outcome = Math.floor(Math.random() * 4)

for (let i = 0; i < guess_boxes.length; i++) {
    guess_boxes[i].addEventListener('click', (event) => {
        document.getElementById(`${event.target.id}`).classList.toggle('hidden')
        if (document.getElementById(`${event.target.id}`).classList.contains('hidden')) {
            document.getElementById(`${event.target.id}`).innerHTML = "?"
        }
        else {
            document.getElementById(`${event.target.id}`).innerHTML = `${secret_number(event.target.id)}`
        }
    })
}

function secret_number(id) {
    switch(rand_outcome) {
        case 0:
            switch(id) {
                case "fourth_number":
                    return 7;
                case "fifth_number":
                    return 11;
                case "sixth_number":
                    return 13;
                case "seventh_number":
                    return 17;
                case "eight_number":
                    return 19;
            }
        case 1:
            switch(id) {
                case "fourth_number":
                    return 8;
                case "fifth_number":
                    return 12;
                case "sixth_number":
                    return 17;
                case "seventh_number":
                    return 23;
                case "eight_number":
                    return 30;
            }
        case 2:
            switch(id) {
                case "fourth_number":
                    return 2;
                case "fifth_number":
                    return 3;
                case "sixth_number":
                    return 5;
                case "seventh_number":
                    return 2;
                case "eight_number":
                    return 3;
            }
        case 3:
            switch(id) {
                case "fourth_number":
                    return 8;
                case "fifth_number":
                    return 13;
                case "sixth_number":
                    return 21;
                case "seventh_number":
                    return 34;
                case "eight_number":
                    return 55;
            }
    }

    
}
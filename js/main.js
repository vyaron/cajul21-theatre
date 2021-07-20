'use strict';

// TODO: Render the cinema (7x15 with middle path)
// TODO: Support selecting a seat
// TODO: Only a single seat should be selected
// TODO: Support Unselecting a seat
// TODO: When seat is selected a popup is shown
// TODO: Popup shows the seat identier - e.g.: 3-5 or 7-15
// TODO: Popup should contain seat price (for now 4$ to all)
// TODO: allow booking the seat
// TODO: Uplift your model - each seat should have its own price... 
// TODO: in seat details, show how many available seats around 
// TODO: Price is kept only for 10 seconds 


var gElSelectedSeat = null;
var gCinema = createCinema();
renderCinema();


function createCinema() {
    var cinema = [];
    for (var i = 0; i < 7; i++) {
        cinema[i] = [];
        for (var j = 0; j < 15; j++) {
            var cell = {
                isSeat : (j !== 7),
                isBooked : (i === 2 && j !== 7),
                price : 4 + i
            }
            cinema[i][j] = cell
        }
    }
    return cinema;
}
function renderCinema() {
    var strHTML = '';
    for (var i = 0; i < gCinema.length; i++) {
        strHTML += `<tr class="cinema-row" >\n`
        for (var j = 0; j < gCinema[0].length; j++) {
            var cell = gCinema[i][j];
            // For cell of type SEAT add seat class
            var className = (cell.isSeat) ? ' seat ' : ''
            className += (cell.isBooked) ? ' booked ' : ''

            // TODO: for cell that is booked add booked class
            strHTML += `\t<td class="cell ${className}" 
                            onclick="cellClicked(this, ${i}, ${j})" >
                         </td>\n`
        }
        strHTML += `</tr>\n`
    }
    // console.log(strHTML)

    var elSeats = document.querySelector('.cinema-seats');
    elSeats.innerHTML = strHTML;
}
function cellClicked(elCell, i, j) {

    var cell = gCinema[i][j]
    if (!cell.isSeat || cell.isBooked) return;

    elCell.classList.add('selected')
    if (gElSelectedSeat) {
        gElSelectedSeat.classList.remove('selected')
    }
    gElSelectedSeat = (gElSelectedSeat === elCell) ? null : elCell


    if (gElSelectedSeat) showSeatDetails({ i: i, j: j })
    else hideSeatDetails();
}
function showSeatDetails(pos) {
    var seat = gCinema[pos.i][pos.j];
    var elPopup = document.querySelector('.popup');
    elPopup.querySelector('h2 span').innerText = `${pos.i}-${pos.j}`
    elPopup.querySelector('h3 span').innerText = `$${seat.price}`
    elPopup.querySelector('button').dataset.i = pos.i;
    elPopup.querySelector('button').dataset.j = pos.j;

    
    elPopup.hidden = false;
}
function hideSeatDetails() {
    document.querySelector('.popup').hidden = true
}

function bookSeat(elBtn) {
    var pos = {i: +elBtn.dataset.i, j: +elBtn.dataset.j}

    // TODO: make negs loop and count available seats

    console.log('Booking seat at pos: ', pos);
    gElSelectedSeat.classList.add('booked')

    hideSeatDetails();
}




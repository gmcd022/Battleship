import { rotateShips } from "./DOM";

const fleetArray = [
['Carrier', 5],
['Battleship', 4],
['Destroyer', 3],
['Submarine', 3],
['Patrol Boat', 2]
]
;

function createShipContainer() {

    const deleteContainer = document.querySelector('.ship-container');
    if (deleteContainer) {
    deleteContainer.remove();
    };

    const shipContainer = document.createElement('div');
    
    shipContainer.classList.add('ship-container');

    const shipContainerTitle = document.createElement('h2');
    shipContainerTitle.innerHTML = 'Place your Ships';

    const rotateButton = document.createElement('button');
    rotateButton.classList.add('rotate-button');
    rotateButton.classList.add('button');
    rotateButton.innerHTML = 'Rotate Ships';
    rotateButton.addEventListener('click', () => {rotateShips()});

    shipContainer.appendChild(shipContainerTitle);
    shipContainer.appendChild(rotateButton);



    Object.entries(fleetArray).forEach(([i, ship]) => {

        let shipName = ship[0];
        let shipLength = ship[1];

        const shipElement = document.createElement('div');
        shipElement.classList.add('drop-ship');
        shipElement.draggable = true;
        shipElement.dataset.name = shipName;
        shipElement.dataset.length = shipLength;

        for (let i = 0; i < shipLength; i++) {
            const cell = document.createElement('div');
            cell.classList.add('ship-cell');
            shipElement.appendChild(cell);
        }

        shipContainer.appendChild(shipElement);
    });

    const wrapper = document.querySelector('.ship-container-wrapper');
    wrapper.appendChild(shipContainer);
};

function dropShipsNoDrag() {
    document.querySelectorAll('.drop-ship').forEach((dropShip) => {
        dropShip.draggable = false;
    })
}

export {createShipContainer, dropShipsNoDrag};
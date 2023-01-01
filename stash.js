let equipDiv = document.createElement('div');
equipDiv.className = "items";
equipDiv.innerHTML = `
            <h3>${item.category}</h3>
            <p>Type: ${item.type}</p>
            <p>Rarity: ${item.rarity}</p>
            <ul>
            ${item.stats.map(stat => {
    return `<li>${Object.keys(stat)[0]}: ${stat[Object.keys(stat)[0]]}</li>`;
}).join('')}
            </ul>
        `;
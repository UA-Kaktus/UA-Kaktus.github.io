function calc () {
    const storageInput = document.querySelector('input[name="storage-value"]'),
          transferIput = document.querySelector('input[name="transfer-value"]');

    const storageRange = document.querySelector('input[name="storage"]'),
          transferRange = document.querySelector('input[name="transfer"]');

    const bunnyHddDisk = document.querySelector('#hdd-disk'),
          scalewayMultiOption = document.querySelector('#multi-option');
          
    const graphs = document.querySelectorAll('.calc__graph-item'),
          graphsPrices = document.querySelectorAll('.calc__graph-item span');

    const radioButtons = document.querySelectorAll('input[type="radio"]');

    //this one for scaling graphs
    const pixelsForDollar = 4;

    let storageAmount = storageRange.value,
        transferAmount = transferRange.value;
        
    function giveStorageValue(triger, reciver) {
        triger.addEventListener('input', (e) => {
            storageAmount = e.target.value;
            reciver.value = storageAmount;
            calcPrices();
        });
    }

    function giveTransferValue(triger, reciver) {
        triger.addEventListener('input', (e) => {
            transferAmount = e.target.value;
            reciver.value = transferAmount;
            calcPrices();
        });
    }

    function calcPrices() {
        let costBlaze = storageAmount * 0.005 + transferAmount * 0.01;
        costBlaze < 7 ? costBlaze = 7 : null;
        graphs[0].style.width = `${pixelsForDollar * costBlaze}px`;
        graphsPrices[0].textContent = `${String(costBlaze).slice(0,5)}$`;

        let costBunny = storageAmount * (bunnyHddDisk.checked ? 0.01 : 0.02) + transferAmount * 0.01;
        costBunny > 10 ? costBunny = 10 : null;
        graphs[1].style.width = `${pixelsForDollar * costBunny}px`;
        graphsPrices[1].textContent = `${String(costBunny).slice(0,5)}$`;

        let costScaleway = (storageAmount > 75 ? (storageAmount - 75) * (scalewayMultiOption.checked ? 0.06 : 0.03) : 0) + (transferAmount > 75 ? (transferAmount - 75) * 0.02 : 0);
        costScaleway < 0 ? costScaleway = 0 : null;
        graphs[2].style.width = `${pixelsForDollar * costScaleway}px`;
        graphsPrices[2].textContent = `${String(costScaleway).slice(0,5)}$`;

        let costVultr = storageAmount * 0.01 + transferAmount * 0.01;
        costVultr < 5 ? costVultr = 5 : null;
        graphs[3].style.width = `${pixelsForDollar * costVultr}px`;
        graphsPrices[3].textContent = `${String(costVultr).slice(0,5)}$`;

        costBlaze == Math.min(costBlaze, costBunny, costScaleway, costVultr) ? graphs[0].style.backgroundColor = 'red' : graphs[0].style.backgroundColor = 'grey';
        costBunny == Math.min(costBlaze, costBunny, costScaleway, costVultr) ? graphs[1].style.backgroundColor = 'orange' : graphs[1].style.backgroundColor = 'grey';
        costScaleway == Math.min(costBlaze, costBunny, costScaleway, costVultr) ? graphs[2].style.backgroundColor = 'purple' : graphs[2].style.backgroundColor = 'grey';
        costVultr == Math.min(costBlaze, costBunny, costScaleway, costVultr) ? graphs[3].style.backgroundColor = 'blue' : graphs[3].style.backgroundColor = 'grey';
    }

    radioButtons.forEach(el => {
        el.addEventListener('click', calcPrices);
    });

    giveStorageValue(storageRange, storageInput);
    giveStorageValue(storageInput, storageRange);
    giveTransferValue(transferRange, transferIput);
    giveTransferValue(transferIput, transferRange);

    calcPrices();

}


export default calc;
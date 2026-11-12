/**
 * Standalone Fuel Surcharge (FSC) Calculator Logic
 */
document.addEventListener('DOMContentLoaded', () => {
    const currentDieselInput = document.getElementById('currentDiesel');
    const baseDieselInput = document.getElementById('baseDiesel');
    const mpgInput = document.getElementById('truckMpg');
    const milesInput = document.getElementById('tripMiles');
    const linehaulInput = document.getElementById('linehaulRate');

    const fscPerMileOutput = document.getElementById('fscPerMile');
    const totalFscOutput = document.getElementById('totalFsc');
    const totalRateOutput = document.getElementById('totalRate');

    function calculateFSC() {
        const currentDiesel = parseFloat(currentDieselInput.value) || 0;
        const baseDiesel = parseFloat(baseDieselInput.value) || 0;
        const mpg = parseFloat(mpgInput.value) || 6.5;
        const miles = parseFloat(milesInput.value) || 0;
        const linehaul = parseFloat(linehaulInput.value) || 0;

        let fscMile = 0;
        if (currentDiesel > baseDiesel && mpg > 0) {
            fscMile = (currentDiesel - baseDiesel) / mpg;
        }

        const totalFsc = fscMile * miles;
        const allInRate = linehaul + totalFsc;

        fscPerMileOutput.textContent = `$${fscMile.toFixed(3)}`;
        totalFscOutput.textContent = `$${totalFsc.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        totalRateOutput.textContent = `$${allInRate.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    }

    [currentDieselInput, baseDieselInput, mpgInput, milesInput, linehaulInput].forEach(input => {
        input.addEventListener('input', calculateFSC);
    });

    calculateFSC();
});

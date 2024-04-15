document.getElementById('calculateTaxBtn').addEventListener('click', function () {
    // Clear existing error icons and tooltips
    $('.error-tooltip').addClass('d-none');
    $('.form-control').removeClass('is-invalid');
    // Validate inputs
    let isValid = true;
    const grossIncome = parseFloat(document.getElementById('grossIncome').value);
    if (isNaN(grossIncome)) {
    displayError('#grossIncome', '#grossIncomeError', 'Invalid input');
    isValid = false;
    }
    const extraIncome = parseFloat(document.getElementById('extraIncome').value);
    if (isNaN(extraIncome)) {
    displayError('#extraIncome', '#extraIncomeError', 'Invalid input');
    isValid = false;
    }
    const ageGroup = document.getElementById('ageGroup').value;
    if (ageGroup === "") {
    displayError('#ageGroup', '#ageGroupError', 'Age group is required');
    isValid = false;
    }
    const deductions = parseFloat(document.getElementById('deductions').value);
    if (isNaN(deductions)) {
    displayError('#deductions', '#deductionsError', 'Invalid input');
    isValid = false;
    }
    if (!isValid) return;
    // Perform tax calculation
    let taxRate = 0;
    if (ageGroup === "<40") {
    taxRate = 0.3;
    } else if (ageGroup === "≥40 <60") {
    taxRate = 0.4;
    } else if (ageGroup === "≥60") {
    taxRate = 0.1;
    }
    // Calculate total income and tax amount
    const totalIncome = grossIncome + extraIncome - deductions;
    let taxAmount = 0;
    if (totalIncome > 800000) {
    taxAmount = taxRate * (totalIncome - 800000);
    }
    // Calculate overall income after tax reduction
    const overallIncome = totalIncome - taxAmount;
    // Set actual income value
    $('#actualIncome').text(overallIncome.toFixed(2));
    // Show the modal
    $('#taxResultModal').modal('show');
    });
    // Function to display error icon and tooltip
    function displayError(inputId, errorIconId, errorMessage) {
    $(inputId).addClass('is-invalid');
    $(errorIconId).removeClass('d-none').attr('title', errorMessage).tooltip();
    }
    /// Function to display a pop-up message when characters other than numbers are entered
    function displayNumberErrorMessage(inputId) {
        const inputElement = document.getElementById(inputId);
        const errorTooltip = document.getElementById(inputId + 'Error');
        const value = inputElement.value;
        if (value.match(/[^0-9]/)) {
            errorTooltip.classList.remove('d-none');
        } else {
            errorTooltip.classList.add('d-none');
        }
    }
    // Call the function for each input field when the input event occurs
    document.getElementById('grossIncome').addEventListener('input', function () {
        displayNumberErrorMessage('grossIncome');
    });
    document.getElementById('extraIncome').addEventListener('input', function () {
        displayNumberErrorMessage('extraIncome');
    });
    document.getElementById('deductions').addEventListener('input', function () {
        displayNumberErrorMessage('deductions');
    });
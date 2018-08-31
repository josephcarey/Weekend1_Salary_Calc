console.log('js');

class Employee {
    constructor(firstName, lastName, id, title, annualSalary) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id;
        this.title = title;
        this.annualSalary = annualSalary;
    }

    getDOMtext() {
        return `
            <tr>
                <td>${this.firstName}</td>
                <td>${this.lastName}</td>
                <td>${this.id}</td>
                <td>${this.title}</td>
                <td>${this.annualSalary}</td>
            </tr>`
    }
}

// The array that stores all of our employees
const allEmployees = [];

$('document').ready(readyNow);

function readyNow() {
    console.log('jQ');

    // Event handlers!
    $('#submitButton').on('click', handleSubmitClick);
    $('#fillRandomButton').on('click', handleFillRandomClick);

}

function handleSubmitClick() {

    // pull all the values from the DOM
    let firstName = $('#firstNameInput').val();
    let lastName = $('#lastNameInput').val();
    let id = $('#idInput').val();
    let title = $('#titleInput').val();
    let annualSalary = $('#annualSalaryInput').val();

    // If anything is blank alert the user and fail out
    if (!firstName || !lastName || !id || !title || !annualSalary) {
        alert('Please fill in all of the fields before submitting the form.')
        return false;
    }

    // Create a new employee with the given information
    newEmployee = new Employee(firstName, lastName, id, title, annualSalary);
    allEmployees.push(newEmployee);

    // Update the display
    updateDisplay();

    // Wipe the input fields
    $('.wipeOnSubmit').val('');

    // Use a class on these    
}

function updateDisplay() {
    console.log(allEmployees);

    // Empty what's already there
    $('#employeeData').empty();

    // Add the employees to the table
    for (currentEmployee of allEmployees) {
        $('#employeeData').append(currentEmployee.getDOMtext());
    }

    return false;
}

function handleFillRandomClick () {
    
   let possibleEmployeeNames = [
    'Cedric',
    'Marvin',
    'Lila',
    'Kaelyn',
    'Max',
    'Anastasia',
    'Alonzo',
    'Alissa',
    'Sierra',
    'Kyla',
    'Jerimiah',
    'Beau',
    'Tristan',
    'Beckham',
    'Zachary',
    'Van',
    'Nicole',
    'Chase',
    'Rey',
    'Easton',
   ] 
}
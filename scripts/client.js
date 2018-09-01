console.log('js');

class Employee {
    constructor(firstName, lastName, id, title, annualSalary) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id;
        this.title = title;

        this.includedInCalculation = true;

        // Techincally floats are iffy in JavaScript in re: accuracy. But for this it's okay
        this.annualSalary = Number(annualSalary).toFixed(2);
    }

    getDOMtext() {
        return `
            <tr class="employeeRow">
                <td>${this.firstName}</td>
                <td>${this.lastName}</td>
                <td>${this.id}</td>
                <td>${this.title}</td>
                <td>\$ ${this.annualSalary}</td>
                <td><input type="checkbox" checked="true" class="includeCheckBox" /></td>
                <td><button class="deleteMe">Delete</button>
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
    $('#employeeData').on('click','.deleteMe', handleDeleteClick);

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
  
}

function handleDeleteClick() {

    // Go to employee data, get a list of its trs, find our parent tr in that list
    // this still isn't perfect (I would love to not have to know #employeeData s) name
    var positionToDelete = $( '#employeeData > tr' ).index( this.closest('tr') );
    
    // also worked to get the index of the deleteMe class, which are only on
    // the deletion buttons. Also, we could give a class to only the trs
    // that are in this table. But I think this is most elegant.

    console.log(positionToDelete);

    allEmployees.splice(positionToDelete, 1);

    updateDisplay();    
    
}

function updateDisplay() {

    // Empty what's already there
    $('#employeeData').empty();

    // Add the employees to the table
    for (currentEmployee of allEmployees) {
        $('#employeeData').append(currentEmployee.getDOMtext());
    }

    return false;
}

function handleFillRandomClick() {

    // set up some tasty tasty data
    let randomFirstNames = [
        'Cedric', 'Marvin', 'Lila', 'Kaelyn', 'Max',
        'Anastasia', 'Alonzo', 'Alissa', 'Sierra', 'Kyla',
        'Jerimiah', 'Beau', 'Tristan', 'Beckham', 'Zachary',
        'Van', 'Nicole', 'Chase', 'Rey', 'Easton'
    ]
    let randomLastNames = [
        'Harding', 'Spencer', 'Ball', 'Cooper', 'Kirby',
        'Guzman', 'Faulkner', 'Wilkerson', 'Silva', 'Williamson',
        'Calderon', 'Clark', 'Carpenter', 'Walker', 'Grimes',
        'Snyder', 'Andersen', 'Sparks', 'Mcguire', 'Gould'
    ]

    let randomIDRange = [10000, 99999]

    let randomTitles = [
        'Urban Planner', 'Professional Athlete', 'Designer',
        'Computer Systems Analyst', 'Electrician', 'Artist',
        'Dentist', 'Anthropologist', 'College Professor',
        'Electrical Engineer', 'Construction Manager', 'Radiologic Technologist',
        'Chef', 'Loan Officer', 'Fitness Trainer',
        'Physicist', 'Marketing Manager', 'Hairdresser',
        'Librarian', 'Reporter'
    ]

    let randomAnnualSalaryRange = [20000, 100000]
    
    // pick a piece of each of that data
    let firstName = randomFirstNames[randomIntBetween(0, randomFirstNames.length - 1)];
    let lastName = randomLastNames[randomIntBetween(0, randomLastNames.length - 1)];
    let id = randomIntBetween(randomIDRange[0], randomIDRange[1]);
    let title = randomTitles[randomIntBetween(0, randomTitles.length - 1)];
    let annualSalary = randomIntBetween(randomAnnualSalaryRange[0], randomAnnualSalaryRange[1]);
    

    // Now fill in the fields with the appropriate data
    $('#firstNameInput').val(firstName);
    $('#lastNameInput').val(lastName);
    $('#idInput').val(id);
    $('#titleInput').val(title);
    $('#annualSalaryInput').val(annualSalary);

    // Submit the data. This is easy to comment out.
    handleSubmitClick();
}

function randomIntBetween (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
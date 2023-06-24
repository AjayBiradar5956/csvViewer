function filterTable() {
    let search = document.getElementById('searchInput');
    let table = document.getElementById('myTable');
    let enteredVal = search.value.toUpperCase();
    let tr = table.getElementsByTagName('tr');

    for (let i = 0; i < tr.length; i++) {
        let found = false;
        let td = tr[i].getElementsByTagName('td');

        //to display the headers all the time
        if (i === 0) {
            tr[i].style.display = "";
            continue;
        }

        for (let j = 0; j < td.length; j++) {
            let textVal = td[j].textContent || td[j].innerText;
            if (textVal.toUpperCase().indexOf(enteredVal) > -1) {
                found = true;
                break;
            }
        }
        if (found) {
            //this empty string reflect the default display of the value
            tr[i].style.display = "";
        } else {
            // hides the other rows, to show the searched row only
            tr[i].style.display = "none";
        }

    }
}

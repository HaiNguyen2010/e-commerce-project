// Button status
const buttonsStatus = document.querySelectorAll("[button-status]");

if(buttonsStatus.length > 0) {
    let url = new URL(window.location.href);

    buttonsStatus.forEach((button) => {
        button.addEventListener("click", () => {
            let status = button.getAttribute("button-status");
            
            if(status) {
                url.searchParams.set("status", status);
            } else {
                url.searchParams.delete("status");
            }

            window.location.href = url.href;
        })
    })
}
// End Button status

// Form Search
const formSearch = document.querySelector("#form-search");
if(formSearch) {
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log(e.target.elements.keyword.value);

        let url = new URL(window.location.href);
        let keyword = e.target.elements.keyword.value;
        if(keyword) {
            url.searchParams.set("keyword", keyword);
        } else {
            url.searchParams.delete("keyword");
        }

        window.location.href = url.href;
    })
}
// End Form Search

// Pagination
const paginationButtons = document.querySelectorAll("[button-pagination]");

if(paginationButtons.length > 0) {
    let url = new URL(window.location.href);
    paginationButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const page = button.getAttribute("button-pagination");
            
            url.searchParams.set("page", page);

            window.location.href = url.href;
        });
    })
}
// End Pagination

// Checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name = 'checkall']");
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']");

    inputCheckAll.addEventListener("click", ()=> {
        if(inputCheckAll.checked) {
            inputsId.forEach(input => {
                input.checked = true;
            });
        } else {
            inputsId.forEach(input => {
                input.checked = false;
            })
        }
    });

    inputsId.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
            if(countChecked == inputsId.length) {
                inputCheckAll.checked = true;
            } else {
                inputCheckAll.checked = false;
            }
        });
    });
}
// End Checkbox Multi

// Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
        
        const typeChange = e.target.elements.type.value;

        if(typeChange == "delete-selected") {
            const isConfirm = confirm("Do you want to delete selected items?");

            if(!isConfirm) {
                return;
            }
        }

        if(inputsChecked.length > 0) {
            let ids = [];
            const inputIds = formChangeMulti.querySelector("input[name='ids']");

            inputsChecked.forEach(input => {
                const id = input.value;
                ids.push(id);
            });

            inputIds.value = ids.join(", ");

            formChangeMulti.submit();

        } else {
            alert("Please select at least one record!");
        }
    })
}
// End Form Change Multi
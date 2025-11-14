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
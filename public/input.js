const form = document.getElementById("student-form");

const inputFieldIds = [
    "name",
    "town-city",
    "state",
    "pincode",
    "english",
    "maths",
    "science",
    "social-science",
    "hindi",
];

function validateInputFields() {
    let isValid = true;
    inputFieldIds.forEach((id) => {
        const inputField = document.getElementById(id);
        if (id === "pincode" && inputField.value.length !== 6) {
            isValid = false;
            inputField.classList.add("error");
        } else if (id === "pincode" && inputField.value.length === 6) {
            inputField.classList.remove("error");
        }
        if (inputField.value === "") {
            isValid = false;
            inputField.classList.add("error");
            console.log("add error");
        } else {
            inputField.classList.remove("error");
        }
        // if inputField type is number, value should be 0 - 100
        if (
            inputField.type === "number" &&
            (inputField.value < 0 || inputField.value > 100)
        ) {
            isValid = false;
            inputField.classList.add("error");
        }
    });
    return isValid;
}

form.addEventListener("submit", async function (e) {
    e.preventDefault();
    console.log("Form Submitted");
    const isValid = validateInputFields();
    if (!isValid) {
        return;
    }
    try {
        const res = await fetch("/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: document.getElementById("name").value,
                townCity: document.getElementById("town-city").value,
                state: document.getElementById("state").value,
                pincode: document.getElementById("pincode").value,
                english: document.getElementById("english").value,
                maths: document.getElementById("maths").value,
                science: document.getElementById("science").value,
                socialScience: document.getElementById("social-science").value,
                hindi: document.getElementById("hindi").value,
            }),
        });
        const data = await res.json();
        console.log(data);
        const successMessage = document.getElementById("success-msg");
        successMessage.classList.remove("hidden");
        setTimeout(() => {
            successMessage.classList.add("hidden");
        }, 2000);
    } catch (error) {}
});

const form = document.querySelector('#uploadForm');

const sendFiles = async () => {
    const userFiles = document.querySelector('#files').files;

    const formData = new FormData();

    Object.keys(userFiles).forEach(key => {
        formData.append(userFiles.item(key).name, userFiles.item(key))
    })
    // remove console
    console.log(formData);

    const OPTIONS = {
        method: 'POST',
        body: formData
    }

    const response = await fetch('http://localhost:3000/upload', OPTIONS);
    const json = await response.json();

    const h2 = document.querySelector('h2');
    h2.textContent = `Status: ${json?.status}`;
    const h3 = document.querySelector('h3');
    h3.textContent = json?.message;
    // remove console
    console.log(json);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    sendFiles();
})
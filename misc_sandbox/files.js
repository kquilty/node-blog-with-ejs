const fs = require('fs');

fs.readFile('./test_input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});

if (!fs.existsSync('./new_directory')) {
    fs.mkdir('./new_directory', (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Directory created successfully.');
    });
}

fs.appendFile('./test_input.txt', '\nAppended line.', (err) => {
    if (err) {
        console.error(err);
        return;
    }   
    console.log('File appended successfully.');
});
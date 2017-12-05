var fs = require('fs');

function writeScreenShot(data, filename) {
    var stream = fs.createWriteStream(filename);
    stream.write(new Buffer(data, 'base64'));
    stream.end();
}

describe('Data is loaded', () => {

    it('Should show a list of more than two chapters', () => {

        browser.get('http://localhost:8080');

        var chapters = element.all(by.repeater('chapter in chapters'));

        browser.driver.sleep(200);

        browser.takeScreenshot().then((png) => {
            writeScreenShot(png, 'test/screenshots/T01-LoadData.png');
        });

        expect(chapters.count()).toBeGreaterThan(2);
    });
});

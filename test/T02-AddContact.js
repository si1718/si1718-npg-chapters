describe('Add contact', () => {
    
	it('should add a new contact', () => {
	    
		browser.get('http://localhost:8080');

		element.all(by.repeater('contact in contacts')).then((initialContacts) => {
		    
			browser.driver.sleep(2000);

			element(by.model('newContact.name')).sendKeys(Math.random());
			element(by.model('newContact.email')).sendKeys('pepe@pepe.com');
			element(by.model('newContact.phone')).sendKeys('ZZZZZZZZZZ');
			
			element(by.buttonText('Add')).click().then(() => {

				element.all(by.repeater('contact in contacts')).then((contacts) => {
					expect(contacts.length).toEqual(initialContacts.length + 1);
				});
			
			});
		});
	});
});
/*=================Default Login================*/
(Without the ' ' symbols)

Name: 'admin'
Surname: 'user'
Email: 'newslodge@gmail.com' 	
Password" 'NewsLodge1234!'
Salt: '62554314784fc5.59557897'
API_Key: '6f499d085c39e4e8be0739886be49226f82760bc803b9b4d' 

/*=================Usage Guide==================*/
Once you open PA3 folder path index.php will be opened, this is a replica of the today page generated through echoes.
Navigate to the top right of the screen to see My Account, this is a dialogue popup, hover over it to see login status, for PA3 it is register and login buttons.
Click on register to be redirected to login page, this page is also constructed with echoes. Fill in the details of the form.
Validation will take place on server and client side, if submit is clicked all form elements will be verified first and any incorrect ones will be highlighted red.
Once validation is complete the server side will attempt to add you to the database, if your email exists you will get the appropriate error.
If all goes well you will recieve your API key on screen to be used. 

/*=============Password Requirements=============*/
Passwords must be 8 characters long, Contain at least one numeric character, Contain at least one capital letter and lastly contain at least one special character. The reasoning behind this is to add a ton of requirements so verification can look in depth if passwords are correct. 

/*===============Salt and Hashing===============*/
SHA256 and SHA512 allows you to define the amount of rounds. The default is 5000 rounds, more is better but takes longer.
I chose SHA512 over SHA256 because SHA256 needs a lot more rounds to be equally as secure as SHA512, so while it's not insecure, it's less secure. 
SHA512 is also slower than SHA216 but in context of security this is good, because it will take a hacker longer to crack it.

/*===============API Key Generation==============*/
I used bin2hex(random_bytes(24)) to allow all API's to be the same length of 48 characters long, this will limit the odds of duplicates but not remove it completely.
Random numbers are sometime predictably generated but it is fine in this case because its not used for security reasons but just to generate a random set of alpha-numeric characters to be saved as a users API key.

/*=================API Paramaters================*/
- If no optional "title", "author", "date" or "rating" parameters are included in request, the first 20 articles are returned.
- If the requested tile, author, rating or date is not found an appropriate message is returned.
- If more than one parameter is specified(i.e title and author) then all articles with these parameters are returned(up to a maximum of 20), even if a single article does not  exclusively contain both specified parameters.

/*=================Functionality=================*/
All functionality on the spec has been implemented.

News articles are cached into a table, once config is constructed a call to the database is made retrieving the last refresh time, if 6 hours has elapsed, a call to NYT and theNews is made to retrieve new articles from different categories. The table can contain a max of 1000 articles and if this limit is reached the oldest articles are deleted from the table to free up space.

All API keys are exactly 48 characters long, so this adds a extra layer of verification on the inputted key parameter.

If invalid return parameters are passed to the api request(i.e. ..&return[]=article-views&..) then it is just excluded from return results and no error is displayed, but if no return parameter is valid then a error is returned.
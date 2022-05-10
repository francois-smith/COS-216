/*=================Default Login================*/
(Without the ' ' symbols)

Name: 'Default'
Surname: 'User'
Email: 'Test@gmail.com' 	
Password" 'TestPass1!'
API_Key: '74d1fbcdc7d52e1c4ca241d3721c12fd091636f25eaf10bd' 

/*=================API Paramaters================*/
-All API calls reqiure a api_key, info will just check and use the default to get articles for any users.

-Update:
    This API type takes an email, key and array of updated user info
    This info is verified to make sure that all parametres are set, this call is purely made from the preferences screen.
    As soon as info has been updated, the session varibales are overwridden by the new information

-login:
    Login takes an email and password input.
    It then validates if the email exists in the database, if it does it gets the user salt from the salts table and runs the hashing method on the provided password.
    If the result matches the password stored with the email then it is the correct details and user details are sent back to client to populate session variables.

-rate 
    This call takes a rating, user_id and article_id to store a table entry that uses foreign keys to link a rating to a user and article.
    When articles are fetched thier ratings are also fetched from the ratings table.

/*=================Functionality=================*/
All functionality on the spec has been implemented.

Rating System uses stars. Once a user rates a article it gets added to a table and the value gets updated to the average rating, a user is only allowed to rate once and must also be logged in to be able to rate.

Once the web page gets loaded a hardcoded default key is stored into session storage, this key is used to fetch articles withou logging in, this allows users to use the website without needing to make an account, but advanced features such as rating needs an account. All API call check if a key is set and also if the key is not equals to the default key to further verify logged in status.

All variables are saved to session storage and gets cleared as soon as the page is closed. When the page is loaded it checks if user is logged in and sets elements such as theme and preference to elements. The preference edit screen is nod loaded to DOM when user is not logged in, this is a security measure so that when users are not logged in they are unable to run the requests stored on the preferences page. The preference page also allows users to update and save theme, preference, name and surname. 

The theme toggle on the footer of the page can be used by any user regardless if they are logged in or not. This toggle is session specific, to save theme to database to be loaded and remembered it needs to be set in the preferences window.
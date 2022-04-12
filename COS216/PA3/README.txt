/*===============Salt and Hashing===============*/
SHA256 and SHA512 allows you to define the amount of roundse. The default is 5000 rounds, more is better but takes longer.
I chose SHA512 over SHA216 because SHA256 needs a lot more rounds to be equally as secure as SHA512, so while it's not insecure, it's less secure. 
SHA512 is also slower than SHA216 but in context of security this is good, because it will take a hacker longer to crack it.

/*===============API Key Generation===============*/
I used bin2hex(random_bytes(24)) to allow all API's to be the same length. Random numbers are sometime predictably generated but it is fine in this case because its not used for security reasons but just to generate a random set of alpha-numeric characters to be saved as a users API key.
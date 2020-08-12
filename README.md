### About face-finder
Enter a URL and face-finder will detect if there is any faces in the image and where they are located! Create an account and track your progress of how many faces you're detecting through the ranking system displayed when you log in.

### How was it made?
HTMLS, CSS (with help from tachyons) and Javascript with the React library were use to make face-finder's frontend. The actual AI face detection was done from an API provided by Clarifai. The server was made with node.js using express.js. Finally, the SQL database used to store information was created with PostgreSQL and communicated with the server through the knex npm package. Deployed using Heroku!

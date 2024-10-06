Steps to use this repo:
1. Clone the repo to your local VSCode.
2. run following commands:
   - npm install
   - node server.js
3. Now access the following API using Postman:
   - (For Streaming the video)(HTTP GET) http://localhost:8080/stream
   - (For posting a new video)(HTTP POST) http://localhost:8080/videos/
         - add Json body in request as follows:
                {
                    "title": "New Perspective on AI",
                    "description": "Trying to analyze the routine activity in the world of AI",
                    "image": "image0.jpg"
                 }
     - (For getting the list of videos)(HTTP GET) http://localhost:8080/videos/
     - (For getting the details of a particular video)(HTTP GET) http://localhost:8080/videos/84e96018-4022-434e-80bf-000ce4cd12b8
                     (You can change the id parameter according to the video required)
     - (For liking the displayed video)(HTTP PUT) http://localhost:8080/videos/84e96018-4022-434e-80bf-000ce4cd12b8/likes
     - (For posting a comment on the displayed video)(HTTP POST) http://localhost:8080/videos/:videoId/comments
           - add JSON body in request as follows:
               {
                   "name": "Brainstation Guy",
                   "comment": "I like to view this video as it is a stressbuster ASMR"
               }
     - (For deleting a comment on the displayed video)(HTTP DELETE) http://localhost:8080/videos/:videoId/comments/:commentId
    
4. To stop the server press ctrl+C

# trivia.ai

## Inspiration
Students frequently fall victim to the habit of passive listening in the lectures and often pass browse through slides without truly understanding the concept. An instantaneous quiz to judge ones understanding will accelerate students learning process. The goal to create engaging learning experince led us to create trivia.ai. Our goal is to create tailored assessment tools for individual needs.

## What it does
trivia.ai is a knowledge assessment tool which builds quizsheets and flashcards from user input. Users can upload transcripts, lecture slides and research papers for an instantaneous quiz. Further, each upload leads to a fresh new quiz. Users can organize progress in quiz scores over time and organize the quizzes into course and topics.

## How we built it
The core technology of trivia.ai is Google's PaLM2 LLM model. PaLM2 is a text based model which excels in reasoning tasks. Vertex API for PaLM2 model is used for generating the quizzes and flashcards.  trivia.ai follows a serverless service based architecture using GCP's cloud functions. MongoDB atlas is leveraged for efficient data storage and retrieval. The serverless architecture along with a sharded database achieves high performance.

## Challenges we ran into
Fine tuning the model parameters to meet a balance between creativity and hallucination has been a challenging part. We focused on building a product both cost effective and scalable. Building a cost effective product without compromising on the vertex api calls was an essential and challenging task.

## Accomplishments that we're proud of
PaLM2's generative capabilities lead to large number of possible testing scenarios. Building a scalable database schema with an eye on the future has been a proud accomplishment. Integrating the frontend and backend required extensive collaboration within the team. Building the product end to end  in a short period of time has been an incredible achievement.

## What we learned
Working with Google Cloud Platform has been a new and an eye opening experience. The services cloud function, cloud storage and vertex api were an essential part of the final product. Striving to build clean UI experience for website the team delved into the depths of react.

## What's next for trivia.ai
The next step trivia.ai is to integrate with a learning management system. This will help educators collaborate with students and develop customized quizzes for each student. Further down the road, we plan to add advanced analytics on quizzes for students and add gamifying events.

# Tech Stacks Used
`google cloud platform` `cloud funtions` `vertex API` `mongoDB Atlas` `React JS` `Material UI`
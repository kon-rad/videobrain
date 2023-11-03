# videobrain.io


### video demo
https://www.youtube.com/watch?v=PxQNCX2ySgQ&t=145s

### slides
https://docs.google.com/presentation/d/1aY5OMITygTNPqU6Kq_01lWIWG8CgO4qB3jSneRP3tgc/edit?usp=sharing

### devpost
https://devpost.com/software/videobrain

## Inspiration
slides https://docs.google.com/presentation/d/1aY5OMITygTNPqU6Kq_01lWIWG8CgO4qB3jSneRP3tgc/edit?usp=sharing

Conference Video libraries are a wealth of information that is not fully utilized until now. Ai chatbots are finally good enough to summarize, search and have substantative conversations on your video content.

## What it does
As youtube channel owner I can upload all my video history to my own 'space' that is accessible to my viewers - perfect for conference talks and youtube creators.
As an end user I can search all video library of a content by semantic search.
Summaries of all videos and suggests top highlights.
Q & A chatbot powered by the video content.
Responds to chat with the youtuber's own voice or the speaker of the talk.
## How we built it
I used twelve labs to search for video content, and find highlights. ElevenLabs for cloning a voice and text to speech. Weaviate and Pulze.ai to do Rag on the content. YouTube Api to get the channel videos, channel Id from user name and transcripts. Firebase for social login, saving channel descriptions, profile data, and video data.

## Challenges we ran into
NextJS 13 tempalte wiht Supabase was very buggy and spent half of the hackathon trying to get this to work and eventually had to abandon it in favor of Nextjs12 and Firebase.

## Accomplishments that we're proud of
Youtube videos are pulled from the channel and transcribed. User can login with Gmail. User can search across all videos. User can chat with ai about the channel.

## What we learned
Tweleve labs and eleven labs are really powerful tools that have many applications in this nascent space also pulze.ai is awesome.

## What's next for VideoBrain
Let's go to production starting with indexing all the Ai Engineer Summit talks! Hopefully can get some grant to keep going and get revenue from a paid plan catered to YouTube content creators.

## Built With
elevenlabs
nextjs
pulze.ai
tailwind
twelvelabs
weaviate
# IPL Bot

IPL FAQ chatbot made using AWS Lex.

<center>
<p>
<img src="https://www.insidesport.co/wp-content/uploads/2020/08/IPL-2020-BCCI.jpg" alt="IPL" width="350px">
</p>
</center>

## What it is
A bot that generates a response based on multiple previous utterances as well as user’s queries to respond in a relevant and sensible manner. The bot also performs a long form of FAQ for various queries which we curated using the given dataset.

## How it works
We built an extractive chatbot which is powered by a BERT question answering modelling running in the backend. Our model is in onnx format which allows it to run very efficiently on CPU. (Inference time 252 ms). We build context for the tabular data using natural language processing, this context allows us to have multi-turn dialogues without having to use some complex dialog management system

The whole backend is deployed on FastAPI which gives performance at par with Golang.

## Features
- Text to Speech Announcement
- Answers or Followup in Text Format
- Instant replies
- Conversational flow of dialog
- Verified and correct answers

## Use cases
- IPL betting games.
- Fantasy IPL where you can choose a team or player based on the best proven statistical fact based on previous data.
- General FAQ.
- Prove your friends wrong about a fact only you remember, within seconds.

## Demo links
- [Video Demo](https://youtu.be/zLBiUUxXKps) [The bot itself won't work due to mixed content error by ngrok so please run it locally for now].
- [Deployed Link](https://iplbot.akshatvg.com/bot).

## Steps to run (Backend):
```bash
$ git clone https://github.com/ramaneswaran/lexbot
$ cd lexbot
$ pip3 install -r requirements.txt
$ aws configure
```
Add your AWS Access Key, Secret Key and set the region to us-east-1. Leave the next field blank.
```bash
$ python3 bot.py
```

## Steps to run (Frontend):
```bash
$ git clone https://github.com/ramaneswaran/lexbot
$ cd lexbot
$ live-server
```
Install the chrome extension for CORS Changing [here](https://chrome.google.com/webstore/detail/digfbfaphojjndkpccljibejjbppifbc) and enable it.


## Learn how to use
- Open the site locally as mentioned above or visit [this link](https://iplbot.akshatvg.com/bot).
- Start asking your queries by just typing and clicking on enter or submit on your device.
- Wait for less than a second to receive a followup to your query or the answer itself (in both voice and text formats).

## Future scope
- We intend to make this chatbot available on Twitch and other supported vendors soon while also adding more complex queries with an even faster response.
- *We need to deploy the backend on a SSL verified domain as ngrok gives a mixed content error because it serves on http.*
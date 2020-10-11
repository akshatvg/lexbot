import pandas as pd 
import boto3
from onnx_transformers import pipeline

from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel


client = boto3.client('lex-runtime')


class Lexbot:
    def __init__(self):
        self.df = pd.read_csv('revised.csv')

        self.data = {
            'date':None,
            'teamA':None,
            'teamB':None,
            'season':None
        }
    

    def get_context(self):
        if self.data['date'] is not None:
            context = self.df[self.df['date'] == self.data['date']]['summary']

        elif self.data['teamA'] is not None and self.data['teamB'] is not None and self.data['season'] is not None:
            cond1 = self.df['team1'] == self.data['teamA']
            cond2 = self.df['team2'] == self.data['teamB']
            cond3 = self.df['season'] == int(self.data['season'])
            context = self.df[(cond1) & (cond2) & (cond3)]['summary']
        elif self.data['teamA'] is not None and self.data['teamB'] is not None:
            cond1 = self.df['team1'] == self.data['teamA']
            cond2 = self.df['team2'] == self.data['teamB']
            context = self.df[(cond1) & (cond2)]['summary']
        else:
            return ""
        

        if context.shape[0] == 0:
            context = ""
        else:
            context = context.tolist()[0]
        
        return context

    def update_slot(self, key, value):
        self.data[key] = value

    def update_data(self, data):
        for key in data:
            self.data[key] = data[key]

    def flush_context(self):
        for key in self.data:
            self.data[key] = None

        self.data['season'] = 2008

    def check_slots(self):
        if self.data['teamA'] is None:
            message = "Please specificy the team"
        elif self.data['teamB'] is None:
            message = "Please specify the opponents"
        elif self.data['season'] is None:
            message = "Please specify the season"
        else:
            message = None
        
        return message

class Message(BaseModel):
    text: str




class App(FastAPI):
    def __init__(self):
        super(App, self).__init__()

        self.bot = Lexbot()
        self.qa = pipeline('question-answering', onnx=True)
        
app = App()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
def root():
    return {"message": "Hello world"}

@app.post("/message/")
def create_item(message: Message):
    text = message.text
    
    response = client.post_text(
        botName='IPLBot',
        botAlias='iplbot',
        userId='raman',
        inputText=text
    )

    
    if "intentName" in response:


        intentName = response['intentName']
        slots = response['slots']

        app.bot.update_data(slots)

        message = app.bot.check_slots()

        if message is None:
            context = app.bot.get_context()
            if len(context)>0:
                result = app.qa(context=context,  question=text)
                message = result['answer']               
            else:
                message = "Couldnt get the answer"


    else:
        message = "Sorry couldnt understand message"

    return {'message': message}
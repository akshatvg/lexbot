import pandas as pd 
import boto3
from onnx_transformers import pipeline

from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse

from pydantic import BaseModel


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
            cond3 = self.df['season'] == self.data['season']
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
            message = "Please specify the components"
        else:
            message = ""
        
        return message

class Message(BaseModel):
    text: str




class App(FastAPI):
    def __init__(self):
        super(App, self).__init__()

        self.bot = Lexbot()
        self.client = boto3.client('lex-runtime')
        
app = App()


@app.get("/")
def root():
    return {"message": "Hello world"}

@app.post("/message/")
async def create_item(message: Message):
    text = message.text
    
    response = app.client.post_text(
    botName='IPLBot',
    botAlias='iplbot',
    userId='raman',
    inputText=text
    )

    print(response)

    intentName = response['intentName']
    slots = response['slots']

    return {'intentName': intentName}
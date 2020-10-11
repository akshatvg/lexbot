import boto3
import pandas as pd
from onnx_transformers import pipeline

client = boto3.client('lex-runtime')
df = pd.read_csv('revised.csv')

def get_context(data):
  
  if 'date' in data:
    context = df[df['date'] == data['date']]['summary'][0]
  elif 'teamA' in data:
    context = df[df['team1'] == data['teamA']]['summary'][0]
  elif 'teamB' in data:
    context = df[df['team2'] == data['teamB']]['summary'][0]
  else:
    context = ""

  return context

# while True:

#     season = '2008'
#     team = 'Mumbai Indians'
#     date = '2017-04-05'

#     ques = input()

#     if ques == 'exit()':
#         break

#     response = client.post_text(
#         botName='IPLBot',
#         botAlias='iplbot',
#         userId='raman',
#         inputText=ques
#     )

#     intentName = response['intentName']
#     slots = response['slots']
#     print(response)
#     print(response['intentName'])
#     print(response['slots'])
#     if intentName == 'GetTeam':
#         if slots['teamA'] == None:
#             continue
#         team = slots['teamA']
#     elif intentName == 'GetDate':
#         if slots['date'] == None:
#             continue
#         date = slots['date']
#     elif intentName == 'GetSeason':
#         if slots['season'] == None:
#             continue
#         season = slots['season']
#     print(team, date, season)
#     print(get_context({
#         'date': date,
#         'team': team,
#         'season': season,
#         }))
nlp_qa = pipeline('question-answering', onnx=True)

context_text = "the match was played in the city of Hyderabad. the match took place inside Rajiv Gandhi International Stadium, Uppal. Royal Challengers Bangalore decided to field after winning the toss. Sunrisers Hyderabad emerged victorious. the team won by 35 runs. Yuvraj Singh took home the man of the match."

question_text = "Where was match played"



answer = nlp_qa(context=context_text,  question=question_text)

print("Answers is ::")

print(answer)

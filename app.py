from flask import Flask, render_template,make_response
from flask.json import jsonify
import requests
from flask import request
from flask_restful import Resource, Api
from datetime import datetime
from datetime import timedelta

app = Flask(__name__,template_folder='static')
api = Api(app)

items = {}

my_date = datetime.now() + timedelta(hours = 6)
EndDate = my_date + timedelta(days=15)
my_date = my_date.strftime('%Y-%m-%dT%H:%M:%SZ')
EndDate = EndDate.strftime('%Y-%m-%dT%H:%M:%SZ')


URL = "https://api.tomorrow.io/v4/timelines"
querystring = {"apikey":"lBsX7BiZPErb0WTNHcIzqfQJQzBAJyQK"}
location = "41.5074066,-81.60832649999999"
fieldinput = ["temperature","temperatureApparent","temperatureMin","temperatureMax",
"windSpeed","windDirection","humidity","pressureSeaLevel","uvIndex","weatherCode",
"precipitationProbability","precipitationType","sunriseTime","sunsetTime",
"visibility","moonPhase","cloudCover"]

params = {
"location":location,
"fields":fieldinput,
"units":"imperial",
"timesteps":["1h", "1d"],
"timezone":"America/Los_Angeles",
"apikey":"lBsX7BiZPErb0WTNHcIzqfQJQzBAJyQK",
"startTime": my_date,
"endTime": EndDate
}
headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
}


class Main(Resource):
    def get(self):
        headers = {'Content-Type': 'text/html'}
        return make_response(render_template('index.html',items = items),200,headers)


class Item(Resource):
    def get(self):
        args = request.args
        lat = args.get('lat')
        lng = args.get('lng')
        params['location'] = str(lat) + "," + str(lng)
        response = requests.request("GET", URL, headers = headers, params=params)
        items = jsonify(response.json())
        return items


api.add_resource(Main,'/') 
api.add_resource(Item,'/item') 

# api.add_resource(ItemList,'/items') 

app.run(port= 5000,debug = True)
from flask import Flask
from flask import jsonify
from flask import make_response
from flask import request
import json
from BarBeerDrinker import database

app=Flask(__name__)
@app.route('/api/bars', methods=["GET"])

def get_bars():
    return jsonify(database.get_bars())

@app.route('/api/bars/<name>', methods=["GET"])
def find_bar(name):
    try:
        if name is None:
            raise ValueError("Bar is not specified.")
        bar = database.find_bar(name)
        if bar is None:
            return make_response("No bar found with the given name.", 404)
        return jsonify(bar)
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/bars/<name>/topSpenders', methods=["GET"])
def get_topSpenders(name):
    try:
        if name is None:
            raise ValueError("Bar is not specified.")
        bar = database.find_bar(name)
        if bar is None:
            return make_response("No bar found with the given name.", 404)
        return jsonify(database.get_topSpenders(name))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/bars/<name>/topManf', methods=["GET"])
def get_topManf(name):
    try:
        if name is None:
            raise ValueError("Bar is not specified.")
        bar = database.find_bar(name)
        if bar is None:
            return make_response("No bar found with the given name.", 404)
        return jsonify(database.get_TopManf(name))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/bars/<name>/topBeersSold', methods=["GET"])
def get_TopBeersSold(name):
    try:
        if name is None:
            raise ValueError("Bar is not specified.")
        bar = database.find_bar(name)
        if bar is None:
            return make_response("No bar found with the given name.", 404)
        return jsonify(database.get_TopBeersSold(name))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/bars/<name>/timeDist', methods=['GET'])
def get_BarTimeDist(name):
    try:
        if name is None:
            raise ValueError('Bar is not specified.')
        bar = database.find_bar(name)
        if bar is None:
            return make_response("No Bar found with the given name.", 404)
        return jsonify(database.get_barTimeDist(name))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/bars/<name>/dayDist', methods=['GET'])
def get_BarDayDist(name):
    try:
        if name is None:
            raise ValueError('Bar is not specified.')
        bar = database.find_bar(name)
        if bar is None:
            return make_response("No Bar found with the given name.", 404)
        return jsonify(database.get_barDayDist(name))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/menu/<name>', methods=['GET'])
def get_menu(name):
    try:
        if name is None:
            raise ValueError('Bar is not specified.')
        bar = database.find_bar(name)
        if bar is None:
            return make_response("No bar found with the given name.", 404)
        return jsonify(database.get_bar_menu(name))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

#---------------------------------------------------

@app.route('/api/beers', methods=['GET'])
def get_beers():
    return jsonify(database.get_beers())

@app.route('/api/beers_cheaper_than', methods=["POST"])
def find_beers_cheaper_than():
    body = json.loads(request.data)
    max_price = body['maxPrice']
    return jsonify(database.filter_beers(max_price))


@app.route('/api/beers/<name>', methods=['GET'])
def get_locations(name):
    try:
        if name is None:
            raise ValueError('Beer is not specified.')
        beer = database.find_beer(name)
        if beer is None:
            return make_response("No beer found with the given name.", 404)
        return jsonify(database.get_beer_locations(name))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/beers/<name>/topLocations', methods=['GET'])
def get_TopLocations(name):
    try:
        if name is None:
            raise ValueError('Beer is not specified.')
        beer = database.find_beer(name)
        if beer is None:
            return make_response("No beer found with the given name.", 404)
        return jsonify(database.get_TopLocations(name))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/beers/<name>/topDrinkers', methods=['GET'])
def get_TopDrinkers(name):
    try:
        if name is None:
            raise ValueError('Beer is not specified.')
        beer = database.find_beer(name)
        if beer is None:
            return make_response("No beer found with the given name.", 404)
        return jsonify(database.find_TopDrinkers(name))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/beers/<name>/timeDist', methods=['GET'])
def get_BeerTimeDist(name):
    try:
        if name is None:
            raise ValueError('Beer is not specified.')
        beer = database.find_beer(name)
        if beer is None:
            return make_response("No beer found with the given name.", 404)
        return jsonify(database.get_beerTimeDist(name))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/frequents-data', methods=['GET'])
def get_bar_frequent_counts():
    try:
        return jsonify(database.get_bar_frequent_counts())
    except Exception as e:
        return make_response(str(e), 500)

#-----------------------------------

@app.route('/api/drinkers', methods=['GET'])
def get_drinkers():
    return jsonify(database.get_drinkers())

@app.route('/api/drinkers/<name>', methods=['GET'])
def get_drinkerTransactions(name):
    try:
        if name is None:
            raise ValueError("Drinker is not specified.")
        drinker = database.find_drinker(name)
        if drinker is None:
            return make_response("No drinker found with the given name.", 404)
        return jsonify(database.get_drinkerTrans(name))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)


@app.route('/api/drinkerInfo/<name>', methods=["GET"])
def find_drinker(name):
    try:
        if name is None:
            raise ValueError("Bar is not specified.")
        drinker = database.find_drinker(name)
        if drinker is None:
            return make_response("No drinker found with the given name.", 404)
        return jsonify(drinker)
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/drinkers/<name>/mostOrdered', methods=["GET"])
def get_mostOrderedBeers(name):
    try:
        if name is None:
            raise ValueError("Drinker is not specified.")
        drinker = database.find_drinker(name)
        if drinker is None:
            return make_response("No drinker found with the given name.", 404)
        return jsonify(database.get_mostOrderedBeers(name))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/drinkers/<name>/spendsPerBar', methods=["GET"])
def get_spendsPerBar(name):
    try:
        if name is None:
            raise ValueError("Drinker is not specified.")
        drinker = database.find_drinker(name)
        if drinker is None:
            return make_response("No drinker found with the given name.", 404)
        return jsonify(database.get_spendingsPerBar(name))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/drinkers/<name>/spendsPerDay', methods=["GET"])
def get_spendsPerDay(name):
    try:
        if name is None:
            raise ValueError("Drinker is not specified.")
        drinker = database.find_drinker(name)
        if drinker is None:
            return make_response("No drinker found with the given name.", 404)
        return jsonify(database.get_spendingsPerDay(name))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/drinkers/<name>/transAt', methods=["GET"])
def get_TransAt(name):
    try:
        if name is None:
            raise ValueError("Drinker is not specified.")
        drinker = database.find_drinker(name)
        if drinker is None:
            return make_response("No drinker found with the given name.", 404)
        return jsonify(database.get_madeTransAt(name))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/drinkers/<name>/<bar>', methods=["GET"])
def get_TransAtBar(name,bar):
    try:
        if name is None:
            raise ValueError("Drinker is not specified.")
        drinker = database.find_drinker(name)
        if drinker is None:
            return make_response("No drinker found with the given name.", 404)
        if bar is None:
            raise ValueError("Bar is not specified.")

        return jsonify(database.get_transAtBar(name,bar))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/transactions/<id>', methods=["GET"])
def get_Purchases(id):
    try:
        return jsonify(database.get_Purchases(id))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/frequents', methods=["GET"])
def get_frequents():
    try:
        return jsonify(database.get_frequents())
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/likes', methods=["GET"])
def get_likes():
    try:
        return jsonify(database.get_likes())
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/food', methods=["GET"])
def get_food():
    try:
        return jsonify(database.get_food())
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/softDrinks', methods=["GET"])
def get_softDrinks():
    try:
        return jsonify(database.get_softDrinks())
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/sqlQuery', methods=["POST"])
def post_Query():
    try:
        body = json.loads(request.data)
        queryString = body["q"]
        print(queryString)
        return jsonify(database.tryQuery(queryString))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)     

@app.route('/api/addBar', methods=["POST"])
def addBar():
    try:
        body = json.loads(request.data)
        name = body["barName"]
        address = body["barAddress"]
        state = body["barState"]
        return jsonify(database.insertBar(name,address,state))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)   


@app.route('/api/bar/delete/<id>', methods=["GET"])
def deleteBar(id):
        return jsonify(database.deleteBar(id))

@app.route('/api/addDrinker', methods=["POST"])
def addDrinker():
    try:
        body = json.loads(request.data)
        name = body["drinkerName"]
        phone = body["phone"]
        address = body["drinkerAddress"]
        state = body["drinkerState"]

        return jsonify(database.insertDrinker(name,phone,address,state))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)   

@app.route('/api/drinker/delete/<id>', methods=["GET"])
def deleteDrinker(id):
        return jsonify(database.deleteDrinker(id))

@app.route('/api/frequents/<drinkerID>/<barID>', methods=["GET"])
def deleteFrequents(drinkerID, barID):
        return jsonify(database.deleteFrequents(drinkerID, barID))
from sqlalchemy import create_engine
from sqlalchemy import sql
from BarBeerDrinker import config
import random

engine = create_engine(config.database_uri)

def get_bars():
    """
    Connect to the database and retrieve a list of all the bars and their information
    """
    with engine.connect() as con:
        rs = con.execute("SELECT barID, name, address, state FROM bars;")
        return [dict(row) for row in rs]

def find_bar(name):
    with engine.connect() as con:
        query = sql.text(
                "SELECT barID, name, address, state FROM bars WHERE name = :name;"
        )
        rs = con.execute(query, name=name)
        result = rs.first()
        if result is None:
            return None
        return dict(result)

def get_bar_menu(bar_name):
        with engine.connect() as con:
                query = sql.text(
                        'SELECT beers.name, sells.price, beers.manf \
                        FROM bars, sells, beers \
                        WHERE  bars.barID=sells.barID and beers.name in (sells.itemName) and bars.name = :bar; \
                ')
        
                rs = con.execute(query, bar=bar_name)
                results = [dict(row) for row in rs]
                for i, _ in enumerate(results):
                        results[i]['price'] = float(results[i]['price'])
                return results

def get_bar_frequent_counts():
        with engine.connect() as con:
                query = sql.text('SELECT b.name, count(*) as frequentCount \
                        FROM frequents f,bars b \
                        WHERE f.barID=b.barID\
                        GROUP BY f.barID; \
                ')
                rs = con.execute(query)
                results = [dict(row) for row in rs]
                return results

def get_topSpenders(barName):
        with engine.connect() as con:
                query = sql.text(
                       "SELECT d.name, sum(t.totalAmount + t.tip) as amount\
                        FROM drinkers d, bars b, transactions t\
                        WHERE b.name =:name \
                        and t.barID = b.barID\
                        and t.drinkerID = d.drinkerID\
                        GROUP BY d.name\
                        ORDER BY amount DESC\
                        LIMIT 10;"
                )
                rs = con.execute(query, name=barName)
                if rs is None:
                        return None
                results= [dict(row) for row in rs]
                for i, _ in enumerate(results):
                        results[i]['amount'] = round(float(results[i]['amount']),2)
                return results
                
def get_TopBeersSold(barName):
        with engine.connect() as con:
                query = sql.text(
                       "SELECT be.name, count(s.itemName) as sold\
                        FROM beers be, bars ba, sells s, transactions t, purchased p\
                        WHERE ba.name = :name \
                        and s.barID = ba.barID \
                        and s.itemName = be.name\
                        and t.barID = ba.barID\
                        and p.itemName = be.name\
                        and p.transactionID = t.transactionID\
                        GROUP BY be.name\
                        ORDER BY count(s.itemName) desc\
                        LIMIT 10;"
                )
                rs = con.execute(query, name=barName)
                if rs is None:
                        return None
                results= [dict(row) for row in rs]
                for i, _ in enumerate(results):
                        results[i]['sold'] = int(results[i]['sold'])
                return results

def get_TopManf(barName):
        with engine.connect() as con:
                query = sql.text(
                       "SELECT be.manf, count(s.itemName) as sold\
                        FROM beers be, bars ba, sells s, transactions t, purchased p\
                        WHERE ba.name = :name \
                        and s.barID = ba.barID \
                        and s.itemName = be.name\
                        and t.barID = ba.barID\
                        and p.itemName = be.name\
                        and p.transactionID = t.transactionID\
                        GROUP BY be.manf\
                        ORDER BY sold desc\
                        LIMIT 10;"
                )
                rs = con.execute(query, name=barName)
                if rs is None:
                        return None
                results= [dict(row) for row in rs]
                for i, _ in enumerate(results):
                        results[i]['sold'] = int(results[i]['sold'])
                return results

def get_barTimeDist(bar_name):
          with engine.connect() as con:
                query = sql.text(
                       "SELECT HOUR(Time(T.time)) as hour, SUM(quantity) as sales\
                        FROM transactions T JOIN purchased P JOIN bars B ON \
                                B.barID=T.barID AND T.transactionID=P.transactionID\
                        WHERE B.name=:name\
                        GROUP BY hour;"
                )
                rs = con.execute(query, name=bar_name)
                if rs is None:
                        return None
                results= [dict(row) for row in rs]
                for i, _ in enumerate(results):
                        
                        results[i]['sales'] = int(results[i]['sales'])
                return results

def get_barDayDist(bar_name):
          with engine.connect() as con:
                query = sql.text(
                       "SELECT T.day as day, SUM(quantity) as sales\
                        FROM transactions T JOIN purchased P JOIN bars B ON \
                                B.barID=T.barID AND T.transactionID=P.transactionID\
                        WHERE B.name=:name\
                        GROUP BY day;"
                )
                rs = con.execute(query, name=bar_name)
                if rs is None:
                        return None
                results= [dict(row) for row in rs]
                for i, _ in enumerate(results):
                        
                        results[i]['sales'] = int(results[i]['sales'])
                return results
#---------------------------------------------------------------------------------   

def get_beers():
    with engine.connect() as con:
        rs = con.execute("SELECT beers.name, beers.manf FROM beers;")
        return [dict(row) for row in rs]

def get_TopLocations(beer_name):
        with engine.connect() as con:
                query = sql.text(
                        "SELECT ba.name, count(be.name) as beerCount\
                        FROM transactions t, bars ba, beers be, purchased p\
                        WHERE be.name =:name\
                        and p.itemName = be.name\
                        and p.transactionID = t.transactionID\
                        and t.barID = ba.barID\
                        GROUP BY ba.name\
                        ORDER BY beerCount DESC\
                        LIMIT 10;"
                )
                rs = con.execute(query, name=beer_name)
                if rs is None:
                        return None
                results= [dict(row) for row in rs]
                for i, _ in enumerate(results):
                        results[i]['beerCount'] = int(results[i]['beerCount'])
                return results


def filter_beers(max_price):
    with engine.connect() as con:
        query = sql.text(
        "SELECT * FROM sells WHERE price < :max_price;"
        )
        rs = con.execute(query, max_price=max_price)
        results = [dict(row) for row in rs]
        for r in results:
            r['price'] = float(r['price'])
        return results

def get_beer_locations(beer_name):
        with engine.connect() as con:
                query = sql.text(
                        'SELECT bars.name, sells.price, bars.address \
                        FROM bars, sells, beers \
                        WHERE  bars.barID=sells.barID and beers.name in (sells.itemName) and beers.name = :beer; \
                ')
        
                rs = con.execute(query, beer=beer_name)
                results = [dict(row) for row in rs]
                for i, _ in enumerate(results):
                        results[i]['price'] = float(results[i]['price'])
                return results

def find_beer(name):
    with engine.connect() as con:
        query = sql.text(
        "SELECT name, manf FROM beers WHERE name = :name;"
        )
        rs = con.execute(query, name=name)
        result = rs.first()
        if result is None:
            return None
        return dict(result)

def find_TopDrinkers(beer_name):
          with engine.connect() as con:
                query = sql.text(
                       "SELECT d.name, sum(p.quantity) as bought\
                        FROM beers be, purchased p, drinkers d, transactions t\
                        WHERE be.name =:name\
                        and p.itemName = be.name\
                        and p.transactionID = t.transactionID\
                        and t.drinkerID = d.drinkerID\
                        GROUP BY d.name\
                        ORDER BY bought desc\
                        LIMIT 10;"
                )
                rs = con.execute(query, name=beer_name)
                if rs is None:
                        return None
                results= [dict(row) for row in rs]
                for i, _ in enumerate(results):
                        results[i]['bought'] = int(results[i]['bought'])
                return results
def get_beerTimeDist(beer_name):
          with engine.connect() as con:
                query = sql.text(
                       "SELECT HOUR(Time(T.time)) as hour, count(*) as sold\
                        FROM transactions T JOIN purchased P JOIN beers B ON \
                                T.transactionID=P.transactionID AND P.itemName=B.name\
                        WHERE B.name=:name\
                        GROUP BY hour;"
                )
                rs = con.execute(query, name=beer_name)
                if rs is None:
                        return None
                results= [dict(row) for row in rs]
                for i, _ in enumerate(results):
                        
                        results[i]['sold'] = int(results[i]['sold'])
                return results

#---------------------------------------------------------------------
def get_drinkers():
    """
    Connect to the database and retrieve a list of all the bars and their information
    """
    with engine.connect() as con:
        rs = con.execute("SELECT drinkerID, name, phone, address, state FROM drinkers;")
        return [dict(row) for row in rs]

def find_drinker(name):
    with engine.connect() as con:
        query = sql.text(
                "SELECT drinkerID, name, phone, address, state FROM drinkers WHERE name=:name;"
        )
        rs = con.execute(query, name=name)
        result = rs.first()
        if result is None:
            return None
        return dict(result)

def get_drinkerTrans(name):
    with engine.connect() as con:
        query = sql.text(
                "SELECT T.transactionID, D.drinkerID, D.name as drinkerName, \
                B.barID, B.name as barName, B.state, T.totalAmount, \
                T.tip,TIME_FORMAT(T.time, '%h:%i:%s %p') as time, T.day\
                FROM transactions T, drinkers D, bars B\
                WHERE D.name=:name AND T.drinkerID=D.drinkerID \
                AND B.barID=T.barID \
                ORDER BY TIME(time);"
        )
        rs = con.execute(query, name=name)
        if rs is None:
                return None
        return [dict(row) for row in rs]

def get_mostOrderedBeers(name):
        with engine.connect() as con:
                query = sql.text(
                        "SELECT  M.itemName as beerName, SUM(P.quantity) as quantity\
                        FROM transactions T JOIN drinkers D JOIN purchased P JOIN menuitems M\
                        ON T.transactionID=P.transactionID AND T.drinkerID=D.drinkerID AND M.itemName=P.itemName\
                        WHERE D.name=:name AND M.type='Beer'\
                        GROUP BY M.itemName\
                        ORDER BY SUM(P.quantity) DESC\
                        LIMIT 10;"
                )
                rs = con.execute(query, name=name)
                if rs is None:
                        return None
                results= [dict(row) for row in rs]
                for i, _ in enumerate(results):
                        results[i]['quantity'] = int(results[i]['quantity'])
                return results

def get_spendingsPerBar(name):
        with engine.connect() as con:
                query = sql.text(
                        "SELECT B.name, SUM(T.totalAmount+T.tip) as totalSpendings\
                        FROM transactions T JOIN drinkers D JOIN bars B ON T.drinkerID=D.drinkerID AND B.barID=T.barID\
                        WHERE D.name=:name\
                        GROUP BY B.barID\
                        ORDER BY totalSpendings DESC\
                        ;"
                )
                rs = con.execute(query, name=name)
                if rs is None:
                        return None
                results= [dict(row) for row in rs]
                for i, _ in enumerate(results):
                        results[i]['totalSpendings'] = round(float(results[i]['totalSpendings']),2)
                return results

def get_spendingsPerDay(name):
        with engine.connect() as con:
                query = sql.text(
                       "SELECT T.day, SUM(T.totalAmount+T.tip) as totalSpendings\
                        FROM transactions T JOIN drinkers D ON T.drinkerID=D.drinkerID \
                        WHERE D.name=:name\
                        GROUP BY T.day\
                        ;"
                )
                rs = con.execute(query, name=name)
                if rs is None:
                        return None
                results= [dict(row) for row in rs]
                for i, _ in enumerate(results):
                        results[i]['totalSpendings'] = round(float(results[i]['totalSpendings']),2)
                return results

#get all the distinct bar names where the drinker has made a transaction at
def get_madeTransAt(name):
        with engine.connect() as con:
                query = sql.text(
                "SELECT DISTINCT(B.name)\
                        FROM transactions T JOIN drinkers D JOIN bars B\
                        ON T.drinkerID=D.drinkerID AND T.barID=B.barID\
                        WHERE D.name=:name;"
                )
                rs = con.execute(query, name=name)
                if rs is None:
                        return None
                return [dict(row) for row in rs]


#get all the transactions made by a given drinker at a given bar
def get_transAtBar(drinkerName, barName):
        with engine.connect() as con:
                query = sql.text(
                "SELECT T.transactionID, D.drinkerID, D.name as drinkername,\
                        B.barID, B.name as barName, B.state as barState, T.totalAmount, T.tip, TIME_FORMAT(T.time, '%h:%i:%s %p') as time, T.day\
                FROM transactions T JOIN drinkers D JOIN bars B ON T.drinkerID=D.drinkerID AND T.barID=B.barID\
                WHERE D.name=:drinkerName AND B.name=:barName\
                ORDER BY TIME(time);"
                )
                rs = con.execute(query, drinkerName=drinkerName,barName=barName)
                if rs is None:
                        return None
                results= [dict(row) for row in rs]
                #for i, _ in enumerate(results):
                    #    results[i]['totalAmount'] =format(float(results[i]['totalAmount'],'.2f'))
                      #  results[i]['tip'] = format(float(results[i]['tip'],'.2f'))
                return results

#get all the purchases made in a given transaction
def get_Purchases(transID):
        with engine.connect() as con:
                query = sql.text(
                "SELECT P.itemName, P.quantity, S.price\
                FROM transactions T JOIN purchased P JOIN sells S ON \
                        T.transactionID=P.transactionID AND T.barID=S.barID and P.itemName=S.itemName\
                WHERE T.transactionID=:ID;"
                )
                rs = con.execute(query, ID=transID)
                if rs is None:
                        return None
                results= [dict(row) for row in rs]
                for i, _ in enumerate(results):
                        results[i]['price'] = format(float(results[i]['price']),'.2f')
                return results
#-----------------------------------------------------

def get_frequents():

    with engine.connect() as con:
        rs = con.execute(
                "SELECT D.drinkerID, D.name as drinkerName, B.barID, B.name as barName\
                FROM frequents F, drinkers D, bars B\
                WHERE F.drinkerID=D.drinkerID AND F.barID=B.barID;"
        
        )
        return [dict(row) for row in rs]

def get_likes():
        with engine.connect() as con:
                rs = con.execute(
                        "SELECT D.drinkerID, D.name as drinkerName, B.name as beerName\
                        FROM likes L, drinkers D, beers B\
                        WHERE L.drinkerID=D.drinkerID AND L.beerName=B.name;"
                
                )
                return [dict(row) for row in rs]

def get_food():
        with engine.connect() as con:
                rs = con.execute(
                        "SELECT name, type FROM food ORDER BY type;"
                )
                return [dict(row) for row in rs]

def get_softDrinks():
        with engine.connect() as con:
                rs = con.execute(
                        "SELECT name, flavor FROM softDrinks ORDER BY name;"
                )
                return [dict(row) for row in rs]     
def tryQuery(q):
         with engine.connect() as con:
                query = sql.text(q)
                rs = con.execute(query)

                if rs is None:
                        print("ERROR WHILE EXECUTING QUERY")
                        return None
                else:
                        return "SUCCESS"
#------------------------------------------------
def deleteBar(id):
        with engine.connect() as con:
                query = sql.text(
                        "DELETE FROM bars WHERE barID = :barID;"
                )
                rs = con.execute(query, barID=id)
                if rs.rowcount>0:
                       return "Successfully deleted bar "+id 
                else:
                        return "Failed to delete bar "+id         

def insertBar(name,address,state):
        id=generateBarID()
        with engine.connect() as con:
                query = sql.text(
                        "INSERT INTO bars (barID, name, address, state) \
                        VALUES (:id, :name, :address, :state);"
                )
                rs = con.execute(query, id=id, name=name,address=address, state=state)

                if rs.rowcount>0:
                       return "Successfully added bar "+id 
                else:
                        return "Failed to add bar" 

def generateBarID():
        with engine.connect() as con:
                id=str(random.randint(3000,6999))
                query = sql.text(
                        "SELECT * FROM bars where barID=:barID;"
                )
                print("generated ",id)

                rs = con.execute(query, barID=id)
                while rs is None:
                        id=str(random.randint(3000,6999))
                        print("duplicate: generated  ",id)

                        rs = con.execute(query, barID=id)
                
                print(id)
                return id

def deleteDrinker(id):
        with engine.connect() as con:
                query = sql.text(
                        "DELETE FROM drinkers WHERE drinkerID = :drinkerID;"
                )
                rs = con.execute(query, drinkerID=id)
                if rs.rowcount>0:
                       return "Successfully deleted drinker "+id 
                else:
                        return "Failed to delete drinker "+id   

def insertDrinker(name,phone,address,state):
        id=generateDrinkerID()
        with engine.connect() as con:
                query = sql.text(
                        "INSERT INTO drinkers (drinkerID, name, phone, address, state) \
                        VALUES (:id, :name, :phone, :address, :state);"
                )
                rs = con.execute(query, id=id, name=name,phone=phone,address=address, state=state)

                if rs.rowcount>0:
                       return "Successfully added drinker " + id 
                else:
                        return "Failed to add drinker" 

def generateDrinkerID():
        with engine.connect() as con:
                id=str(random.randint(2500,10000))
                query = sql.text(
                        "SELECT * FROM drinkers WHERE drinkerID=:drinkerID;"
                )
                print("generated ",id)

                rs = con.execute(query, drinkerID=id)
                #try 3 times
                i=0
                #row count is 0 if successfully executed, 1 if failed
                while rs.rowcount>0:
                        i=i+1
                        id=str(random.randint(2500,10000))
                        print("duplicate: generated  ",id)

                        rs = con.execute(query, drinkerID=id)
                        if i==3:
                                break
                print(id)
                return id
#whenever user wants to insert food, also insert into menuitems
def insert_food(name, type):
        with engine.connect() as con:
                rs = con.execute(
                        "INSERT INTO food (name, type)\
                        VALUES (:name, :type);"
                )
                rs = con.execute(query, name=name,type=type )
                if rs.rowcount>0:
                       return "Successfully added " + name 
                else:
                        return "Failed to add "+name 

def deleteFrequents(drinkerID, barID):
        with engine.connect() as con:
                query = sql.text(
                        "DELETE FROM frequents WHERE drinkerID =:drinkerID and barID =:barID;"
                )
                rs = con.execute(query, drinkerID=drinkerID, barID=barID)
                if rs.rowcount>0:
                       return "Successfully deleted frequents "+drinkerID+" "+barID 
                else:
                        return "Failed to delete frequents "+drinkerID+" "+barID +" : VIOLATES FOREIGN KEYS"
const mysql = require('mysql');
const Marking = require('./marking');

class MySql{
    constructor(){
        this.conn = undefined;
        this.connectionStringJson = {
            host : 'mysql.pedfortcode.com.br',
            port : 3306,
            user : 'pedfortcode',
            password : 'tinta19',
            database : 'pedfortcode'
          };

          if(this.OpenConnection()){
            this.CreateTableMarking();
          }
    }

    OpenConnection(){
        this.conn = mysql.createConnection(this.connectionStringJson);
        this.conn.connect(function (err){
            if(err){
                console.log(`Erro ao conectar mysql:${err}`);
                return false;
            } 
        });
        return true;   
    }

    CreateTableMarking(){
        const sql = "CREATE TABLE IF NOT EXISTS MARKINGS (\n"+
        "Id INTEGER(5) NOT NULL AUTO_INCREMENT,\n"+
        "IdUser INTEGER(5) NOT NULL,\n"+
        "Type varchar(20) NOT NULL,\n"+
        "CreatedIn bigint NOT NULL,\n"+
        "PRIMARY KEY (Id)"+
        ");";

        this.conn.query(sql, function (err, results, fields){
            if(err){
                console.log(`Erro ao criar tabela:${err}`);
                return false;
            } 
        });
        return true;
    }
			CreateTableUser(){
							const sql = "CREATE TABLE IF NOT EXISTS USER (\n)"+
							"Id INTEGER(5) NOT NULL AUTO_INCREMENT,\n"+
							"Email VARCHAR(200) NOT NULL,\n"+
							"Password VARCHAR(50) NOT NULL,\n"+							
							"PRIMARY KEY (Id)"+
        ");";

        this.conn.query(sql, function (err, results, fields){
            if(err){
                console.log(`Erro ao criar tabela:${err}`);
                return false;
            } 
        });
        return true;
			}
    GetAllMarkings(res){
        const query = "SELECT * FROM MARKINGS;";
        this.conn.query(query, function (error, results){
            if(error) {
                console.log(`Erro:${error}`);
                res.json(error);
            }else{
                res.json(results);
            }
            this.conn.end();
        });
    }

    AddMarking(marking, res){
        // console.log(marking);
        const query = `INSERT INTO MARKINGS (IdUser, Type, CreatedIn) VALUES ? `;
        const values = [[marking.iduser, marking.type, marking.createdin]];
        this.conn.query(query, [values], function (err, results, fields){
            if(err){
                console.log(err);
                res.json(err);
                return 0;
            } 
            console.log(results);
            //return results;
            res.json(results);
        });
    }
   
     DelMarking(id, res){
        // console.log(marking);
        const query = `DELETE FROM MARKINGS WHERE ID= ? `;
        const values = [[id]];
        this.conn.query(query, [values], function (err, results, fields){
            if(err){
                console.log(err);
                res.json(err);
                return 0;
            } 
            console.log(results);
            //return results;
            res.json(results);
        });
    }


}

module.exports = MySql;

"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
//set up our pool here 
var pool = mysql.createPool({
  connectionLimit : 10,  
  host : 'classmysql.engr.oregonstate.edu',
  user : 'cs340_turnesar',
  password : '0038',
  database : 'cs340_turnesar' 
});



var app = express();

//uses second argument to set port
app.set('port', process.argv[2]);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

  /**
   * ADD HEADERS
   */
app.use((req,res,next)=>  {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
/**
   * STARTS UP SERVER ACCEPTING REQUESTS
**/

var server = app.listen(app.get('port'),() => {
    var port = server.address().port;
    console.log('Express started on port ' + port);
});


  /**  CHARACTER QUERIES ****************************
   * GET ALL CHARACTER FROM CHARACTER TABLE WITH JOINS
   * SELECT QUERY
   */
app.get('/character',(req,res)=> {
    var char_sql = "SELECT Character.id, Character.name, Type.type_name, Group.group_name, Character.gender, City.city_name FROM `Character` LEFT JOIN `Type` ON Character.type_id = Type.id LEFT JOIN `Group` ON Character.group_id = Group.id LEFT JOIN `City` ON Character.city_id = City.id";   
    pool.query(char_sql,(err,rows,result,fields)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        console.log(rows);
        res.json(rows);
    })
});
  /**  CHARACTER QUERIES ****************************
   * GET TYPE SORTED CHARACTER FROM CHARACTER TABLE WITH JOINS
   * SELECT QUERY
   */
app.get('/character/type',(req,res)=> {
    var charT_sql = "SELECT Character.name, Type.type_name, Group.group_name, Character.gender, City.city_name FROM `Character` LEFT JOIN `Type` ON Character.type_id = Type.id LEFT JOIN `Group` ON Character.group_id = Group.id LEFT JOIN `City` ON Character.city_id = City.id WHERE type_name =?";   
    pool.query(charT_sql,[req.query.type_name],(err,rows,result,fields)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        console.log(rows);
        res.json(rows);
    })
});

  /**  CHARACTER QUERIES ****************************
   * GET GROUP SORTED CHARACTER FROM CHARACTER TABLE WITH JOINS
   * SELECT QUERY
   */
app.get('/character/group',(req,res)=> {
    var charG_sql = "SELECT Character.name, Type.type_name, Group.group_name, Character.gender, City.city_name FROM `Character` LEFT JOIN `Type` ON Character.type_id = Type.id LEFT JOIN `Group` ON Character.group_id = Group.id LEFT JOIN `City` ON Character.city_id = City.id WHERE group_name = ?";   
    pool.query(charG_sql,[req.query.group_name],(err,rows,result,fields)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        console.log(rows);
        res.json(rows);
    })
});
 /**
   * GET ID AND CHARACTER NAME FROM CHARACTER TABLE
   * TO USE IN FILTER - SELECT QUERY
   */
  app.get('/character/:name',(req,res)=> {
    pool.query("SELECT id, name FROM `Character` WHERE name =?",[req.params.name],(err,rows,result,fields)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        console.log(rows);
        res.json(rows);
    })
});

  

 /**
   *INSERT CHARACTER 
   * 
 */
  app.post('/character',(req,res)=>{
    let chardata = [req.body.name, req.body.type_id,req.body.group_id,req.body.gender, req.body.city_id];
    var insertchar ="INSERT INTO `Character` (`name`, `type_id`, `group_id`, `gender`, `city_id`) VALUES (?)"
    pool.query(insertchar,[chardata],(err,rows,result,fields)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        console.log(rows);
        res.json(rows);
    })
});


 /**
   * UPDATE CHARACTER
   * 
   */
  app.put('/character',(req,res)=>{
    var updatedChar = [req.body.name, req.body.type_id, req.body.group_id, req.body.gender, req.body.city_id, req.body.id];
    var updatesql = "UPDATE `Character` SET `name`=?, `type_id`=?,`group_id`=?,`gender`=?,`city_id`=? WHERE `id`=?";
    pool.query(updatesql,updatedChar,(err,rows,result,fields)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        console.log(rows);
        res.json(rows);
    })
});

   /**
   * DELETE CHARACTER
   *   
   */
  app.delete('/character/:id',(req,res)=>{
    pool.query('DELETE FROM `Character` WHERE  id = ?',[req.params.id],(err,rows,result,fields)=>{
        if(err)
        {
            res.send(err);
            console.log(err);
            return;
        }
        console.log('deleted successfully');
        res.send('deleted successfully');
   })
});
  
   
 /**JOB QUERIES*************************s*********
   * GET ALL FROM JOB TABLE 
   *  SELECT QUERY 
   */
  app.get('/job',(req,res)=> {
    var job_sql = "SELECT Job.id, Job.job_name, Job.type_exclusive, Type.type_name FROM `Job` LEFT JOIN `Type` ON Job.type_id = Type.id ORDER BY job_name";
    pool.query(job_sql ,(err,rows,result,fields)=>{
    
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        console.log(rows);
        res.json(rows);
    })
});

 /**
   * GET name/id JOB TABLE
   * Use in Filter SELECT QUERY
   */
  app.get('/job/:name',(req,res)=> {
    pool.query('SELECT id, job_name FROM `Job` WHERE job_name =?',[req.params.name],(err,rows,result,fields)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        console.log(rows);
        res.json(rows);
    })
});

 /**
  *  INSERT JOB 
   */

  app.post('/job',(req,res)=>{
    let datajob = [req.body.job_name, req.body.type_exclusive, req.body.type_id];
    var insertjob ="INSERT INTO `Job` (`job_name`, `type_exclusive`, `type_id`) VALUES (?)";
    pool.query(insertjob,[datajob],(err,rows,result,fields)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        console.log(rows);
        res.json(rows);
    })
});

 /**TYPE QUERIES******************************
   * GET FULL TYPE TABLE
   * SELECT QUERY 
   */
  app.get('/type',(req,res)=> {
    pool.query('SELECT * FROM `Type`',(err,rows,result,fields)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        console.log(rows);
        res.json(rows);

    })
});

   /**
   * DELETE TYPE
   *   
   */
  app.delete('/type/:id',(req,res)=>{
    pool.query('DELETE FROM `Type` WHERE  id = ?',[req.params.id],(err,rows,fields)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        console.log('deleted successfully');
        res.send('deleted successfully');
   })
});
    
    /**
   * GET name/id Type TABLE
   * SELECT QUERY
   */
app.get('/type/:name',(req,res)=> {
    pool.query('SELECT id, type_name FROM `Type`WHERE type_name =?',[req.params.name],(err,rows,result,fields)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        console.log(rows);
        res.json(rows);
    })
});

 /**
   *INSERT TYPES 
   */

  app.post('/type',(req,res)=>{
    var inserttype ="INSERT INTO `Type` (`type_name`, `flight`, `magic`, `equestrian`) VALUES (?)"
    var parameters = [req.body.type_name,req.body.flight,req.body.magic,req.body.equestrian];
    pool.query(inserttype,[parameters],(err,rows,result,fields)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        console.log(rows);
        res.json(rows);
    })
});

 /**CITY QUERIES******************************
   * GET FULL CITY TABLE
   * SELECT QUERY 
   */
  app.get('/city',(req,res)=> {
    pool.query('SELECT * FROM `City`',(err,rows,result,fields)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        console.log(rows);
        res.json(rows);
    })
});
    
    /**
   * GET name/id City TABLE
   * SELECT QUERY
   */
app.get('/city/:name',(req,res)=> {
    pool.query('SELECT id, city_name FROM `City`WHERE city_name =?',[req.params.name],(err,rows,result,fields)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        console.log(rows);
        res.json(rows);
    })
});

 /**
   * INSERT CITY 
   */
  app.post('/city',(req,res)=>{
    var insertcity ="INSERT INTO `City` (`city_name`, `characteristics`) VALUES (?)"
    var parameters = [req.body.city_name, req.body.characteristics];
    pool.query(insertcity, [parameters], (err,rows,result,fields)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        console.log(rows);
        res.json(rows);
    })
});

/**GROUP QUERIES**********************************
   * GET ALL FROM GROUP TABLE
   * SELECT QUERY 
   */
  app.get('/group',(req,res)=> {
    var group_sql = "SELECT Group.group_name, City.city_name FROM `Group` LEFT JOIN `City` ON Group.city_id = City.id";
    pool.query(group_sql ,(err,rows,result,fields)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        console.log(rows);
        res.json(rows);
    })
});

 /**
   * GET name/id group TABLE
   * SELECT QUERY
   */
  app.get('/group/:name',(req,res)=> {
    pool.query('SELECT id, group_name FROM `Group`WHERE group_name =?"',[req.params.name],(err,rows,result,fields)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        console.log(rows);
        res.json(rows);
    })
});

 /**
  * INSERT Group 
   */
  app.post('/group',(req,res)=>{
    let groupdata = [req.body.group_name, req.body.city_id];
    var insertgroup ="INSERT INTO `Group` (`group_name`, `city_id`) VALUES (?)";
    pool.query(insertgroup,[groupdata],(err,rows,result,fields)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        console.log(rows);
        res.json(rows);
    })
});

/*END OF ENTITY TABLES, NOW RELATIONSHIPS*/

/***Character_Job Queries *****************************
  *Show all for table
  * SELECT QUERY
   */
  app.get('/character_job',(req,res)=> {
    var ponywork_sql = "SELECT Character.name, Job.job_name FROM `Character_Job` INNER JOIN `Character` ON Character.id = Character_Job.character_id INNER JOIN `Job` ON Character_Job.job_id =  Job.id";
    pool.query(ponywork_sql ,(err,rows,result,fields)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        console.log(rows);
        res.json(rows);
    })
});

/*
 * *SELECT IDs only for Character_Job Table 

  app.get('/character_job/:id',(req,res)=> {
    var workid_sql = "SELECT * FROM `Character_Job`";
    pool.query(workid_sql ,[req,params.id],(err,rows,result,fields)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        console.log(rows);
        res.json(rows);
    })
});
 * */

/**
 * ***CREATE RELATIONSHIP/INSERT 
 * */
  app.post('/character_job',(req,res)=>{
    var insertrel="INSERT INTO `Character_Job` (`character_id`, `job_id`) VALUES (?)"
    var parameters = [req.body.character_id,req.body.job_id];
    pool.query(insertrel,[parameters],(err,rows,result,fields)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        console.log(rows);
        res.json(rows);
    })
});

/**
 * ***DELETE RELATIONSHIP 
 * */
  app.delete('/character_job',(req,res)=>{
    pool.query('DELETE FROM `Character_Job` WHERE character_id = ? AND job_id = ?',[req.body.character_id, req.body.job_id],(err,rows,result,fields)=>{
        if(err)
        {
            res.json(err);
            console.log(err);
            return;
        }
        console.log("deleted successfully");
        res.json(rows);
   })
});


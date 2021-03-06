
/**
 * Common database helper functions.
 */
class DBHelper {

  /**
 * Common database helper functions.
 */

  /**
   * Database URL.
   */
  static get DATABASE_URL() {
    const port = 5432;
    // Change this to your server port
      return `http://flip2.engr.oregonstate.edu:${port}/character`;
      //return '/data/ponies.json';
  }
  /**
   * Database URL.
   */
  static get CITIES_DATABASE_URL() {
    const port = 5432;
    // Change this to your server port
      return `http://flip2.engr.oregonstate.edu:${port}/city`;
    //  return `http://localhost:${port}/data/cities.json`;
  }

    /**
   * Database URL.
   */
  static get TYPES_DATABASE_URL() {
    const port = 5432;
    // Change this to your server port
      return `http://flip2.engr.oregonstate.edu:${port}/type`;
    //  return `http://localhost:${port}/data/cities.json`;
  }
    /**
   * Database URL.
   */
  static get JOBS_DATABASE_URL() {
    const port = 5432;
    // Change this to your server port
      return `http://flip2.engr.oregonstate.edu:${port}/job`;
    //  return `http://localhost:${port}/data/cities.json`;
  }
    /**
   * Database URL.
   */
  static get GROUPS_DATABASE_URL() {
    const port = 5432;
    // Change this to your server port
      return `http://flip2.engr.oregonstate.edu:${port}/group`;
    //  return `http://localhost:${port}/data/cities.json`;
  }
    /**
   * Database URL.
   */
  static get CHAR_JOB_DATABASE_URL() {
    const port = 5432;
    // Change this to your server port
      return `http://flip2.engr.oregonstate.edu:${port}/character_job`;
    //  return `http://localhost:${port}/data/cities.json`;
  }

  static fetchPonies(callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', DBHelper.DATABASE_URL);
    xhr.onload = () => {
      if (xhr.status === 200) { // Got a success response from server!
        const json = JSON.parse(xhr.responseText);
        const ponies = json;
        callback(null, ponies);
      } else { // Oops!. Got an error from server.
        const error = (`Request failed. Returned status of ${xhr.status}`);
        callback(error, null);
      }
    };
    xhr.send();
  }
  
    /**
   * Fetch pony by a type and a group with proper error handling.
   */
  static fetchPoniesByFilter(type,group,callback){
   let xhr = new XMLHttpRequest();
   let url;
   self.type = type;
   self.group = group;
    if(type !='all')
    {
      url = new URL('character/type/'+type, DBHelper.DATABASE_URL);
      console.log(url);
    }
    else if(group!='all')
    {
      url = new URL('character/group/'+group, DBHelper.DATABASE_URL);
      console.log(url);

    }
    else
    {
      url =  new URL(DBHelper.DATABASE_URL);
      console.log(url);
    }
    xhr.open('GET',url);
    xhr.onload = () => {
      if (xhr.status === 200) { // Got a success response from server!
        const json = JSON.parse(xhr.responseText);
        console.log(json);
        const ponies = json;
        callback(null, ponies);
      
      } else { // Oops!. Got an error from server.
        const error = (`Request failed. Returned status of ${xhr.status}`);
        callback(error,null);
      }
    };
    xhr.send();
  }


  static fetchCities(callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', DBHelper.CITIES_DATABASE_URL);
    xhr.onload = () => {
      if (xhr.status === 200) { // Got a success response from server!
        const json = JSON.parse(xhr.responseText);
        const cities = json;
        console.log(cities);
        callback(null, cities);
      } else { // Oops!. Got an error from server.
        const error = (`Request failed. Returned status of ${xhr.status}`);
        callback(error, null);
      }
    };
    xhr.send();
  }
   /** Makes request to fetch Group json **/
   static fetchGroups(callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', DBHelper.GROUPS_DATABASE_URL);
    xhr.onload = () => {
      if (xhr.status === 200) { // Got a success response from server!
        const json = JSON.parse(xhr.responseText);
        const groups = json;
        callback(null, groups);
      } else { // Oops!. Got an error from server.
        const error = (`Request failed. Returned status of ${xhr.status}`);
        callback(error, null);
      }
    };
    xhr.send();
  }
     /** Makes request to fetch Group json **/
     static fetchTypes(callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', DBHelper.TYPES_DATABASE_URL);
    xhr.onload = () => {
      if (xhr.status === 200) { // Got a success response from server!
          const json = JSON.parse(xhr.responseText);
          const types = json;
          console.log(types);
          callback(null, types);
        } else { // Oops!. Got an error from server.
          const error = (`Request failed. Returned status of ${xhr.status}`);
          callback(error, null);
        }
      };
      xhr.send();
    }
    /** Makes request to fetch Group json **/
    static fetchJobs(callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', DBHelper.JOBS_DATABASE_URL);
    xhr.onload = () => {
    if (xhr.status === 200) { // Got a success response from server!
      const json = JSON.parse(xhr.responseText);
      const jobs = json;
      callback(null, jobs);
      } else { // Oops!. Got an error from server.
        const error = (`Request failed. Returned status of ${xhr.status}`);
        callback(error, null);
        }
      };
    xhr.send();
   }
    /** Makes request to fetch Group json **/
    static fetchChar_Job(callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', DBHelper.CHAR_JOB_DATABASE_URL);
    xhr.onload = () => {
    if (xhr.status === 200) { // Got a success response from server!
      const json = JSON.parse(xhr.responseText);
      const jobs = json;
      callback(null, jobs);
      } else { // Oops!. Got an error from server.
          const error = (`Request failed. Returned status of ${xhr.status}`);
          callback(error, null);
        }
      };
    xhr.send();
    }
    

  
  static fetchTypeById(name) {
   let url = new URL('type/'+name, DBHelper.TYPES_DATABASE_URL);
   console.log(url);
    fetch(url)
     .then(response => {
       if(!response.ok){
         throw Error(`Request failed. Returned status of ${response.statusText}`);
        }
        const type = response.json();
        return type; 
      })
      .then(type => {
        console.log(type[0].id);
        return type[0].id;
      })
  }
/*
static fetchTypeById(name) {
  let url = new URL('type/'+name, DBHelper.TYPES_DATABASE_URL);
  console.log(url);
  fetch(url).then(response => 
    response.json().then(data => ({
        data: data,
        status: response.status
    })
  ).then(res => {
    console.log(res.status, res.data)
  }));
}
*/
/*
   * Fetch a restaurant by its ID.
   
  static fetchTypeById(id, callback) {
    // fetch all bettas with proper error handling.
    DBHelper.fetchPonies((error, ponies) => {
      if (error) {
        callback(null,error);
      } else {
       // fetch(DBHelper.DATABASE_URL)
       // .then(response => response.json())
      //  .then(bettas => {
        const pony = ponies.find(r => r.id == id);
        if (pony) { // Got the location
          //return site;
          callback(null, pony);
        } else { // Location does not exist in the database
          callback('Location does not exist', null);
        }
      }
    });
  }*/
    /**
   * Fetch a restaurant by its ID.
   */
  static fetchPonyById(id, callback) {
    // fetch all bettas with proper error handling.
    DBHelper.fetchPonies((error, ponies) => {
      if (error) {
        callback(null,error);
      } else {
       // fetch(DBHelper.DATABASE_URL)
       // .then(response => response.json())
      //  .then(bettas => {
        const pony = ponies.find(r => r.id == id);
        if (pony) { // Got the location
          //return site;
          callback(null, pony);
        } else { // Location does not exist in the database
          callback('Location does not exist', null);
        }
      }
    });
  }

  static fetchTypeByName(name, callback) {
    // fetch all restaurants with proper error handling.
    let url = new URL('type/'+name, DBHelper.TYPES_DATABASE_URL);
    fetch(url)
    .then(response => response.json())
    .then(data => callback(null, data))
    .catch(error => callback(error, null));
}
  /**
   * Fetch all groups with proper error handling.
   */
  static fetchGroupFilter(callback) {
    // Fetch all ponies
    DBHelper.fetchPonies((error, ponies) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all groups from all bettas
        const groups = ponies.map((v, i) => ponies[i].group_name)
        // Remove duplicates from groups
        const uniqueGroups= groups.filter((v, i) => groups.indexOf(v) == i)
        console.log(uniqueGroups);
        callback(null, uniqueGroups);
      }
    });
  }

  /**
   * Fetch all types with proper error handling.
   */
  static fetchTypeFilter(callback) {
    // Fetch all bettas
    DBHelper.fetchPonies((error, ponies) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all tyoes from all ponies
        const types = ponies.map((v, i) => ponies[i].type_name)
        // Remove duplicates from types
        const uniqueTypes = types.filter((v, i) => types.indexOf(v) == i)
        callback(null, uniqueTypes);
      }
    });
  }

  /**
   * Pony page for URL.
   */
  static urlForPony(pony) {
    return (`./character_info.html?id=${pony.id}`);
  }

  /**
   * Pony image URL.
   */
  static imageUrlForPony(pony) {
    return (`/img/${pony.photograph}`);
  }

  /**** THE FOLLOWING CODE: needs to be updated to use for different inserts into tables through server********
  
   static deleteCharacterJob(jobID,charID) {
    event.preventDefault();
    let url = new URL('character_job/'+inputID, DBHelper.CHAR_JOB_DATABASE_URL);
    let review_body = {
      "job_id": jobID,
      "character_id": charID,
      };
    const myPost = fetch(url, {
      method: 'DELETE',
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
          "Content-Type": "application/json; charset=utf-8",
           // "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(review_body),
    }); // parses response to JSO
  alert("Your request has been sent.");
  document.getElementById("delete").disabled = true;
  return myPost;
  }

*/
 
  static checkStatus(value){
    if (value == "Yes")
      { return 1;}
    if (value == "No")
      { return 0;}
    else{ return null; }
  }

  static getIDfromName(){
    if (value == "Yes")
      { return 1;}
    if (value == "No")
      { return 0;}
    else{ return null; }
  }
  static getRadioVal(form, name) {
    var val;
    // get list of radio buttons with specified name
    var radios = form.elements[name];
    
    // loop through list of radio buttons
    for (var i=0, len=radios.length; i<len; i++) {
        if ( radios[i].checked ) { // radio checked?
            val = radios[i].value; // if so, hold its value in val
            break; // and break out of for loop
        }
    }
    return val; // return value of checked radio or undefined if none checked
}

  static postCharacter(){
    event.preventDefault();
    let type_id;
    let group_id;
    let city_id;
    let formVal = document.getElementById('contact_form');
    let typeVal = document.getElementById('type_id').value;
    let groupVal = document.getElementById('group_id').value;
    let cityVal = document.getElementById('city_id').value;
    let gender = DBHelper.getRadioVal(formVal, 'gender' );
    let name = document.getElementById('name').value;
    if (gender.length == 0)
    {
      gender = null;
    }
    ///fetching the id from /type/:typename
    // promises like xhr are a pain to return an actual value without a callback
    //what if you need to fetch from different sources to get values for your input
    //that's a fun function within a function within a function. :()
    //https://stackoverflow.com/questions/40981040/using-a-fetch-inside-another-fetch-in-javascript
    let url1 = new URL('type/'+typeVal, DBHelper.TYPES_DATABASE_URL);
    let url2 = new URL('city/'+cityVal, DBHelper.CITIES_DATABASE_URL);
    let url3 = new URL('group/'+groupVal, DBHelper.GROUPS_DATABASE_URL);
    console.log(url1);
    console.log(url2);
    console.log(url3);
    fetch(url1).then(response => {
        if(!response.ok){
           throw Error(`Request failed. Returned status of ${response.statusText}`);
        }
         const type = response.json();
        return type; 
      })
      .then(type => {
        console.log(type);
        if (type.length == 0)
        {
          type_id = null;
        }
        else {type_id = type[0].id;}
        console.log(type_id);
      fetch(url2).then(response => {
          if(!response.ok){
             throw Error(`Request failed. Returned status of ${response.statusText}`);
          }
           const city = response.json();
          return city; 
        })
        .then(city => {
          if (city.length == 0)
          {
            city_id = null;
          }
          else{city_id = city[0].id;}
          console.log(city_id);
      fetch(url3).then(response => {
          if(!response.ok){
             throw Error(`Request failed. Returned status of ${response.statusText}`);
          }
           const group = response.json();
          return group; 
        })
        .then(group => {
          if (group.length == 0)
          {
            group_id = null;
          }
          else{group_id = group[0].id;}
          console.log(group_id);
        
      let review_body = {
          "name": name,
          "type_id": type_id,
          "city_id": city_id,
          "gender" : gender,
          "group_id" : group_id
          };
      console.log(review_body);
      const myPost = fetch('http://flip2.engr.oregonstate.edu:5432/character', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                 "Content-Type": "application/json; charset=utf-8",
                 // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(review_body), // body data type must match "Content-Type" header
      }); // parses response to JSON
        let modal = document.getElementById("myModal");
        modal.style.display = "none";
        return myPost;
      })    //this is to encapsulate into the fetch like a function
    })    //this is to encapsulate into the fetch like a function
  })    //this is to encapsulate into the fetch like a function
  }

  
  static putCharacter(charID){
    event.preventDefault();
    let type_id;
    let group_id;
    let city_id;
    let formVal = document.getElementById('contact_form');
    let typeVal = document.getElementById('type_id').value;
    let groupVal = document.getElementById('group_id').value;
    let cityVal = document.getElementById('city_id').value;
    let gender = DBHelper.getRadioVal(formVal,'gender');
    let name = document.getElementById('name').value;
    if (name == "")
    {
      name = document.getElementById('name').placeholder;
      console.log("name: " + name);
    }
    if (gender.length == 0)
        {
          gender = null;
        }
 
    ///fetching the id from /type/:typename
    // promises like xhr are a pain to return an actual value without a callback
    //what if you need to fetch from different sources to get values for your input
    //that's a fun function within a function within a function. :()
    //https://stackoverflow.com/questions/40981040/using-a-fetch-inside-another-fetch-in-javascript
    let url1 = new URL('type/'+typeVal, DBHelper.TYPES_DATABASE_URL);
    let url2 = new URL('city/'+cityVal, DBHelper.CITIES_DATABASE_URL);
    let url3 = new URL('group/'+groupVal, DBHelper.GROUPS_DATABASE_URL);
    console.log(url1);
    console.log(url2);
    console.log(url3);
    fetch(url1).then(response => {
        if(!response.ok){
           throw Error(`Request failed. Returned status of ${response.statusText}`);
        }
         const type = response.json();
        return type; 
      })
      .then(type => {
        console.log(type);
        if (type.length == 0)
        {
          type_id = null;
        }
        else {type_id = type[0].id;}
        console.log(type_id);
      fetch(url2).then(response => {
          if(!response.ok){
             throw Error(`Request failed. Returned status of ${response.statusText}`);
          }
           const city = response.json();
          return city; 
        })
        .then(city => {
          if (city.length == 0)
          {
            city_id = null;
          }
          else{city_id = city[0].id;}
          console.log(city_id);
      fetch(url3).then(response => {
          if(!response.ok){
             throw Error(`Request failed. Returned status of ${response.statusText}`);
          }
           const group = response.json();
          return group; 
        })
        .then(group => {
          if (group.length == 0)
          {
            group_id = null;
          }
          else{group_id = group[0].id;}
          console.log(group_id);
        
      let review_body = {
          "name": name,
          "type_id": type_id,
          "city_id": city_id,
          "gender" : gender,
          "group_id" : group_id,
          "id" : charID
          };
      console.log(review_body);
      const myPost = fetch('http://flip2.engr.oregonstate.edu:5432/character', {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                 "Content-Type": "application/json; charset=utf-8",
                 // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(review_body), // body data type must match "Content-Type" header
      }); // parses response to JSON
        return myPost;
      })    //this is to encapsulate into the fetch like a function
    })    //this is to encapsulate into the fetch like a function
  })    //this is to encapsulate into the fetch like a function
  }

  static deleteCharacter(charID){
    event.preventDefault();
    console.log(charID);
    fetch(DBHelper.DATABASE_URL + '/' + charID, {
      method: 'DELETE'
    });
  }

  static postType(){
    event.preventDefault();
    let name = document.getElementById('name').value;
     
    let magic = document.getElementById('magic').value;
    let magic_bool = this.checkStatus(magic);
    let flight = document.getElementById('flight').value;
    let flight_bool = this.checkStatus(flight);
    let equestrian = document.getElementById('equest').value;
    let equest_bool = this.checkStatus(equestrian);
   
    let review_body = {
        "type_name": name,
        "flight": flight_bool,
        "magic" : magic_bool,
        "equestrian" : equest_bool
        };
   
    const myPost = fetch('http://flip2.engr.oregonstate.edu:5432/type', {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, cors, *same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          headers: {
              "Content-Type": "application/json; charset=utf-8",
               // "Content-Type": "application/x-www-form-urlencoded",
          },
          redirect: "follow", // manual, *follow, error
          referrer: "no-referrer", // no-referrer, *client
          body: JSON.stringify(review_body), // body data type must match "Content-Type" header
      }); // parses response to JSON
      let modal = document.getElementById("myModal");
      modal.style.display = "none";
      return myPost;
  }

  
  static postCity(){
    event.preventDefault();
    let name = document.getElementById('name').value;
    let characteristics = document.getElementById('desc').value;
    let review_body = {
        "city_name": name,
        "characteristics": characteristics,
        };
    console.log(review_body);
    const myPost = fetch('http://flip2.engr.oregonstate.edu:5432/city', {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, cors, *same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          headers: {
              "Content-Type": "application/json; charset=utf-8",
               // "Content-Type": "application/x-www-form-urlencoded",
          },
          redirect: "follow", // manual, *follow, error
          referrer: "no-referrer", // no-referrer, *client
          body: JSON.stringify(review_body), // body data type must match "Content-Type" header
      }); // parses response to JSON
      let modal = document.getElementById("myModal");
      modal.style.display = "none";
      return myPost;
  }

  static postJob(){
    event.preventDefault();
    let type_id;
    let name = document.getElementById('name').value;
     
    let type_excluse = document.getElementById('type_exclusive').value;
    let type_bool = this.checkStatus(type_excluse);
    let type_name = document.getElementById('type_id').value;
    if (type_bool == 1)
    {
      ///fetching the id from /type/:typename
      // promises like xhr are a pain to return an actual value without a callback
      //what if you need to fetch from different sources to get values for your input
      //that's a fun function within a function within a function. :()
      //https://stackoverflow.com/questions/40981040/using-a-fetch-inside-another-fetch-in-javascript
      let url = new URL('type/'+type_name, DBHelper.TYPES_DATABASE_URL);
      fetch(url)
        .then(response => {
          if(!response.ok){
            throw Error(`Request failed. Returned status of ${response.statusText}`);
          }
          const type = response.json();
          return type; 
        })
        .then(type => {
          type_id = type[0].id;
          console.log(type_id);
      
        console.log(type_id);
      let review_body = {
          "job_name": name,
          "type_exclusive": type_bool,
          "type_id" : type_id
          };
      console.log(review_body);
      const myPost = fetch('http://flip2.engr.oregonstate.edu:5432/job', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(review_body), // body data type must match "Content-Type" header
        }); // parses response to JSON
        let modal = document.getElementById("myModal");
        modal.style.display = "none";
        return myPost;
      })
    } 
    else
    {
      let review_body = {
        "job_name": name,
        "type_exclusive": type_bool,
        "type_id" : null
        };
      console.log(review_body);
      const myPost = fetch('http://flip2.engr.oregonstate.edu:5432/job', {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, cors, *same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          headers: {
              "Content-Type": "application/json; charset=utf-8",
              // "Content-Type": "application/x-www-form-urlencoded",
          },
          redirect: "follow", // manual, *follow, error
          referrer: "no-referrer", // no-referrer, *client
          body: JSON.stringify(review_body), // body data type must match "Content-Type" header
        }); // parses response to JSON
      let modal = document.getElementById("myModal");
      modal.style.display = "none";
      return myPost;

    }
  }

  
  static postGroup(){
    event.preventDefault();
    let type_id;
    let name = document.getElementById('name').value;
    let city_name = document.getElementById('city_id').value;
    if (city_name !== "None")
    {

      console.log(city_name);
      ///fetching the id from /type/:typename
      // promises like xhr are a pain to return an actual value without a callback
      //what if you need to fetch from different sources to get values for your input
      let url = new URL('city/'+city_name, DBHelper.CITIES_DATABASE_URL);
      fetch(url)
        .then(response => {
          if(!response.ok){
            throw Error(`Request failed. Returned status of ${response.statusText}`);
          }
          const city = response.json();
          return city; 
        })
        .then(city => {
          let cityid = city[0].id;
          console.log(city);
      
        console.log(cityid);
      let review_body = {
          "group_name": name,
          "city_id" : cityid
          };
      console.log(review_body);
      const myPost = fetch('http://flip2.engr.oregonstate.edu:5432/group', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(review_body), // body data type must match "Content-Type" header
        }); // parses response to JSON
        let modal = document.getElementById("myModal");
        modal.style.display = "none";
        return myPost;
      })
    }
    else
    {
      let review_body = {
        "group_name": name,
        "city_id" : null
        };
          console.log(review_body);
          const myPost = fetch('http://flip2.engr.oregonstate.edu:5432/group', {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, cors, *same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          headers: {
              "Content-Type": "application/json; charset=utf-8",
              // "Content-Type": "application/x-www-form-urlencoded",
          },
          redirect: "follow", // manual, *follow, error
          referrer: "no-referrer", // no-referrer, *client
          body: JSON.stringify(review_body), // body data type must match "Content-Type" header
      }); // parses response to JSON
      let modal = document.getElementById("myModal");
      modal.style.display = "none";
      return myPost;
    }
  }

  static deleteChar_Job(charID,jobID ){
    event.preventDefault();
      let review_body = {
          "character_id": charID,
          "job_id": jobID,
          };
      console.log(review_body);
      const myPost = fetch('http://flip2.engr.oregonstate.edu:5432/character_job', {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                 "Content-Type": "application/json; charset=utf-8",
                 // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(review_body), // body data type must match "Content-Type" header
      }); // parses response to JSON
        let modal = document.getElementById("myModal");
        modal.style.display = "none";
        return myPost;
     // })    //this is to encapsulate into the fetch like a function
   // })    //this is to encapsulate into the fetch like a function
  }

  static postChar_Job(){
    event.preventDefault();
    let char_id;
    let job_id;
    let characters = document.getElementById('characters').value;
    let jobs = document.getElementById('jobs').value;
    console.log(characters);
    console.log(jobs);
   
    ///fetching the id from /type/:typename
    // promises like xhr are a pain to return an actual value without a callback
    //what if you need to fetch from different sources to get values for your input
    //that's a fun function within a function within a function. :()
    //https://stackoverflow.com/questions/40981040/using-a-fetch-inside-another-fetch-in-javascript
    let url1 = new URL('character/'+characters, DBHelper.DATABASE_URL);
    let url2 = new URL('job/'+jobs, DBHelper.JOBS_DATABASE_URL);
    fetch(url1).then(response => {
        if(!response.ok){
           throw Error(`Request failed. Returned status of ${response.statusText}`);
        }
         const character = response.json();
        return character; 
      })
      .then(character => {
       char_id = character[0].id;
        console.log(char_id);
      fetch(url2).then(response => {
          if(!response.ok){
             throw Error(`Request failed. Returned status of ${response.statusText}`);
          }
           const job = response.json();
          return job; 
        })
        .then(job => {
           job_id = job[0].id;
          console.log(job_id);
        
      let review_body = {
          "character_id": char_id,
          "job_id": job_id,
          };
      console.log(review_body);
      const myPost = fetch('http://flip2.engr.oregonstate.edu:5432/character_job', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                 "Content-Type": "application/json; charset=utf-8",
                 // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(review_body), // body data type must match "Content-Type" header
      }); // parses response to JSON
        let modal = document.getElementById("myModal");
        modal.style.display = "none";
        return myPost;
      })    //this is to encapsulate into the fetch like a function
    })    //this is to encapsulate into the fetch like a function
  }

}


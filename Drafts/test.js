function botinfo(persona,style,identity) {
  let num = Math.floor(Math.random() * 4);
  //let port = num.toString();
  let port = '0';
    return new Promise((resolve, reject) =>
    {
      const options = {
          method: 'POST',
          credentials: 'include',
          mode: 'cors',
          headers: {
              'content-type': 'application/json',
          },
          body: JSON.stringify({"persona":persona,"style":style,"identity":identity})
      };
  
      const url = 'http://127.0.0.1:5010/bot';
  
      fetch(url, options)
        .then(response => response.json())
          .then(response => resolve(response.status))
          .catch(err => reject(err));
  
    })}
  
  
  export default botinfo;
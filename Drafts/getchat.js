function Chattest(user) {
    return new Promise((resolve, reject) =>
    {
      const options = {
          method: 'POST',
          headers: {
              'content-type': 'application/json',
          },
          body: JSON.stringify({"user":user})
      };
  
      const url = 'http://localhost:5000/chatter';
  
      fetch(url, options)
        .then(response => response.json())
          .then(response => resolve(response.chitchat))
          .catch(err => reject(err));
  
    })}
  
  
  export default Chattest;
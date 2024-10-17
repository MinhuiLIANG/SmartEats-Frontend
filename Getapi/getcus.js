function Custest(id, persona,style,cha) {
    let num = Math.floor(Math.random() * 4);
    let port = num.toString();
      return new Promise((resolve, reject) =>
      {
        const options = {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({"uid":id,"persona":persona,"style":style,"cha":cha})
        };
    
        const url = 'https://www.foodcrs.com/cus';
    
        fetch(url, options)
          .then(response => response.json())
            .then(response => resolve(response.sentence))
            .catch(err => reject(err));
    
      })}
    
    
    export default Custest;
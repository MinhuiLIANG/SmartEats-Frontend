function endinfo(id,acca,expa,expb,expc,intera,usefa,usefb,trusta,trustb,eata,useia,useib,useic,quaa,ada,adb,cusa,cusb,cusc,edul,workf,race,hper,feedback,extra) {
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
          body: JSON.stringify({"uid":id,"acca":acca,"expa":expa,"expb":expb,"expc":expc,"intera":intera,"usefa":usefa,"usefb":usefb,"trusta":trusta,"trustb":trustb, "eata":eata,"useia":useia,"useib":useib,"useic":useic,"quaa":quaa,"ada":ada,"adb":adb,"cusa":cusa,"cusb":cusb,"cusc":cusc,"edul":edul,"workf":workf,"race":race,"hper":hper,"feedback":feedback,"extra":extra})
      };
  
      const url = 'https://www.foodcrs.com/end';
  
      fetch(url, options)
        .then(response => response.json())
          .then(response => resolve(response.status))
          .catch(err => reject(err));
  
    })}
  
  
  export default endinfo;
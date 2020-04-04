let loadJs = (url, isAsync) => {
  return new Promise(resolve => {
    let script = document.createElement('script')
    if (script.readyState) {
      script.onreadystatechange = () => {
        if (script.readyState == 'loaded' || script.readyState == 'complete') {
          script.onreadystatechange = null
          resolve(url)
        }
      }
    } else {
      script.onload = () => {
        resolve(url)
      }
    }
    script.src = url;
    (!!isAsync) && (script.async = 1)
    document.body.appendChild(script)
  })
}

export {
  loadJs
};
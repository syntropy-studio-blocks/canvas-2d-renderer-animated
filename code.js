
export const run = ({ state, element, events, iteration }) => {
  state.canvases = []
  element.style.padding = '2px 0px 0px 2px'
}

export const update = ({ state, element, events, iteration }) => {
  const { data, canvases, width, height } = state
  const totalCanvases = data.length
  
  if(totalCanvases < canvases.length){
  	canvases.splice(totalCanvases) 
  }
  
  for(var i=0; i<totalCanvases; i++){
    if(i >= canvases.length){
      const canvas = document.createElement('canvas')
			canvases.push({
        elem: canvas,
        ctx: canvas.getContext('2d')
      })
      element.appendChild(canvas)
    }
    
    const { elem, ctx } = canvases[i]
    elem.width = width
    elem.height = height
    elem.style.display = 'inline-block'
    elem.style.margin = '0px 2px 2px 0'
  }  
  
  canvases.forEach(({ elem, ctx }, i) => {
    const imageData = ctx.getImageData(0, 0, elem.width, elem.height)
  	const idata = imageData.data 
    const d = data[i]
    
    for(var i=0; i<idata.length; i+=4){
    	const val = d[i/4] * 255
      idata[i] = idata[i+1] = idata[i+2] = val    	
      idata[i+3] = 255
    }  
    ctx.putImageData(imageData, 0, 0)   
  })
}


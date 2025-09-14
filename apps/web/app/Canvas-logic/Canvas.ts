export function initDraw(canvas: HTMLCanvasElement){
    // canvas full-screen sized
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let clicked = false;
    let startY = 0;
    let startX = 0;

    canvas.addEventListener("mousedown", (e) => {
      clicked = true;
      console.log(e.clientX)
      console.log(e.clientY)
      startX = e.clientX;
      startY = e.clientY
    })
    canvas.addEventListener("mouseup", (e) => {
      clicked = false;
      console.log(e.clientX)
      console.log(e.clientY)
    })

    canvas.addEventListener("mousemove", (e) => {
      if (clicked) {
        const width = e.clientX - startX;
        const height = e.clientY - startY;
        ctx.strokeStyle = "white"
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.strokeRect(startX,startY,width,height)
      }
    })
}
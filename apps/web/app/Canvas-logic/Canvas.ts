import axios from "axios";
const HTTP_BACKEND = process.env.NEXT_PUBLIC_HTTP_BACKEND;
console.log(HTTP_BACKEND)

type Shapes = {
  type: "rect",
  x: number,
  y: number,
  width: number,
  height: number;
} | {
  type: "circle",
  centerX: number,
  centerY: number;
  radius: number
}

export async function initDraw(canvas: HTMLCanvasElement, roomId: string) {
  // canvas full-screen sized
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let existingShapes: Shapes[] = await getExistingShapes(roomId);

  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  let clicked = false;
  let startY = 0;
  let startX = 0;

  clearCanvas(existingShapes, canvas, ctx)

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
    const width = e.clientX - startX;
    const height = e.clientY - startY;
    existingShapes.push({
      type: "rect",
      x: startX,
      y: startY,
      width,
      height
    })
  })

  canvas.addEventListener("mousemove", (e) => {
    if (clicked) {
      const width = e.clientX - startX;
      const height = e.clientY - startY;
      clearCanvas(existingShapes, canvas, ctx)
      ctx.strokeStyle = "white"
      ctx.strokeRect(startX, startY, width, height)
    }
  })
}

function clearCanvas(existingShapes: Shapes[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  existingShapes.map((shape) => {
    if (shape.type == "rect") {
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height)
    }
  })
}

async function getExistingShapes(roomId: string) {
  const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`)
  const messages = res.data.messages;
  console.log(messages)

  const shapes = messages.map((x: { message: string }) => {
    const messageData = JSON.parse(x.message)
    return messageData
  })
  console.log(shapes)
  return shapes
}
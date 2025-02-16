import uvicorn
from fastapi import FastAPI
import threading
from contextlib import asynccontextmanager

# IMPORTANT: We import "detect_faces" from face_scan.py (defined below).
# Make sure your folder structure is:
# Backend/app/routes/face_scan.py
from app.routes.face_scan import detect_faces

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    This lifespan function automatically starts the camera in a separate thread
    as soon as the FastAPI server boots up. Press 'q' in the camera window to quit.
    """
    print("🚀 FastAPI Server Started! Launching camera thread...")
    # Start the face detection in the background
    threading.Thread(target=detect_faces, daemon=True).start()
    yield  # Keep the server running
    print("🛑 Server shutting down. (Camera thread will also stop if 'q' was pressed.)")

# Create the FastAPI app using the lifespan approach
app = FastAPI(lifespan=lifespan)

@app.get("/")
def home():
    """
    Simple endpoint to confirm the server is running.
    Visit http://127.0.0.1:8000/ to see this message.
    """
    return {"message": "Server is running. Camera detection started automatically!"}

if __name__ == "__main__":
    # Run the server with auto-reload for development
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)

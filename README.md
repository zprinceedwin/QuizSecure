# QuizSecure: Real-Time Face & Object Detection

**QuizSecure** is a project that leverages **FastAPI** for the backend, **MediaPipe** for real-time face detection, and **Mask R-CNN** for object detection. It automatically detects faces (highlighted in green) and other objects (highlighted in red) from your webcam feed.

---

## Table of Contents

1. [Features](#features)  
2. [Project Structure](#project-structure)  
3. [Installation](#installation)  
4. [Usage](#usage)  
5. [Optional GPU Acceleration](#optional-gpu-acceleration)  
6. [Troubleshooting](#troubleshooting)  
7. [Contributing](#contributing)  
8. [License](#license)  

---

## Features

- **Automatic Camera Startup**: Begins capturing from your webcam the moment the FastAPI server starts—no extra endpoint call required.  
- **Hybrid Detection**:  
  - **MediaPipe**: Detects faces quickly, draws **green** bounding boxes.  
  - **Mask R-CNN**: Detects non-face objects, draws **red** bounding boxes.  
- **Console Feedback**: Prints per-frame detection info in the console (faces, objects).  
- **Press ‘q’ to Quit**: Stop the camera loop without shutting down the entire server.  
- **Optional GPU Support**: If you have an **NVIDIA GPU**, run the project with CUDA for much faster performance.

---

## Project Structure

```
QuizSecure/
├── Frontend/
│   ├── Login/
│   ├── Signup/
│   ├── Student Dashboard/
│   └── Teacher Dashboard/
│       ...                # (HTML/CSS/JS for each sub-feature)
├── Backend/
│   ├── app/
│   │   ├── main.py        # FastAPI entry point (camera starts in background)
│   │   ├── routes/
│   │   │   ├── face_scan.py  # Real-time face & object detection logic
│   │   │   └── utils.py      # Helper function: decode_image()
│   │   └── __init__.py
│   ├── models/
│   │   └── maskrcnn_model.py # Mask R-CNN for single-image inference (optional)
│   ├── requirements.txt      # Backend dependencies
│   └── README.md             # This documentation
├── environment/
│   ├── .venv/                # (Optional) Python virtual environment
└── .gitignore                # (Optional) Exclude .venv or other files
```

- **Frontend**: All UI/UX (HTML, CSS, JS) for Login, Signup, Student & Teacher dashboards.  
- **Backend**: FastAPI server with real-time detection code.  
- **environment**: Houses your Python environment or other environment-specific files.

---

## Installation

1. **Clone or Download** this repository.  
2. **Navigate** to the `Backend` folder:
   ```bash
   cd QuizSecure/Backend
   ```
3. *(Optional)* **Create a Virtual Environment**:
   ```bash
   python -m venv .venv
   # On Mac/Linux:
   source .venv/bin/activate
   # On Windows:
   .venv\Scripts\activate
   ```
4. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
   This installs FastAPI, Uvicorn, PyTorch, Torchvision, OpenCV, NumPy, and MediaPipe.

---

## Usage

1. **Run the FastAPI Server**:
   ```bash
   uvicorn app.main:app --reload
   ```
2. **Check the Console**: You should see messages like:
   ```plaintext
   🚀 FastAPI Server Started! Launching camera thread...
   [Frame 1] MediaPipe: 1 face(s) detected.
   [Frame 1] Mask R-CNN: 0 object(s) detected.
   ...
   ```
3. **Watch the Camera Window**: A window titled “Camera - Press Q to Quit” will appear, showing bounding boxes.  
4. **Quit**: Press `q` in the camera window to stop detection (the server continues running until you press `Ctrl + C` in the terminal).

---

## Optional GPU Acceleration

If you have an NVIDIA GPU and have installed CUDA (e.g., 12.6):

1. **Uninstall CPU-only PyTorch**:
   ```bash
   pip uninstall torch torchvision torchaudio
   ```
2. **Install CUDA-enabled PyTorch**:
   ```bash
   pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu126
   ```
3. **Verify**:
   ```python
   import torch
   print(torch.cuda.is_available())       # True means GPU is recognized
   print(torch.cuda.get_device_name(0))   # Shows your GPU name
   ```

This can significantly speed up detection performance.

---

## Troubleshooting

- **Camera Not Detected**:  
  - Another app may be using the camera.  
  - Change `cv2.VideoCapture(0)` to `cv2.VideoCapture(1)` if you have multiple cameras.

- **No GPU Detected**:  
  - Confirm CUDA Toolkit is installed (`nvcc --version`).  
  - Use the correct PyTorch version with CUDA (e.g., `cu126`).

- **Laggy Video**:  
  - Use GPU or reduce the frame size (e.g., 640×480) in `face_scan.py`.  
  - Ensure no heavy processes are running in the background.

---

## Contributing

1. Fork the repo and create a new branch.  
2. Commit your changes with a clear message.  
3. Push to your fork and create a Pull Request.

---

## License

This project is distributed under an open license—use at your own risk. Feel free to adapt it for your needs.

---

## requirements.txt (Updated)

```plaintext
fastapi
uvicorn
torch
torchvision
opencv-python
numpy
mediapipe

# OPTIONAL: For NVIDIA GPU acceleration with CUDA 12.6
# pip uninstall torch torchvision torchaudio
# pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu126
```


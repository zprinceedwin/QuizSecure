import cv2
import mediapipe as mp
import torch
import torchvision.transforms as T
from torchvision.models.detection import maskrcnn_resnet50_fpn
import numpy as np

# -------------------------------------------------
# 1) Auto-Detect GPU (CUDA/MPS) or CPU
# -------------------------------------------------
device = torch.device("cuda" if torch.cuda.is_available()
                      else "mps" if torch.backends.mps.is_available()
                      else "cpu")
print(f"🔥 Using device: {device}")

# -------------------------------------------------
# 2) Load Face Detection (MediaPipe) & Mask R-CNN
# -------------------------------------------------
mp_face = mp.solutions.face_detection.FaceDetection(min_detection_confidence=0.5)
mask_rcnn = maskrcnn_resnet50_fpn(weights="DEFAULT").to(device).eval()
transform = T.Compose([T.ToTensor()])

# -------------------------------------------------
# 3) detect_faces() — Called by main.py
# -------------------------------------------------
def detect_faces():
    """
    Continuously captures frames from your default webcam (0).
    Uses MediaPipe to detect faces (drawn in GREEN).
    Uses Mask R-CNN to detect other objects (drawn in RED).
    Press 'q' in the camera window to exit the loop.
    """
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("❌ ERROR: Could not open camera.")
        return

    frame_count = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            print("❌ ERROR: Could not read frame from camera.")
            break

        frame_count += 1
        # Convert BGR -> RGB for MediaPipe
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # -----------------------------------
        # A) MediaPipe Face Detection
        # -----------------------------------
        face_results = mp_face.process(rgb_frame)
        face_mask = np.zeros_like(frame, dtype=np.uint8)

        # Count faces
        num_faces = 0
        if face_results.detections:
            num_faces = len(face_results.detections)
            for detection in face_results.detections:
                box = detection.location_data.relative_bounding_box
                h, w, _ = frame.shape
                x1 = int(box.xmin * w)
                y1 = int(box.ymin * h)
                x2 = int((box.xmin + box.width) * w)
                y2 = int((box.ymin + box.height) * h)

                # Clamp coordinates
                x1, y1 = max(0, x1), max(0, y1)
                x2, y2 = min(w, x2), min(h, y2)

                # Draw GREEN box for face
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                # Copy face region to face_mask
                face_mask[y1:y2, x1:x2] = frame[y1:y2, x1:x2]

        print(f"[Frame {frame_count}] MediaPipe: {num_faces} face(s) detected.")

        # -----------------------------------
        # B) Mask R-CNN on Non-Face Areas
        # -----------------------------------
        non_face_area = cv2.bitwise_xor(frame, face_mask)

        # Convert to tensor & move to GPU/CPU
        input_tensor = transform(non_face_area).unsqueeze(0).to(device)

        with torch.no_grad():
            predictions = mask_rcnn(input_tensor)

        boxes = predictions[0]["boxes"]
        scores = predictions[0]["scores"]

        obj_count = 0
        for i, box in enumerate(boxes):
            score = scores[i].item()
            if score > 0.5:  # Show only confident detections
                obj_count += 1
                x1, y1, x2, y2 = map(int, box.tolist())
                # Draw RED box for objects
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 255), 2)

        print(f"[Frame {frame_count}] Mask R-CNN: {obj_count} object(s) detected.")

        # Show the result
        cv2.imshow("Camera - Press Q to Quit", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            print("🛑 Exiting camera loop.")
            break

    cap.release()
    cv2.destroyAllWindows()

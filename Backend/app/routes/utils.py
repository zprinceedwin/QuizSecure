import cv2
import numpy as np

def decode_image(image_bytes: bytes):
    """
    Convert raw image bytes into an OpenCV image object.
    """
    np_arr = np.frombuffer(image_bytes, np.uint8)
    image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    return image

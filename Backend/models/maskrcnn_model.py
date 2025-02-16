import torch
import torchvision
from torchvision import transforms
from app.routes.utils import decode_image

# 1) Load a pre-trained Mask R-CNN model from torchvision
model = torchvision.models.detection.maskrcnn_resnet50_fpn(pretrained=True)
model.eval()  # set model to evaluation mode

# 2) Create a transformation pipeline
transform = transforms.Compose([
    transforms.ToTensor()
])

def process_image(image_bytes: bytes):
    """
    Takes raw image bytes, decodes them into an image,
    transforms it to a tensor, and runs the Mask R-CNN model.
    Returns a simple result (e.g., how many objects are detected).
    """
    # Decode to an OpenCV image
    img = decode_image(image_bytes)

    # Convert OpenCV image to a PyTorch tensor
    img_tensor = transform(img)

    # Run inference
    with torch.no_grad():
        predictions = model([img_tensor])  # returns a list of dicts

    # For a simple demo, let's just return how many bounding boxes it found
    num_objects = len(predictions[0]["boxes"])
    return {
        "num_objects_detected": num_objects
    }

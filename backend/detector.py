from ultralytics import YOLO

# Vehicle-related classes from the COCO dataset that YOLOv8 is pretrained on.
# These are the ONLY classes we care about for a traffic project.
VEHICLE_CLASSES = {"car", "motorcycle", "bus", "truck"}

# Load the pretrained YOLOv8 model.
# "yolov8n.pt" = the "nano" version: smallest and fastest, good for a mini
# project on a normal laptop (no GPU required). The file downloads
# automatically the first time you run this.
model = YOLO("yolov8n.pt")


def detect_vehicles(image_path, confidence_threshold=0.4):
    """
    Runs YOLO on a single image and returns a list of vehicle detections.

    Each detection is a dictionary:
        {
            "class_name": "car",
            "confidence": 0.87,
            "box": [x1, y1, x2, y2]   # bounding box corner coordinates
        }
    """
    results = model(image_path)[0]  # run detection on the image

    detections = []

    for box in results.boxes:
        class_id = int(box.cls[0])
        class_name = model.names[class_id]
        confidence = float(box.conf[0])

        # Skip anything that isn't a vehicle, or that YOLO isn't confident about
        if class_name not in VEHICLE_CLASSES:
            continue
        if confidence < confidence_threshold:
            continue

        x1, y1, x2, y2 = box.xyxy[0].tolist()

        detections.append({
            "class_name": class_name,
            "confidence": round(confidence, 2),
            "box": [round(x1, 1), round(y1, 1), round(x2, 1), round(y2, 1)]
        })

    return detections


# This block only runs when you execute this file directly
# (python detector.py) — not when app.py imports it later.
if __name__ == "__main__":
    sample_image = "sample_media/traffic1.jpeg"
    found = detect_vehicles(sample_image)

    print(f"Found {len(found)} vehicles:")
    for d in found:
        print(d)
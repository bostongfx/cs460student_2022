import numpy as np
import base64

f = open("/Users/bendiksen/Desktop/fa_2022/cs460/cs460student/10/diamond.obj", "r")

vertices =[]
indices = []
with open("/Users/bendiksen/Desktop/fa_2022/cs460/cs460student/10/diamond.obj") as fp:
    for line in fp.readlines():
        if line[0] == "v":
            vertices.append([float(elem) for elem in line[1:].split()])
        elif line[0] == "f":
            indices.append([int(elem) for elem in line[1:].split()])
    print(f"line first char: {indices}")

VERTICES = np.array(vertices, dtype=np.float32)
# VERTICES = np.array([0.,0.,0.,    0.,1.,0.,    1.,0.,0.], dtype=np.float32)
# INDICES = np.array([0, 1, 2], dtype=np.ushort)
INDICES = np.array(indices, dtype=np.int16)
print(f"INDICES: {VERTICES}")
print(f"MAX: {max(vertices[0::3])}")
HOWMANYV = len(vertices)
HOWMANYI = len(indices)
MAX_X = max([elem[0] for elem in VERTICES])
MAX_Y = max([elem[1] for elem in VERTICES])
MAX_Z = max([elem[2] for elem in VERTICES])
MIN_X = min([elem[0] for elem in VERTICES])
MIN_Y = min([elem[1] for elem in VERTICES])
MIN_Z = min([elem[2] for elem in VERTICES])
MAX = max([elem for sublist in INDICES for elem in sublist]) - 1
MIN = min([elem for sublist in INDICES for elem in sublist])

HOWMANYBYTES_V = VERTICES.nbytes
HOWMANYBYTES_I = INDICES.nbytes

B64_VERTICES = base64.b64encode(VERTICES)
B64_INDICES = base64.b64encode(INDICES)

gltf = {
    "asset": {
        "version": "2.0",
        "generator": "CS460 Magic Fingers"
    },

  "accessors": [
        {
            "bufferView": 0,
            "byteOffset": 0,
            "componentType": 5126,
            "count": HOWMANYV,
            "type": "VEC3",
            "max": [MAX_X, MAX_Y, MAX_Z],
            "min": [MIN_X, MIN_Y, MIN_Z]
        },
        {
            "bufferView": 1,
            "byteOffset": 0,
            "componentType": 5123,
            "count": HOWMANYI,
            "type": "SCALAR",
            "max": [MAX],
            "min": [MIN]
        }
    ], 

    "bufferViews": [
        {
            "buffer": 0,
            "byteOffset": 0,
            "byteLength": HOWMANYBYTES_V,
            "target": 34962
        },
        {
            "buffer": 1,
            "byteOffset": 0,
            "byteLength": HOWMANYBYTES_I,
            "target": 34963
        }
    ],
    
    "buffers": [
        {
            "uri": "data:application/octet-stream;base64,"+str(B64_VERTICES, 'utf-8'),
            "byteLength": HOWMANYBYTES_V
        },
        {
            "uri": "data:application/octet-stream;base64,"+str(B64_INDICES, 'utf-8'),
            "byteLength": HOWMANYBYTES_I
        }
    ],
  
    "meshes": [
        {
            "primitives": [{
                 "mode": 4,
                 "attributes": {
                     "POSITION": 0
                 },
                 "indices": 1
            }]
        }
    ],

    "nodes": [
        {
            "mesh": 0
        }
    ],

    "scenes": [
        {
            "nodes": [
                0
            ]
        }
    ],

    "scene": 0
}

print ( str(gltf).replace("'", '"') ) # we need double quotes instead of single quotes


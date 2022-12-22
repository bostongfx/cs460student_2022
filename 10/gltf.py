import numpy as np
import base64

<<<<<<< HEAD
VERTICES = [] 
INDICES = [] 

HOWMANY_V = 0
HOWMANY_I = 0
MAX_X = float("-inf")
MAX_Y = float("-inf")
MAX_Z = float("-inf")
MIN_X = float("inf")
MIN_Y = float("inf")
MIN_Z = float("inf")
MAX = float("-inf")
MIN = float("inf")

count = 0
end_header = False
numOfVertices = 0
indicesIndex = 0
tempArray = []

## Reading file by line.
fileObj = open("pyramid.ply", "r")
for line in fileObj.readlines():
    if line[0:10] == "end_header":
        end_header = True
    elif line[0:14] == "element vertex":
        numOfVertices = int(line[15:]) 
        numOfVertices = numOfVertices - 1
        HOWMANY_V = int(line[15:]) 
    elif end_header and count <= numOfVertices:
        for i in line.split(' ')[:3]:
            tempArray.append(i)
        VERTICES.append(tempArray)
        count += 1
    elif end_header and count > numOfVertices:
        for i in line.split(' ')[1:4]:
            tempArray.append(i)
        INDICES.append(tempArray)
        HOWMANY_I += 1
    tempArray = []
fileObj.close()
VERTICES = np.array(VERTICES, dtype=np.float32)
INDICES = np.array(INDICES, dtype=np.ushort)

HOWMANY_I = HOWMANY_I *3
for a in VERTICES:
    if MAX_X < a[0]:
        MAX_X = a[0]
    elif MIN_X > a[0]:
        MIN_X = a[0]
    if MAX_Y < a[1]:
        MAX_Y = a[1]
    elif MIN_Y > a[1]:
        MIN_Y = a[1]
    if MAX_Z < a[2]:
        MAX_Z = a[2]
    elif MIN_Z > a[2]:
         MIN_Z = a[2]

for a in INDICES:
    for b in a:
        if MIN > b:
            MIN = b
        elif MAX < b:
            MAX = b
=======
VERTICES = np.array([0.,0.,0.,    0.,1.,0.,    1.,0.,0.], dtype=np.float32)
INDICES = np.array([0, 1, 2], dtype=np.ushort)

HOWMANY = 3
MAX_X = 1
MAX_Y = 1
MAX_Z = 0
MIN_X = 0
MIN_Y = 0
MIN_Z = 0
MAX = 2
MIN = 0
>>>>>>> 467508d282bf18ec77326735c0ad54d903e53b17

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
<<<<<<< HEAD
            "count": HOWMANY_V,
=======
            "count": HOWMANY,
>>>>>>> 467508d282bf18ec77326735c0ad54d903e53b17
            "type": "VEC3",
            "max": [MAX_X, MAX_Y, MAX_Z],
            "min": [MIN_X, MIN_Y, MIN_Z]
        },
        {
            "bufferView": 1,
            "byteOffset": 0,
            "componentType": 5123,
<<<<<<< HEAD
            "count": HOWMANY_I,
=======
            "count": HOWMANY,
>>>>>>> 467508d282bf18ec77326735c0ad54d903e53b17
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
<<<<<<< HEAD

=======
    
>>>>>>> 467508d282bf18ec77326735c0ad54d903e53b17
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
<<<<<<< HEAD

=======
  
>>>>>>> 467508d282bf18ec77326735c0ad54d903e53b17
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

<<<<<<< HEAD
print ( str(gltf).replace("'", '"') ) 

f = open("output.gltf", "w")
f.write(str(gltf).replace("'", '"'))
f.close()
=======
print ( str(gltf).replace("'", '"') ) # we need double quotes instead of single quotes

>>>>>>> 467508d282bf18ec77326735c0ad54d903e53b17

// add head

const bones = [];

const shoulder = new THREE.Bone();
const elbow = new THREE.Bone();
const head = new THREE.Bone();

shoulder.add(elbow);
elbow.add(Head);

bones.push(shoulder);
bones.push(elbow);
bones.push(head);

shoulder.position.y = -5;
elbow.position.y = 0;
head.position.y = 5;

const armSkeleton = new THREE.Skeleton(bones);
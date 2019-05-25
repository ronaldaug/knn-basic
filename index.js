// Movies Types 
// [genere, kisses, fights]

// Diabetes Disease
// [reactive, sugar-rate, physical exercise]



// သင္ေပးဖို႔ data
var trainData = [
    ['Yes',2,8],
    ['No',16,2],
    ['Yes',1,18],
    ['Yes',2,8],
    ['No',14,3],
    ['No',7,0],
    ['No',12,1],
    ['Yes',2,4],
    ['No',8,5],
    ['Yes',1,7],
 ];



var Node = function(label,x,y){
  this.label = label;
  this.x = x;
  this.y = y;
}


var Nodes = [];
for(var i=0;i<trainData.length;i++){
    var l = trainData[i][0],
    x = trainData[i][1], 
    y = trainData[i][2];
    Nodes.push(new Node(l,x,y));
}

// KNN Formula
Node.prototype.distanceFrom = function(node){
   var sqrDist = Math.pow(this.x - node.x,2)
                 + Math.pow(this.y - node.y,2);
   return Math.sqrt(sqrDist);
}

function noDiabetesOrNot(node,k){
  var dists = [];
  for(var i=0;i<Nodes.length;i++){
    var d = node.distanceFrom(Nodes[i]);
    dists.push({label:Nodes[i].label,d:d});
  }
  //sort the array
  var sortedArr = dists.sort(function(a,b){
    return a.d-b.d;
  });
  console.log("Sorted array --- >");
  console.log(sortedArr);
console.log(' =========== ')
  var votes = {'Yes':0,'No':0};

  for(var i=0;i<k;i++){
    if(sortedArr[i].label=='Yes')votes.Yes++
    if(sortedArr[i].label=='No')votes.No++
  }

  if(votes.No>votes.Yes) return `Nearest ${k} nodes are "Physical Exercise", that's why it's not posibble to have diabetes.`;
  else return `Nearest ${k} nodes are "Sugar rates", that's why it's posibble to have diabetes`;
  
}


// [Disease, No-Sugar, Sugar]
// console.log(noDiabetesOrNot(new Node('',10,0)));


const { stdin, stdout } = process;

function prompt(question) {
  return new Promise((resolve, reject) => {
    stdin.resume();
    stdout.write(question);

    stdin.on('data', data => resolve(data.toString().trim()));
    stdin.on('error', err => reject(err));
  });
}


async function main() {
  try {
    const sugar = await prompt("Sugar Rate ");
    const exercise = await prompt("Physical Exercise ");
    const knum = await prompt("K ");
    console.log(noDiabetesOrNot(new Node('',exercise,sugar),knum));
    stdin.pause();
  } catch(error) {
    console.log("There's an error!");
    console.log(error);
  }
  process.exit();
}

main();

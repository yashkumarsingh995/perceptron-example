"use strict"
//canvas width
var Width=500,Height=500;

//the number of training dataset
var number_of_inputs=250;

//the array for training datset ,in this case dataset are points
var dataset=new Array(number_of_inputs);

//assiging ramdom values to the dataset and the correct result for the given value .This is used for training the dataset.
for(let i=0;i<number_of_inputs;i++)
{
  var tempArray=new Array(3);
  tempArray[0]=Math.random(Width);
  tempArray[1]=Math.random(Height);
  if(tempArray[1]>=tempArray[0])
  {
    tempArray[2]=1;
  }
  else
  {
    tempArray[2]=-1;
  }
  dataset[i]=tempArray;
}

//The random values for the two weights .There are two input branches for the perceptron ,so we are assigning random values for weights .This is later modified according to the dataset training.
var weights = new Array(2);
for (let i = 0; i < weights.length; i++)
{
  weights[i] = Math.random(0, 1);
}
//console.log("original weights:-" + weights)

//The main function "perceptron" 
function perceptron()
{
  
  var error=0;
  var learningRate = 0.01;
  for(let i=0;i<number_of_inputs;i++)
  {
    var sum=0;
    for(let j=0;j<weights.length;j++)
    {
      
      weights[j]=(weights[j]+dataset[i][j]*error*learningRate);
      
      sum+=dataset[i][j]*(weights[j])
    }
    
    var activation_function=Math.sign(sum);
   // console.log(activation_function);
    error=dataset[i][2] - activation_function;
    
  }
  //console.log("corrected weights:-"+weights);
  
}
var originalWeights=[].concat(weights);

//the function for visualizing the datset and test cases

function sketch()
{
    for (let i = 0; i < number_of_inputs; i++)
    {
      if(dataset[i][2]===1)
      {
        fill(0);
      }
      else
      {
        fill(255);
      }
      
      ellipse(dataset[i][0] * 1000, dataset[i][1] * 1000, 10, 10);
    }
}


//test function for the testing of our  adjusted weights.
function test()
{ var result=0;
  var resultWithoutTraining=0
  var testPoints=new Array(2);
  for(let i=0;i<testPoints.length;i++)
  {
    testPoints[i]=Math.random(100)*700;
  }
  for(let i=0;i<weights.length;i++)
  { 
    result+=testPoints[i]*weights[i];
    resultWithoutTraining+=testPoints[i]*originalWeights[i];
  }
  //console.log("*********"+result+"**********")
  var fResult=Math.sign(result);
  
  var fResultWithoutTraining=Math.sign(resultWithoutTraining);
  if(fResult===1)
  {
    fill(0,255,0);
  }
  else
  {
    fill(255,0,0);
  }
 
  ellipse(width-testPoints[0],height-testPoints[1],15,15);
  var accuracy=(testPoints[1]>=testPoints[0]?1:0)-fResult;
  console.log("result with training = "+accuracy)
  console.log("result Without Training = "+fResultWithoutTraining);
}

//p5 based setup function executed as main function.

function setup()
{ //canvas of size 900x900[width x height].
  createCanvas(900, 900);
  //initialisation of perceptron function
  perceptron();
  stroke(0);
  line(0,0,width,height)
  sketch();
  for(let i=0;i<100;i++){
    setTimeout(test,200*i);
  }
  
}



//there is no need for draw function till now.
//function draw(){}
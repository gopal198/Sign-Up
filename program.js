//program to find triplet in a array
var arr = [1,2,3,4];
function tripletFind(arr , n){
   var min = 0;
   var max = n-1;
   var smaller = [];
   smaller[0] = -1;
   for(var i=1;i < n ; i++){
       if(arr[i] <= arr[min]){      
         min = i;
         smaller[i] = -1
       }else{
          smaller[i] = min;
       }
   }
   var greater = [];
   greater[n-1] = -1;
   for(var i = n-2;i>=0;i--){
      if(arr[i] >= arr[max]){
        max = i;
        greater[i] = -1;
      }else{
        greater[i] = max;
      }
   }

   for(var i = 0; i < n;i++){
       if(smaller[i] !== -1 && greater[i] !== -1){
           console.log(arr[smaller[i]],arr[i],arr[greater[i]]);
       }
   } 
  console.log(smaller,greater);
}
tripletFind(arr , arr.length);

//program to divide array into subarray with equal sum

var arr = [1,5,11,5,2,3,4,1,10,23,6,8,9,3,4,7];var totalSum = 0;
var subArray = [];
var subArray2 = [];
for(var i=0;i< arr.length;i++){
    totalSum += arr[i]; 
}
console.log(totalSum);
var sum = 0;p = 0;
for(var i = 0;i< arr.length;i++){
  if(totalSum%2 === 0){
   if(arr[i] < totalSum/2){
        //console.log(sum);
        if(sum == totalSum/2){
            p = i;
           break;
        }else{
          console.log(sum);
         if(sum < totalSum/2){
          sum += arr[i];
          var val = checkSum(sum,totalSum/2,arr[i]);
          if(val){
          subArray.push(arr[i]);
          console.log(subArray,arr[i]);
          }
          else{
          sum = sum - arr[i];
          subArray2.push(arr[i]);
           console.log(subArray2,arr[i]);
          }
        }
       }
    
  }
 }else{
     console.log('it cannot be divided in two subarray with equal sum');
     break;
 }
}
function checkSum(sum,total,el){
    
    if(sum > total){
       sum -= el;
       //console.log(sum);
       return false;
    }
   return true;
}
for(var i = p; i < arr.length;i++){
   subArray2.push(arr[i]);
}
console.log(subArray,subArray2);
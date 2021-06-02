process.stdin.setEncoding('utf8');  
//设置输入的流的编码  
process.stdin.on('readable', function(){  
    //为process.stdin注册事件readable  
  var chunk = process.stdin.read(); 
  console.log(typeof chunk) 
  console.log(chunk.toString()) 
  console.log(chunk !== 'null') 
  if (chunk !== 'null\n') {  
    process.stdout.write(`data: ${chunk}`);  
  }  
});  
//为process.stdin注册end事件  
process.stdin.on('end', function()  {  
  process.stdout.write('end');  
}); 12
12

<html>
   <body>
       <script>
             var vehicle = function(){
             	this.name = "ram";
             }
             vehicle.prototype={
             	drive:function(){
             		return this.name +'drives slowly';
             	}
             }
             var truck = function(){
             	this.name = "volvo truck";
             }
             truck.prototype = new vehicle();
             var tr = new truck();
             console.log(tr,new vehicle());
       </script>
   </body>
</html>
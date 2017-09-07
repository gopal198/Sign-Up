var app = angular.module('app.directive',['ui.template']);
angular.module('ui.template',['uib/template/accordion/accordion.html'])
app.controller('directiveCtrl',function($scope){
   $scope.sum = function(){
   	 console.log('hello');
   }

   this.closeOthers = function(){

   }
});
app.directive('uiCust',function($parse){
	return{
		restrict : 'A',
		link: function(scope,element,attrs){
              $parse(attrs.sum());
		}
	}
});
app.directive('uibAccordion',function(){
	return{
		restrict : 'E',
		
		transclude : 'true',
		templateUrl : function(element,attrs){
           return attrs.templateUrl || 'uib/template/accordion/accordion.html';
		}
	}
})
angular.module('uib/template/accordion/accordion.html',[]).run(['$templateCache',function($templateCache){
	$templateCache.put('uib/template/accordion/accordion.html', "<div role=\"tablist\" class=\"panel-group\" ng-transclude></div>")
}])
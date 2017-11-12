var app = angular.module('app.directive',['ui.template']);
angular.module('ui.template',['uib/template/accordion/accordion.html','directive/msg.html','directive/msg_string.html' , 'directive/msg_func.html'])
app.controller('directiveCtrl',function($scope){
   $scope.sum = function(){
   	 console.log('hello');
   }
   console.log($scope);
   $scope.name1="Gopal";
   $scope.name2="Shyam";
   $scope.name = {'firstname':'Gopal','Lastname':'Gupta'};
   $scope.doClick = function(){
      console.log('doclick');
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
//scope:{} means isolate scope of directive

app.directive('customDynamic',function(){
    return{
    	restrict: 'A',
    	scope:{
           custom : '=ngModel'
    	},
    	templateUrl: 'directive/msg.html',
      link: function(scope,element,attrs){
          console.log(scope);
      }
    }
})

angular.module('directive/msg.html',[]).run(['$templateCache',function($templateCache){
    $templateCache.put('directive/msg.html',"<div style=\"padding:10px;border:1px solid black\"> <input ng-model=\"custom\"></div>")
}])

app.directive('customDynamicString',function(){
    return{
      restrict: 'A',
      scope:{
           custom : '@ngMode'
      },
      templateUrl: 'directive/msg_string.html',
      link: function(scope,element,attrs){
          console.log(scope);
      }
    }
})

angular.module('directive/msg_string.html',[]).run(['$templateCache',function($templateCache){
    $templateCache.put('directive/msg_string.html',"<div style=\"padding:10px;border:1px solid black\">{{custom}}</div>")
}])

app.directive('customDynamicFunc',function(){
    return{
      restrict: 'A',
      scope:{
           Click : '&clickMe'
      },
      templateUrl: 'directive/msg_func.html',
      link: function(scope,element,attrs){
          console.log(scope);
      }
    }
})

angular.module('directive/msg_func.html',[]).run(['$templateCache',function($templateCache){
    $templateCache.put('directive/msg_func.html',"<div style=\"padding:10px;border:1px solid black\" ng-click=\"Click()\">click me</div>")
}])

/*angular.module('directive/msg.html',[]).run(['$templateCache',function($templateCache){
    $templateCache.put('directive/msg.html',"<div>'firstname':{{custom.firstname}} ,'Lastname': {{custom.Lastname}}</div>")
}])*/

angular.module('uib/template/accordion/accordion.html',[]).run(['$templateCache',function($templateCache){
	$templateCache.put('uib/template/accordion/accordion.html', "<div role=\"tablist\" class=\"panel-group\" ng-transclude></div>")
}])
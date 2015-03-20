function Base(variable) {
	this.instanceVariable = variable;
	this.instanceMethod = function() {
		// this.staticMethod();
		console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
	}
}

Base.prototype = {
	constructor: Base,
	staticVariable: 'Base',
	staticMethod: function() {
		console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
	}	
}

function extend(Base, Derived) {
	Derived = function(variable) {
		this.instanceVariable = variable;
		this.instanceMethod = function() {
			this.staticMethod();
			var baseInstanceMethod = Derived.prototype.instanceMethod;
			baseInstanceMethod.call(this);
			console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
		}
	}
    Derived.prototype = new Base();
    Derived.prototype.staticMethod = function() {
    	var baseStaticMethod = Derived.prototype.__proto__.staticMethod;
    	baseStaticMethod.call(this);
    	console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
    }
    Derived.prototype.staticVariable = 'Derived';
	Derived.__proto__ = Derived.prototype;
	//发现构造子函数本身并不能带有自己的类方法，只有将其__proto__指向自身protopype，这样它能调用自身的static属性和方法。。。。
	return Derived;
}

var Derived = undefined;
Derived = extend(Base, Derived);
var example = new Derived("example");
Derived.staticMethod();
//此处有疑问，见35行注释。。。。
example.instanceMethod();

console.log("\m");

example = new Derived('example');
otherExample = new Derived('other-example');
example.instanceMethod();
otherExample.instanceMethod();
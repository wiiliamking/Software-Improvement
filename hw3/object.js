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
	return Derived;
}

var Derived = undefined;
Derived = extend(Base, Derived);
var example = new Derived("example");
Derived.staticMethod();
example.instanceMethod();

console.log("\m");

example = new Derived('example');
otherExample = new Derived('other-example');
example.instanceMethod();
otherExample.instanceMethod();
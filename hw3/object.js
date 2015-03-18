function Base(variable) {
	this.instanceVariable = variable;
	this.instanceMethod = function() {
		console.log("This is from Base class instance-method, static-variable is: " + this.instanceVariable);
	}
}

Base.prototype = {
	constructor: Base,
	staticVariable: 'Base',
	staticMethod: function() {
		console.log("This is from Base class instance-method, instance-variable is: " + this.staticVariable);
	}
}

function extend(base, derived) {
	derived = function(variable) {
		base.call(this, variable);
		this.instanceMethod = function() {
			base.instanceMethod();
			console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
		}
	}
	derived.prototype = {
		constructor: derived,
		staticVariable: 'Derived',
		staticMethod: function() {
			base.staticMethod();
			console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
		}
	}
	return derived;
}

var object = new Base("hehe");
Derived = undefined;
Derived = extend(Base, Derived);

console.log(Base);

var example = new Derived("example");
Derived.staticMethod();
example.instanceMethod();



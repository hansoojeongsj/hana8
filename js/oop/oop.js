// class Emp extends Pet {
class Emp {
  constructor(name) {
    this.fullName = name;
  }

  set fullName(name) {
    [this.firstName, this.lastName] = name.split(" ");
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const hong = new Emp("Kildong Hong");
console.log(hong.fullName);
hong.fullName = "Nanda Kim";
console.log(hong.fullName);

console.log(Object.getOwnPropertyDescriptor(Emp.prototype, "fullname"));
console.log("hong = ", hong);

// --------
const kim = { id: 1, firstName: "Nanda", lastName: "Kim" };
const proxyObj = new Proxy(kim, {
  get(target, prop, receiver) {
    console.log("receiver >> ", receiver === proxyObj);
    if (prop === "fullName") {
      return `${target.firstName} ${target.lastName}`;
    }
  },

  // target.fullName = x;
  set(target, prop, value, receiver) {
    if (prop === "fullName") {
      [target.firstName, target.lastName] = value.split(" ");
    } else {
      target[prop] = value;
    }
  },
});

console.log("🚀 ~ id:", kim.id);
console.log("🚀 ~ name:", proxyObj.fullName, kim.fullName);

console.log(proxyObj instanceof Emp);

// ------------
// Emp 가장 위에 존재함. 한번에 실행 시키기

Object.defineProperties(Emp.prototype, {
  upperName: {
    get() {
      return this.fullName.toUpperCase();
    },
  },
  lowerName: {
    get: function () {
      return this.fullName.toLowerCase();
    },
  },
});

Emp.prototype.nameLength = function () {
  return this.fullName.length;
};

console.log("upper >>", hong.upperName);
console.log("lower >>", hong.lowerName);
console.log("nameLen >>", hong.nameLength());

// -------

console.log("-------------");

class Pet {
  feed(nutrient) {
    console.log(`feed ${this.name} :`, nutrient);
  }
}

Object.assign(Emp.prototype, { feed: Pet.prototype.feed });
hong.feed("xxx");

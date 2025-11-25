const myName: string = 'chaehyun';

console.log('hi~', myName);

// let x: string;
let x: string | undefined;

x = Math.random() < 0.5 ? 'abc' : undefined;

console.log(x?.length);
